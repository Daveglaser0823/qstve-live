'use client';

import { useCallback, useEffect, useState } from 'react';
import Cover from './components/Cover';
import Navigation from './components/Navigation';
import PageRenderer from './components/PageRenderer';
import QuickFacts from './components/QuickFacts';
import type { EventContent } from './lib/types';

interface BookletClientProps {
  content: EventContent;
  slug: string;
}

export default function BookletClient({ content, slug }: BookletClientProps) {
  const { meta, theme, hero, quickFacts, pages } = content;

  // Total "screens": cover + quickFacts + body pages
  const totalPages = 2 + pages.length;
  const [currentPage, setCurrentPage] = useState(0);
  const [isScrollMode, setIsScrollMode] = useState(false);

  // Detect mobile for scroll mode default
  useEffect(() => {
    const checkMobile = () => setIsScrollMode(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const navigate = useCallback(
    (page: number) => {
      if (page < 0 || page >= totalPages) return;
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'instant' });
    },
    [totalPages],
  );

  // Keyboard navigation
  useEffect(() => {
    if (isScrollMode) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        navigate(currentPage + 1);
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        navigate(currentPage - 1);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [currentPage, navigate, isScrollMode]);

  // Scroll mode: render all pages stacked
  if (isScrollMode) {
    return (
      <div style={{ backgroundColor: theme.background }}>
        {/* Mode toggle */}
        <ModeToggle
          isScrollMode={isScrollMode}
          onToggle={() => setIsScrollMode(false)}
          theme={theme}
        />

        <Cover meta={meta} hero={hero} theme={theme} slug={slug} />
        <QuickFacts facts={quickFacts} theme={theme} />
        {pages.map((page) => (
          <PageRenderer key={page.id} page={page} theme={theme} />
        ))}

        {/* Footer */}
        <Footer meta={meta} theme={theme} />
      </div>
    );
  }

  // Booklet mode: one page at a time
  return (
    <div style={{ backgroundColor: theme.background }}>
      {/* Mode toggle */}
      <ModeToggle
        isScrollMode={isScrollMode}
        onToggle={() => setIsScrollMode(true)}
        theme={theme}
      />

      {/* Current page */}
      {currentPage === 0 && <Cover meta={meta} hero={hero} theme={theme} slug={slug} />}
      {currentPage === 1 && <QuickFacts facts={quickFacts} theme={theme} />}
      {currentPage >= 2 && <PageRenderer page={pages[currentPage - 2]} theme={theme} />}

      {/* Footer on last page */}
      {currentPage === totalPages - 1 && <Footer meta={meta} theme={theme} />}

      <Navigation
        currentPage={currentPage}
        totalPages={totalPages}
        theme={theme}
        onNavigate={navigate}
      />
    </div>
  );
}

function ModeToggle({
  isScrollMode,
  onToggle,
  theme,
}: {
  isScrollMode: boolean;
  onToggle: () => void;
  theme: EventContent['theme'];
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="fixed top-4 right-4 z-50 w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-105"
      style={{
        backgroundColor: theme.card,
        color: theme.text,
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
      }}
      aria-label={isScrollMode ? 'Switch to booklet view' : 'Switch to scroll view'}
      title={isScrollMode ? 'Booklet view' : 'Scroll view'}
    >
      {isScrollMode ? (
        <svg
          aria-hidden="true"
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
          />
        </svg>
      ) : (
        <svg
          aria-hidden="true"
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      )}
    </button>
  );
}

function Footer({ meta, theme }: { meta: EventContent['meta']; theme: EventContent['theme'] }) {
  return (
    <div
      className="py-12 text-center text-xs opacity-40 px-6"
      style={{ backgroundColor: theme.background, color: theme.text }}
    >
      <p>{meta.hostClub}</p>
      <p className="mt-1">BL9 Golf League</p>
    </div>
  );
}
