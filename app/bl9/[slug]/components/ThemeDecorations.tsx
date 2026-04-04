'use client';

import type { EventTheme } from '../lib/types';

interface ThemeDecorationsProps {
  decorations: string;
  theme: EventTheme;
  placement: 'cover-top' | 'cover-bottom' | 'page-top' | 'page-divider' | 'footer';
}

export default function ThemeDecorations({
  decorations,
  theme: _theme,
  placement,
}: ThemeDecorationsProps) {
  if (decorations !== 'fiesta-fairway') return null;

  switch (placement) {
    case 'cover-top':
      return <PapelPicadoBanner />;
    case 'cover-bottom':
      return null; // Handled inline in FiestaCover now
    case 'page-top':
      return <FiestaPageHeader />;
    case 'page-divider':
      return <FiestaDivider />;
    case 'footer':
      return <FiestaFooterAccent />;
    default:
      return null;
  }
}

/** Full-width papel picado banner - big, colorful flags with sombrero cutouts */
function PapelPicadoBanner() {
  const flags = [
    { color: '#C41E3A', variant: 0 },
    { color: '#1B8C3A', variant: 1 },
    { color: '#F5D547', variant: 2 },
    { color: '#1B8C3A', variant: 0 },
    { color: '#C41E3A', variant: 1 },
    { color: '#F5D547', variant: 2 },
    { color: '#1B8C3A', variant: 0 },
  ];

  return (
    <div className="w-full overflow-hidden pointer-events-none" aria-hidden="true">
      <svg
        viewBox="0 0 700 100"
        className="w-full"
        preserveAspectRatio="none"
        style={{ height: 'clamp(60px, 14vw, 110px)' }}
        role="presentation"
      >
        {/* Hanging string - thick rope */}
        <path
          d="M0,10 Q50,18 100,12 Q150,6 200,14 Q250,20 300,12 Q350,6 400,14 Q450,20 500,12 Q550,6 600,14 Q650,18 700,10"
          fill="none"
          stroke="#8B4513"
          strokeWidth="3"
        />
        {/* Flags */}
        {flags.map((flag, i) => {
          const x = 15 + i * 96;
          const y = i % 2 === 0 ? 12 : 16;
          return (
            <g key={`flag-${x}-${flag.color}`} transform={`translate(${x}, ${y})`}>
              <PapelPicadoFlag color={flag.color} variant={flag.variant} />
            </g>
          );
        })}
      </svg>
    </div>
  );
}

/** Single papel picado flag with festive cutout patterns including sombrero */
function PapelPicadoFlag({ color, variant }: { color: string; variant: number }) {
  const cutouts = [
    // Variant 0: sombrero cutout
    <>
      {/* Sombrero brim */}
      <ellipse cx="35" cy="42" rx="16" ry="5" fill="white" opacity="0.85" />
      {/* Sombrero crown */}
      <path d="M27,42 Q27,30 35,28 Q43,30 43,42 Z" fill="white" opacity="0.85" />
      {/* Decorative dots */}
      <circle cx="20" cy="56" r="3" fill="white" opacity="0.7" />
      <circle cx="50" cy="56" r="3" fill="white" opacity="0.7" />
      {/* Scalloped edge holes */}
      <circle cx="14" cy="68" r="2" fill="white" opacity="0.6" />
      <circle cx="24" cy="68" r="2" fill="white" opacity="0.6" />
      <circle cx="35" cy="68" r="2" fill="white" opacity="0.6" />
      <circle cx="46" cy="68" r="2" fill="white" opacity="0.6" />
      <circle cx="56" cy="68" r="2" fill="white" opacity="0.6" />
    </>,
    // Variant 1: sun/star and diamond cutouts
    <>
      {/* Sun/star */}
      <circle cx="35" cy="36" r="6" fill="white" opacity="0.85" />
      <path d="M35,26 L37,32 L35,30 L33,32 Z" fill="white" opacity="0.7" />
      <path d="M35,46 L37,40 L35,42 L33,40 Z" fill="white" opacity="0.7" />
      <path d="M25,36 L31,34 L29,36 L31,38 Z" fill="white" opacity="0.7" />
      <path d="M45,36 L39,34 L41,36 L39,38 Z" fill="white" opacity="0.7" />
      {/* Diamonds */}
      <rect
        x="18"
        y="52"
        width="7"
        height="7"
        transform="rotate(45 21.5 55.5)"
        fill="white"
        opacity="0.75"
      />
      <rect
        x="44"
        y="52"
        width="7"
        height="7"
        transform="rotate(45 47.5 55.5)"
        fill="white"
        opacity="0.75"
      />
      {/* Bottom scallop holes */}
      <circle cx="14" cy="68" r="2" fill="white" opacity="0.6" />
      <circle cx="35" cy="68" r="2" fill="white" opacity="0.6" />
      <circle cx="56" cy="68" r="2" fill="white" opacity="0.6" />
    </>,
    // Variant 2: flower/heart cutouts
    <>
      {/* Flower center */}
      <circle cx="35" cy="38" r="4" fill="white" opacity="0.85" />
      {/* Petals */}
      <circle cx="35" cy="30" r="3.5" fill="white" opacity="0.7" />
      <circle cx="35" cy="46" r="3.5" fill="white" opacity="0.7" />
      <circle cx="27" cy="38" r="3.5" fill="white" opacity="0.7" />
      <circle cx="43" cy="38" r="3.5" fill="white" opacity="0.7" />
      {/* Hearts at sides */}
      <path
        d="M18,56 C18,52 12,50 12,54 C12,58 18,62 18,62 C18,62 24,58 24,54 C24,50 18,52 18,56Z"
        fill="white"
        opacity="0.7"
      />
      <path
        d="M52,56 C52,52 46,50 46,54 C46,58 52,62 52,62 C52,62 58,58 58,54 C58,50 52,52 52,56Z"
        fill="white"
        opacity="0.7"
      />
      {/* Bottom holes */}
      <circle cx="20" cy="68" r="2" fill="white" opacity="0.6" />
      <circle cx="35" cy="68" r="2" fill="white" opacity="0.6" />
      <circle cx="50" cy="68" r="2" fill="white" opacity="0.6" />
    </>,
  ];

  return (
    <g>
      {/* Flag body with scalloped bottom edge */}
      <path
        d="M5,0 L65,0 L65,72 L60,66 L55,72 L50,66 L45,72 L40,66 L35,72 L30,66 L25,72 L20,66 L15,72 L10,66 L5,72 Z"
        fill={color}
        opacity="0.92"
      />
      {/* Top fold line */}
      <rect x="5" y="0" width="60" height="6" fill={color} opacity="1" />
      <line x1="5" y1="6" x2="65" y2="6" stroke="white" strokeWidth="0.5" opacity="0.3" />
      {/* Cutout pattern */}
      {cutouts[variant]}
    </g>
  );
}

