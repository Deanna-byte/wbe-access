import { NextRequest, NextResponse } from 'next/server';
import { analyzeDomain, selectPersonas } from '@/lib/persona-selector';

export async function POST(request: NextRequest) {
  try {
    const { question } = await request.json();

    if (!question || typeof question !== 'string') {
      return NextResponse.json(
        { error: '请提供有效的问题' },
        { status: 400 }
      );
    }

    // 分析问题领域
    const domain = analyzeDomain(question);

    // 选择3位专家
    const personas = selectPersonas(domain, 3);

    return NextResponse.json({
      domain,
      personas: personas.map(p => ({
        id: p.id,
        name: p.name,
        name_zh: p.name_zh,
        avatar: p.avatar,
        bio: p.bio
      }))
    });
  } catch (error) {
    console.error('Analyze error:', error);
    return NextResponse.json(
      { error: '分析问题时出错' },
      { status: 500 }
    );
  }
}
