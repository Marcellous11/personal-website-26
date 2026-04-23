import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

function wmoIcon(code) {
  if (code === 0) return '☀️'
  if (code <= 3) return '⛅'
  if (code <= 48) return '🌫️'
  if (code <= 67) return '🌧️'
  if (code <= 77) return '❄️'
  if (code <= 82) return '🌦️'
  return '⛈️'
}

const titles = [
  'Automation + AI Engineer',
  'Full Stack Developer',
  'RPA Developer',
  'LLM Systems Builder',
]

const stats = [
  { value: '3,000+', label: 'hours saved annually' },
  { value: '3 yrs', label: 'public sector consulting' },
  { value: '10+', label: 'automations shipped' },
]

export default function Hero() {
  const [titleIndex, setTitleIndex] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [deleting, setDeleting] = useState(false)
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    async function fetchWeather(lat, lon) {
      const [meteo, geo] = await Promise.all([
        fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`).then(r => r.json()),
        fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`).then(r => r.json()),
      ])
      const city = geo.city || geo.locality || geo.principalSubdivision || 'Your City'
      const tempF = Math.round(meteo.current_weather.temperature * 9 / 5 + 32)
      const icon = wmoIcon(meteo.current_weather.weathercode)
      setWeather({ city, tempF, icon })
    }
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => fetchWeather(coords.latitude, coords.longitude),
      () => fetchWeather(38.9072, -77.0369),
    )
  }, [])

  useEffect(() => {
    const current = titles[titleIndex]
    let timeout
    if (!deleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 80)
    } else if (!deleting && displayed.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), 2000)
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 45)
    } else if (deleting && displayed.length === 0) {
      setDeleting(false)
      setTitleIndex((i) => (i + 1) % titles.length)
    }
    return () => clearTimeout(timeout)
  }, [displayed, deleting, titleIndex])

  return (
    <section id="hero" className="min-h-screen flex flex-col justify-center relative overflow-hidden px-6 md:px-10 pt-24 pb-16">
      <div className="max-w-7xl mx-auto w-full">
        {/* Top row: availability chip + weather */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex items-center justify-between mb-16 md:mb-20"
        >
          <span className="inline-flex items-center gap-2 bg-surface border border-ink rounded-atelier-md px-2.5 py-1">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-warm" />
            <span className="text-[10px] text-ink uppercase tracking-widest">Available for new projects</span>
          </span>
          {weather && (
            <span className="text-xs text-muted">
              {weather.icon} {weather.city} · {weather.tempF}°F
            </span>
          )}
        </motion.div>

        {/* Main hero grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-10 lg:gap-16 items-end">
          {/* Left: text */}
          <div>
            {/* Display name */}
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-display font-bold text-ink mb-6"
            >
              Marcellous<br />
              <span className="text-accent">Curtis Jr.</span>
            </motion.h1>

            {/* Typewriter role */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="flex items-center gap-3 mb-8"
            >
              <span className="w-8 h-px bg-ink" />
              <span className="text-sm text-muted font-mono">
                {displayed}
                <span className="inline-block w-[7px] h-3.5 bg-ink ml-0.5 align-middle" />
              </span>
            </motion.div>

            {/* Bio */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.85 }}
              className="text-ink text-base leading-relaxed max-w-lg mb-10"
            >
              Automation and AI Engineer with 3 years of Public Sector consulting experience.
              I leverage LLMs and RPA to eliminate manual work and build software that improves the human experience.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.0 }}
              className="flex flex-wrap gap-3"
            >
              <a
                href="#projects"
                className="px-6 py-2.5 bg-accent text-paper text-sm font-bold rounded-atelier-md border border-ink hover:bg-accent-dim transition-colors duration-200"
              >
                View Work
              </a>
              <a
                href="#contact"
                className="px-6 py-2.5 bg-surface border border-ink text-ink text-sm rounded-atelier-md hover:bg-card transition-colors duration-200"
              >
                Get in Touch
              </a>
            </motion.div>
          </div>

          {/* Right: photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex-shrink-0 mx-auto lg:mx-0"
          >
            <div className="relative w-56 h-56 md:w-64 md:h-64 lg:w-72 lg:h-72">
              <img
                src="/images/photo2.jpg"
                alt="Marcellous Curtis"
                className="w-full h-full object-cover rounded-atelier-card border border-ink"
                style={{ objectPosition: '50% 15%' }}
              />
            </div>
          </motion.div>
        </div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          className="mt-16 pt-8 border-t border-ink grid grid-cols-3 gap-6 max-w-xl"
        >
          {stats.map((s) => (
            <div key={s.label}>
              <p className="text-xl font-bold text-ink">{s.value}</p>
              <p className="text-xs text-muted mt-0.5">{s.label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-8 right-10 hidden md:flex flex-col items-center gap-2"
      >
        <span className="w-px h-10 bg-ink" />
        <span className="text-[10px] text-muted tracking-widest rotate-90 origin-center mt-2">SCROLL</span>
      </motion.div>
    </section>
  )
}
