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
      () => fetchWeather(38.9072, -77.0369), // fallback: Washington DC
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
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden px-6">
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(#00f5d4 1px, transparent 1px), linear-gradient(90deg, #00f5d4 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10 flex flex-col-reverse md:flex-row items-center gap-12 md:gap-16">
        {/* Text */}
        <div className="flex-1 text-center md:text-left">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-mono text-accent text-sm mb-4 tracking-widest uppercase"
          >
            Hello, world. I&apos;m
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="text-5xl md:text-6xl font-bold text-light mb-4 tracking-tight"
          >
            Marcellous Curtis
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="h-10 flex items-center md:justify-start justify-center mb-6"
          >
            <span className="font-mono text-xl md:text-2xl text-accent">
              {displayed}
              <span className="animate-pulse">|</span>
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65 }}
            className="text-muted text-lg max-w-xl mb-10 leading-relaxed"
          >
            Automation and AI Engineer with 3 years of Public Sector consulting experience.
            I leverage LLMs and RPA to eliminate manual work — reducing over 3,000+ hours annually.
            Desire to build software that improves the human experience.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
          >
            <a
              href="#projects"
              className="px-8 py-3 bg-accent text-bg font-semibold rounded-lg hover:bg-accent-dim transition-colors duration-200 font-mono text-sm"
            >
              View My Work
            </a>
            <a
              href="#contact"
              className="px-8 py-3 border border-accent text-accent font-semibold rounded-lg hover:bg-accent/10 transition-colors duration-200 font-mono text-sm"
            >
              Contact Me
            </a>
          </motion.div>

          {weather && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.0 }}
              className="mt-6 flex justify-center md:justify-start"
            >
              <span className="font-mono text-xs text-muted border border-accent/20 rounded-full px-4 py-1.5 bg-accent/5">
                {weather.icon} {weather.city} · {weather.tempF}°F
              </span>
            </motion.div>
          )}
        </div>

        {/* Photo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="flex-shrink-0"
        >
          <div className="relative w-64 h-64 md:w-80 md:h-80">
            {/* Glow ring */}
            <div className="absolute inset-0 rounded-full bg-accent/20 blur-2xl" />
            {/* Accent border */}
            <div className="absolute inset-0 rounded-full border-2 border-accent/40" />
            <img
              src="/images/photo2.jpg"
              alt="Marcellous Curtis"
              className="relative w-full h-full object-cover rounded-full border-4 border-card" style={{ objectPosition: '50% 15%' }}
            />
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-mono text-xs text-muted tracking-widest">scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-0.5 h-8 bg-gradient-to-b from-accent to-transparent"
        />
      </motion.div>
    </section>
  )
}
