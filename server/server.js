const express = require('express');
const cors = require('cors');
const { execFile } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');

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
 * Run task tests with modified code
 * POST /api/run-task
 * Body: { taskCode: string, testCode: string, taskFilename: string, timeout?: number }
 */
app.post('/api/run-task', (req, res) => {
  const { taskCode, testCode, taskFilename = 'task1_bug.py', timeout = 10000 } = req.body;

  if (!taskCode || !testCode) {
    return res.status(400).json({
      success: false,
      error: 'Both taskCode and testCode are required',
    });
  }

  const tempSubdir = path.join(tempDir, `run_${Date.now()}`);

  try {
    // Create temp subdirectory for this run
    if (!fs.existsSync(tempSubdir)) {
      fs.mkdirSync(tempSubdir, { recursive: true });
    }

    // Write task code file
    const taskFile = path.join(tempSubdir, taskFilename);
    fs.writeFileSync(taskFile, taskCode);

    // Write test file
    const testFile = path.join(tempSubdir, 'test_task.py');
    fs.writeFileSync(testFile, testCode);

    // Run pytest with output
    execFile(
      pytestExecutable,
      [testFile, '-v', '--tb=no'], // Add --tb=no so output doesn't show hints about what the error is
      { timeout, maxBuffer: 10 * 1024 * 1024, cwd: tempSubdir },
      (error, stdout, stderr) => {
        // Clean up temp directory
        try {
          fs.rmSync(tempSubdir, { recursive: true });
        } catch (e) {
          console.error('Failed to delete temp directory:', e);
        }

        if (error) {
          if (error.killed) {
            return res.json({
              success: false,
              error: `Test timeout (exceeded ${timeout}ms)`,
              stdout: stdout || '',
              stderr: stderr || '',
            });
          }

          // Pytest exit code 1 =>tests failed but pytest ran successfully
          if (error.code === 1) {
            return res.json({
              success: false,
              testsFailed: true,
              stdout: stdout || '',
              stderr: stderr || '',
            });
          }

          return res.json({
            success: false,
            error: error.message || 'Test execution error',
            stdout: stdout || '',
            stderr: stderr || error.message,
          });
        }

        res.json({
          success: true,
          stdout: stdout || '',
          stderr: stderr || '',
        });
      }
    );
  } catch (error) {
    try {
      fs.rmSync(tempSubdir, { recursive: true });
    } catch (e) {
      console.error('Failed to delete temp directory:', e);
    }

    res.status(500).json({
      success: false,
      error: error.message || 'Server error',
    });
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
