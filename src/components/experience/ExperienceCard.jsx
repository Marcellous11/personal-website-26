import { motion } from 'framer-motion'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Cell,
  ResponsiveContainer,
  Tooltip,
  PieChart,
  Pie,
} from 'recharts'
import { CardInner } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { AnimatedNumber } from '@/components/ui/stat'
import { cn } from '@/lib/utils'

function BarTooltip({ active, payload }) {
  if (!active || !payload?.length) return null
  const p = payload[0].payload
  return (
    <div className="bg-surface border border-ink rounded-atelier-md px-2 py-1.5 font-mono text-[9px]">
      <p className="text-ink font-semibold">{p.name}</p>
      <p className="text-muted mt-0.5">{p.display}</p>
    </div>
  )
}

function ProjectImpactChart({ projects, metricLabel = 'hours' }) {
  const data = projects.map(p => ({
    name: p.name,
    short: p.short ?? p.name,
    value: p.value,
    display: p.display ?? `${p.value.toLocaleString()} ${metricLabel}`,
    fill: p.color ?? '#1E4CA8',
  }))

  return (
    <div className="h-[140px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical" margin={{ top: 0, right: 8, left: 0, bottom: 0 }}>
          <XAxis type="number" hide />
          <YAxis
            type="category"
            dataKey="short"
            axisLine={false}
            tickLine={false}
            width={110}
            tick={{ fill: '#5C544A', fontSize: 9, fontFamily: 'JetBrains Mono, monospace' }}
          />
          <Tooltip content={<BarTooltip />} cursor={{ fill: '#D0CBBE', opacity: 0.6 }} />
          <Bar dataKey="value" radius={[0, 2, 2, 0]} stroke="#1A1612" strokeWidth={1} animationDuration={900}>
            {data.map((d, i) => (
              <Cell key={i} fill={d.fill} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

function DonutTooltip({ active, payload }) {
  if (!active || !payload?.length) return null
  const p = payload[0].payload
  return (
    <div className="bg-surface border border-ink rounded-atelier-md px-2 py-1.5 font-mono text-[9px]">
      <p className="text-ink font-semibold">{p.label}</p>
      <p className="text-muted mt-0.5">{p.value}%</p>
    </div>
  )
}

function TechMixDonut({ items }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-[90px] h-[90px] shrink-0">
        <ResponsiveContainer>
          <PieChart>
            <Tooltip content={<DonutTooltip />} />
            <Pie
              data={items}
              dataKey="value"
              nameKey="label"
              innerRadius={26}
              outerRadius={42}
              stroke="#1A1612"
              strokeWidth={1}
              animationDuration={900}
            >
              {items.map((d, i) => (
                <Cell key={i} fill={d.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="flex-1 flex flex-col gap-1.5">
        {items.map(item => (
          <div key={item.label} className="flex items-center gap-2">
            <span
              className="w-2 h-2 shrink-0 border border-ink"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-[10px] text-ink flex-1 truncate">{item.label}</span>
            <span className="font-mono text-[9px] text-muted">{item.value}%</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function ExperienceCard({ role, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="bg-surface border border-ink rounded-atelier-card p-6"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-base font-bold text-ink">{role.title}</h3>
            {role.current && <Badge variant="accent">Current</Badge>}
          </div>
          <p className="text-xs text-muted mt-1">{role.company}</p>
        </div>
        <p className="font-mono text-[10px] text-muted shrink-0 pt-1">{role.period}</p>
      </div>

      <p className="text-xs text-ink leading-relaxed mb-5 max-w-3xl">{role.summary}</p>

      {/* Dashboard grid */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-4">
        {/* Left: hero + stats — single accent-warm focal (one-per-screen rule) */}
        <CardInner className="p-4 flex flex-col">
          <p className="font-mono text-[8px] text-muted uppercase tracking-widest mb-2">
            {role.hero.label}
          </p>
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-4xl font-bold text-accent-warm leading-none tracking-tight">
              <AnimatedNumber value={role.hero.value} />
            </span>
            {role.hero.suffix && (
              <span className="text-lg text-accent-warm font-bold">{role.hero.suffix}</span>
            )}
            {role.hero.unit && (
              <span className="text-xs text-muted mb-0.5">{role.hero.unit}</span>
            )}
          </div>

          <div className="grid grid-cols-2 gap-2 mt-auto">
            {role.stats.map(s => (
              <div
                key={s.label}
                className="bg-surface border border-ink rounded-atelier-md p-2.5 relative overflow-hidden"
              >
                <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-accent" />
                <p className="font-mono text-[8px] text-muted uppercase tracking-widest pl-2">{s.label}</p>
                <p className="text-sm font-bold text-ink mt-1 leading-none tracking-tight pl-2">{s.value}</p>
              </div>
            ))}
          </div>
        </CardInner>

        {/* Right: charts */}
        <CardInner className={cn('p-4', role.hideTechMix && 'flex flex-col')}>
          <p className="font-mono text-[8px] text-muted uppercase tracking-widest mb-2">
            {role.chartLabel ?? 'Top Projects by Impact'}
          </p>
          <ProjectImpactChart projects={role.projects} metricLabel={role.metricLabel} />

          {!role.hideTechMix && (
            <div className="mt-3 pt-3 border-t border-ink">
              <p className="font-mono text-[8px] text-muted uppercase tracking-widest mb-2">Tech Mix</p>
              <TechMixDonut items={role.techMix} />
            </div>
          )}
        </CardInner>
      </div>
    </motion.div>
  )
}
