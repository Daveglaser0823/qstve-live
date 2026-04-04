'use client';

import type { EventPage, EventTheme } from '../lib/types';
import ThemeDecorations from './ThemeDecorations';

interface PageRendererProps {
  page: EventPage;
  theme: EventTheme;
  decorations?: string;
}

const SECTION_COLORS = [
  '#C41E3A',
  '#1E3A8A',
  '#1B8C3A',
  '#C41E3A',
  '#1E3A8A',
  '#1B8C3A',
  '#C41E3A',
];

export default function PageRenderer({ page, theme, decorations }: PageRendererProps) {
  const isFiesta = decorations === 'fiesta-fairway';

  return (
    <div
      className="min-h-[100dvh] flex flex-col items-center justify-center px-6 py-16"
      style={{ backgroundColor: isFiesta ? '#FFF8DC' : theme.background, color: theme.text }}
    >
      <div className="max-w-2xl w-full mx-auto">
        {isFiesta ? (
          <FiestaPageTitle title={page.title} pageId={page.id} />
        ) : (
          <>
            {decorations ? (
              <ThemeDecorations decorations={decorations} theme={theme} placement="page-top" />
            ) : (
              <div className="w-8 h-px mx-auto mb-8" style={{ backgroundColor: theme.accent2 }} />
            )}
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4 font-serif">
              {page.title}
            </h2>
            {decorations ? (
              <div className="mb-10">
                <ThemeDecorations
                  decorations={decorations}
                  theme={theme}
                  placement="page-divider"
                />
              </div>
            ) : (
              <div className="mb-10" />
            )}
          </>
        )}

        {/* Layout-specific content */}
        {page.layout === 'text' && <TextLayout page={page} theme={theme} isFiesta={isFiesta} />}
        {page.layout === 'bullets' && (
          <BulletsLayout page={page} theme={theme} isFiesta={isFiesta} />
        )}
        {page.layout === 'documents' && <DocumentsLayout page={page} theme={theme} />}
        {page.layout === 'contact' && (
          <ContactLayout page={page} theme={theme} isFiesta={isFiesta} />
        )}
      </div>
    </div>
  );
}

/** Bold colored banner header for fiesta pages */
function FiestaPageTitle({ title, pageId }: { title: string; pageId: string }) {
  const pages = ['welcome', 'format', 'social', 'signup', 'eligibility', 'cancellation', 'contact'];
  const idx = pages.indexOf(pageId);
  const color = SECTION_COLORS[idx >= 0 ? idx : 0];

  return (
    <div className="mb-8">
      <ThemeDecorations
        decorations="fiesta-fairway"
        theme={{
          accent: '#C41E3A',
          accent2: '#1E3A8A',
          background: '#FFF8DC',
          text: '#1a1a1a',
          card: '#fff',
        }}
        placement="page-top"
      />
      <div
        className="w-full py-3 px-6 text-center rounded-xl shadow-md"
        style={{ backgroundColor: color }}
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-wide font-fiesta">
          {title}
        </h2>
      </div>
      <div className="mt-4">
        <ThemeDecorations
          decorations="fiesta-fairway"
          theme={{
            accent: '#C41E3A',
            accent2: '#1E3A8A',
            background: '#FFF8DC',
            text: '#1a1a1a',
            card: '#fff',
          }}
          placement="page-divider"
        />
      </div>
    </div>
  );
}

function TextLayout({
  page,
  theme,
  isFiesta,
}: {
  page: EventPage;
  theme: EventTheme;
  isFiesta: boolean;
}) {
  return (
    <div className="space-y-6">
      {page.body?.map((paragraph) => (
        <p
          key={paragraph.slice(0, 40)}
          className={`leading-relaxed text-center ${isFiesta ? 'text-lg sm:text-xl' : 'text-base sm:text-lg opacity-80'}`}
          style={isFiesta ? { color: '#1a1a1a' } : undefined}
        >
          {paragraph}
        </p>
      ))}
      <LinksSection links={page.links} theme={theme} />
    </div>
  );
}

