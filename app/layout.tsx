import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'QStve \u2014 Power On Intelligence',
  description: 'Man & Machine',
  openGraph: {
    title: 'QStve \u2014 Power On Intelligence',
    description: 'Man & Machine',
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
        <link
          href="https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@400;600;700&family=Space+Mono:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-dark text-light font-chakra">
        {children}
      </body>
    </html>
  )
}
