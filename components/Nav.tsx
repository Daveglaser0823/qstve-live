'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import ThemeToggle from './ThemeToggle'

const navLinks = [
  { href: '/blog', label: 'Writing' },
  { href: '/man-and-machine', label: 'Man & Machine' },
  { href: '/newsletter', label: 'Newsletter' },
  { href: '/about', label: 'About' },
]

export default function Nav() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-paper dark:bg-[#111110] border-b border-border dark:border-[#2C2C28] transition-colors">
      <div className="max-w-content mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="font-sans font-bold text-xl tracking-[-0.04em] text-ink dark:text-[#F5F2EC] hover:text-navy dark:hover:text-[#5B8FD4] transition-colors"
        >
          QSTVE
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors ${
                pathname?.startsWith(link.href)
                  ? 'text-ink dark:text-[#F5F2EC] border-b-2 border-copper pb-0.5'
                  : 'text-secondary hover:text-ink dark:hover:text-[#F5F2EC]'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <ThemeToggle />
        </div>

        {/* Mobile: toggle + hamburger */}
        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 text-secondary hover:text-ink dark:hover:text-paper transition-colors"
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 12h18M3 6h18M3 18h18"/>
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-border dark:border-[#2C2C28] bg-paper dark:bg-[#111110] px-6 py-4 flex flex-col gap-4">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`text-sm font-medium transition-colors ${
                pathname?.startsWith(link.href)
                  ? 'text-copper'
                  : 'text-secondary hover:text-ink dark:hover:text-paper'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  )
}
