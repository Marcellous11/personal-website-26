import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const GITHUB_USER = 'Marcellous11'

const LEVEL_COLORS = [
  'bg-white/5',       // 0 — none
  'bg-accent/20',     // 1 — low
  'bg-accent/40',     // 2 — medium
  'bg-accent/70',     // 3 — high
  'bg-accent',        // 4 — max
]

function buildWeeks(contributions) {
  const weeks = []
  let week = []
  contributions.forEach((day, i) => {
    week.push(day)
    if (week.length === 7) {
      weeks.push(week)
      week = []
    }
  })
  if (week.length) weeks.push(week)
  return weeks
}

function getMonthLabels(contributions) {
  const labels = []
  let lastMonth = -1
  contributions.forEach((day, i) => {
    const month = new Date(day.date).getMonth()
    if (month !== lastMonth) {
      labels.push({ weekIndex: Math.floor(i / 7), label: new Date(day.date).toLocaleString('default', { month: 'short' }) })
      lastMonth = month
    }
  })
  return labels
}

export default function GitHubStats() {
  const [data, setData] = useState(null)

  useEffect(() => {
    fetch(`https://github-contributions-api.jogruber.de/v4/${GITHUB_USER}?y=last`)
      .then(r => r.json())
      .then(setData)
      .catch(() => {})
  }, [])

  const weeks = data ? buildWeeks(data.contributions) : []
  const monthLabels = data ? getMonthLabels(data.contributions) : []
  const total = data ? Object.values(data.total).reduce((a, b) => a + b, 0) : null

  return (
    <section className="py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="bg-card border border-white/5 rounded-2xl px-8 py-6"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="text-muted shrink-0" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z" />
              </svg>
              <span className="text-sm font-medium text-light">GitHub Activity</span>
              {total !== null && (
                <span className="text-xs text-muted">
                  {total.toLocaleString()} contributions in the last year
                </span>
              )}
            </div>
            <a
              href={`https://github.com/${GITHUB_USER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-10 text-xs text-muted border border-white/8 rounded-lg px-4 py-1.5 hover:text-light hover:border-white/15 transition-all duration-200 whitespace-nowrap"
            >
              View Profile →
            </a>
          </div>

          {/* Contribution grid */}
          {data ? (
            <div className="overflow-x-auto">
              <div className="inline-block min-w-max">
                {/* Month labels */}
                <div className="flex mb-1 ml-0" style={{ gap: '3px' }}>
                  {weeks.map((_, wi) => {
                    const label = monthLabels.find(m => m.weekIndex === wi)
                    return (
                      <div key={wi} className="w-[10px] text-[9px] text-muted leading-none">
                        {label ? label.label : ''}
                      </div>
                    )
                  })}
                </div>
                {/* Grid rows (days 0–6) */}
                {Array.from({ length: 7 }).map((_, day) => (
                  <div key={day} className="flex" style={{ gap: '3px', marginBottom: '3px' }}>
                    {weeks.map((week, wi) => {
                      const cell = week[day]
                      if (!cell) return <div key={wi} className="w-[10px] h-[10px]" />
                      return (
                        <div
                          key={wi}
                          title={`${cell.date}: ${cell.count} contribution${cell.count !== 1 ? 's' : ''}`}
                          className={`w-[10px] h-[10px] rounded-[2px] ${LEVEL_COLORS[cell.level ?? 0]}`}
                        />
                      )
                    })}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="h-20 flex items-center justify-center">
              <span className="text-xs text-muted animate-pulse">Loading contributions…</span>
            </div>
          )}

          {/* Legend */}
          <div className="flex items-center gap-2 mt-4 justify-end">
            <span className="text-[10px] text-muted">Less</span>
            {LEVEL_COLORS.map((cls, i) => (
              <div key={i} className={`w-[10px] h-[10px] rounded-[2px] ${cls}`} />
            ))}
            <span className="text-[10px] text-muted">More</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
