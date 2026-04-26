import SketchPortrait from '@/components/SketchPortrait';

interface PersonaMarqueeProps {
  personas: Array<{
    id: string;
    name: string;
    name_zh: string;
    bio: string;
  }>;
}

export default function PersonaMarquee({ personas }: PersonaMarqueeProps) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {personas.map((persona) => (
        <div
          key={persona.id}
          className="group flex items-center gap-4 rounded-[26px] border border-[var(--line)] bg-white/72 px-4 py-4 shadow-[0_12px_32px_rgba(58,41,31,0.05)] backdrop-blur-sm transition duration-300 hover:-translate-y-0.5 hover:border-[var(--line-strong)]"
        >
          <SketchPortrait id={persona.id} name={persona.name_zh} size={72} className="shrink-0" />
          <div className="min-w-0">
            <p className="text-[10px] uppercase tracking-[0.26em] text-[var(--muted)]">Featured mind</p>
            <h3 className="mt-1 font-display text-[1.8rem] leading-none text-[var(--ink)]">
              {persona.name_zh}
            </h3>
            <p className="mt-2 line-clamp-2 text-xs leading-5 text-[var(--muted)]">{persona.bio}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
