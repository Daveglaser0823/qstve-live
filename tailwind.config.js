/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        dark: '#0A0A0E',
        light: '#F0F0EC',
        red: '#C8281E',
      },
      fontFamily: {
        chakra: ['Chakra Petch', 'sans-serif'],
        mono: ['Space Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
