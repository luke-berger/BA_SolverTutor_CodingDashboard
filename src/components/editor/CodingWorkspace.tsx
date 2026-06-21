import React from 'react';
import EditorHeader from './EditorHeader';
import CodeEditor from './CodeEditor';
import Terminal from './Terminal';
import { useCodeExecution } from '../../hooks/useCodeExecution';

interface CodingWorkspaceProps {
  theme: string;
  group: string;
}

const CodingWorkspace: React.FC<CodingWorkspaceProps> = ({ theme, group }) => {
  const { code, setCode, output, isLoading, handleRun, handleReset, showSuccess } =
    useCodeExecution();

  return (
    <div className="flex w-2/3 flex-col">
      <EditorHeader
        filename="task_I_bug.py"
        onRun={handleRun}
        onReset={handleReset}
        isLoading={isLoading}
        showSuccess={showSuccess}
        group={group}
        taskId={1}
      />
      <CodeEditor theme={theme} code={code} onChange={setCode} />
      <Terminal output={output} />
    </div>
  );
};

export default CodingWorkspace;