function BulletsLayout({
  page,
  theme,
  isFiesta,
}: {
  page: EventPage;
  theme: EventTheme;
  isFiesta: boolean;
}) {
  const bulletColors = ['#C41E3A', '#1B8C3A', '#1E3A8A', '#F5D547'];

  return (
    <div>
      <ul className="space-y-5 max-w-lg mx-auto">
        {page.body?.map((item, idx) => (
          <li
            key={item.slice(0, 40)}
            className={`flex items-start gap-4 ${isFiesta ? 'text-lg sm:text-xl leading-relaxed' : 'text-base sm:text-lg leading-relaxed'}`}
          >
            {isFiesta ? (
              <span className="mt-1 flex-shrink-0">
                <svg
                  viewBox="0 0 20 50"
                  width={10}
                  height={25}
                  style={{ transform: `rotate(${idx % 2 === 0 ? -20 : 20}deg)` }}
                  aria-hidden="true"
                >
                  <rect x="8.5" y="25" width="3" height="18" rx="1.5" fill="#8B4513" />
                  <ellipse
                    cx="10"
                    cy="16"
                    rx="8"
                    ry="11"
                    fill={bulletColors[idx % bulletColors.length]}
                  />
                  <ellipse cx="10" cy="12" rx="7" ry="3" fill="#1B8C3A" opacity="0.6" />
                </svg>
              </span>
            ) : (
              <span
                className="mt-2 w-2 h-2 rounded-full flex-shrink-0"
                style={{ backgroundColor: theme.accent }}
              />
            )}
            <span className={isFiesta ? 'font-medium' : 'opacity-80'}>{item}</span>
          </li>
        ))}
      </ul>
      <LinksSection links={page.links} theme={theme} />
    </div>
  );
}

function DocumentsLayout({ page, theme }: { page: EventPage; theme: EventTheme }) {
  return (
    <div>
      {page.body && page.body.length > 0 && (
        <div className="space-y-4 mb-10">
          {page.body.map((paragraph) => (
            <p
              key={paragraph.slice(0, 40)}
              className="text-base sm:text-lg leading-relaxed text-center opacity-80"
            >
              {paragraph}
            </p>
          ))}
        </div>
      )}

      {page.documents && page.documents.length > 0 && (
        <div className="space-y-3 max-w-md mx-auto">
          {page.documents.map((doc) => (
            <a
              key={doc.label}
              href={doc.file}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-xl px-6 py-4 transition-all hover:scale-[1.02]"
              style={{
                backgroundColor: theme.card,
                boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
              }}
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5 flex-shrink-0"
                style={{ color: theme.accent }}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                />
              </svg>
              <span className="font-medium text-sm sm:text-base">{doc.label}</span>
              <svg
                aria-hidden="true"
                className="w-4 h-4 ml-auto opacity-40"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                />
              </svg>
            </a>
          ))}
        </div>
      )}

      <LinksSection links={page.links} theme={theme} />
    </div>
  );
}

function ContactLayout({
  page,
  theme,
  isFiesta,
}: {
  page: EventPage;
  theme: EventTheme;
  isFiesta: boolean;
}) {
  const contact = page.contact;

  return (
    <div>
      {page.body && page.body.length > 0 && (
        <div className="space-y-4 mb-10">
          {page.body.map((paragraph) => (
            <p
              key={paragraph.slice(0, 40)}
              className={`leading-relaxed text-center ${isFiesta ? 'text-lg sm:text-xl' : 'text-base sm:text-lg opacity-80'}`}
            >
              {paragraph}
            </p>
          ))}
        </div>
      )}

      {contact && (contact.name || contact.email || contact.phone) && (
        <div
          className="rounded-xl px-8 py-8 max-w-sm mx-auto text-center"
          style={{
            backgroundColor: isFiesta ? '#1E3A8A' : theme.card,
            color: isFiesta ? '#ffffff' : theme.text,
            boxShadow: isFiesta ? '0 4px 12px rgba(0,0,0,0.15)' : '0 1px 3px rgba(0,0,0,0.04)',
          }}
        >
          {contact.name && <p className="text-lg font-semibold mb-4">{contact.name}</p>}
          <div className="space-y-2 text-sm opacity-70">
            {contact.email && (
              <a
                href={`mailto:${contact.email}`}
                className="block hover:opacity-100 transition-opacity"
                style={{ color: isFiesta ? '#FFD700' : theme.accent }}
              >
                {contact.email}
              </a>
            )}
            {contact.phone && (
              <a
                href={`tel:${contact.phone.replace(/\D/g, '')}`}
                className="block hover:opacity-100 transition-opacity"
                style={{ color: isFiesta ? '#FFD700' : theme.accent }}
              >
                {contact.phone}
              </a>
            )}
          </div>
        </div>
      )}

      <LinksSection links={page.links} theme={theme} />
    </div>
  );
}

function LinksSection({ links, theme }: { links?: EventPage['links']; theme: EventTheme }) {
  if (!links || links.length === 0) return null;

  return (
    <div className="mt-10 flex flex-wrap justify-center gap-3">
      {links.map((link) => (
        <a
          key={link.url}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-all hover:scale-[1.02]"
          style={{
            backgroundColor: theme.accent,
            color: '#ffffff',
          }}
        >
          {link.label}
          <svg
            aria-hidden="true"
            className="w-3.5 h-3.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
            />
          </svg>
        </a>
      ))}
    </div>
  );
}
