import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
  baseURL: 'https://api.minimaxi.com/anthropic',
});

export interface GenerateResponseParams {
  prompt: string;
  maxTokens?: number;
}

export async function generateResponse({
  prompt,
  maxTokens = 4096  // 大幅提高，确保text有足够空间，不被thinking挤占
}: GenerateResponseParams): Promise<string> {
  console.log('[Claude] 发送请求，prompt长度:', prompt.length);

  const message = await anthropic.messages.create({
    model: 'claude-3-5-sonnet-20241022',
    max_tokens: maxTokens,
    messages: [
      {
        role: 'user',
        content: prompt,
      },
    ],
  });

  console.log('[Claude] 收到响应，content块数:', message.content.length);

  // 提取text类型的内容（忽略thinking）
  const textContent = message.content.find(block => block.type === 'text');
  const result = textContent && 'text' in textContent ? textContent.text : '';

  console.log('[Claude] 提取的文本长度:', result.length);

  if (!result) {
    // 如果没有text块，记录所有块类型用于调试
    const allBlocks = message.content.map(b => b.type).join(' | ');
    console.error('[Claude] 警告：返回内容为空！blocks:', allBlocks);
  }

  return result;
}

export async function generateStreamResponse({
  prompt,
  maxTokens = 4096
}: GenerateResponseParams) {
  return anthropic.messages.stream({
    model: 'claude-3-5-sonnet-20241022',
    max_tokens: maxTokens,
    messages: [
      {
        role: 'user',
        content: prompt,
      },
    ],
  });
}
