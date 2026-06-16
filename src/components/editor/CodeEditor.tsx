import React from 'react';
import Editor from '@monaco-editor/react';
import { MONOKAI_THEME, registerMonacoThemes } from './monacoThemes';

interface CodeEditorProps {
  theme?: string;
  code?: string;
  onChange?: (code: string) => void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ theme = MONOKAI_THEME, code = '', onChange }) => {
  return (
    <div className="bg-monokai-bgII flex flex-1 flex-col pt-2">
      <Editor
        height="100%"
        defaultLanguage="python"
        value={code}
        onChange={(value) => onChange?.(value || '')}
        beforeMount={registerMonacoThemes}
        theme={theme}
        options={{
          minimap: { enabled: true },
          fontSize: 14,
          fontFamily: 'Fira Code, monospace',
        }}
      />
    </div>
  );
};

export default CodeEditor;
