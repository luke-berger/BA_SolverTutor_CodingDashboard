import React from 'react';
import ClaudeIcon from '../../assets/claude-icon.png';

const AiChat: React.FC = () => {
  return (
    <div className="bg-monokai-bgI flex w-1/3 flex-col">
      {/* Chat Header */}
      <div className="text-monokai-text flex shrink-0 items-center px-4 py-2 text-sm font-semibold">
        <div className="flex flex-col">
          <div className="flex items-center">
            <img src={ClaudeIcon} alt="AI Icon" className="mr-2 h-7 w-7" />
            <span className="font-serif text-2xl font-bold">Claude</span>
          </div>
          <span className="text-monokai-text pt-3 text-sm font-bold underline decoration-gray-600 decoration-2 underline-offset-6">
            CHAT
          </span>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex flex-1 flex-col px-4 pt-1">
        <div className="bg-monokai-bgI text-monokai-text flex h-full items-center justify-center rounded border-2 border-dashed"></div>
      </div>

      {/* Chat Input */}
      <div className="px-4 pb-4">
        <div className="text-monokai-text bg-monokai-highlight flex h-42 items-center justify-center rounded-br-2xl rounded-bl-2xl text-sm">
          [ Chat Input Area ]
        </div>
      </div>
    </div>
  );
};

export default AiChat;
