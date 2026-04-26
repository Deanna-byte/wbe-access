'use client';

import Image from 'next/image';

interface Persona {
  id: string;
  name: string;
  name_zh: string;
  avatar: string;
  bio: string;
  domains: string[];
  domain_zh?: string;
}

interface DomainShowcaseProps {
  personas: Persona[];
}

const domainGroups: Record<string, { name_zh: string; emoji: string; color: string }> = {
  finance: { name_zh: '理财投资', emoji: '💰', color: '#8b6f3c' },
  health: { name_zh: '健康医疗', emoji: '🫀', color: '#4a7c6f' },
  career: { name_zh: '职业发展', emoji: '💼', color: '#5a6b8a' },
  startup: { name_zh: '创业商业', emoji: '🚀', color: '#7a5a8a' },
  life: { name_zh: '人生哲学', emoji: '🌊', color: '#4a8a7a' },
  relationship: { name_zh: '情感关系', emoji: '💕', color: '#8a4a6a' },
  learning: { name_zh: '教育学习', emoji: '📚', color: '#5a7a5a' },
  tech: { name_zh: '科技技术', emoji: '⚡', color: '#3a5a7a' },
};

export default function DomainShowcase({ personas }: DomainShowcaseProps) {
  const grouped = personas.reduce<Record<string, Persona[]>>((acc, p) => {
    const domainKey = p.domains[0] || 'life';
    if (!acc[domainKey]) acc[domainKey] = [];
    if (!acc[domainKey].find(existing => existing.id === p.id)) {
      acc[domainKey].push(p);
    }
    return acc;
  }, {});

  return (
    <div className="space-y-8">
      {Object.entries(grouped).map(([domainId, group]) => {
        const groupInfo = domainGroups[domainId] || { name_zh: domainId, emoji: '🎯', color: '#6a6a6a' };
        return (
          <div key={domainId}>
            <div className="mb-4 flex items-center gap-3">
              <span className="text-xl">{groupInfo.emoji}</span>
              <h3
                className="font-display text-[1.8rem] text-[var(--ink)]"
                style={{ color: groupInfo.color }}
              >
                {groupInfo.name_zh}
              </h3>
              <div className="h-px flex-1 bg-[var(--line)]" />
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {group.map((persona) => (
                <div
                  key={persona.id}
                  className="group flex items-center gap-3 rounded-[22px] border border-[var(--line)] bg-white/60 px-4 py-3 shadow-[0_8px_24px_rgba(54,39,28,0.05)] backdrop-blur-sm transition duration-200 hover:-translate-y-0.5 hover:border-[var(--line-strong)] hover:bg-white"
                >
                  <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border-2 border-[var(--line)]">
                    <Image
                      src={persona.avatar}
                      alt={persona.name_zh}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[13px] font-semibold text-[var(--ink)]">
                      {persona.name_zh}
                    </p>
                    <p className="truncate text-[11px] text-[var(--muted)]">{persona.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}