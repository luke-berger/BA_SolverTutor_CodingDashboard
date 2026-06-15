import React, { useRef, useEffect } from 'react';
import ClaudeIcon from '../../assets/claude-icon.png';
import { useClaudeChat } from '../../hooks/useClaudeChat';

const AiChat: React.FC = () => {
  const { messages, input, setInput, isLoading, sendMessage } = useClaudeChat();

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
      textareaRef.current?.blur();
    }
  };

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
      <div className="flex flex-1 flex-col gap-3 overflow-y-auto px-4 pt-4">
        {messages.length === 0 ? (
          <div className="text-monokai-text flex h-full items-center justify-center text-sm opacity-50"></div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs rounded-lg px-3 py-2 text-sm ${
                  message.role === 'user' ? 'text-monokai-text' : 'text-monokai-text'
                }`}
                style={
                  message.role === 'user'
                    ? { backgroundColor: '#2F312F' }
                    : { backgroundColor: 'transparent' }
                }
              >
                {message.content}
              </div>
            </div>
          ))
        )}
        {isLoading && (
          <div className="flex justify-start">
            <div
              className="text-monokai-text rounded-lg px-3 py-2 text-2xl font-bold"
              style={{ backgroundColor: 'transparent' }}
            >
              <span className="inline-block animate-pulse">.</span>
              <span className="ml-1 inline-block animate-pulse">.</span>
              <span className="ml-1 inline-block animate-pulse">.</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Chat Input */}
      <div className="px-4 pb-4">
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={isLoading}
          placeholder="Ask Claude a question..."
          className="text-monokai-text placeholder-monokai-text/50 w-full resize-none rounded-lg px-3 py-2 text-sm focus:outline-none disabled:opacity-50"
          style={{
            backgroundColor: '#414338',
            boxShadow: 'none',
            border: '2px solid transparent',
            transition: 'border-color 0.2s',
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = '#7A807A';
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = 'transparent';
          }}
          rows={8}
        />
      </div>
    </div>
  );
};

export default AiChat;
