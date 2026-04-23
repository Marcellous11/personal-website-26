import { motion } from 'framer-motion'

const items = [
  {
    period: 'Dec 2024 — Present',
    title: 'AI Engineer',
    org: 'Invoke Public Sector',
    tags: ['LLM Integration', 'RAG', 'Agentic Workflows'],
    type: 'work',
    current: true,
  },
  {
    period: 'Apr 2023 — Dec 2024',
    title: 'Automation Developer',
    org: 'Invoke Public Sector',
    tags: ['UiPath RPA', 'Python', '3,000+ hrs saved'],
    type: 'work',
  },
  {
    period: '2024 — Est. 2027',
    title: 'B.S. Software Development',
    org: 'BYU-Idaho Pathways',
    tags: ['In Progress'],
    type: 'edu',
  },
  {
    period: '2022 — 2025',
    title: 'Associate of Science',
    org: 'Collin College',
    tags: ['Computer Science'],
    type: 'edu',
  },
]

export default function Timeline() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="bg-surface border border-ink rounded-atelier-card p-6 flex flex-col flex-1"
    >
      <p className="text-xs font-semibold text-ink mb-7">Career & Education</p>

      <div className="relative flex flex-col">
        {/* Vertical connector line */}
        <div className="absolute left-[4px] top-2 bottom-2 w-px bg-ink" />

        {items.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.09, ease: [0.16, 1, 0.3, 1] }}
            className="flex gap-4 pb-7 last:pb-0 relative"
          >
            {/* Dot */}
            <div className="shrink-0 mt-[5px] relative z-10">
              <div
                className={`w-[9px] h-[9px] rounded-full border border-ink ${
                  item.type === 'work'
                    ? item.current
                      ? 'bg-accent-warm'
                      : 'bg-accent'
                    : 'bg-paper'
                }`}
              />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <p className="font-mono text-[10px] text-muted mb-0.5 leading-none">{item.period}</p>
              <p className="text-sm font-semibold text-ink leading-snug mt-1">{item.title}</p>
              <p className="text-xs text-muted mb-2">{item.org}</p>
              <div className="flex flex-wrap gap-1.5">
                {item.tags.map(tag => (
                  <span
                    key={tag}
                    className={`font-mono text-[10px] px-2 py-0.5 rounded-atelier-sm border border-ink ${
                      item.current && item.type === 'work'
                        ? 'bg-surface text-accent'
                        : 'bg-surface text-muted'
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
