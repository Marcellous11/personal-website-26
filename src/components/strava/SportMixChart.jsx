import { BarChart, Bar, XAxis, Cell, ResponsiveContainer, Tooltip } from 'recharts'

function metersToMiles(m) {
  return m / 1609.34
}

const COLORS = {
  run:  '#FC4C02',   // Strava brand
  ride: '#1E4CA8',   // accent ultramarine
  swim: '#8FB5C7',   // accent-light dusty teal
}

function TooltipBox({ active, payload }) {
  if (!active || !payload?.length) return null
  const p = payload[0].payload
  return (
    <div className="bg-surface border border-ink rounded-atelier-md px-2 py-1.5 font-mono text-[9px]">
      <p className="text-muted uppercase tracking-wider">{p.label}</p>
      <p className="text-ink font-semibold mt-0.5">{p.miles.toFixed(1)} mi</p>
      <p className="text-muted">{p.count} activities</p>
    </div>
  )
}

export default function SportMixChart({ ytd }) {
  const data = [
    { label: 'Run',  miles: metersToMiles(ytd?.runs?.distance ?? 0),  count: ytd?.runs?.count ?? 0,  fill: COLORS.run },
    { label: 'Ride', miles: metersToMiles(ytd?.rides?.distance ?? 0), count: ytd?.rides?.count ?? 0, fill: COLORS.ride },
    { label: 'Swim', miles: metersToMiles(ytd?.swims?.distance ?? 0), count: ytd?.swims?.count ?? 0, fill: COLORS.swim },
  ]

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <p className="font-mono text-[8px] text-muted uppercase tracking-widest">YTD Sport Mix</p>
        <p className="font-mono text-[8px] text-muted">miles</p>
      </div>
      <div className="h-20">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 2, right: 4, left: 4, bottom: 0 }}>
            <XAxis
              dataKey="label"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#5C544A', fontSize: 9, fontFamily: 'JetBrains Mono, monospace' }}
            />
            <Tooltip content={<TooltipBox />} cursor={{ fill: '#D0CBBE', opacity: 0.6 }} />
            <Bar dataKey="miles" radius={[2, 2, 0, 0]} stroke="#1A1612" strokeWidth={1} animationDuration={900}>
              {data.map((d, i) => (
                <Cell key={i} fill={d.fill} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
