import { motion } from 'framer-motion'

const rows = [
  { label: 'role', value: 'AI Engineer @ Invoke Public Sector', accent: true },
  { label: 'building', value: 'AI automation tools for Public Sector workflows' },
  { label: 'learning', value: 'Advanced RAG patterns & agentic system design' },
  { label: 'reading', value: 'Meditations — Marcus Aurelius' },
  { label: 'location', value: 'Texas, USA' },
]

export default function NowCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="bg-surface border border-ink rounded-atelier-card p-6 flex flex-col flex-1"
    >
      <div className="flex items-center justify-between mb-6">
        <p className="text-xs font-semibold text-ink">Now</p>
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-accent-warm" />
          <span className="font-mono text-[10px] text-muted">live</span>
        </div>
      </div>

      <div className="flex flex-col gap-4 flex-1 justify-center">
        {rows.map((row) => (
          <div key={row.label} className="flex gap-4 items-baseline">
            <span className="font-mono text-[10px] text-muted w-16 shrink-0">{row.label}</span>
            <span className={`text-xs leading-snug ${row.accent ? 'text-accent' : 'text-ink'}`}>
              {row.value}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  )
}
