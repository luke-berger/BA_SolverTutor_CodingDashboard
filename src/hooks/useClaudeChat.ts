import { useState } from 'react';
import type { ExperimentGroup } from './useExperimentGroup';
import { useTelemetry } from './useTelemetry';
import { sendChatMessage } from '../services/aiClient';

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

export const useClaudeChat = (group: ExperimentGroup) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { incrementAiMessage } = useTelemetry();

  // async because we need to wait for the backend response
  const sendMessage = async () => {
    if (!input.trim()) return;

    incrementAiMessage();

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
    };

    // previous history for API-payload
    const apiMessages = [...messages, userMessage].map((msg) => ({
      role: msg.role,
      content: msg.content,
    }));

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await sendChatMessage(apiMessages, group);

      if (response.success && response.reply) {
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: response.reply,
        };
        setMessages((prev) => [...prev, aiMessage]);
      } else {
        console.error('Backend error: ', response.error);
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            role: 'assistant',
            content: 'Sorry an error occurred.',
          },
        ]);
      }
    } catch (error) {
      console.error('Chat Hook Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return { messages, input, setInput, isLoading, sendMessage };
};
