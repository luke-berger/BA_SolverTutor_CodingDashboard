import React, { useRef, useEffect } from 'react';
import { CornerDownLeft, Square } from 'lucide-react';
import ClaudeIcon from '../../assets/claude-icon.png';
import { useClaudeChat } from '../../hooks/useClaudeChat';
import { TypingMarkdown } from './TypingMarkdown';
import { useAutoResize } from '../../hooks/useAutoResize';
import type { ExperimentGroup } from '../../hooks/useExperimentGroup';

interface AiChatProps {
  group: ExperimentGroup;
  currentCode: string;
}

const AiChat: React.FC<AiChatProps> = ({ group, currentCode }) => {
  const { messages, input, setInput, isLoading, sendMessage } = useClaudeChat(group, currentCode);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // bind auto-resize functionality to the textarea ref
  useAutoResize(textareaRef, input);

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
    <div className="bg-bgI flex w-1/3 flex-col border-l border-[#3E3E42]">
      {/* Chat Header */}
      <div className="text-text flex shrink-0 items-center px-4 py-2 text-sm font-semibold">
        <div className="flex flex-col">
          <div className="flex items-center">
            <img src={ClaudeIcon} alt="AI Icon" className="mr-2 h-7 w-7" />
            <span className="font-serif text-2xl font-bold">Claude</span>
          </div>
          <span className="text-text pt-3 text-sm font-bold uppercase underline decoration-gray-600 decoration-2 underline-offset-6">
            CHAT
          </span>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex flex-1 flex-col gap-3 overflow-y-auto px-4 pt-4">
        {messages.length === 0 ? (
          <div className="text-text flex h-full items-center justify-center text-sm opacity-50"></div>
        ) : (
          messages.map((message, index) => {
            const isLastMessage = index === messages.length - 1;
            const shouldAnimate = message.role === 'assistant' && isLastMessage;

            return (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`rounded-lg px-3 py-2 text-[clamp(14px,1vw,18px)] ${
                    message.role === 'user'
                      ? 'text-text bg-chat-bg max-w-[80%]'
                      : 'text-text max-w-full bg-transparent'
                  }`}
                >
                  {message.role === 'user' ? (
                    <p>{message.content}</p>
                  ) : (
                    // animate assistant messages using TypingMarkdown
                    <TypingMarkdown content={message.content} isTyping={shouldAnimate} />
                  )}
                </div>
              </div>
            );
          })
        )}
        {/* Loading indicator */}
        {isLoading && (
          <div className="flex justify-start">
            <div className="text-text rounded-lg bg-transparent px-3 py-2 text-2xl font-bold">
              <span className="inline-block animate-pulse">.</span>
              <span className="ml-1 inline-block animate-pulse" style={{ animationDelay: '0.2s' }}>
                .
              </span>
              <span className="ml-1 inline-block animate-pulse" style={{ animationDelay: '0.4s' }}>
                .
              </span>
            </div>
          </div>
        )}
        {/* Scroll anchor */}
        <div ref={messagesEndRef} />
      </div>

      {/* Chat Input */}
      <div className="px-4 pb-4">
        {/* Container for textarea and toolbar */}
        <div className="bg-highlight flex flex-col rounded-lg border-2 border-transparent transition-colors duration-200 focus-within:border-[#7A807A]">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isLoading}
            placeholder="Ask Claude a question..."
            rows={1}
            className="text-text placeholder-text/50 max-h-40 w-full resize-none overflow-y-auto bg-transparent px-3 pt-3 pb-1 text-[clamp(14px,1vw-8px,18px)] focus:outline-none disabled:opacity-50"
          />

          {/* Tool Bar */}
          <div className="flex items-center justify-between px-2 pt-1 pb-1.5">
            {/* Left side: Model name */}
            <div className="text-text/40 px-2 font-mono text-[11px]"> Claude Haiku 4.5</div>

            {/* Right side: visual indicator for status or visual hint to press enter */}
            <div
              className={`flex items-center justify-center p-1 ${
                isLoading ? 'text-text/60 animate-pulse' : 'text-text/30'
              }`}
              title={isLoading ? 'Generating...' : 'Press Enter to send'}
            >
              {isLoading ? (
                <Square className="h-3 w-3" fill="currentColor" strokeWidth={0} />
              ) : (
                <CornerDownLeft className="h-4 w-4" />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiChat;
