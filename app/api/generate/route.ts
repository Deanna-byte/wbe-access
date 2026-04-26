import { NextRequest } from 'next/server';
import { getPersonaPrompt } from '@/lib/persona-selector';
import { generateResponse } from '@/lib/claude';

export async function POST(request: NextRequest) {
  try {
    const { question, personaIds } = await request.json();

    if (!question || !personaIds || !Array.isArray(personaIds)) {
      return new Response(
        JSON.stringify({ error: '请提供问题和专家ID' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    console.log(`[Generate] 开始生成 ${personaIds.length} 个专家回答...`);

    // 并发调用Claude API生成所有专家的回答
    const responses = await Promise.all(
      personaIds.map(async (personaId: string) => {
        try {
          console.log(`[Generate] 正在生成 ${personaId} 的回答...`);
          const prompt = getPersonaPrompt(personaId, question);
          const response = await generateResponse({ prompt, maxTokens: 4096 });
          console.log(`[Generate] ${personaId} 回答生成成功，长度: ${response.length}`);
          return {
            personaId,
            content: response
          };
        } catch (err) {
          console.error(`[Generate] ${personaId} 生成失败:`, err);
          throw err;
        }
      })
    );

    console.log(`[Generate] 所有回答生成完成`);

    return new Response(
      JSON.stringify({ responses }),
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error('[Generate] 错误详情:', error);

    const errorMessage = error instanceof Error
      ? error.message
      : '生成回答时出错';

    return new Response(
      JSON.stringify({
        error: errorMessage,
        details: error instanceof Error ? error.stack : String(error)
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}
