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
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="bg-card border border-border rounded-2xl p-6 flex flex-col"
    >
      <div className="flex items-center justify-between mb-5">
        <p className="text-xs font-medium text-light">What I&apos;m Reading</p>
        <a
          href="https://news.ycombinator.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-muted hover:text-light transition-colors duration-200"
        >
          HN →
        </a>
      </div>

      <div className="flex flex-col gap-px flex-1">
        {stories.length === 0
          ? Array.from({ length: TOP_N }).map((_, i) => (
              <div key={i} className="h-12 rounded-lg animate-pulse bg-border/50 opacity-30 mb-1" />
            ))
          : stories.map((story, i) => (
              <a
                key={story.id}
                href={story.url || `https://news.ycombinator.com/item?id=${story.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 py-3 border-b border-border last:border-0 group hover:bg-white/[0.02] -mx-2 px-2 rounded transition-colors duration-150"
              >
                <span className="font-mono text-[10px] text-muted w-4 shrink-0">{i + 1}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-muted-light leading-snug line-clamp-2 group-hover:text-light transition-colors duration-150">
                    {story.title}
                  </p>
                  <p className="text-[10px] text-muted mt-0.5 font-mono">{story.score}pt · {story.by}</p>
                </div>
              </a>
            ))}
      </div>
    </motion.div>
  )
}
