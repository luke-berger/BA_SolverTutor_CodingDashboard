import React, { useState } from 'react';
import pythonIcon from '../../assets/python-icon.png';
import { Play, RotateCcw } from 'lucide-react';
import ResetModal from '../modals/ResetModal';
import SuccessModal from '../modals/SuccessModal';

interface EditorHeaderProps {
  filename: string;
  onRun?: () => void;
  onReset?: () => void;
  isLoading?: boolean;
  showSuccess?: boolean;
}

const EditorHeader: React.FC<EditorHeaderProps> = ({
  filename,
  onRun,
  onReset,
  isLoading = false,
  showSuccess,
}) => {
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const handleConfirmReset = () => {
    if (onReset) onReset();
    setShowResetConfirm(false);
  };

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

        {/* ResetModal wrapper*/}
        <div className="relative flex items-center">
          <button
            type="button"
            onClick={() => setShowResetConfirm(true)}
            aria-label="Reset code"
            className="flex h-9 w-9 items-center justify-center rounded-md hover:brightness-50"
          >
            <RotateCcw size={24} strokeWidth={3} />
          </button>

          <ResetModal
            isOpen={showResetConfirm}
            onCancel={() => setShowResetConfirm(false)}
            onConfirm={handleConfirmReset}
          />
        </div>
        {/* SuccessModal wrapper */}
        <div className="">
          <SuccessModal isOpen={showSuccess || false} onConfirm={() => showSuccess} />
          {/* // onConfirm
          will later be used to switch to the survey page. */}
        </div>
      </div>
    </div>
  );
};

export default EditorHeader;
