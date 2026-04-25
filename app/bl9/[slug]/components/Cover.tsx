'use client';

import Image from 'next/image';
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
          {meta.course && ` · ${meta.course}`}
        </p>
        {hero.tagline && (
          <p className="text-base italic mt-10 opacity-50 max-w-sm mx-auto">{hero.tagline}</p>
        )}
        <div className="w-8 h-px mx-auto mt-12" style={{ backgroundColor: theme.accent2 }} />
      </div>
    </div>
  );
}

/** Gemini baseline cover */
function FiestaCover({ hero: _hero, theme: _theme, meta }: CoverProps) {
  return (
    <div className="relative min-h-[100dvh] overflow-hidden bg-[#FFF8DC]">
      <Image
        src="/bl9/assets/fiesta-fairway-gemini-hero.jpg"
        alt="Fiesta Fairway decorative hero background"
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />

      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,248,220,0.10)_0%,rgba(255,248,220,0.12)_45%,rgba(255,248,220,0.18)_100%)]" />

      <div className="relative z-10 flex min-h-[100dvh] items-center justify-center px-4 py-16 sm:px-6 sm:py-20 md:px-8 md:py-24">
        <div className="w-full max-w-4xl text-center">
          <div className="absolute left-1/2 top-[96px] sm:top-[128px] md:top-[156px] z-20 -translate-x-1/2 rounded-full bg-[#fffaf0]/90 p-3 shadow-[0_0_0_14px_rgba(255,248,220,0.52),0_10px_28px_rgba(167,121,36,0.18)]">
            <div className="overflow-hidden rounded-full">
              <Image
                src="/bl9/assets/bl9-logo.png"
                alt="Belfair Ladies 9 round logo"
                width={96}
                height={96}
                className="h-[96px] w-[96px] object-cover"
                priority
              />
            </div>
          </div>

          <div className="mt-[170px] sm:mt-[190px] md:mt-[220px] px-2 sm:px-4">
            <h1
              className="font-fiesta text-[2.9rem] sm:text-[4.4rem] md:text-[5.8rem] lg:text-[6.2rem] leading-[0.92] tracking-wide"
              style={{
                color: '#C41E3A',
                textShadow: '2px 2px 0px rgba(122,43,32,0.16)',
                letterSpacing: '0.035em',
              }}
            >
              Fiesta Fairway
            </h1>

            <h2
              className="mt-2 text-[1.55rem] sm:text-[2rem] md:text-[2.45rem] font-bold leading-[1.08]"
              style={{ color: '#1B8C3A' }}
            >
              BL9&apos;s Palmetto Cup
            </h2>

            <p
              className="mt-6 text-[1rem] sm:text-[1.15rem] md:text-[1.3rem] leading-[1.4] max-w-3xl mx-auto"
              style={{ color: '#5B4636' }}
            >
              Our two day member member event with golf, dinner, and great prizes.
            </p>

            <p
              className="mt-7 text-[1.2rem] sm:text-[1.45rem] md:text-[1.8rem] font-semibold leading-[1.15]"
              style={{ color: '#8F1D2C' }}
            >
              {meta.dateLabel}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
