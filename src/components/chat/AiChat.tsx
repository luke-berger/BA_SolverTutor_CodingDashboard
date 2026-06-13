import React from 'react';
import ClaudeIcon from '../../assets/claude-icon.png';

const AiChat: React.FC = () => {
  return (
    <div className="flex w-1/3 flex-col bg-[#252526]">
      {/* Chat Header */}
      <div className="flex h-10 shrink-0 items-center border-b border-gray-800 px-4 py-4 text-sm font-semibold text-gray-300">
        <img src={ClaudeIcon} alt="AI Icon" className="mr-2 h-6 w-6" />
        <span className="font-serif text-lg font-bold">Claude</span>
      </div>

      {/* Chat Messages */}
      <div className="flex flex-1 flex-col p-4">
        <div className="flex h-full items-center justify-center rounded border-2 border-dashed border-gray-700 bg-gray-800/30 text-gray-500">
          [ Chat Message History ]
        </div>
      </div>

      {/* Chat Input */}
      <div className="border-t border-gray-800 p-4">
        <div className="flex h-12 items-center justify-center rounded border-2 border-dashed border-gray-700 text-sm text-gray-500">
          [ Input Field Placeholder ]
        </div>
      </div>
    </div>
  );
};

export default AiChat;
