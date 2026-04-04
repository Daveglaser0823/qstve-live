'use client';

import type { EventTheme, QuickFact } from '../lib/types';

interface QuickFactsProps {
  facts: QuickFact[];
  theme: EventTheme;
}

export default function QuickFacts({ facts, theme }: QuickFactsProps) {
  return (
    <div
      className="min-h-[100dvh] flex flex-col items-center justify-center px-6 py-16"
      style={{ backgroundColor: theme.background, color: theme.text }}
    >
      <div className="max-w-2xl w-full mx-auto">
        {/* Section header */}
        <p
          className="text-xs tracking-[0.3em] uppercase text-center mb-4 font-medium"
          style={{ color: theme.accent2 }}
        >
          At a Glance
        </p>
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 font-serif">Quick Facts</h2>

        {/* Facts grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {facts.map((fact) => (
            <div
              key={fact.label}
              className="rounded-xl px-6 py-5 text-center"
              style={{
                backgroundColor: theme.card,
                boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
              }}
            >
              <p
                className="text-xs tracking-[0.2em] uppercase mb-2 font-medium"
                style={{ color: theme.accent }}
              >
                {fact.label}
              </p>
              <p className="text-lg font-semibold">{fact.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
