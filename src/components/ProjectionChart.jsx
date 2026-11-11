import { useMemo } from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  ReferenceDot,
} from 'recharts'
import { useLang } from '../i18n'
import { buildProjection } from '../lib/calc'

const INK = '#0E1470'
const DAWN = '#1F2BB8'
const GOLD = '#FFC93C'
const MUTED = 'rgba(14,20,112,0.6)'

export default function ProjectionChart({ stats }) {
  const { t, num, pct } = useLang()
  const data = useMemo(() => buildProjection(stats), [stats])
  const reached = stats.reached
  const pivot = reached ? stats.buffer : stats.winsNeeded
  const mark = data.find((d) => d.x === pivot)

  const values = data.map((d) => d.winrate)
  const lo = Math.min(...values, stats.targetWR)
  const hi = Math.max(...values, stats.targetWR)
  const pad = Math.max(2, (hi - lo) * 0.15)
  const domain = [Math.max(0, Math.floor(lo - pad)), Math.min(100, Math.ceil(hi + pad))]

  return (
    <section>
      <h2 className="font-display text-4xl font-extrabold leading-none sm:text-5xl">
        {reached ? t.chart.titleReached : t.chart.titleNeed}
      </h2>
      <p className="mt-4 max-w-[58ch] text-lg leading-relaxed text-ink/75">
        {reached ? t.chart.subReached : t.chart.subNeed}
      </p>

      <div className="mt-8 h-72 w-full sm:h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 24, right: 12, left: -8, bottom: 18 }}>
            <CartesianGrid vertical={false} stroke="rgba(14,20,112,0.1)" />
            <XAxis
              dataKey="x"
              type="number"
              domain={[0, data.length - 1]}
              allowDecimals={false}
              tick={{ fontSize: 13, fill: MUTED }}
              tickLine={false}
              axisLine={{ stroke: INK, strokeWidth: 2 }}
              tickFormatter={(v) => num(v)}
              label={{
                value: reached ? t.chart.axisReached : t.chart.axisNeed,
                position: 'insideBottom',
                offset: -12,
                fontSize: 13,
                fill: MUTED,
              }}
            />
            <YAxis
              domain={domain}
              tick={{ fontSize: 13, fill: MUTED }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(v) => `${num(v)}%`}
              width={52}
            />
            <Tooltip
              cursor={{ stroke: INK, strokeDasharray: '3 3' }}
              formatter={(v) => [pct(v), null]}
              labelFormatter={(x) =>
                reached ? t.chart.tipReached(num(x)) : t.chart.tipNeed(num(x))
              }
              separator=""
              contentStyle={{
                background: INK,
                border: 0,
                borderRadius: 8,
                color: '#F3F1FF',
                fontSize: 14,
                padding: '8px 12px',
              }}
              itemStyle={{ color: GOLD, fontWeight: 700 }}
              labelStyle={{ color: '#C9CCF5', marginBottom: 2 }}
            />
            <ReferenceLine
              y={stats.targetWR}
              stroke={INK}
              strokeDasharray="6 5"
              strokeWidth={1.5}
              label={{
                value: t.chart.target(pct(stats.targetWR)),
                position: 'insideTopLeft',
                fontSize: 13,
                fontWeight: 600,
                fill: INK,
              }}
            />
            <Line
              type="monotone"
              dataKey="winrate"
              stroke={DAWN}
              strokeWidth={3}
              dot={false}
              activeDot={{ r: 6, fill: GOLD, stroke: INK, strokeWidth: 2 }}
              isAnimationActive={false}
            />
            {mark && pivot > 0 && (
              <ReferenceDot
                x={mark.x}
                y={mark.winrate}
                r={7}
                fill={GOLD}
                stroke={INK}
                strokeWidth={2.5}
                isFront
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  )
}
