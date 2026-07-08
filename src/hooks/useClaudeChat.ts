import { useEffect, useState } from 'react';
import type { ExperimentGroup } from './useExperimentGroup';
import { useTelemetry } from './useTelemetry';
import { sendChatMessage } from '../services/aiClient';

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  codeSnapshot?: string;
}

// hook to manage chat state and interactions with the AI backend
export const useClaudeChat = (group: ExperimentGroup, currentCode: string) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { incrementAiMessage, updateChatHistory } = useTelemetry();

  useEffect(() => {
    updateChatHistory(
      messages.map((msg) => ({
        role: msg.role,
        content: msg.content,
        codeSnapshot: msg.codeSnapshot,
      }))
    );
  }, [messages, updateChatHistory]);

  // async because we need to wait for the backend response
  const sendMessage = async () => {
    if (!input.trim()) return;

    incrementAiMessage();

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      codeSnapshot: currentCode,
    };

    // sliding window of the last 8 messages to keep context for the AI
    const MAX_HISTORY = 12;
    const recentMessages = [...messages, userMessage].slice(-MAX_HISTORY);

    // previous history for API-payload
    const apiMessages = recentMessages.map((msg) => {
      let apiContent = msg.content;

      // Attach code snapshot on user message
      if (msg.role === 'user' && msg.id === userMessage.id && msg.codeSnapshot) {
        // number the code so claude does not have problems with counting code lines and referring to a wrong line number
        const numberedCode = msg.codeSnapshot
          .split('\n')
          .map((line, index) => `${index + 1} | ${line}`)
          .join('\n');

        apiContent = `${msg.content}\n\n[CURRENT CODE SNAPSHOT]:\n${numberedCode}`;
      }

      return {
        role: msg.role,
        content: apiContent,
      };
    });

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await sendChatMessage(apiMessages, group, currentCode);

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
