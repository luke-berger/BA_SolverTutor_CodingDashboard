import React from 'react';
import { AlertTriangle, Check, X } from 'lucide-react';

interface SkipModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const SkipModal: React.FC<SkipModalProps> = ({ isOpen, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="bg-bgI absolute top-full right-1.5 z-50 mt-2 w-80 rounded-tl-2xl rounded-br-2xl rounded-bl-2xl border-3 border-orange-400 p-5 shadow-2xl">
      <div className="mb-3 flex justify-center text-orange-400">
        <AlertTriangle className="h-7 w-7" />
      </div>
      <p className="text-text mb-4 text-center text-sm leading-relaxed font-medium">
        Attention! If you press this button, you skip the task.
        <br />
        Only proceed if you are not able to finish the task.
        <br />
        Do you want to proceed?
      </p>
      <div className="flex justify-center gap-8">
        <button
          onClick={onCancel}
          className="cursor-pointer text-red-400 transition-transform hover:scale-110 hover:text-red-200"
        >
          <X className="h-6.5 w-6.5" />
        </button>
        <button
          onClick={onConfirm}
          className="cursor-pointer text-green-400 transition-transform hover:scale-110 hover:text-green-200"
        >
          <Check className="h-6.5 w-6.5" />
        </button>
      </div>
    </div>
  );
};

export default SkipModal;
