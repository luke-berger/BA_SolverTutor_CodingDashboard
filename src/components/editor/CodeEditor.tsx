import React, { useState } from 'react';
import Editor from '@monaco-editor/react';

const CodeEditor: React.FC = () => {
  const [code, setCode] = useState('# Write your code here\nprint("Hello, World!")');

  return (
    <div className="flex flex-1 flex-col bg-[#1e1e1e] pt-2">
      <Editor
        height="100%"
        defaultLanguage="python"
        value={code}
        onChange={(value) => setCode(value || '')}
        theme="vs-dark"
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          fontFamily: 'Fira Code, monospace',
        }}
      />
    </div>
  );
};

export default CodeEditor;
