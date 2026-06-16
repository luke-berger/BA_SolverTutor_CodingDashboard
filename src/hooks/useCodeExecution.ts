import { useState } from 'react';
import { runTaskTests } from '../services/codeExecution';
import initialBugCode from '../data/programs/task_I_bug.py?raw';
import backgroundTestCode from '../data/testcases/task_I_test.py?raw';

const sanitizeOutput = (text: string) => {
  if (!text) return '';
  let clean = text;

  clean = clean.replace(/[^\s]*test_task\.py/g, 'test_task.py');
  clean = clean.replace(/[^\s]*task_I_bug\.py/g, 'task_I_bug.py');
  clean = clean.replace(/platform.*\n/g, '');
  clean = clean.replace(/cachedir:.*\n/g, '');
  clean = clean.replace(/rootdir:.*\n/g, '');
  clean = clean.replace(/plugins:.*\n/g, '');
  clean = clean.replace(/={2,} short test summary info ={2,}\n([\s\S]*?)(?=={2,})/g, '');

  return clean.trim();
};

export const useCodeExecution = () => {
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

      setOutput(sanitizeOutput(rawOutput));
    } catch (error) {
      console.error('Backend connection error:', error);
      setOutput('Connection to server failed. Is server.js running?');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setCode(initialBugCode);
    setOutput('Code has been reset to initial state.');
  };

  return { code, setCode, output, isLoading, handleRun, handleReset };
};
