import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const GITHUB_USER = 'Marcellous11'

// Atelier colored-tile ramp: paperDeep → ultramarine. Each cell is a
// solid fill with an ink hairline — no tints per spec §Flat fills.
const LEVEL_COLORS = [
  { bg: '#D0CBBE' }, // paperDeep (no activity)
  { bg: '#BBC7DC' }, // lightest ultramarine (mixed w/ paper)
  { bg: '#7A95C5' },
  { bg: '#4A74B8' },
  { bg: '#1E4CA8' }, // full accent
]

function buildWeeks(contributions) {
  const weeks = []
  let week = []
  contributions.forEach((day) => {
    week.push(day)
    if (week.length === 7) { weeks.push(week); week = [] }
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
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="bg-surface border border-ink rounded-atelier-card p-6"
    >
      <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
        <div>
          <p className="text-xs font-semibold text-ink">GitHub Activity</p>
          {total !== null && (
            <p className="text-[11px] text-muted mt-0.5">{total.toLocaleString()} contributions this year</p>
          )}
        </div>
        <a
          href={`https://github.com/${GITHUB_USER}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-accent hover:text-accent-dim transition-colors duration-200"
        >
          @{GITHUB_USER} →
        </a>
      </div>

      {data ? (
        <div className="overflow-x-auto">
          <div className="inline-block min-w-max">
            <div className="flex mb-1" style={{ gap: '3px' }}>
              {weeks.map((_, wi) => {
                const label = monthLabels.find(m => m.weekIndex === wi)
                return (
                  <div key={wi} className="w-[10px] text-[8px] text-muted leading-none font-mono">
                    {label ? label.label : ''}
                  </div>
                )
              })}
            </div>
            {Array.from({ length: 7 }).map((_, day) => (
              <div key={day} className="flex" style={{ gap: '3px', marginBottom: '3px' }}>
                {weeks.map((week, wi) => {
                  const cell = week[day]
                  if (!cell) return <div key={wi} className="w-[10px] h-[10px]" />
                  const level = LEVEL_COLORS[cell.level ?? 0]
                  return (
                    <div
                      key={wi}
                      title={`${cell.date}: ${cell.count} contribution${cell.count !== 1 ? 's' : ''}`}
                      className="w-[10px] h-[10px] rounded-atelier-sm border border-ink"
                      style={{ backgroundColor: level.bg }}
                    />
                  )
                })}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="h-20 flex items-center justify-center">
          <span className="text-xs text-muted">Loading…</span>
        </div>
      )}

      <div className="flex items-center gap-1.5 mt-3 justify-end">
        <span className="text-[9px] text-muted">Less</span>
        {LEVEL_COLORS.map((level, i) => (
          <div
            key={i}
            className="w-[9px] h-[9px] rounded-atelier-sm border border-ink"
            style={{ backgroundColor: level.bg }}
          />
        ))}
        <span className="text-[9px] text-muted">More</span>
      </div>
    </motion.div>
  )
}
