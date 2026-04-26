'use client';

import { useState } from 'react';
import QuestionForm from '@/components/QuestionForm';
import ResponseCard from '@/components/ResponseCard';
import DomainShowcase from '@/components/DomainShowcase';
import personasData from '@/data/personas.json';

interface Persona {
  id: string;
  name: string;
  name_zh: string;
  avatar: string;
  bio: string;
  domains: string[];
  domain_zh?: string;
}

interface Response {
  personaId: string;
  content: string;
}

export default function Home() {
  const [personas, setPersonas] = useState<Persona[]>([]);
  const [responses, setResponses] = useState<Response[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (q: string) => {
    setIsLoading(true);
    setError('');
    setResponses([]);

    try {
      const analyzeRes = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: q })
      });

      if (!analyzeRes.ok) {
        const errorData = await analyzeRes.json().catch(() => ({}));
        throw new Error(errorData.error || '分析问题失败');
      }

      const { personas: selectedPersonas } = await analyzeRes.json() as { personas: Persona[] };
      setPersonas(selectedPersonas);

      // 并发调用：一次请求，后端并发生成所有专家回答
      try {
        const generateRes = await fetch('/api/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            question: q,
            personaIds: selectedPersonas.map(p => p.id)
          })
        });

        if (!generateRes.ok) {
          const errorData = await generateRes.json().catch(() => ({}));
          throw new Error(errorData.error || '生成回答失败');
        }

        const { responses: generatedResponses } = await generateRes.json();
        setResponses(generatedResponses || []);
      } catch (err) {
        console.error('Error:', err);
        setError(err instanceof Error ? err.message : '发生错误，请重试');
      } finally {
        setIsLoading(false);
      }

    } catch (err) {
      console.error('Error:', err);
      setError(err instanceof Error ? err.message : '发生错误，请重试');
    } finally {
      setIsLoading(false);
    }
  };

  const allPersonas = personasData as Persona[];

  return (
    <main className="relative min-h-screen overflow-hidden px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-5xl flex-col gap-8">
        <section className="rounded-[36px] border border-[var(--line)] bg-[rgba(255,251,246,0.72)] px-6 py-8 shadow-[0_24px_90px_rgba(61,44,33,0.08)] backdrop-blur-sm sm:px-10 sm:py-10">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-white/80 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--muted)]">
              <span className="h-2 w-2 rounded-full bg-[var(--accent)]" />
              Million Consulting Room
            </div>
            <h1 className="font-display text-[3.8rem] leading-[0.95] tracking-[-0.05em] text-[var(--ink)] sm:text-[5rem] lg:text-[5.8rem]">
              百万咨询室
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-[var(--muted)] sm:text-lg">
              一个问题，交给三位以上风格鲜明的思想者来回答。不是替你做决定，而是把不同的判断方式摆到你面前。
            </p>
          </div>

          <div className="mx-auto mt-8 max-w-4xl">
            <QuestionForm onSubmit={handleSubmit} isLoading={isLoading} />
          </div>
        </section>

        {error && (
          <section className="rounded-[24px] border border-[#d8aea1] bg-[#fff4f1] px-6 py-5 text-[#8b4431] shadow-[0_12px_30px_rgba(180,90,60,0.08)]">
            <p className="text-[11px] uppercase tracking-[0.28em]">System note</p>
            <p className="mt-2 text-base">{error}</p>
          </section>
        )}

        {isLoading && personas.length > 0 && (
          <section>
            <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-[11px] uppercase tracking-[0.3em] text-[var(--muted)]">In progress</p>
                <h2 className="font-display text-[2.3rem] text-[var(--ink)]">顾问们正在写回信</h2>
              </div>
              <p className="max-w-md text-sm leading-6 text-[var(--muted)]">
                三位顾问正在并发撰写回答，稍等片刻。
              </p>
            </div>
            <div className="grid gap-6">
              {personas.map((persona) => {
                const hasResponse = responses.some((r) => r.personaId === persona.id);
                return (
                  <ResponseCard
                    key={persona.id}
                    personaId={persona.id}
                    avatar={persona.avatar}
                    name={persona.name}
                    name_zh={persona.name_zh}
                    bio={persona.bio}
                    content={responses.find((r) => r.personaId === persona.id)?.content || ''}
                    isLoading={!hasResponse}
                  />
                );
              })}
            </div>
          </section>
        )}

        {!isLoading && responses.length > 0 && (
          <section>
            <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-[11px] uppercase tracking-[0.3em] text-[var(--muted)]">Editorial selection</p>
                <h2 className="font-display text-[2.4rem] text-[var(--ink)]">多位大师的回信</h2>
              </div>
              <p className="max-w-md text-sm leading-6 text-[var(--muted)]">
                同一个问题，在不同人格里会长出不同答案。把它们并排看，才是这个产品最有价值的地方。
              </p>
            </div>
            <div className="grid gap-6">
              {responses.map((response) => {
                const persona = personas.find((p) => p.id === response.personaId);
                if (!persona) return null;

                return (
                  <ResponseCard
                    key={response.personaId}
                    personaId={persona.id}
                    avatar={persona.avatar}
                    name={persona.name}
                    name_zh={persona.name_zh}
                    bio={persona.bio}
                    content={response.content}
                  />
                );
              })}
            </div>
          </section>
        )}

        <section className="rounded-[32px] border border-[var(--line)] bg-[rgba(255,251,246,0.68)] px-6 py-7 shadow-[0_18px_70px_rgba(58,41,31,0.06)] backdrop-blur-sm sm:px-8">
          <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[11px] uppercase tracking-[0.28em] text-[var(--muted)]">All minds</p>
              <h2 className="mt-1 font-display text-[2.4rem] leading-none text-[var(--ink)]">全部顾问 ({allPersonas.length}位)</h2>
            </div>
            <p className="max-w-md text-sm leading-6 text-[var(--muted)]">
              按领域分组，同一个问题可以被不同领域的思想者同时回答。
            </p>
          </div>
          <DomainShowcase personas={allPersonas} />
        </section>

        <footer className="px-2 pb-10 text-center text-sm leading-7 text-[var(--muted)]">
          <p>
            以上内容为 AI 基于公开人格特征生成的模拟回答，不代表真人观点本身，也不构成医疗、法律或投资建议。
          </p>
        </footer>
      </div>
    </main>
  );
}