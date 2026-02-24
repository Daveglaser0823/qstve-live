/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // QStve brand palette
        'bionic-red': '#C8281E',
        'deep-black': '#0A0A0E',
        'warm-white': '#F0F0EC',
        // Utility colors for text/borders
        'muted': '#8A8A86',
        'muted-dark': '#5A5A56',
        'border-subtle': '#2A2A2E',
        // Legacy aliases (for existing pages like blog, about, etc.)
        ink: '#0F172A',
        paper: '#FAFAF7',
        surface: '#FFFFFF',
        secondary: '#64748B',
        border: '#E8E4DB',
        cream: '#F5EFE3',
        navy: '#1E3A5F',
        'navy-light': '#2D5F9E',
        copper: '#C8873C',
        'copper-light': '#E0A060',
      },
      fontFamily: {
        sans: ['Chakra Petch', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        mono: ['Space Mono', 'JetBrains Mono', 'Fira Code', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        display: ['4.5rem', { lineHeight: '1.1', letterSpacing: '-0.03em' }],
      },
      maxWidth: {
        'reading': '68ch',
        'content': '1200px',
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            '--tw-prose-body': theme('colors.ink'),
            '--tw-prose-headings': theme('colors.ink'),
            '--tw-prose-links': theme('colors.navy'),
            '--tw-prose-bold': theme('colors.ink'),
            '--tw-prose-quotes': theme('colors.ink'),
            '--tw-prose-quote-borders': theme('colors.copper'),
            '--tw-prose-code': theme('colors.navy'),
            '--tw-prose-pre-bg': theme('colors.cream'),
            maxWidth: '68ch',
            fontSize: '1.0625rem',
            lineHeight: '1.75',
            letterSpacing: '-0.01em',
            p: { marginBottom: '1.4em' },
            'blockquote p': {
              fontStyle: 'normal',
              fontWeight: '440',
            },
            blockquote: {
              borderLeftColor: theme('colors.copper'),
              borderLeftWidth: '3px',
              backgroundColor: theme('colors.cream'),
              paddingLeft: '1.25rem',
              paddingTop: '0.75rem',
              paddingBottom: '0.75rem',
              borderRadius: '0 4px 4px 0',
            },
          },
        },
        invert: {
          css: {
            '--tw-prose-body': '#F5F2EC',
            '--tw-prose-headings': '#F5F2EC',
            '--tw-prose-links': '#5B8FD4',
            '--tw-prose-bold': '#F5F2EC',
            '--tw-prose-quote-borders': '#D4944A',
            blockquote: {
              backgroundColor: '#2A2520',
              borderLeftColor: '#D4944A',
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
