'use client';

import { useState } from 'react';

interface QuestionFormProps {
  onSubmit: (question: string) => void;
  isLoading: boolean;
}

export default function QuestionForm({ onSubmit, isLoading }: QuestionFormProps) {
  const [question, setQuestion] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (question.trim()) {
      onSubmit(question.trim());
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative w-full overflow-hidden rounded-[32px] border border-[var(--line)] bg-[var(--surface)] p-5 shadow-[0_22px_70px_rgba(54,39,28,0.07)] backdrop-blur-sm sm:p-7"
    >
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[11px] uppercase tracking-[0.3em] text-[var(--muted)]">Consulting prompt</p>
          <h2 className="mt-1 font-display text-[2.3rem] leading-none text-[var(--ink)] sm:text-[2.8rem]">把问题写清楚，再让观点发生碰撞</h2>
        </div>
        <p className="max-w-xs text-sm leading-6 text-[var(--muted)]">
          回答将按名人视角依次生成，适合认真读，不适合一扫而过。
        </p>
      </div>

      <label className="block">
        <span className="sr-only">输入问题</span>
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="例如：我30岁了，感觉很迷茫，不知道未来该往哪个方向发展。"
          className="min-h-[188px] w-full resize-none rounded-[24px] border border-[var(--line)] bg-[#fffdfa] px-5 py-5 text-[1rem] leading-8 text-[var(--ink)] outline-none transition placeholder:text-[#aa9f95] focus:border-[var(--line-strong)] focus:bg-white"
          rows={6}
          disabled={isLoading}
        />
      </label>

      <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-xl text-sm leading-6 text-[var(--muted)]">
          我们会从不同的思维模型里拆解你的问题，不给标准答案，只给可被比较的判断方式。
        </p>
        <button
          type="submit"
          disabled={isLoading || !question.trim()}
          className="group inline-flex items-center justify-center gap-3 rounded-full bg-[var(--ink)] px-7 py-4 text-sm font-semibold tracking-[0.12em] text-[#f7f2ea] transition hover:-translate-y-0.5 hover:bg-[#18120f] disabled:translate-y-0 disabled:cursor-not-allowed disabled:bg-[#8c8278]"
        >
          <span className="h-2 w-2 rounded-full bg-[var(--accent)] transition group-hover:scale-125" />
          {isLoading ? '正在请教中' : '获取专家建议'}
        </button>
      </div>
    </form>
  );
}
