import Logo from './Logo'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-deep-black border-t border-border-subtle">
      <div className="max-w-content mx-auto px-6 py-16">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          {/* Brand */}
          <div className="flex items-center gap-4">
            <Logo variant="icon" theme="dark" size={28} />
            <span className="text-xs text-muted-dark">Built by human + AI</span>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-6">
            <a
              href="https://www.linkedin.com/in/daveglaser/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-warm-white transition-colors flex items-center gap-2 text-sm"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
                <circle cx="4" cy="4" r="2"/>
              </svg>
              LinkedIn
            </a>
            <a
              href="https://x.com/daveglaser"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-warm-white transition-colors flex items-center gap-2 text-sm"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
              X
            </a>
            <a
              href="/feed.xml"
              className="text-muted hover:text-warm-white transition-colors flex items-center gap-2 text-sm"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 11a9 9 0 019 9M4 4a16 16 0 0116 16"/>
                <circle cx="5" cy="19" r="1" fill="currentColor" stroke="none"/>
              </svg>
              RSS
            </a>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border-subtle text-xs text-muted-dark">
          &copy; {year} QStve. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