/** Colorful page header with mini maracas */
function FiestaPageHeader() {
  return (
    <div
      className="flex items-center justify-center gap-3 mb-4 pointer-events-none"
      aria-hidden="true"
    >
      <MiniMaraca direction="left" />
      <svg viewBox="0 0 60 8" width="60" height="8" role="presentation">
        <circle cx="8" cy="4" r="3.5" fill="#C41E3A" opacity="0.8" />
        <circle cx="22" cy="4" r="3.5" fill="#1B8C3A" opacity="0.8" />
        <circle cx="36" cy="4" r="3.5" fill="#F5D547" opacity="0.8" />
        <circle cx="50" cy="4" r="3.5" fill="#1E3A8A" opacity="0.8" />
      </svg>
      <MiniMaraca direction="right" />
    </div>
  );
}

/** Mini maraca for page accents */
function MiniMaraca({ direction }: { direction: 'left' | 'right' }) {
  const rotate = direction === 'left' ? -25 : 25;
  return (
    <svg
      viewBox="0 0 20 50"
      width={14}
      height={35}
      style={{ transform: `rotate(${rotate}deg)` }}
      role="presentation"
    >
      <rect x="8.5" y="25" width="3" height="18" rx="1.5" fill="#8B4513" />
      <ellipse cx="10" cy="16" rx="8" ry="11" fill="#C41E3A" />
      <ellipse cx="10" cy="12" rx="7" ry="3" fill="#1B8C3A" opacity="0.85" />
      <ellipse cx="10" cy="20" rx="6" ry="2.5" fill="#1B8C3A" opacity="0.85" />
      <ellipse cx="10" cy="8" rx="4" ry="2" fill="#F5D547" opacity="0.6" />
    </svg>
  );
}

/** Festive divider with colored dots and mini flags */
function FiestaDivider() {
  return (
    <div
      className="flex items-center justify-center gap-2 my-2 pointer-events-none"
      aria-hidden="true"
    >
      <svg viewBox="0 0 200 12" width="200" height="12" role="presentation">
        <line x1="0" y1="6" x2="40" y2="6" stroke="#C41E3A" strokeWidth="2" opacity="0.4" />
        <circle cx="50" cy="6" r="4" fill="#C41E3A" opacity="0.6" />
        <circle cx="65" cy="6" r="3" fill="#1B8C3A" opacity="0.6" />
        <circle cx="78" cy="6" r="4" fill="#F5D547" opacity="0.6" />
        {/* Mini cactus */}
        <path
          d="M95,10 L95,4 M92,6 Q92,3 95,4 M98,7 Q98,4 95,5"
          stroke="#1B8C3A"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          opacity="0.5"
        />
        <circle cx="112" cy="6" r="4" fill="#F5D547" opacity="0.6" />
        <circle cx="125" cy="6" r="3" fill="#1B8C3A" opacity="0.6" />
        <circle cx="138" cy="6" r="4" fill="#C41E3A" opacity="0.6" />
        <line x1="150" y1="6" x2="200" y2="6" stroke="#C41E3A" strokeWidth="2" opacity="0.4" />
      </svg>
    </div>
  );
}

/** Footer accent */
function FiestaFooterAccent() {
  return (
    <div
      className="flex items-center justify-center gap-3 mb-2 pointer-events-none"
      aria-hidden="true"
    >
      <MiniMaraca direction="left" />
      <svg viewBox="0 0 40 8" width="40" height="8" aria-hidden="true">
        <circle cx="6" cy="4" r="3" fill="#C41E3A" opacity="0.4" />
        <circle cx="20" cy="4" r="3" fill="#1B8C3A" opacity="0.4" />
        <circle cx="34" cy="4" r="3" fill="#F5D547" opacity="0.4" />
      </svg>
      <MiniMaraca direction="right" />
    </div>
  );
}
