import React from 'react';

interface SuccessModalProps {
  isOpen: boolean;
  onConfirm: () => void;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ isOpen, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center gap-10 bg-black/60">
      <div className="border-monokai-highlight bg-monokai-bgI z-60 mt-2 flex h-100 w-200 flex-col items-center justify-center gap-2 rounded-2xl border-4 p-5 shadow-2xl">
        <p className="mb-4 text-center text-2xl leading-relaxed font-medium text-[#76EF84]">
          You successfully fixed the bug in the system!
        </p>

        <div className="">
          <button
            onClick={onConfirm}
            className="text-monokai-text hover:text-monokai-text/80 hover:bg-monokai-bgII/80 bg-monokai-bgII border-monokai-highlight cursor-pointer rounded-2xl border-3 px-30 py-2 font-bold transition-transform"
          >
            Proceed to survey
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
