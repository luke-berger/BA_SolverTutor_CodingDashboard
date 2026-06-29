import React, { useEffect } from 'react';
import EditorHeader from './EditorHeader';
import CodeEditor from './CodeEditor';
import Terminal from './Terminal';
import { useCodeExecution } from '../../hooks/useCodeExecution';

interface CodingWorkspaceProps {
  theme: string;
  onCodeChange: (code: string) => void;
}

const CodingWorkspace: React.FC<CodingWorkspaceProps> = ({ theme, onCodeChange }) => {
  const { code, setCode, output, isLoading, handleRun, handleReset, showSuccess } =
    useCodeExecution();

  useEffect(() => {
    if (code) {
      onCodeChange(code);
    }
  }, []);

  const handleEditorChange = (value: string | undefined) => {
    const newCode = value || '';
    setCode(newCode);
    onCodeChange(newCode);
  };

  return (
    <div className="flex flex-1 flex-col">
      <EditorHeader
        filename="task_I_bug.py"
        onRun={handleRun}
        onReset={handleReset}
        isLoading={isLoading}
        showSuccess={showSuccess}
      />
      <CodeEditor theme={theme} code={code} onChange={handleEditorChange} />
      <Terminal output={output} />
    </div>
  );
};

export default CodingWorkspace;
