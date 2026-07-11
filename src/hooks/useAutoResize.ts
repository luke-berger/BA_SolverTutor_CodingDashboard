import { useEffect } from 'react';
import type { RefObject } from 'react';

const MAX_TEXTAREA_HEIGHT = 160;

// hook to automatically adjust textarea height based on content
export const useAutoResize = (
  textareaRef: RefObject<HTMLTextAreaElement | null>,
  value: string
) => {
  useEffect(() => {
    const textarea = textareaRef.current;

    if (!textarea) return;

    const resizeTextarea = () => {
      textarea.style.height = 'auto';

      const computedStyle = window.getComputedStyle(textarea);
      const lineHeight =
        Number.parseFloat(computedStyle.lineHeight) ||
        Number.parseFloat(computedStyle.fontSize) * 1.2;
      const nextHeight = Math.min(textarea.scrollHeight, MAX_TEXTAREA_HEIGHT);

      textarea.style.height = `${Math.max(nextHeight, lineHeight)}px`;
      textarea.style.overflowY = nextHeight >= MAX_TEXTAREA_HEIGHT ? 'auto' : 'hidden';
    };

    resizeTextarea();
    window.addEventListener('resize', resizeTextarea);

    return () => window.removeEventListener('resize', resizeTextarea);
  }, [value, textareaRef]);
};
