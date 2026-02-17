import type { Metadata } from 'next'
import './globals.css'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: {
    default: 'Dave Glaser | Man & Machine',
    template: '%s | Dave Glaser',
  },
  description: "A CEO's real journey building with AI. Not theory. Not hype. What's actually working.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://qstve.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://qstve.com',
    siteName: 'QSTVE',
    title: 'Dave Glaser | Man & Machine',
    description: "A CEO's real journey building with AI. Not theory. Not hype. What's actually working.",
  },
  twitter: {
    card: 'summary_large_image',
    site: '@daveglaser',
    creator: '@daveglaser',
  },
  alternates: {
    types: {
      'application/rss+xml': '/feed.xml',
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Inline script: set dark class before first paint to prevent flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var t = localStorage.getItem('theme');
                if (t === 'dark' || (!t && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark');
                }
              } catch(e) {}
            `,
          }}
        />
      </head>
      <body className="bg-paper dark:bg-[#111110] text-ink dark:text-[#F5F2EC] min-h-screen flex flex-col antialiased transition-colors duration-150">
        <Nav />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
