import React from 'react';
import pythonIcon from '../../assets/python-icon.png';
import { Play, RotateCcw } from 'lucide-react';

interface EditorHeaderProps {
  filename: string;
  onRun?: () => void;
  isLoading?: boolean;
}

const EditorHeader: React.FC<EditorHeaderProps> = ({ filename, onRun, isLoading = false }) => {
  return (
    <div className="bg-monokai-bgI text-monokai-text flex shrink-0 items-center justify-between py-2 pr-2 pl-4 text-lg">
      <div className="flex items-center gap-2">
        <img src={pythonIcon} alt="Python Icon" className="h-7 w-7" />
        <span className="text-2xl font-bold">{filename}</span>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onRun}
          disabled={isLoading}
          aria-label="Run program"
          className="flex h-9 w-9 items-center justify-center rounded-md hover:brightness-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Play size={22} fill="currentColor" />
        </button>

        <button
          type="button"
          onClick={() => alert('Reset code functionality not implemented yet')}
          aria-label="Reset code"
          className="flex h-9 w-9 items-center justify-center rounded-md hover:brightness-50"
        >
          <RotateCcw size={24} strokeWidth={3} />
        </button>
      </div>
    </div>
  );
};

export default EditorHeader;
