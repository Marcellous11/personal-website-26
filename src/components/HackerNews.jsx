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
    <section className="py-24 px-6 bg-surface/30">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="font-mono text-accent text-sm tracking-widest uppercase mb-3">Live from HN</p>
          <h2 className="text-4xl md:text-5xl font-bold text-light">What I&apos;m Reading</h2>
        </motion.div>

        <div className="flex flex-col gap-4">
          {stories.length === 0
            ? Array.from({ length: TOP_N }).map((_, i) => (
                <div key={i} className="h-16 bg-card rounded-xl animate-pulse opacity-40" />
              ))
            : stories.map((story, i) => (
                <motion.a
                  key={story.id}
                  href={story.url || `https://news.ycombinator.com/item?id=${story.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  whileHover={{ x: 4 }}
                  className="flex items-center gap-5 bg-card rounded-xl px-6 py-4 gradient-border hover:glow transition-all duration-300 group"
                >
                  <span className="font-mono text-2xl font-bold text-accent/30 w-6 shrink-0 text-right">
                    {i + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-light text-sm font-medium leading-snug truncate group-hover:text-accent transition-colors duration-200">
                      {story.title}
                    </p>
                    <p className="font-mono text-xs text-muted mt-1">
                      {story.score} pts · {story.by}
                    </p>
                  </div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    className="shrink-0 text-muted group-hover:text-accent transition-colors duration-200"
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
            className="font-mono text-xs text-muted hover:text-accent transition-colors duration-200"
          >
            More on Hacker News →
          </a>
        </motion.div>
      </div>
    </section>
  )
}
