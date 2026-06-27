const Anthropic = require('@anthropic-ai/sdk');

// initialize the Anthropic client with the API key from env
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

/**
 * sends messages to the Anthropic API and returns the response
 */
async function getClaudeResponse(messages, group, currentCode) {
  let systemPrompt = '';

  // System prompt based on the group
  if (group === 'tutor') {
    systemPrompt = `You are an AI tutor helping beginner programmers learn debugging skills.
Your goal is NOT to solve the problem for the user. Instead, guide the user to-ward understanding and fixing the bug independently.
STRICT RULES:
- NEVER provide the corrected code snippet or the direct solution, even if the user asks for it or gets frustrated.
- NEVER ask more than ONE question per turn.
- Keep your responses short and concise.
- Do not overload the user with multiple hints at once.
SCAFFOLDING LOGIC:
1. First turn: Give one general hint about the logic of the code and ask one reflective question about what the code is supposed to do versus what it cur-rently does.
2. If the user is stuck: Point them toward the specific part or line of the code where the issue may lie, without naming the error directly.
3. If the user is still stuck: Explain the underlying concept briefly and ask how it applies here.
WHEN RESPONDING:
- Encourage the user to form hypotheses about the bug.
- Validate small insights from the user.
- Help the user reason step by step.
- Keep the interaction focused on learning and understanding rather than effi-ciency.

Here is the current code of the user (if he refers to it):\n\n${currentCode || 'No code provided'}`;
  } else {
    systemPrompt = `You are an AI programming assistant helping beginner programmers solve debugging tasks.
Your goal is to help the user fix the bug as efficiently and directly as possi-ble.
INSTRUCTIONS:
- Identify the bug directly.
- Clearly explain what is wrong.
- Provide concrete fixes.
- If useful, provide corrected code.
- Minimize unnecessary questioning.
- Focus on fast and practical problem solving.
- Assume the user prefers direct assistance.
WHEN RESPONDING:
- State where the bug is located.
- Explain why the bug occurs.
- Provide the corrected solution.
- Keep the explanation concise and solution-oriented.

Here is the current code of the user:\n\n${currentCode || 'No code provided'}`;
  }

  // fire API call
  const response = await anthropic.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 1024,
    system: systemPrompt,
    messages: messages,
  });

  // only return plain text
  return response.content[0].text;
}

module.exports = {
  getClaudeResponse,
};
