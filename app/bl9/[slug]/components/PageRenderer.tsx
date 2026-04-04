'use client';

import type { EventPage, EventTheme } from '../lib/types';

interface PageRendererProps {
  page: EventPage;
  theme: EventTheme;
}

export default function PageRenderer({ page, theme }: PageRendererProps) {
  return (
    <div
      className="min-h-[100dvh] flex flex-col items-center justify-center px-6 py-16"
      style={{ backgroundColor: theme.background, color: theme.text }}
    >
      <div className="max-w-2xl w-full mx-auto">
        {/* Page title */}
        <div className="w-8 h-px mx-auto mb-8" style={{ backgroundColor: theme.accent2 }} />
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-10 font-serif">
          {page.title}
        </h2>

        {/* Layout-specific content */}
        {page.layout === 'text' && <TextLayout page={page} theme={theme} />}
        {page.layout === 'bullets' && <BulletsLayout page={page} theme={theme} />}
        {page.layout === 'documents' && <DocumentsLayout page={page} theme={theme} />}
        {page.layout === 'contact' && <ContactLayout page={page} theme={theme} />}
      </div>
    </div>
  );
}

function TextLayout({ page, theme }: { page: EventPage; theme: EventTheme }) {
  return (
    <div className="space-y-6">
      {page.body?.map((paragraph) => (
        <p
          key={paragraph.slice(0, 40)}
          className="text-base sm:text-lg leading-relaxed text-center opacity-80"
        >
          {paragraph}
        </p>
      ))}
      <LinksSection links={page.links} theme={theme} />
    </div>
  );
}

function BulletsLayout({ page, theme }: { page: EventPage; theme: EventTheme }) {
  return (
    <div>
      <ul className="space-y-4 max-w-lg mx-auto">
        {page.body?.map((item) => (
          <li
            key={item.slice(0, 40)}
            className="flex items-start gap-3 text-base sm:text-lg leading-relaxed"
          >
            <span
              className="mt-2 w-2 h-2 rounded-full flex-shrink-0"
              style={{ backgroundColor: theme.accent }}
            />
            <span className="opacity-80">{item}</span>
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

function ContactLayout({ page, theme }: { page: EventPage; theme: EventTheme }) {
  const contact = page.contact;

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

      {contact && (
        <div
          className="rounded-xl px-8 py-8 max-w-sm mx-auto text-center"
          style={{
            backgroundColor: theme.card,
            boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
          }}
        >
          <p className="text-lg font-semibold mb-4">{contact.name}</p>
          <div className="space-y-2 text-sm opacity-70">
            <a
              href={`mailto:${contact.email}`}
              className="block hover:opacity-100 transition-opacity"
              style={{ color: theme.accent }}
            >
              {contact.email}
            </a>
            <a
              href={`tel:${contact.phone.replace(/\D/g, '')}`}
              className="block hover:opacity-100 transition-opacity"
              style={{ color: theme.accent }}
            >
              {contact.phone}
            </a>
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
