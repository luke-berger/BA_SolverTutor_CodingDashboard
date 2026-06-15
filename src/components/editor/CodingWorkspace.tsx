import React, { useState } from 'react';
import EditorTab from './EditorHeader';
import CodeEditor from './CodeEditor';
import Terminal from './Terminal';
import { runTaskTests } from '../../services/codeExecution';

import initialBugCode from '../../data/programs/task_I_bug.py?raw';
import backgroundTestCode from '../../data/testcases/task_I_test.py?raw';

interface CodingWorkspaceProps {
  theme: string;
}

// Cleans up messy pytest output and temp folder paths
const sanitizeOutput = (text: string) => {
  if (!text) return '';
  let clean = text;

  // Strip absolute paths, keep only filenames
  clean = clean.replace(/[^\s]*test_task\.py/g, 'test_task.py');
  clean = clean.replace(/[^\s]*task_I_bug\.py/g, 'task_I_bug.py');

  // Remove pytest header clutter
  clean = clean.replace(/platform.*\n/g, '');
  clean = clean.replace(/cachedir:.*\n/g, '');
  clean = clean.replace(/rootdir:.*\n/g, '');
  clean = clean.replace(/plugins:.*\n/g, '');

  // Remove "short test summary info" block
  clean = clean.replace(/={2,} short test summary info ={2,}\n([\s\S]*?)(?=={2,})/g, '');

  return clean.trim();
};

const CodingWorkspace: React.FC<CodingWorkspaceProps> = ({ theme }) => {
  const [code, setCode] = useState(initialBugCode);
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleRun = async () => {
    setIsLoading(true);
    setOutput('Running tests...\n');

    try {
      const response = await runTaskTests(code, backgroundTestCode, 'task_I_bug.py', 10000);

      let rawOutput = '';
      if (response.success) {
        rawOutput = response.stdout || 'All tests passed!';
      } else if (response.testsFailed) {
        rawOutput = response.stdout || `Error: ${response.error}`;
      } else {
        rawOutput = `Error: ${response.error}\n${response.stderr || response.stdout || ''}`;
      }

      // Pass the raw text through our filter before displaying
      setOutput(sanitizeOutput(rawOutput));
    } catch (error) {
      console.error('Backend connection error:', error);
      setOutput('Connection to server failed. Is server.js running?');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex w-2/3 flex-col">
      <EditorTab filename="task_I_bug.py" onRun={handleRun} isLoading={isLoading} />
      <CodeEditor theme={theme} code={code} onChange={setCode} />
      <Terminal output={output} />
    </div>
  );
};

export default CodingWorkspace;
