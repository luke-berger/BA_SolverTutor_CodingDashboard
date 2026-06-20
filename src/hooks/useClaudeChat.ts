import { useState } from 'react';
import type { ExperimentGroup } from './useExperimentGroup';

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}
export const useClaudeChat = (group: ExperimentGroup) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate AI response with delay
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',

        // placeholder content based on group
        content: group === 'tutor' ? '[Tutor placeholder]' : '[Solver placeholder]',
      };

      setMessages((prev) => [...prev, aiMessage]);
      setIsLoading(false);
    }, 800);
  };

  return { messages, input, setInput, isLoading, sendMessage };
};
