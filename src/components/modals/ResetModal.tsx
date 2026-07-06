import React from 'react';
import { X, Check } from 'lucide-react';

interface ResetModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const ResetModal: React.FC<ResetModalProps> = ({ isOpen, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="border-highlight bg-bgI absolute top-full right-1.5 z-50 mt-2 w-72 rounded-tl-2xl rounded-br-2xl rounded-bl-2xl border-3 p-5 shadow-2xl">
      <p className="text-text mb-4 text-center text-sm leading-relaxed font-medium">
        This will reset the code to its initial state.
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

export default ResetModal;
