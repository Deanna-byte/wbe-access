interface SketchPortraitProps {
  id: string;
  name: string;
  size?: number;
  className?: string;
}

const portraitMap: Record<string, {
  bg: string;
  stroke: string;
  accent: string;
  hair: string;
  face: string;
  shoulder: string;
}> = {
  munger: {
    bg: '#f2e5d6',
    stroke: '#2d221b',
    accent: '#b45a3c',
    hair: 'M34 48 Q52 18 74 48',
    face: 'M39 57 Q54 34 69 57 Q72 83 54 91 Q36 83 39 57',
    shoulder: 'M28 116 Q54 92 80 116',
  },
  naval: {
    bg: '#e8dfd3',
    stroke: '#231c18',
    accent: '#92714d',
    hair: 'M35 50 Q41 26 54 24 Q67 26 73 50',
    face: 'M39 56 Q54 32 69 56 Q71 82 54 91 Q37 82 39 56',
    shoulder: 'M25 116 Q54 86 83 116',
  },
  peter_attia: {
    bg: '#e6e1d8',
    stroke: '#2f241d',
    accent: '#6d8b89',
    hair: 'M35 51 Q54 23 73 51',
    face: 'M39 57 Q54 34 69 57 Q72 82 54 91 Q36 82 39 57',
    shoulder: 'M27 116 Q54 90 81 116',
  },
  buffett: {
    bg: '#f4e9db',
    stroke: '#332720',
    accent: '#bf7a38',
    hair: 'M33 48 Q54 16 75 48',
    face: 'M39 57 Q54 33 69 57 Q72 84 54 92 Q36 84 39 57',
    shoulder: 'M24 116 Q54 90 84 116',
  },
  duan_yongping: {
    bg: '#ece2d7',
    stroke: '#2d231c',
    accent: '#b7684d',
    hair: 'M36 52 Q54 28 72 52',
    face: 'M39 56 Q54 35 69 56 Q72 81 54 91 Q36 81 39 56',
    shoulder: 'M25 116 Q54 88 83 116',
  },
  cal_newport: {
    bg: '#ebe5dc',
    stroke: '#2b231d',
    accent: '#7d6aa3',
    hair: 'M33 50 Q54 20 75 50',
    face: 'M39 56 Q54 34 69 56 Q72 82 54 92 Q36 82 39 56',
    shoulder: 'M26 116 Q54 89 82 116',
  },
  paul_graham: {
    bg: '#efe1d6',
    stroke: '#30241d',
    accent: '#a45a4b',
    hair: 'M31 52 Q40 23 54 21 Q68 23 77 52',
    face: 'M39 56 Q54 33 69 56 Q72 81 54 90 Q36 81 39 56',
    shoulder: 'M22 116 Q54 87 86 116',
  },
  tim_ferriss: {
    bg: '#eee0d2',
    stroke: '#31241d',
    accent: '#8f6d44',
    hair: 'M31 53 Q54 24 77 53',
    face: 'M39 57 Q54 34 69 57 Q72 81 54 92 Q36 81 39 57',
    shoulder: 'M23 116 Q54 88 85 116',
  },
  andrew_huberman: {
    bg: '#e7e1d6',
    stroke: '#2d231e',
    accent: '#617f91',
    hair: 'M30 52 Q40 22 54 20 Q68 22 78 52',
    face: 'M39 57 Q54 34 69 57 Q72 82 54 91 Q36 82 39 57',
    shoulder: 'M22 116 Q54 88 86 116',
  },
};

export default function SketchPortrait({
  id,
  name,
  size = 88,
  className = '',
}: SketchPortraitProps) {
  const portrait = portraitMap[id] ?? portraitMap.naval;

  return (
    <div
      className={`relative overflow-hidden rounded-[28px] border border-[var(--line)] bg-[var(--surface-strong)] ${className}`}
      style={{ width: size, height: size * 1.1 }}
      aria-label={`${name} 手绘头像`}
    >
      <svg
        viewBox="0 0 108 124"
        width={size}
        height={size * 1.1}
        role="img"
        aria-hidden="true"
        className="absolute inset-0 h-full w-full"
      >
        <rect width="108" height="124" rx="26" fill={portrait.bg} />
        <path d="M12 101 Q54 87 96 101" fill="none" stroke={portrait.accent} strokeWidth="1.5" strokeDasharray="2 5" opacity="0.75" />
        <path d={portrait.shoulder} fill="none" stroke={portrait.stroke} strokeWidth="2.2" strokeLinecap="round" />
        <path d={portrait.hair} fill="none" stroke={portrait.stroke} strokeWidth="2.4" strokeLinecap="round" />
        <path d={portrait.face} fill="none" stroke={portrait.stroke} strokeWidth="2.2" strokeLinecap="round" />
        <path d="M45 62 Q54 66 63 62" fill="none" stroke={portrait.stroke} strokeWidth="1.6" strokeLinecap="round" opacity="0.82" />
        <path d="M45 73 Q54 77 63 73" fill="none" stroke={portrait.stroke} strokeWidth="1.6" strokeLinecap="round" opacity="0.72" />
        <path d="M47 79 Q54 83 61 79" fill="none" stroke={portrait.accent} strokeWidth="1.7" strokeLinecap="round" opacity="0.88" />
        <circle cx="47" cy="64" r="1.8" fill={portrait.stroke} />
        <circle cx="61" cy="64" r="1.8" fill={portrait.stroke} />
        <path d="M53.5 66 L52.5 73 L55.5 73" fill="none" stroke={portrait.stroke} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" opacity="0.65" />
        <path d="M31 33 Q54 8 77 33" fill="none" stroke={portrait.accent} strokeWidth="1.2" opacity="0.35" strokeDasharray="4 4" />
      </svg>
      <div className="absolute inset-0 rounded-[28px] bg-[linear-gradient(180deg,rgba(255,255,255,0.18),transparent_40%,rgba(255,255,255,0.08))]" />
      <div className="absolute bottom-2 left-2 rounded-full border border-white/60 bg-white/65 px-2 py-0.5 text-[10px] font-semibold tracking-[0.16em] text-[var(--muted)] uppercase backdrop-blur-sm">
        Sketch
      </div>
    </div>
  );
}
