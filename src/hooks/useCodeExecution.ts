import { useState } from 'react';
import { runTaskTests } from '../services/codeExecution';
import task1Code from '../data/programs/task1_character_creation.py?raw';
import task1Test from '../data/testcases/task1_test_character_creation.py?raw';
import task2Code from '../data/programs/task2_library_system.py?raw';
import task2Test from '../data/testcases/task2_test_library_system.py?raw';

type TaskData = {
  code: string;
  test: string;
  filename: string;
};

// lexical structure to hold task-specific data
const TASK_DATA: Record<number, TaskData> = {
  1: { code: task1Code, test: task1Test, filename: 'character_creation.py' },
  2: { code: task2Code, test: task2Test, filename: 'library_system.py' },
};

// sanitize output to remove unnecessary details and make it more user-friendly
const sanitizeOutput = (text: string) => {
  if (!text) return '';
  let clean = text;

  // clean tests
  clean = clean.replace(/[^\s]*\.py::/g, '• ');

  clean = clean.replace(/[^\s]*character_creation\.py:/g, 'character_creation.py:');
  clean = clean.replace(/[^\s]*library_system\.py:/g, 'library_system.py:');

  // clean syntax and name errors
  clean = clean.replace(/File "[^"]*\/([^/]+\.py)"/g, 'File "$1"');
  clean = clean.replace(/ *File "<string>".*\n/g, '');

  clean = clean.replace(/platform.*\n/g, '');
  clean = clean.replace(/cachedir:.*\n/g, '');
  clean = clean.replace(/rootdir:.*\n/g, '');
  clean = clean.replace(/plugins:.*\n/g, '');
  clean = clean.replace(/={2,} short test summary info ={2,}\n([\s\S]*?)(?=={2,})/g, '');

  return clean.trim();
};

// hook to manage code execution state and interactions with the backend
export const useCodeExecution = (taskId: number) => {
  const currentTask = TASK_DATA[taskId];

  const [code, setCode] = useState(currentTask.code);
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleRun = async () => {
    setIsLoading(true);
    setOutput('Running tests...\n');

    try {
      const response = await runTaskTests(code, currentTask.test, currentTask.filename, 10000);

      let rawOutput = '';
      if (response.success) {
        rawOutput = response.stdout || 'All tests passed!';
        setTimeout(() => {
          setShowSuccess(true);
        }, 10);
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
    setCode(currentTask.code);
    setOutput('Code has been reset to initial state.');
  };

  return {
    code,
    setCode,
    output,
    isLoading,
    handleRun,
    handleReset,
    showSuccess,
    filename: currentTask.filename,
  };
};
