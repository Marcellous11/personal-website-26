import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const TOP_N = 5

export default function HackerNews() {
  const [stories, setStories] = useState([])

  useEffect(() => {
    async function load() {
      const ids = await fetch('https://hacker-news.firebaseio.com/v0/topstories.json').then(r => r.json())
      const top = await Promise.all(
        ids.slice(0, TOP_N).map(id =>
          fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`).then(r => r.json())
        )
      )
      setStories(top.filter(Boolean))
    }
    load()
  }, [])

  return (
    <section className="py-24 px-6 bg-surface/50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center mb-12"
        >
          <p className="text-xs font-medium text-accent uppercase tracking-wider mb-3">Live from HN</p>
          <h2 className="text-4xl md:text-5xl font-bold text-light">What I&apos;m Reading</h2>
        </motion.div>

        <div className="flex flex-col gap-3">
          {stories.length === 0
            ? Array.from({ length: TOP_N }).map((_, i) => (
                <div key={i} className="h-16 bg-card border border-white/5 rounded-xl animate-pulse opacity-30" />
              ))
            : stories.map((story, i) => (
                <motion.a
                  key={story.id}
                  href={story.url || `https://news.ycombinator.com/item?id=${story.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.5, delay: i * 0.06, ease: 'easeOut' }}
                  whileHover={{ x: 3 }}
                  className="flex items-center gap-5 bg-card border border-white/5 rounded-xl px-6 py-4 hover:border-white/10 transition-all duration-200 group"
                >
                  <span className="text-sm font-semibold text-white/20 w-5 shrink-0 text-right tabular-nums">
                    {i + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-light text-sm font-medium leading-snug truncate group-hover:text-accent transition-colors duration-200">
                      {story.title}
                    </p>
                    <p className="text-xs text-muted mt-1">
                      {story.score} pts · {story.by}
                    </p>
                  </div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    className="shrink-0 text-muted/40 group-hover:text-muted transition-colors duration-200"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </motion.a>
              ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-8"
        >
          <a
            href="https://news.ycombinator.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-muted hover:text-light transition-colors duration-200"
          >
            More on Hacker News →
          </a>
        </motion.div>
      </div>
    </section>
  )
}
