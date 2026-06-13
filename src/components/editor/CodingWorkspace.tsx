import React from 'react';
import EditorTab from './EditorHeader';
import CodeEditor from './CodeEditor';
import Terminal from './Terminal';

const CodingWorkspace: React.FC = () => {
  return (
    <div className="flex w-2/3 flex-col border-r border-gray-700">
      <EditorTab filename="Bug.py" />
      <CodeEditor />
      <Terminal />
    </div>
  );
};

export default CodingWorkspace;
