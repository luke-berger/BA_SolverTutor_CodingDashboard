import React from 'react';

interface SuccessModalProps {
  isOpen: boolean;
  onConfirm: () => void;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ isOpen, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="border-monokai-highlight bg-monokai-bgI absolute top-full z-60 mt-2 w-72 rounded-tl-2xl rounded-br-2xl rounded-bl-2xl border-3 p-5 shadow-2xl">
      <p className="text-monokai-text mb-4 text-center text-sm leading-relaxed font-medium">
        Success!
      </p>

      <div className="flex justify-center gap-8">
        <button
          onClick={onConfirm}
          className="text-monokai-text hover:text-monokai-text/80 cursor-pointer transition-transform"
        ></button>
      </div>
    </div>
  );
};

export default SuccessModal;
