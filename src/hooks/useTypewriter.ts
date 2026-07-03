import { useState, useEffect } from 'react';

// hook for typewriter animation effect
export const useTypewriter = (
  content: string,
  isTyping: boolean,
  speedMs = 8,
  charsPerTick = 5
) => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    // do nothing if animation is disabled
    if (!isTyping) return;

    let i = 0;
    // interval to gradually reveal text
    const interval = setInterval(() => {
      setDisplayedText(content.slice(0, i));
      i += charsPerTick;

      // clean up interval when content is fully revealed
      if (i >= content.length) {
        setDisplayedText(content);
        clearInterval(interval);
      }
    }, speedMs);

    return () => clearInterval(interval);
  }, [content, isTyping, speedMs, charsPerTick]);

  // Return animated text or full content based on typing state
  return isTyping ? displayedText : content;
};
