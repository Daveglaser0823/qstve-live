'use client';

import type { EventTheme } from '../lib/types';

interface ThemeDecorationsProps {
  decorations: string;
  theme: EventTheme;
  placement: 'cover-top' | 'cover-bottom' | 'page-top' | 'page-divider' | 'footer';
}

export default function ThemeDecorations({ decorations, theme, placement }: ThemeDecorationsProps) {
  if (decorations !== 'fiesta-fairway') return null;

  switch (placement) {
    case 'cover-top':
      return <PapelPicadoBanner theme={theme} />;
    case 'cover-bottom':
      return <LadyGolferAccent theme={theme} />;
    case 'page-top':
      return <PapelPicadoMini theme={theme} />;
    case 'page-divider':
      return <GolfIconDivider theme={theme} />;
    case 'footer':
      return <FiestaFooterAccent theme={theme} />;
    default:
      return null;
  }
}

/** Full-width papel picado banner for cover page */
function PapelPicadoBanner({ theme }: { theme: EventTheme }) {
  const colors = [theme.accent, theme.accent2, '#2A8B7B', theme.accent, theme.accent2];

  return (
    <div
      className="absolute top-0 left-0 right-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 800 80"
        className="w-full"
        preserveAspectRatio="none"
        style={{ height: 'clamp(50px, 10vw, 80px)' }}
        role="presentation"
      >
        {/* Hanging string */}
        <path
          d="M0,8 Q100,16 200,10 Q300,4 400,12 Q500,18 600,8 Q700,2 800,10"
          fill="none"
          stroke={theme.accent2}
          strokeWidth="1.5"
          opacity="0.6"
        />
        {/* Individual papel picado flags */}
        {colors.map((color, i) => {
          const x = 80 + i * 140;
          return (
            <g key={`flag-${x}`} transform={`translate(${x}, 8)`}>
              <PapelPicadoFlag color={color} variant={i % 3} />
            </g>
          );
        })}
      </svg>
    </div>
  );
}

/** Single papel picado flag with cutout patterns */
function PapelPicadoFlag({ color, variant }: { color: string; variant: number }) {
  // Each variant has different cutout patterns
  const cutouts = [
    // Variant 0: diamond and circle cutouts
    <>
      <circle cx="30" cy="28" r="4" fill="white" opacity="0.9" />
      <rect
        x="18"
        y="36"
        width="6"
        height="6"
        transform="rotate(45 21 39)"
        fill="white"
        opacity="0.9"
      />
      <rect
        x="36"
        y="36"
        width="6"
        height="6"
        transform="rotate(45 39 39)"
        fill="white"
        opacity="0.9"
      />
      <circle cx="30" cy="48" r="3" fill="white" opacity="0.9" />
    </>,
    // Variant 1: heart and star cutouts
    <>
      <path
        d="M30,30 C30,26 24,24 24,28 C24,32 30,36 30,36 C30,36 36,32 36,28 C36,24 30,26 30,30Z"
        fill="white"
        opacity="0.9"
      />
      <circle cx="22" cy="44" r="3" fill="white" opacity="0.9" />
      <circle cx="38" cy="44" r="3" fill="white" opacity="0.9" />
    </>,
    // Variant 2: flower cutouts
    <>
      <circle cx="30" cy="32" r="3" fill="white" opacity="0.9" />
      <circle cx="24" cy="32" r="2" fill="white" opacity="0.7" />
      <circle cx="36" cy="32" r="2" fill="white" opacity="0.7" />
      <circle cx="30" cy="26" r="2" fill="white" opacity="0.7" />
      <circle cx="30" cy="38" r="2" fill="white" opacity="0.7" />
      <rect x="20" y="46" width="20" height="1" fill="white" opacity="0.5" />
    </>,
  ];

  return (
    <g>
      {/* Flag body */}
      <path
        d="M10,0 L50,0 L50,52 L46,48 L42,52 L38,48 L34,52 L30,48 L26,52 L22,48 L18,52 L14,48 L10,52 Z"
        fill={color}
        opacity="0.85"
      />
      {/* Cutout pattern */}
      {cutouts[variant]}
    </g>
  );
}

/** Mini papel picado for page headers */
function PapelPicadoMini({ theme }: { theme: EventTheme }) {
  const colors = [theme.accent, theme.accent2, '#2A8B7B'];

  return (
    <div className="flex justify-center mb-4 pointer-events-none" aria-hidden="true">
      <svg
        viewBox="0 0 240 32"
        className="w-48 sm:w-56"
        style={{ height: '28px' }}
        role="presentation"
      >
        <path
          d="M0,4 Q40,8 80,5 Q120,2 160,6 Q200,9 240,4"
          fill="none"
          stroke={theme.accent2}
          strokeWidth="1"
          opacity="0.5"
        />
        {colors.map((color, i) => {
          const x = 30 + i * 70;
          return (
            <g key={`mini-${x}`} transform={`translate(${x}, 4) scale(0.4)`}>
              <PapelPicadoFlag color={color} variant={i} />
            </g>
          );
        })}
      </svg>
    </div>
  );
}

