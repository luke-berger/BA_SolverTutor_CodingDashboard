const API_BASE_URL = '/api';

export interface ChatResponse {
  success: boolean;
  reply: string;
  error?: string;
}

/**
 * Send messages to the backend chat API
 */
export async function sendChatMessage(
  messages: { role: string; content: string }[],
  group: string,
  currentCode?: string
): Promise<ChatResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ messages, group, currentCode }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    return {
      success: false,
      reply: '',
      error: `Failed to fetch chat: ${error instanceof Error ? error.message : 'Unknown error'}`,
    };
  }
}
