import React from 'react';

interface EditorHeaderProps {
  filename: string;
}

const EditorHeader: React.FC<EditorHeaderProps> = ({ filename }) => {
  return (
    <div className="flex h-10 shrink-0 items-center border-b border-gray-800 bg-[#252526] px-4 text-sm text-gray-400">
      <span className="mr-2 text-yellow-400">-</span>
      <span>{filename}</span>
    </div>
  );
};

export default EditorHeader;
