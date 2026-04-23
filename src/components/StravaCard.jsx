import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardInner } from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { AnimatedNumber } from '@/components/ui/stat'
import ActivityStrip from '@/components/strava/ActivityStrip'
import SportMixChart from '@/components/strava/SportMixChart'
import { cn } from '@/lib/utils'

const WORKER_URL = 'https://strava-stats.1mcj001.workers.dev'

// ── Formatters ──────────────────────────────────────────────────────────────

const metersToMiles = m => m / 1609.34
const metersToYards = m => m * 1.09361
const metersToFeet  = m => m * 3.28084

function fmtPace(speedMps) {
  if (!speedMps || speedMps === 0) return '—'
  const secPerMile = 1609.34 / speedMps
  const m = Math.floor(secPerMile / 60)
  const s = Math.round(secPerMile % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}

function fmtSpeed(speedMps) {
  return (speedMps * 2.23694).toFixed(1)
}

function fmtTime(seconds) {
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  if (h > 0) return `${h}h ${m}m`
  return `${m}m`
}

function fmtTimeLong(seconds) {
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  if (h > 0) return `${h}h ${m.toString().padStart(2, '0')}m`
  return `${m}m`
}

function fmtDate(dateStr) {
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

function relDate(dateStr) {
  const diff = Math.floor((Date.now() - new Date(dateStr)) / 86400000)
  if (diff === 0) return 'Today'
  if (diff === 1) return 'Yesterday'
  if (diff < 7) return `${diff}d ago`
  return fmtDate(dateStr)
}

// ── Activity icons ──────────────────────────────────────────────────────────

function RunIcon({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="15" cy="4" r="1.5" fill="currentColor" stroke="none" />
      <path d="M9 18l2-5 3 2 2-5" />
      <path d="M6 21l3-7" />
      <path d="M18 10c-1 1.5-2 2-4 1.5l-2-1-4 1" />
    </svg>
  )
}

function RideIcon({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="5.5" cy="17" r="3" />
      <circle cx="18.5" cy="17" r="3" />
      <path d="M12 17l-2.5-6H6" />
      <path d="M12 17l4.5-1.5L14 9.5" />
      <path d="M14 9.5L12 7h-2" />
      <circle cx="14.5" cy="5.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

function SwimIcon({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 12c1.5 0 2.5-1 4-1s2.5 1 4 1 2.5-1 4-1 2.5 1 4 1" />
      <path d="M2 16c1.5 0 2.5-1 4-1s2.5 1 4 1 2.5-1 4-1 2.5 1 4 1" />
      <circle cx="19" cy="7" r="1.5" fill="currentColor" stroke="none" />
      <path d="M19 8.5v2l-3 1.5" />
    </svg>
  )
}

function WalkIcon({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="13" cy="4" r="1.5" fill="currentColor" stroke="none" />
      <path d="M10 21l1.5-5 2.5 2 1.5-4" />
      <path d="M7 21l2.5-5" />
      <path d="M7 11.5L10 8l3.5 1.5 2-3" />
    </svg>
  )
}

function WorkoutIcon({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 4v16M18 4v16M2 9h4M18 9h4M2 15h4M18 15h4M6 12h12" />
    </svg>
  )
}

function ActivityIcon({ type, className = '' }) {
  switch (type) {
    case 'Run':     return <RunIcon className={className} />
    case 'Ride':    return <RideIcon className={className} />
    case 'Swim':    return <SwimIcon className={className} />
    case 'Walk':    return <WalkIcon className={className} />
    default:        return <WorkoutIcon className={className} />
  }
}

function activityHex(type) {
  switch (type) {
    case 'Run':  return '#FC4C02'   // Strava brand
    case 'Ride': return '#1E4CA8'   // accent
    case 'Swim': return '#8FB5C7'   // accent-light
    case 'Walk': return '#D9A42A'   // accent-mustard
    default:     return '#FC4C02'
  }
}

// ── Skeleton ────────────────────────────────────────────────────────────────

function Skeleton({ className = '' }) {
  return <div className={cn('bg-card border border-ink rounded-atelier-md', className)} />
}

// ── Streak helper ───────────────────────────────────────────────────────────

function activeStreak(activities = []) {
  if (!activities.length) return 0
  const days = new Set(activities.map(a => a.startDate?.slice(0, 10)))
  let streak = 0
  const cursor = new Date()
  cursor.setHours(0, 0, 0, 0)
  for (let i = 0; i < 365; i++) {
    const key = cursor.toISOString().slice(0, 10)
    if (days.has(key)) {
      streak++
    } else if (i > 0) {
      break
    }
    cursor.setDate(cursor.getDate() - 1)
  }
  return streak
}

// ── Main component ──────────────────────────────────────────────────────────

export default function StravaCard() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState('run')

  useEffect(() => {
    fetch(WORKER_URL)
      .then(r => r.json())
      .then(d => { setData(d); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  const latest = data?.recentActivities?.[0]
  const rest   = data?.recentActivities?.slice(1) ?? []
  const ytd    = tab === 'run' ? data?.ytd?.runs : tab === 'ride' ? data?.ytd?.rides : data?.ytd?.swims
  const recent = tab === 'run' ? data?.recentTotals?.runs : tab === 'ride' ? data?.recentTotals?.rides : data?.recentTotals?.swims
  const allT   = tab === 'run' ? data?.allTime?.runs : tab === 'ride' ? data?.allTime?.rides : data?.allTime?.swims

  const isRun   = latest?.type === 'Run'
  const isSwim  = latest?.type === 'Swim'
  const streak  = activeStreak(data?.recentActivities)

  const heroValue   = latest ? (isSwim ? metersToYards(latest.distance) : metersToMiles(latest.distance)) : 0
  const heroUnit    = isSwim ? 'yd' : 'mi'
  const heroDecimal = isSwim ? 0 : 2

  const ytdValue   = tab === 'swim' ? metersToYards(ytd?.distance ?? 0) : metersToMiles(ytd?.distance ?? 0)
  const ytdUnit    = tab === 'swim' ? 'yd' : 'mi'
  const ytdDecimal = tab === 'swim' ? 0 : 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
    <Card className="p-6">
      {/* ── Header ── */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2.5">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="#FC4C02">
            <path d="M15.387 17.944l-2.089-4.116h-3.065L15.387 24l5.15-10.172h-3.066m-7.008-5.599l2.836 5.598h4.172L10.463 0 4.096 13.77h4.17" />
          </svg>
          <span className="text-xs font-semibold text-ink">Strava</span>
          {data?.athlete?.city && (
            <span className="font-mono text-[10px] text-muted">· {data.athlete.city}</span>
          )}
          {streak > 0 && (
            <span className="ml-1 font-mono text-[9px] text-[#FC4C02] bg-surface border border-ink rounded-atelier-sm px-1.5 py-0.5 uppercase tracking-wider">
              {streak}d streak
            </span>
          )}
        </div>
        {data?.athlete?.name && (
          <a
            href={`https://www.strava.com/athletes/${data.athlete.id ?? data.athlete.username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-accent hover:text-accent-dim transition-colors duration-200"
          >
            {data.athlete.name} →
          </a>
        )}
      </div>

      {/* ── Body ── */}
      {loading ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <Skeleton className="h-72" />
          <Skeleton className="h-72" />
          <Skeleton className="h-72" />
        </div>
      ) : !data || data.error ? (
        <p className="text-xs text-muted">Could not load Strava data.</p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-[1.25fr_1fr_1fr] gap-5">

          {/* ── Col 1: Latest Activity ── */}
          <CardInner className="p-4 flex flex-col">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="font-mono text-[9px] text-muted uppercase tracking-widest mb-1">Latest Activity</p>
                <p className="text-sm font-semibold text-ink leading-snug">{latest?.name ?? '—'}</p>
                <p className="text-[10px] text-muted mt-0.5">{latest ? relDate(latest.startDate) : ''}</p>
              </div>
              <div
                className="p-2 rounded-atelier-md border border-ink"
                style={{ backgroundColor: activityHex(latest?.type) }}
              >
                <ActivityIcon type={latest?.type} className="w-5 h-5 text-paper" />
              </div>
            </div>

            {/* Big distance */}
            <div className="my-3 flex items-end gap-1.5">
              <span className="text-[2.4rem] font-bold text-ink leading-none tracking-tight">
                {latest ? (
                  <AnimatedNumber value={heroValue} decimals={heroDecimal} />
                ) : '—'}
              </span>
              <span className="text-sm text-muted mb-1">{heroUnit}</span>
            </div>

            {/* Stats 2×2 */}
            <div className="grid grid-cols-2 gap-2">
              {[
                {
                  label: 'Time',
                  value: latest ? fmtTimeLong(latest.movingTime) : '—',
                },
                {
                  label: isRun ? 'Avg Pace' : 'Avg Speed',
                  value: latest
                    ? isRun
                      ? `${fmtPace(latest.averageSpeed)} /mi`
                      : `${fmtSpeed(latest.averageSpeed)} mph`
                    : '—',
                },
                {
                  label: 'Elevation',
                  value: latest ? `${Math.round(metersToFeet(latest.totalElevationGain))} ft` : '—',
                },
                {
                  label: 'Heart Rate',
                  value: latest?.averageHeartrate
                    ? `${Math.round(latest.averageHeartrate)} bpm`
                    : '—',
                },
              ].map(({ label, value }) => (
                <div key={label} className="bg-surface border border-ink rounded-atelier-md p-3 flex flex-col justify-center relative overflow-hidden">
                  <div
                    className="absolute left-0 top-0 bottom-0 w-[3px]"
                    style={{ backgroundColor: activityHex(latest?.type) }}
                  />
                  <p className="font-mono text-[8px] text-muted uppercase tracking-widest">{label}</p>
                  <p className="text-base font-bold text-ink mt-1 leading-none tracking-tight">{value}</p>
                </div>
              ))}
            </div>

            {/* 14-day activity strip */}
            <div className="mt-4 pt-4 border-t border-ink">
              <ActivityStrip activities={data?.recentActivities ?? []} />
            </div>
          </CardInner>

          {/* ── Col 2: Stats ── */}
          <CardInner className="p-4 flex flex-col">
            {/* Tab toggle */}
            <div className="flex items-center justify-between mb-5">
              <p className="font-mono text-[9px] text-muted uppercase tracking-widest">Stats</p>
              <Tabs value={tab} onValueChange={setTab}>
                <TabsList>
                  {['run', 'ride', 'swim'].map(t => (
                    <TabsTrigger key={t} value={t}>{t}</TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>

            {/* YTD block */}
            <div className="mb-4">
              <div className="flex items-end justify-between mb-1">
                <p className="font-mono text-[8px] text-muted uppercase tracking-widest">Year to Date</p>
                <p className="font-mono text-[8px] text-muted">{ytd?.count ?? 0} activities</p>
              </div>
              <div className="flex items-end gap-1.5 mt-1">
                <span className="text-2xl font-bold text-ink leading-none tracking-tight">
                  <AnimatedNumber value={ytdValue} decimals={ytdDecimal} />
                </span>
                <span className="text-xs text-muted mb-0.5">{ytdUnit}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-3">
                <div className="bg-surface border border-ink rounded-atelier-md p-2">
                  <p className="font-mono text-[8px] text-muted uppercase tracking-widest">Time</p>
                  <p className="text-xs font-semibold text-ink mt-1">{fmtTimeLong(ytd?.movingTime ?? 0)}</p>
                </div>
                <div className="bg-surface border border-ink rounded-atelier-md p-2">
                  <p className="font-mono text-[8px] text-muted uppercase tracking-widest">Elevation</p>
                  <p className="text-xs font-semibold text-ink mt-1">
                    <AnimatedNumber value={metersToFeet(ytd?.elevationGain ?? 0)} /> ft
                  </p>
                </div>
              </div>
            </div>

            {/* Sport mix chart */}
            <div className="mt-1 mb-4">
              <SportMixChart ytd={data?.ytd} />
            </div>

            <div className="h-px bg-ink my-1" />

            {/* Recent 4-week block */}
            <div className="mt-3 mb-4">
              <p className="font-mono text-[8px] text-muted uppercase tracking-widest mb-3">Last 4 Weeks</p>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { label: tab === 'swim' ? 'swims' : tab === 'ride' ? 'rides' : 'runs', value: recent?.count ?? 0 },
                  { label: tab === 'swim' ? 'yd' : 'mi', value: tab === 'swim' ? Math.round(metersToYards(recent?.distance ?? 0)) : metersToMiles(recent?.distance ?? 0).toFixed(2) },
                  { label: 'time', value: fmtTime(recent?.movingTime ?? 0) },
                ].map(({ label, value }) => (
                  <div key={label} className="bg-surface border border-ink rounded-atelier-md p-2 text-center">
                    <p className="text-xs font-bold text-ink">{value}</p>
                    <p className="font-mono text-[8px] text-muted mt-0.5">{label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="h-px bg-ink my-1" />

            {/* All-time */}
            <div className="mt-3">
              <p className="font-mono text-[8px] text-muted uppercase tracking-widest mb-3">All Time</p>
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-muted">Activities</span>
                <span className="text-xs font-semibold text-ink">
                  <AnimatedNumber value={allT?.count ?? 0} />
                </span>
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className="text-[10px] text-muted">Distance</span>
                <span className="text-xs font-semibold text-ink">
                  {tab === 'swim'
                    ? <><AnimatedNumber value={metersToYards(allT?.distance ?? 0)} /> yd</>
                    : <><AnimatedNumber value={metersToMiles(allT?.distance ?? 0)} /> mi</>}
                </span>
              </div>
            </div>
          </CardInner>

          {/* ── Col 3: Recent Activities ── */}
          <CardInner className="p-4 flex flex-col">
            <p className="font-mono text-[9px] text-muted uppercase tracking-widest mb-4">Recent Activities</p>

            <div className="flex flex-col gap-1 flex-1">
              {rest.length === 0 ? (
                <p className="text-xs text-muted">No recent activities.</p>
              ) : (
                rest.map((act, i) => (
                  <motion.div
                    key={act.id}
                    initial={{ opacity: 0, x: 6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04, duration: 0.3 }}
                    className="flex items-center gap-3 py-2 border-b border-ink last:border-0 group hover:bg-surface px-2 -mx-2 transition-colors"
                  >
                    <div
                      className="p-1.5 rounded-atelier-md shrink-0 border border-ink"
                      style={{ backgroundColor: activityHex(act.type) }}
                    >
                      <ActivityIcon type={act.type} className="w-3.5 h-3.5 text-paper" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="text-[11px] font-medium text-ink truncate leading-tight">{act.name}</p>
                      <p className="font-mono text-[9px] text-muted mt-0.5 flex items-center gap-1.5">
                        <span>{act.type === 'Swim' ? `${Math.round(metersToYards(act.distance))} yd` : `${metersToMiles(act.distance).toFixed(2)} mi`}</span>
                        <span className="text-muted">·</span>
                        <span>{fmtTime(act.movingTime)}</span>
                        {act.totalElevationGain > 0 && (
                          <>
                            <span className="text-muted">·</span>
                            <span>↑{Math.round(metersToFeet(act.totalElevationGain))}ft</span>
                          </>
                        )}
                      </p>
                    </div>

                    <span className="font-mono text-[9px] text-muted shrink-0">{relDate(act.startDate)}</span>
                  </motion.div>
                ))
              )}
            </div>
          </CardInner>

        </div>
      )}
    </Card>
    </motion.div>
  )
}
