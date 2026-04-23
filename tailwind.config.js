/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Atelier — paper-and-ink (Mœbius). Existing token names preserved so
        // call sites keep working; only the colors flip.
        bg: '#E2DDD0',           // paper (root background)
        surface: '#D8D3C5',      // card (raised)
        card: '#D0CBBE',         // paperDeep (recessed)
        light: '#1A1612',        // textPrimary (warm-black ink)
        muted: '#5C544A',        // textSecondary (dusty brown-grey)
        'muted-light': '#8A8175',// lighter textSecondary
        border: '#1A1612',       // strokeStrong (ink)
        accent: '#1E4CA8',       // ultramarine
        'accent-dim': '#163C88', // accent hover (darker ultramarine)

        // Atelier semantic accent family (new tokens)
        'accent-warm': '#E8822B',    // burnt orange — one-per-screen focal
        'accent-alert': '#C84536',   // brick red — urgent / overdue
        'accent-mustard': '#D9A42A', // signage yellow — labels only
        'accent-light': '#8FB5C7',   // dusty teal — cool-but-not-action

        // Explicit aliases for new code
        ink: '#1A1612',
        paper: '#E2DDD0',
        'paper-deep': '#D0CBBE',
      },
      fontFamily: {
        sans: ['JetBrains Mono', 'ui-monospace', 'monospace'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        'display': ['clamp(3.5rem, 10vw, 8rem)', { lineHeight: '0.92', letterSpacing: '-0.04em' }],
      },
      borderRadius: {
        'atelier-sm': '3px',
        'atelier': '5px',
        'atelier-md': '6px',
        'atelier-lg': '8px',
        'atelier-card': '10px',
      },
    },
  },
  plugins: [],
}
