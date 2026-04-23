# Marcellous — Personal Website

My portfolio site. React + Vite + Tailwind, dark theme with a monochrome numbered-section layout (01, 02, 03…) and a "Live" bento grid that pulls in real data from GitHub, Spotify, Strava, and Hacker News.

## Sections

1. **Hero** (`components/Hero.jsx`)
2. **Skills** (`components/Skills.jsx`)
3. **Projects** (`components/Projects.jsx`)
4. **Experience** (`components/Experience.jsx`)
5. **Live** bento grid — GitHub contribution stats, Stoic quote of the day, Spotify now-playing, Hacker News top stories, Strava activity card.
6. **Mind & Journey** — `PhilosophyTerminal` (a terminal-style philosopher quote widget) + career `Timeline`.
7. **Contact**.

## Stack

- **React 18** + **Vite 5**
- **Tailwind CSS 3** + `tailwind-merge`, `clsx`, `class-variance-authority`
- **framer-motion** for scroll-reveal animations
- **lucide-react** icons
- **recharts** for charts inside the GitHub/Strava cards

## Run

```bash
npm install
npm run dev      # vite dev server
npm run build    # production build to ./dist
npm run preview  # serve the built bundle
```

## Live-data cards

`GitHubStats`, `SpotifyCard`, `StravaCard`, `HackerNews`, and `StoicQuote` each fetch their own data. If you fork this, check each component for the endpoint/token it expects (e.g., Spotify needs a refresh token; Strava needs an OAuth client). Without those, the cards fall back to empty/placeholder state but the rest of the site still renders.
