/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: '#0c0c0e',
        surface: '#141416',
        card: '#1c1c1f',
        accent: '#a78bfa',
        'accent-dim': '#8b5cf6',
        muted: '#6b7280',
        light: '#f9fafb',
        border: '#2a2a2d',
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
