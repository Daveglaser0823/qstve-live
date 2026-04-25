'use client';

import type { EventTheme, QuickFact } from '../lib/types';

interface QuickFactsProps {
  facts: QuickFact[];
  theme: EventTheme;
  decorations?: string;
}

const FIESTA_CARD_COLORS = [
  { bg: '#C41E3A', text: '#ffffff', label: '#FFD700' },
  { bg: '#1E3A8A', text: '#ffffff', label: '#FFD700' },
  { bg: '#1B8C3A', text: '#ffffff', label: '#FFD700' },
  { bg: '#F5D547', text: '#1a1a1a', label: '#C41E3A' },
  { bg: '#C41E3A', text: '#ffffff', label: '#FFD700' },
  { bg: '#1E3A8A', text: '#ffffff', label: '#FFD700' },
];

export default function QuickFacts({ facts, theme, decorations }: QuickFactsProps) {
  const isFiesta = decorations === 'fiesta-fairway';

  return (
    <div
      className="min-h-[100dvh] flex flex-col items-center justify-center px-6 py-16"
      style={{ backgroundColor: isFiesta ? '#FFF8DC' : theme.background, color: theme.text }}
    >
      <div className="max-w-2xl w-full mx-auto">
        {/* Section header */}
        {isFiesta ? (
          <div className="mb-10">
            <div
              className="w-full py-3 px-4 text-center rounded-xl mb-6"
              style={{ backgroundColor: '#1E3A8A' }}
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-wide font-fiesta">
                Quick Facts
              </h2>
            </div>
          </div>
        ) : (
          <>
            <p
              className="text-xs tracking-[0.3em] uppercase text-center mb-4 font-medium"
              style={{ color: theme.accent2 }}
            >
              At a Glance
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 font-serif">
              Quick Facts
            </h2>
          </>
        )}

        {/* Facts grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {facts.map((fact, idx) => {
            if (isFiesta) {
              const colors = FIESTA_CARD_COLORS[idx % FIESTA_CARD_COLORS.length];
              return (
                <div
                  key={fact.label}
                  className="rounded-xl px-6 py-5 text-center shadow-md"
                  style={{ backgroundColor: colors.bg }}
                >
                  <p
                    className="text-xs tracking-[0.2em] uppercase mb-2 font-bold"
                    style={{ color: colors.label }}
                  >
                    {fact.label}
                  </p>
                  <p className="text-xl sm:text-2xl font-bold" style={{ color: colors.text }}>
                    {fact.value}
                  </p>
                </div>
              );
            }
            return (
              <div
                key={fact.label}
                className="rounded-xl px-6 py-5 text-center"
                style={{
                  backgroundColor: theme.card,
                  boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                }}
              >
                <p
                  className="text-sm tracking-[0.2em] uppercase mb-2 font-medium"
                  style={{ color: theme.accent }}
                >
                  {fact.label}
                </p>
                <p className="text-xl font-semibold">{fact.value}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
