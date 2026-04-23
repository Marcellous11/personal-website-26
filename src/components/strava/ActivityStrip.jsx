import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

const DAYS = 14

// Activity fills — Run stays Strava brand orange; everything else maps to
// the Atelier accent family.
function typeColor(type) {
  switch (type) {
    case 'Run':  return '#FC4C02'          // Strava brand
    case 'Ride': return '#1E4CA8'          // accent ultramarine
    case 'Swim': return '#8FB5C7'          // accent-light dusty teal
    case 'Walk': return '#D9A42A'          // accent-mustard
    default:     return '#FC4C02'
  }
}

export default function ActivityStrip({ activities = [] }) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const buckets = Array.from({ length: DAYS }, (_, i) => {
    const date = new Date(today)
    date.setDate(today.getDate() - (DAYS - 1 - i))
    const key = date.toISOString().slice(0, 10)
    const todays = activities.filter(a => a.startDate?.slice(0, 10) === key)
    const distance = todays.reduce((sum, a) => sum + a.distance, 0)
    const dominantType = todays[0]?.type
    return { date, distance, count: todays.length, dominantType }
  })

  const max = Math.max(...buckets.map(b => b.distance), 1)

  return (
    <div>
      <p className="font-mono text-[8px] text-muted uppercase tracking-widest mb-2">Last 14 Days</p>
      <div className="flex items-end gap-[3px] h-10">
        {buckets.map((b, i) => {
          const active = b.distance > 0
          const height = active ? Math.max((b.distance / max) * 100, 18) : 6
          return (
            <div key={i} className="flex-1 flex flex-col justify-end">
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: `${height}%`, opacity: 1 }}
                transition={{ delay: i * 0.035, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className={cn('w-full rounded-atelier-sm min-h-[3px] border border-ink')}
                style={{ backgroundColor: active ? typeColor(b.dominantType) : '#D0CBBE' }}
                title={`${b.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} — ${
                  active ? `${(b.distance / 1609.34).toFixed(2)} mi, ${b.count} activity${b.count > 1 ? 's' : ''}` : 'Rest day'
                }`}
              />
            </div>
          )
        })}
      </div>
      <div className="flex items-center justify-between mt-1.5 font-mono text-[8px] text-muted">
        <span>{buckets[0].date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
        <span>today</span>
      </div>
    </div>
  )
}
