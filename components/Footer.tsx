import Link from 'next/link'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-ink text-[#9B9590] mt-24">
      <div className="max-w-content mx-auto px-6 py-16">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10">
          {/* Left: Brand */}
          <div className="flex flex-col gap-2">
            <span className="font-bold text-xl tracking-[-0.04em] text-[#F5F2EC]">QSTVE</span>
            <span className="text-sm">Dave Glaser</span>
            <span className="text-sm">CEO, Dwolla</span>
            <span className="text-xs mt-1 text-[#6B6862]">Built by human + AI</span>
          </div>

          {/* Center: Nav */}
          <div className="flex flex-col gap-3">
            <span className="text-xs uppercase tracking-widest text-[#6B6862] mb-1">Writing</span>
            <Link href="/blog" className="text-sm hover:text-[#F5F2EC] transition-colors">All Posts</Link>
            <Link href="/man-and-machine" className="text-sm hover:text-[#F5F2EC] transition-colors">Man & Machine</Link>
            <Link href="/newsletter" className="text-sm hover:text-[#F5F2EC] transition-colors">Newsletter</Link>
            <Link href="/about" className="text-sm hover:text-[#F5F2EC] transition-colors">About</Link>
          </div>

          {/* Right: Social */}
          <div className="flex flex-col gap-3">
            <span className="text-xs uppercase tracking-widest text-[#6B6862] mb-1">Find Dave</span>
            <a
              href="https://www.linkedin.com/in/daveglaser/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm hover:text-[#F5F2EC] transition-colors flex items-center gap-2"
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
              className="text-sm hover:text-[#F5F2EC] transition-colors flex items-center gap-2"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
              X (Twitter)
            </a>
            <a
              href="/feed.xml"
              className="text-sm hover:text-[#F5F2EC] transition-colors flex items-center gap-2"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 11a9 9 0 019 9M4 4a16 16 0 0116 16"/>
                <circle cx="5" cy="19" r="1" fill="currentColor" stroke="none"/>
              </svg>
              RSS
            </a>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-[#2C2C28] text-xs text-[#6B6862]">
          &copy; {year} Dave Glaser. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
