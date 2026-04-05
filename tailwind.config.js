/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: '#0A0A0A',
        surface: '#111111',
        card: '#161616',
        accent: '#C8FF00',
        'accent-dim': '#9DC200',
        muted: '#525252',
        'muted-light': '#888888',
        light: '#F0F0F0',
        border: '#1E1E1E',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      fontSize: {
        'display': ['clamp(3.5rem, 10vw, 8rem)', { lineHeight: '0.92', letterSpacing: '-0.04em' }],
      },
    },
  },
  plugins: [],
}
