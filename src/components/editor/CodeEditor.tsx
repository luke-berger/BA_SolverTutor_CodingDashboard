import React, { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { MONOKAI_THEME, registerMonacoThemes } from '../themes/monacoThemes';

interface CodeEditorProps {
  theme?: string;
  code?: string;
  onChange?: (code: string) => void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ theme = MONOKAI_THEME, code = '', onChange }) => {
  // default font size for standard screens (16px)
  const [editorFontSize, setEditorFontSize] = useState(16);

  useEffect(() => {
    // function to calculate the font size based on screen width
    const updateFontSize = () => {
      const screenWidth = window.innerWidth;

      // rebuild CSS clamp (1.35vw - 20px)
      const calculatedSize = (screenWidth * 1.35) / 100 - 20;

      // set limits: Minimum 16px, Maximum 42px
      const finalSize = Math.max(16, Math.min(40, calculatedSize));

      // update the state with the new size
      setEditorFontSize(finalSize);
    };

    // run once when the component loads
    updateFontSize();

    // Update font size every time the user resizes the browser window
    window.addEventListener('resize', updateFontSize);

    // cleanup: remove listener when the component is destroyed
    return () => window.removeEventListener('resize', updateFontSize);
  }, []);

  return (
    <div className="bg-bgII flex flex-1 flex-col pt-2">
      <Editor
        height="100%"
        defaultLanguage="python"
        value={code}
        onChange={(value) => onChange?.(value || '')}
        beforeMount={registerMonacoThemes}
        theme={theme}
        options={{
          minimap: { enabled: true },
          fontFamily: 'Fira Code, monospace',
          fontSize: editorFontSize, // Use calculated size here
          mouseWheelZoom: true, // Allow zooming with Ctrl + MouseWheel
        }}
      />
    </div>
  );
};

export default CodeEditor;
