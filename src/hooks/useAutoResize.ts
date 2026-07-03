import { useEffect } from 'react';
import type { RefObject } from 'react';

// hook to automatically adjust textarea height based on content
export const useAutoResize = (
  textareaRef: RefObject<HTMLTextAreaElement | null>,
  value: string
) => {
  useEffect(() => {
    // reset height and adjust based on scroll height
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [value, textareaRef]);
};
