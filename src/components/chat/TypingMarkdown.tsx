import React from 'react';
import ReactMarkdown from 'react-markdown';
import { useTypewriter } from '../../hooks/useTypewriter';

interface TypingMarkdownProps {
  content: string;
  isTyping: boolean;
}

// animates using the useTypewriter hook and renders the animated text as Markdown using ReactMarkdown
export const TypingMarkdown: React.FC<TypingMarkdownProps> = ({ content, isTyping }) => {
  // get the animated text from the hook
  const displayText = useTypewriter(content, isTyping);

  return (
    <ReactMarkdown
      components={{
        // paragraph styling
        p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
        // bold text styling
        strong: ({ children }) => <strong className="font-bold text-white">{children}</strong>,
        // Code block and inline code styling
        code: ({ children, className, ...rest }) => {
          const match = /language-(\w+)/.exec(className || '');
          const isInline = !match && !className;

          return isInline ? (
            <code
              className="text-monokai-text rounded bg-gray-800 px-1.5 py-0.5 font-mono text-[0.9em]"
              {...rest}
            >
              {children}
            </code>
          ) : (
            <pre className="border-monokai-highlight bg-monokai-bgII my-3 overflow-x-auto rounded border p-3 font-mono text-[0.85em] text-gray-200">
              <code className={className} {...rest}>
                {children}
              </code>
            </pre>
          );
        },
      }}
    >
      {displayText}
    </ReactMarkdown>
  );
};
