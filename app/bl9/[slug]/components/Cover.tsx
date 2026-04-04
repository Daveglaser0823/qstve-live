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
  const heroImagePath = hero.image
    ? `/bl9/events/${slug}/assets/${hero.image.replace('assets/', '')}`
    : null;

  return (
    <div
      className="relative flex flex-col items-center justify-center min-h-[100dvh] px-6 text-center overflow-hidden"
      style={{ backgroundColor: theme.background, color: theme.text }}
    >
      {/* Fiesta decorations - top banner */}
      {decorations && (
        <ThemeDecorations decorations={decorations} theme={theme} placement="cover-top" />
      )}

      {/* Fiesta decorations - lady golfer accent */}
      {decorations && (
        <ThemeDecorations decorations={decorations} theme={theme} placement="cover-bottom" />
      )}

      {/* Background image with overlay */}
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
        {/* Eyebrow */}
        <p
          className="text-xs tracking-[0.3em] uppercase mb-8 font-medium"
          style={{ color: theme.accent2 }}
        >
          {hero.eyebrow}
        </p>

        {/* Decorative line */}
        <div className="w-12 h-px mx-auto mb-10" style={{ backgroundColor: theme.accent2 }} />

        {/* Title */}
        <h1
          className={`text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-4 ${decorations === 'fiesta-fairway' ? 'font-fiesta' : 'font-serif'}`}
        >
          {meta.title}
        </h1>

        {/* Subtitle */}
        {meta.subtitle && (
          <p className="text-lg sm:text-xl opacity-70 mb-6 font-light">{meta.subtitle}</p>
        )}

        {/* Date */}
        <p
          className="text-sm tracking-[0.2em] uppercase font-medium mt-8"
          style={{ color: theme.accent }}
        >
          {meta.dateLabel}
        </p>

        {/* Host Club */}
        <p className="text-sm mt-3 opacity-60">
          {meta.hostClub}
          {meta.course && ` \u00b7 ${meta.course}`}
        </p>

        {/* Tagline */}
        {hero.tagline && (
          <p className="text-base italic mt-10 opacity-50 max-w-sm mx-auto">{hero.tagline}</p>
        )}

        {/* Decorative bottom line */}
        <div className="w-8 h-px mx-auto mt-12" style={{ backgroundColor: theme.accent2 }} />
      </div>
    </div>
  );
}
