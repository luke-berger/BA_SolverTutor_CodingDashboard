import React from 'react';
import pythonIcon from '../../assets/python-icon.png';

interface EditorHeaderProps {
  filename: string;
}

const EditorHeader: React.FC<EditorHeaderProps> = ({ filename }) => {
  return (
    <div className="flex h-12 shrink-0 items-center bg-[#1F201F] px-4 text-lg text-[#DEDEDE]">
      <img src={pythonIcon} alt="Python Icon" className="mr-2 h-5 w-5" />
      <span className="font-bold">{filename}</span>
    </div>
  );
};

export default EditorHeader;
