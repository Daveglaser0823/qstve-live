'use client';

import type { EventTheme } from '../lib/types';

interface NavigationProps {
  currentPage: number;
  totalPages: number;
  theme: EventTheme;
  onNavigate: (page: number) => void;
}

export default function Navigation({
  currentPage,
  totalPages,
  theme,
  onNavigate,
}: NavigationProps) {
  const isFirst = currentPage === 0;
  const isLast = currentPage === totalPages - 1;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Previous */}
        <button
          type="button"
          onClick={() => onNavigate(currentPage - 1)}
          disabled={isFirst}
          className="w-10 h-10 rounded-full flex items-center justify-center transition-all disabled:opacity-0"
          style={{
            backgroundColor: theme.card,
            color: theme.text,
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          }}
          aria-label="Previous page"
        >
          <svg
            aria-hidden="true"
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>

        {/* Page dots */}
        <div className="flex items-center gap-1.5">
          {Array.from({ length: totalPages }).map((_, idx) => (
            <button
              type="button"
              key={`dot-${idx.toString()}`}
              onClick={() => onNavigate(idx)}
              className="transition-all rounded-full"
              style={{
                width: idx === currentPage ? 24 : 6,
                height: 6,
                backgroundColor: idx === currentPage ? theme.accent : `${theme.accent}40`,
              }}
              aria-label={`Go to page ${idx + 1}`}
            />
          ))}
        </div>

        {/* Next */}
        <button
          type="button"
          onClick={() => onNavigate(currentPage + 1)}
          disabled={isLast}
          className="w-10 h-10 rounded-full flex items-center justify-center transition-all disabled:opacity-0"
          style={{
            backgroundColor: theme.card,
            color: theme.text,
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          }}
          aria-label="Next page"
        >
          <svg
            aria-hidden="true"
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      </div>
    </div>
  );
}
