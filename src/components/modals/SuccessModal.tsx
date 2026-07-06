import React from 'react';

interface SuccessModalProps {
  isOpen: boolean;
  onConfirm: () => void;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ isOpen, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center gap-10 bg-black/60">
      <div className="border-highlight bg-bgI z-60 mt-2 flex h-100 w-200 flex-col items-center justify-center gap-2 rounded-2xl border-4 p-5 shadow-2xl">
        <p className="mb-4 text-center text-2xl leading-relaxed font-medium text-[#76EF84]">
          You successfully fixed the bug in the system!
        </p>

        <div className="">
          <button
            onClick={onConfirm}
            className="text-text hover:text-text/80 hover:bg-bgII/80 bg-bgII border-highlight cursor-pointer rounded-2xl border-3 px-30 py-2 font-bold transition-transform"
          >
            Proceed to survey
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
