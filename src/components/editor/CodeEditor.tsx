import React from 'react';

const CodeEditor: React.FC = () => {
  return (
    <div className="flex flex-1 flex-col bg-[#1e1e1e] p-4">
      {/* Das ist die Box, in die später <Editor /> von Monaco reinkommt */}
      <div className="flex h-full items-center justify-center rounded border-2 border-dashed border-gray-700 bg-gray-800/30 text-gray-500">
        [ Monaco Editor Area ]
      </div>
    </div>
  );
};

export default CodeEditor;
