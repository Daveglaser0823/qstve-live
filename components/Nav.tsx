import Link from 'next/link'
import Logo from './Logo'

export default function Nav() {
  return (
    <nav className="sticky top-0 z-50 bg-deep-black/95 backdrop-blur-sm border-b border-border-subtle">
      <div className="max-w-content mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo - compact on mobile, full on desktop */}
        <Link href="/" className="flex items-center">
          <span className="md:hidden">
            <Logo variant="compact" theme="dark" />
          </span>
          <span className="hidden md:flex">
            <Logo variant="full" theme="dark" />
          </span>
        </Link>
      </div>
    </nav>
  )
}
