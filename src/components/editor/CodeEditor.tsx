import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import { MONOKAI_THEME, registerMonacoThemes } from './monacoThemes';

const CodeEditor: React.FC = () => {
  const [code, setCode] = useState('# Write your code here\nprint("Hello, World!")');

  return (
    <div className="bg-monokai-bgII flex flex-1 flex-col pt-2">
      <Editor
        height="100%"
        defaultLanguage="python"
        value={code}
        onChange={(value) => setCode(value || '')}
        beforeMount={registerMonacoThemes}
        theme={MONOKAI_THEME}
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
