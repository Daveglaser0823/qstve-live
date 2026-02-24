import type { Metadata } from 'next'
import './globals.css'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: {
    default: 'QStve - Power On Intelligence',
    template: '%s | QStve',
  },
  description: 'Man & Machine',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://qstve.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://qstve.com',
    siteName: 'QStve',
    title: 'QStve - Power On Intelligence',
    description: 'Man & Machine',
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
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@400;600;700&family=Space+Mono:wght@400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-deep-black text-warm-white min-h-screen flex flex-col antialiased">
        <Nav />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