/** Golf icon divider between sections */
function GolfIconDivider({ theme }: { theme: EventTheme }) {
  return (
    <div
      className="flex items-center justify-center gap-3 my-2 pointer-events-none"
      aria-hidden="true"
    >
      <div className="w-8 h-px" style={{ backgroundColor: theme.accent2, opacity: 0.3 }} />
      <GolfBallIcon color={theme.accent} size={16} />
      <GolfFlagIcon color={theme.accent2} size={18} />
      <GolfBallIcon color={theme.accent} size={16} />
      <div className="w-8 h-px" style={{ backgroundColor: theme.accent2, opacity: 0.3 }} />
    </div>
  );
}

/** Lady golfer silhouette accent for cover */
function LadyGolferAccent({ theme }: { theme: EventTheme }) {
  return (
    <div
      className="absolute bottom-16 right-4 sm:right-8 pointer-events-none opacity-[0.08]"
      aria-hidden="true"
    >
      <svg viewBox="0 0 120 200" className="w-16 sm:w-20" fill={theme.accent} role="presentation">
        {/* Elegant lady golfer mid-swing silhouette */}
        {/* Head */}
        <ellipse cx="58" cy="18" rx="10" ry="12" />
        {/* Hair flowing */}
        <path d="M52,10 Q44,6 42,14 Q40,22 48,20 Z" />
        {/* Visor */}
        <path d="M48,12 Q58,6 68,12 L66,14 Q58,9 50,14 Z" />
        {/* Torso */}
        <path d="M50,28 Q46,42 44,60 L52,62 Q54,44 56,30 Z" />
        <path d="M62,28 Q66,42 68,60 L60,62 Q58,44 56,30 Z" />
        {/* Skirt/skort - flared elegantly */}
        <path d="M44,60 Q38,80 32,100 Q42,98 52,96 L56,62 Z" />
        <path d="M68,60 Q74,80 80,100 Q70,98 60,96 L56,62 Z" />
        {/* Lead leg */}
        <path d="M52,96 Q48,130 44,160 L40,162 Q36,168 42,168 L50,166 Q52,162 50,158 Q52,130 56,96 Z" />
        {/* Trail leg */}
        <path d="M60,96 Q64,120 72,150 L76,152 Q80,158 74,158 L66,156 Q64,152 66,148 Q60,120 56,96 Z" />
        {/* Arms - backswing position */}
        <path d="M50,32 Q36,28 28,22 L26,24 Q34,32 48,36 Z" />
        <path d="M62,32 Q70,26 78,18 L80,20 Q72,30 64,36 Z" />
        {/* Golf club - extended in backswing */}
        <path d="M26,24 Q18,16 10,4 L8,4 Q6,2 8,2 L14,2 Q16,4 12,6 L26,22 Z" />
        {/* Club head */}
        <rect x="4" y="0" width="8" height="4" rx="1" transform="rotate(-20 8 2)" />
      </svg>
    </div>
  );
}

/** Footer accent with tiny golf elements */
function FiestaFooterAccent({ theme }: { theme: EventTheme }) {
  return (
    <div
      className="flex items-center justify-center gap-4 mb-2 pointer-events-none"
      aria-hidden="true"
    >
      <GolfTeeIcon color={theme.accent2} size={14} />
      <svg viewBox="0 0 20 6" width="20" height="6" aria-hidden="true">
        <circle cx="3" cy="3" r="2" fill={theme.accent} opacity="0.3" />
        <circle cx="10" cy="3" r="2" fill={theme.accent2} opacity="0.3" />
        <circle cx="17" cy="3" r="2" fill="#2A8B7B" opacity="0.3" />
      </svg>
      <GolfTeeIcon color={theme.accent2} size={14} />
    </div>
  );
}

/* ---- Small SVG icon components ---- */

function GolfBallIcon({ color, size }: { color: string; size: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
      <circle cx="12" cy="12" r="10" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
      {/* Dimple pattern */}
      <circle cx="9" cy="9" r="1" fill={color} opacity="0.2" />
      <circle cx="15" cy="9" r="1" fill={color} opacity="0.2" />
      <circle cx="12" cy="13" r="1" fill={color} opacity="0.2" />
      <circle cx="8" cy="14" r="0.8" fill={color} opacity="0.15" />
      <circle cx="16" cy="14" r="0.8" fill={color} opacity="0.15" />
    </svg>
  );
}

function GolfFlagIcon({ color, size }: { color: string; size: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
      {/* Pole */}
      <line x1="8" y1="4" x2="8" y2="22" stroke={color} strokeWidth="1.2" opacity="0.5" />
      {/* Flag */}
      <path d="M8,4 L18,8 L8,12 Z" fill={color} opacity="0.35" />
      {/* Ground */}
      <ellipse cx="8" cy="22" rx="4" ry="1" fill={color} opacity="0.2" />
    </svg>
  );
}

function GolfTeeIcon({ color, size }: { color: string; size: number }) {
  return (
    <svg viewBox="0 0 16 24" width={size} height={size} aria-hidden="true">
      <path d="M8,6 L6,20 Q8,22 10,20 Z" fill={color} opacity="0.3" />
      <circle cx="8" cy="4" r="3" fill="none" stroke={color} strokeWidth="1" opacity="0.3" />
    </svg>
  );
}
