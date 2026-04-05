import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const WORKER_URL = 'https://strava-stats.1mcj001.workers.dev'

// ── Formatters ──────────────────────────────────────────────────────────────

function fmtKm(meters) {
  return (meters / 1000).toFixed(2)
}

function fmtKmShort(meters) {
  return (meters / 1000).toFixed(0)
}

function fmtPace(speedMps) {
  if (!speedMps || speedMps === 0) return '—'
  const secPerKm = 1000 / speedMps
  const m = Math.floor(secPerKm / 60)
  const s = Math.round(secPerKm % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}

function fmtSpeed(speedMps) {
  return (speedMps * 3.6).toFixed(1)
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

// ── Activity icons (inline SVG) ─────────────────────────────────────────────

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

function activityColor(type) {
  switch (type) {
    case 'Run':  return 'text-[#FC4C02]'
    case 'Ride': return 'text-blue-400'
    case 'Swim': return 'text-cyan-400'
    case 'Walk': return 'text-green-400'
    default:     return 'text-[#FC4C02]'
  }
}

function activityBg(type) {
  switch (type) {
    case 'Run':  return 'bg-[#FC4C02]/10'
    case 'Ride': return 'bg-blue-400/10'
    case 'Swim': return 'bg-cyan-400/10'
    case 'Walk': return 'bg-green-400/10'
    default:     return 'bg-[#FC4C02]/10'
  }
}

// ── Skeleton ────────────────────────────────────────────────────────────────

function Skeleton({ className = '' }) {
  return <div className={`bg-border/40 rounded-lg animate-pulse ${className}`} />
}

// ── Main component ───────────────────────────────────────────────────────────

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

  const isRun  = latest?.type === 'Run'

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="bg-card border border-border rounded-2xl p-6"
    >
      {/* ── Header ── */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2.5">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="#FC4C02">
            <path d="M15.387 17.944l-2.089-4.116h-3.065L15.387 24l5.15-10.172h-3.066m-7.008-5.599l2.836 5.598h4.172L10.463 0 4.096 13.77h4.17" />
          </svg>
          <span className="text-xs font-medium text-light">Strava</span>
          {data?.athlete?.city && (
            <span className="font-mono text-[10px] text-muted">· {data.athlete.city}</span>
          )}
        </div>
        {data?.athlete?.name && (
          <a
            href={`https://www.strava.com/athletes/${data.athlete.username}`}
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
          <Skeleton className="h-52" />
          <Skeleton className="h-52" />
          <Skeleton className="h-52" />
        </div>
      ) : !data || data.error ? (
        <p className="text-xs text-muted">Could not load Strava data.</p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-[1.25fr_1fr_1fr] gap-5">

          {/* ── Col 1: Latest Activity ── */}
          <div className="bg-surface border border-border rounded-xl p-4 flex flex-col">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="font-mono text-[9px] text-muted uppercase tracking-widest mb-1">Latest Activity</p>
                <p className="text-sm font-semibold text-light leading-snug">{latest?.name ?? '—'}</p>
                <p className="text-[10px] text-muted mt-0.5">{latest ? relDate(latest.startDate) : ''}</p>
              </div>
              <div className={`p-2 rounded-lg ${activityBg(latest?.type)}`}>
                <ActivityIcon type={latest?.type} className={`w-5 h-5 ${activityColor(latest?.type)}`} />
              </div>
            </div>

            {/* Big distance */}
            <div className="my-3 flex items-end gap-1.5">
              <span className="text-[2.4rem] font-bold text-light leading-none tracking-tight">
                {latest ? fmtKm(latest.distance) : '—'}
              </span>
              <span className="text-sm text-muted mb-1">km</span>
            </div>

            {/* Stats 2×2 */}
            <div className="grid grid-cols-2 gap-2 flex-1">
              {[
                {
                  label: 'Time',
                  value: latest ? fmtTimeLong(latest.movingTime) : '—',
                },
                {
                  label: isRun ? 'Avg Pace' : 'Avg Speed',
                  value: latest
                    ? isRun
                      ? `${fmtPace(latest.averageSpeed)} /km`
                      : `${fmtSpeed(latest.averageSpeed)} km/h`
                    : '—',
                },
                {
                  label: 'Elevation',
                  value: latest ? `${Math.round(latest.totalElevationGain)} m` : '—',
                },
                {
                  label: 'Heart Rate',
                  value: latest?.averageHeartrate
                    ? `${Math.round(latest.averageHeartrate)} bpm`
                    : '—',
                },
              ].map(({ label, value }) => (
                <div key={label} className="bg-bg rounded-lg p-2.5">
                  <p className="font-mono text-[8px] text-muted uppercase tracking-widest">{label}</p>
                  <p className="text-[11px] font-semibold text-light mt-1 leading-none">{value}</p>
                </div>
              ))}
            </div>

            {/* Footer row */}
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
              <div className="flex items-center gap-3">
                {(latest?.kudosCount ?? 0) > 0 && (
                  <span className="text-[10px] text-muted flex items-center gap-1">
                    <span className="text-[11px]">👊</span> {latest.kudosCount}
                  </span>
                )}
                {(latest?.achievementCount ?? 0) > 0 && (
                  <span className="text-[10px] text-muted flex items-center gap-1">
                    <span className="text-[11px]">🏅</span> {latest.achievementCount}
                  </span>
                )}
                {latest?.calories > 0 && (
                  <span className="text-[10px] text-muted">{Math.round(latest.calories)} kcal</span>
                )}
              </div>
              {latest?.sufferScore > 0 && (
                <span className="font-mono text-[9px] text-muted">
                  suffer <span className="text-[#FC4C02] font-semibold">{latest.sufferScore}</span>
                </span>
              )}
            </div>
          </div>

          {/* ── Col 2: Stats ── */}
          <div className="bg-surface border border-border rounded-xl p-4 flex flex-col">
            {/* Tab toggle */}
            <div className="flex items-center justify-between mb-5">
              <p className="font-mono text-[9px] text-muted uppercase tracking-widest">Stats</p>
              <div className="flex rounded-lg overflow-hidden border border-border">
                {['run', 'ride', 'swim'].map(t => (
                  <button
                    key={t}
                    onClick={() => setTab(t)}
                    className={`font-mono text-[9px] px-2.5 py-1 transition-colors duration-150 ${
                      tab === t ? 'bg-accent text-bg' : 'text-muted hover:text-light'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* YTD block */}
            <div className="mb-4">
              <p className="font-mono text-[8px] text-muted uppercase tracking-widest mb-3">Year to Date</p>
              <div className="space-y-2.5">
                {[
                  { label: 'Distance',   value: `${fmtKmShort(ytd?.distance ?? 0)} km`,           sub: `${ytd?.count ?? 0} activities` },
                  { label: 'Time',       value: fmtTimeLong(ytd?.movingTime ?? 0),                 sub: null },
                  { label: 'Elevation',  value: `${Math.round(ytd?.elevationGain ?? 0).toLocaleString()} m`, sub: null },
                ].map(({ label, value, sub }) => (
                  <div key={label} className="flex items-center justify-between">
                    <span className="text-[10px] text-muted">{label}</span>
                    <div className="text-right">
                      <span className="text-xs font-semibold text-light">{value}</span>
                      {sub && <p className="font-mono text-[8px] text-muted mt-0.5">{sub}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="h-px bg-border my-1" />

            {/* Recent 4-week block */}
            <div className="mt-3 mb-4">
              <p className="font-mono text-[8px] text-muted uppercase tracking-widest mb-3">Last 4 Weeks</p>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { label: 'runs',   value: recent?.count ?? 0 },
                  { label: 'km',     value: fmtKm(recent?.distance ?? 0) },
                  { label: 'time',   value: fmtTime(recent?.movingTime ?? 0) },
                ].map(({ label, value }) => (
                  <div key={label} className="bg-bg rounded-lg p-2 text-center">
                    <p className="text-xs font-bold text-light">{value}</p>
                    <p className="font-mono text-[8px] text-muted mt-0.5">{label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="h-px bg-border my-1" />

            {/* All-time */}
            <div className="mt-3">
              <p className="font-mono text-[8px] text-muted uppercase tracking-widest mb-3">All Time</p>
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-muted">Activities</span>
                <span className="text-xs font-semibold text-light">{(allT?.count ?? 0).toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className="text-[10px] text-muted">Distance</span>
                <span className="text-xs font-semibold text-light">{fmtKmShort(allT?.distance ?? 0).toLocaleString()} km</span>
              </div>
            </div>
          </div>

          {/* ── Col 3: Recent Activities ── */}
          <div className="bg-surface border border-border rounded-xl p-4 flex flex-col">
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
                    className="flex items-center gap-3 py-2 border-b border-border/50 last:border-0 group"
                  >
                    {/* Icon */}
                    <div className={`p-1.5 rounded-lg shrink-0 ${activityBg(act.type)}`}>
                      <ActivityIcon type={act.type} className={`w-3.5 h-3.5 ${activityColor(act.type)}`} />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <p className="text-[11px] font-medium text-light truncate leading-tight">{act.name}</p>
                      <p className="font-mono text-[9px] text-muted mt-0.5 flex items-center gap-1.5">
                        <span>{fmtKm(act.distance)} km</span>
                        <span className="text-border">·</span>
                        <span>{fmtTime(act.movingTime)}</span>
                        {act.totalElevationGain > 0 && (
                          <>
                            <span className="text-border">·</span>
                            <span>↑{Math.round(act.totalElevationGain)}m</span>
                          </>
                        )}
                      </p>
                    </div>

                    {/* Date */}
                    <span className="font-mono text-[9px] text-muted shrink-0">{relDate(act.startDate)}</span>
                  </motion.div>
                ))
              )}
            </div>
          </div>

        </div>
      )}
    </motion.div>
  )
}
