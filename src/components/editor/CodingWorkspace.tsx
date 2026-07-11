import React, { useEffect } from 'react';
import EditorHeader from './EditorHeader';
import CodeEditor from './CodeEditor';
import Terminal from './Terminal';
import { useCodeExecution } from '../../hooks/useCodeExecution';

interface CodingWorkspaceProps {
  theme: string;
  onCodeChange: (code: string) => void;
  taskId: number;
  surveyId?: string;
}

const CodingWorkspace: React.FC<CodingWorkspaceProps> = ({
  theme,
  onCodeChange,
  taskId,
  surveyId,
}) => {
  const { code, setCode, output, isLoading, handleRun, handleReset, showSuccess, filename } =
    useCodeExecution(taskId);

  useEffect(() => {
    if (code) {
      onCodeChange(code);
    }
  }, [code, onCodeChange]);

  const handleEditorChange = (value: string | undefined) => {
    const newCode = value || '';
    setCode(newCode);
    onCodeChange(newCode);
  };

  return (
    <div className="flex min-h-0 min-w-0 flex-1 flex-col">
      <EditorHeader
        filename={filename}
        onRun={handleRun}
        onReset={handleReset}
        isLoading={isLoading}
        showSuccess={showSuccess}
        surveyId={surveyId}
        taskId={taskId}
      />
      <CodeEditor theme={theme} code={code} onChange={handleEditorChange} />
      <Terminal output={output} />
    </div>
  );
};

export default CodingWorkspace;
