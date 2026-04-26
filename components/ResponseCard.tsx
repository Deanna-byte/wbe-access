'use client';

import Image from 'next/image';

interface ResponseCardProps {
  personaId?: string;
  avatar: string;
  name: string;
  name_zh: string;
  bio: string;
  content: string;
  isLoading?: boolean;
}

export default function ResponseCard({
  avatar,
  name,
  name_zh,
  bio,
  content,
  isLoading = false
}: ResponseCardProps) {
  return (
    <article className="group relative overflow-hidden rounded-[34px] border border-[var(--line)] bg-[var(--surface)] p-5 shadow-[0_20px_70px_rgba(54,39,28,0.08)] backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-[var(--line-strong)] sm:p-7">
      <div className="absolute inset-x-6 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(181,155,99,0.55),transparent)]" />
      <div className="mb-5 flex items-start gap-4 sm:gap-5">
        <div className="relative h-[88px] w-[88px] shrink-0 overflow-hidden rounded-[26px] border-2 border-[var(--line)] shadow-[0_12px_24px_rgba(35,28,24,0.08)]">
          <Image
            src={avatar}
            alt={name_zh}
            fill
            className="object-cover"
            unoptimized
          />
        </div>
        <div className="min-w-0 flex-1 pt-1">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <h3 className="font-display text-[2rem] leading-none text-[var(--ink)]">
              {name_zh}
            </h3>
            <span className="rounded-full border border-[var(--line)] bg-white/70 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-[var(--muted)]">
              {name}
            </span>
          </div>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--muted)]">{bio}</p>
        </div>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          <div className="flex items-center gap-3 text-sm text-[var(--muted)]">
            <span className="inline-flex h-2 w-2 animate-pulse rounded-full bg-[var(--accent)]" />
            正在整理这位思想家的视角...
          </div>
          <div className="space-y-3">
            <div className="h-4 rounded-full bg-[#e7ded2] animate-pulse" />
            <div className="h-4 w-11/12 rounded-full bg-[#e7ded2] animate-pulse" />
            <div className="h-4 w-4/5 rounded-full bg-[#e7ded2] animate-pulse" />
            <div className="h-4 w-3/5 rounded-full bg-[#e7ded2] animate-pulse" />
          </div>
        </div>
      ) : (
        <div className="relative rounded-[26px] border border-[var(--line)] bg-[#fffdf9] px-5 py-5 sm:px-6">
          <div className="pointer-events-none absolute inset-y-5 left-0 w-[3px] rounded-r-full bg-[linear-gradient(180deg,var(--accent),rgba(181,155,99,0.35))]" />
          <div className="whitespace-pre-wrap pl-3 text-[15px] leading-8 text-[var(--ink)] sm:text-[16px]">
            {content}
          </div>
        </div>
      )}
    </article>
  );
}