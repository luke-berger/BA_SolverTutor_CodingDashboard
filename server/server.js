const express = require('express');
const cors = require('cors');
const { execFile } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');

const Database = require('better-sqlite3');
const db = new Database('experiment_data.db');

db.exec(`CREATE TABLE IF NOT EXISTS participants (
  survey_id TEXT PRIMARY KEY,
  experiment_group TEXT,
  task1_time_sec INTEGER,
  task1_compiles INTEGER,
  task1_resets INTEGER,
  task1_ai_messages INTEGER,
  task2_time_sec INTEGER,
  task2_compiles INTEGER,
  task2_resets INTEGER
);`);

const app = express();
const PORT = 3001;

// VE paths
const projectRoot = path.join(__dirname, '..');
const pythonExecutable = path.join(projectRoot, '.venv', 'bin', 'python');
const pytestExecutable = path.join(projectRoot, '.venv', 'bin', 'pytest');

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Create temp directory for storing code files
const tempDir = path.join(os.tmpdir(), 'solver-tutor-codes');
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir, { recursive: true });
}

/**
 * Log task 1 data
 * POST /api/log-task1
 */
app.post('/api/log-task1', (req, res) => {
  try {
    const { surveyId, group, timeOnTask, compileCount, resetCount, aiMessageCount } = req.body;

    const stmt = db.prepare(`
      INSERT INTO participants (survey_id, experiment_group, task1_time_sec, task1_compiles, task1_resets, task1_ai_messages) 
      VALUES (?, ?, ?, ?, ?, ?) 
      ON CONFLICT(survey_id) DO UPDATE SET 
        task1_time_sec = excluded.task1_time_sec, 
        task1_compiles = excluded.task1_compiles, 
        task1_resets = excluded.task1_resets, 
        task1_ai_messages = excluded.task1_ai_messages
    `);

    stmt.run(surveyId, group, timeOnTask, compileCount, resetCount, aiMessageCount);
    res.json({ success: true });
  } catch (error) {
    console.error('Database Error in /api/log-task1:', error);
    res.status(500).json({ success: false, error: 'Failed to log Task 1 data' });
  }
});

/**
 * Log task 2 data
 * POST /api/log-task2
 */
app.post('/api/log-task2', (req, res) => {
  try {
    const { surveyId, timeOnTask, compileCount, resetCount } = req.body;

    const stmt = db.prepare(`
      INSERT INTO participants (survey_id, task2_time_sec, task2_compiles, task2_resets) 
      VALUES (?, ?, ?, ?) 
      ON CONFLICT(survey_id) DO UPDATE SET 
        task2_time_sec = excluded.task2_time_sec, 
        task2_compiles = excluded.task2_compiles, 
        task2_resets = excluded.task2_resets
    `);

    stmt.run(surveyId, timeOnTask, compileCount, resetCount);
    res.json({ success: true });
  } catch (error) {
    console.error('Database Error in /api/log-task2:', error);
    res.status(500).json({ success: false, error: 'Failed to log Task 2 data' });
  }
});

/**
 * Execute Python code
 * POST /api/execute
 * Body: { code: string, timeout?: number }
 */
app.post('/api/execute', (req, res) => {
  const { code, timeout = 5000 } = req.body;

  if (!code || typeof code !== 'string') {
    return res.status(400).json({
      success: false,
      error: 'Code is required and must be a string',
    });
  }

  // Create temp file
  const tempFile = path.join(tempDir, `code_${Date.now()}.py`);

  try {
    // Write code to temp file
    fs.writeFileSync(tempFile, code);

    // Execute Python
    execFile(
      pythonExecutable,
      [tempFile],
      { timeout, maxBuffer: 10 * 1024 * 1024 },
      (error, stdout, stderr) => {
        // Clean up temp file
        try {
          fs.unlinkSync(tempFile);
        } catch (e) {
          console.error('Failed to delete temp file:', e);
        }

        if (error) {
          // Check if timeout
          if (error.killed) {
            return res.json({
              success: false,
              error: `Execution timeout (exceeded ${timeout}ms)`,
              stdout: stdout || '',
              stderr: stderr || '',
            });
          }

          // Other errors
          return res.json({
            success: false,
            error: error.message || 'Execution error',
            stdout: stdout || '',
            stderr: stderr || error.message,
          });
        }

        // Success
        res.json({
          success: true,
          stdout: stdout || '',
          stderr: stderr || '',
        });
      }
    );
  } catch (error) {
    // Clean up if write failed
    try {
      fs.unlinkSync(tempFile);
    } catch (e) {
      console.error('Failed to delete temp file:', e);
    }

    res.status(500).json({
      success: false,
      error: error.message || 'Server error',
    });
  }
});

/**
 * Run task tests with modified code (2-Stage: Syntax Check -> Pytest)
 * POST /api/run-task
 */
app.post('/api/run-task', (req, res) => {
  const { taskCode, testCode, taskFilename = 'task1_bug.py', timeout = 10000 } = req.body;

  if (!taskCode || !testCode) {
    return res
      .status(400)
      .json({ success: false, error: 'Both taskCode and testCode are required' });
  }

  const tempSubdir = path.join(tempDir, `run_${Date.now()}`);

  try {
    if (!fs.existsSync(tempSubdir)) {
      fs.mkdirSync(tempSubdir, { recursive: true });
    }

    const taskFile = path.join(tempSubdir, taskFilename);
    fs.writeFileSync(taskFile, taskCode);

    const testFile = path.join(tempSubdir, 'test_task.py');
    fs.writeFileSync(testFile, testCode);

    // stage 1: syntax check
    execFile(
      pythonExecutable,
      ['-m', 'py_compile', taskFile],
      { cwd: tempSubdir },
      (syntaxErr, syntaxStdout, syntaxStderr) => {
        // if syntax error, return immediately without running tests
        if (syntaxErr) {
          try {
            fs.rmSync(tempSubdir, { recursive: true });
          } catch (e) {}

          return res.json({
            success: false,
            error: 'Syntax Error',
            // Python writes syntax errors to stderr
            stderr: syntaxStderr || syntaxErr.message,
          });
        }

        // stage 2: pytest
        execFile(
          pytestExecutable,
          [testFile, '-v', '--tb=no'],
          { timeout, maxBuffer: 10 * 1024 * 1024, cwd: tempSubdir },
          (testErr, testStdout, testStderr) => {
            try {
              fs.rmSync(tempSubdir, { recursive: true });
            } catch (e) {}

            if (testErr) {
              if (testErr.killed) {
                return res.json({ success: false, error: `Test timeout (exceeded ${timeout}ms)` });
              }
              if (testErr.code === 1) {
                return res.json({ success: false, testsFailed: true, stdout: testStdout });
              }
              return res.json({
                success: false,
                error: 'Test execution error',
                stderr: testStderr || testErr.message,
              });
            }

            res.json({ success: true, stdout: testStdout });
          }
        );
      }
    );
  } catch (error) {
    try {
      fs.rmSync(tempSubdir, { recursive: true });
    } catch (e) {}
    res.status(500).json({ success: false, error: error.message || 'Server error' });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'SolverTutor server is running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`SolverTutor Backend Server running on http://localhost:${PORT}`);
});
