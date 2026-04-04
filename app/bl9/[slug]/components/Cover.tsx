'use client';

import type { EventHero, EventMeta, EventTheme } from '../lib/types';
import ThemeDecorations from './ThemeDecorations';

interface CoverProps {
  meta: EventMeta;
  hero: EventHero;
  theme: EventTheme;
  slug: string;
  decorations?: string;
}

export default function Cover({ meta, hero, theme, slug, decorations }: CoverProps) {
  const isFiesta = decorations === 'fiesta-fairway';

  if (isFiesta) {
    return (
      <FiestaCover meta={meta} hero={hero} theme={theme} slug={slug} decorations={decorations} />
    );
  }

  // Default cover for non-fiesta events
  const heroImagePath = hero.image
    ? `/bl9/events/${slug}/assets/${hero.image.replace('assets/', '')}`
    : null;

  return (
    <div
      className="relative flex flex-col items-center justify-center min-h-[100dvh] px-6 text-center overflow-hidden"
      style={{ backgroundColor: theme.background, color: theme.text }}
    >
      {decorations && (
        <ThemeDecorations decorations={decorations} theme={theme} placement="cover-top" />
      )}
      {decorations && (
        <ThemeDecorations decorations={decorations} theme={theme} placement="cover-bottom" />
      )}

      {heroImagePath && (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImagePath})` }}
        >
          <div
            className="absolute inset-0"
            style={{ backgroundColor: theme.background, opacity: 0.85 }}
          />
        </div>
      )}

      <div className="relative z-10 max-w-xl mx-auto py-16">
        <p
          className="text-xs tracking-[0.3em] uppercase mb-8 font-medium"
          style={{ color: theme.accent2 }}
        >
          {hero.eyebrow}
        </p>
        <div className="w-12 h-px mx-auto mb-10" style={{ backgroundColor: theme.accent2 }} />
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-4 font-serif">
          {meta.title}
        </h1>
        {meta.subtitle && (
          <p className="text-lg sm:text-xl opacity-70 mb-6 font-light">{meta.subtitle}</p>
        )}
        <p
          className="text-sm tracking-[0.2em] uppercase font-medium mt-8"
          style={{ color: theme.accent }}
        >
          {meta.dateLabel}
        </p>
        <p className="text-sm mt-3 opacity-60">
          {meta.hostClub}
          {meta.course && ` \u00b7 ${meta.course}`}
        </p>
        {hero.tagline && (
          <p className="text-base italic mt-10 opacity-50 max-w-sm mx-auto">{hero.tagline}</p>
        )}
        <div className="w-8 h-px mx-auto mt-12" style={{ backgroundColor: theme.accent2 }} />
      </div>
    </div>
  );
}

/** Fiesta Fairway cover - bold, colorful, matching the flyer */
function FiestaCover({ hero, theme, meta }: CoverProps) {
  return (
    <div
      className="relative min-h-[100dvh] flex flex-col overflow-hidden"
      style={{ backgroundColor: '#FFF8DC' }}
    >
      {/* Top crimson banner */}
      <div className="w-full py-3 px-4 text-center" style={{ backgroundColor: '#C41E3A' }}>
        <p className="text-white font-bold text-sm sm:text-base tracking-wide uppercase">
          *Reminder* Sign Up Ends April 5
        </p>
      </div>

      {/* Papel picado banner */}
      <div className="w-full overflow-hidden" aria-hidden="true">
        <ThemeDecorations decorations="fiesta-fairway" theme={theme} placement="cover-top" />
      </div>

      {/* Main content area - cream background with gradient */}
      <div
        className="flex-1 flex flex-col items-center justify-center px-6 py-4 relative"
        style={{
          background: 'linear-gradient(180deg, #FFFDE8 0%, #FFF8DC 30%, #E8F4E8 70%, #D4E8F0 100%)',
        }}
      >
        {/* Maracas - left */}
        <div className="absolute left-4 sm:left-12 top-8 sm:top-12" aria-hidden="true">
          <MaracaSVG direction="left" size={60} />
        </div>
        <div className="absolute left-2 sm:left-8 top-32 sm:top-40" aria-hidden="true">
          <MaracaSVG direction="right" size={50} />
        </div>

        {/* Maracas - right */}
        <div className="absolute right-4 sm:right-12 top-8 sm:top-12" aria-hidden="true">
          <MaracaSVG direction="right" size={60} />
        </div>
        <div className="absolute right-2 sm:right-8 top-32 sm:top-40" aria-hidden="true">
          <MaracaSVG direction="left" size={50} />
        </div>

        {/* BL9 Logo */}
        <div className="mb-4 sm:mb-6">
          <BL9LogoSVG size={100} />
        </div>

        {/* FIESTA title */}
        <h1
          className="font-fiesta text-6xl sm:text-7xl md:text-8xl lg:text-9xl leading-none tracking-wide text-center"
          style={{
            color: '#C41E3A',
            textShadow: '3px 3px 0px rgba(0,0,0,0.08)',
            letterSpacing: '0.06em',
          }}
        >
          FIESTA
        </h1>

        {/* Fairway subtitle */}
        <h2
          className="font-fiesta-script text-4xl sm:text-5xl md:text-6xl leading-none -mt-1 sm:-mt-2"
          style={{
            color: '#1B8C3A',
            fontStyle: 'italic',
          }}
        >
          Fairway
        </h2>

        {/* Eyebrow / tagline */}
        {hero.tagline && (
          <p
            className="text-sm sm:text-base mt-4 max-w-xs text-center opacity-70"
            style={{ color: '#1a1a1a' }}
          >
            {hero.tagline}
          </p>
        )}
      </div>

      {/* Royal blue banner - PALMETTO CUP */}
      <div className="w-full py-3 sm:py-4 px-4 text-center" style={{ backgroundColor: '#1E3A8A' }}>
        <p className="text-white font-bold text-lg sm:text-xl md:text-2xl tracking-wide uppercase">
          Palmetto Cup
        </p>
        <p className="text-white text-sm sm:text-base tracking-widest uppercase mt-0.5">
          Member-Member Event
        </p>
      </div>

      {/* Bottom crimson banner - date */}
      <div className="w-full py-3 sm:py-4 px-4 text-center" style={{ backgroundColor: '#C41E3A' }}>
        <p className="text-white font-bold text-xl sm:text-2xl md:text-3xl tracking-wide">
          {meta.dateLabel}
        </p>
      </div>
    </div>
  );
}

/** Maraca SVG - red and green striped */
function MaracaSVG({ direction, size }: { direction: 'left' | 'right'; size: number }) {
  const rotate = direction === 'left' ? -30 : 30;
  return (
    <svg
      viewBox="0 0 40 100"
      width={size * 0.4}
      height={size}
      style={{ transform: `rotate(${rotate}deg)` }}
      role="presentation"
      aria-hidden="true"
    >
      {/* Handle */}
      <rect x="17" y="50" width="6" height="38" rx="3" fill="#8B4513" />
      <rect x="14" y="85" width="12" height="6" rx="3" fill="#A0522D" />
      {/* Ball - base */}
      <ellipse cx="20" cy="32" rx="16" ry="22" fill="#C41E3A" />
      {/* Green stripes */}
      <ellipse cx="20" cy="24" rx="14" ry="6" fill="#1B8C3A" opacity="0.9" />
      <ellipse cx="20" cy="38" rx="12" ry="5" fill="#1B8C3A" opacity="0.9" />
      {/* Yellow accents */}
      <ellipse cx="20" cy="16" rx="10" ry="3" fill="#F5D547" opacity="0.7" />
      <ellipse cx="20" cy="31" rx="13" ry="3" fill="#F5D547" opacity="0.5" />
      {/* Top cap */}
      <ellipse cx="20" cy="11" rx="6" ry="4" fill="#C41E3A" />
      {/* Highlight */}
      <ellipse cx="14" cy="26" rx="4" ry="8" fill="white" opacity="0.15" />
    </svg>
  );
}

/** BL9 Ladies logo - lady golfer silhouette with golf ball "9" */
function BL9LogoSVG({ size }: { size: number }) {
  return (
    <svg viewBox="0 0 120 120" width={size} height={size} role="presentation" aria-hidden="true">
      {/* Golf ball circle */}
      <circle cx="72" cy="50" r="32" fill="white" stroke="#1E3A8A" strokeWidth="1.5" />
      {/* Dimples on ball */}
      <circle cx="65" cy="38" r="1.5" fill="#ddd" />
      <circle cx="78" cy="42" r="1.5" fill="#ddd" />
      <circle cx="70" cy="55" r="1.5" fill="#ddd" />
      <circle cx="82" cy="52" r="1.5" fill="#ddd" />
      <circle cx="62" cy="50" r="1.5" fill="#ddd" />
      <circle cx="75" cy="62" r="1.5" fill="#ddd" />
      {/* "9" on the ball */}
      <text
        x="72"
        y="58"
        textAnchor="middle"
        fontFamily="Arial Black, Arial"
        fontWeight="900"
        fontSize="32"
        fill="#C41E3A"
      >
        9
      </text>

      {/* Lady golfer silhouette - blue */}
      <g fill="#1E3A8A">
        {/* Head */}
        <circle cx="38" cy="18" r="8" />
        {/* Hair */}
        <path d="M32,14 Q28,10 30,18 Q32,22 34,20 Z" />
        {/* Torso */}
        <path d="M32,26 Q30,38 29,48 L36,50 Q37,38 38,28 Z" />
        <path d="M42,26 Q44,38 45,48 L38,50 Q37,38 38,28 Z" />
        {/* Skirt */}
        <path d="M29,48 Q24,62 20,76 L38,72 Z" />
        <path d="M45,48 Q50,62 54,76 L38,72 Z" />
        {/* Lead leg */}
        <path d="M32,72 Q28,90 26,104 L22,106 Q20,110 26,110 L32,108 Q34,104 30,100 Q32,88 36,72 Z" />
        {/* Trail leg */}
        <path d="M42,72 Q46,88 50,100 L54,102 Q56,106 52,106 L46,104 Q44,100 48,96 Q44,84 38,72 Z" />
        {/* Arms - swing position */}
        <path d="M32,30 Q22,24 14,16 L12,18 Q20,28 30,34 Z" />
        <path d="M42,30 Q50,22 56,14 L58,16 Q52,26 44,34 Z" />
        {/* Club */}
        <line
          x1="12"
          y1="18"
          x2="4"
          y2="4"
          stroke="#1E3A8A"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        {/* Club head */}
        <rect x="0" y="0" width="8" height="4" rx="1" fill="#1E3A8A" transform="rotate(-25 4 2)" />
      </g>

      {/* "BELFAIR LADIES" text arc - tiny above logo */}
      <text
        x="38"
        y="112"
        textAnchor="middle"
        fontFamily="Arial, sans-serif"
        fontWeight="700"
        fontSize="7"
        fill="#1E3A8A"
        letterSpacing="0.5"
      >
        BELFAIR LADIES
      </text>
    </svg>
  );
}
