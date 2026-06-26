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
import { LineChart as LineChartIcon } from 'lucide-react'

export default function ProjectionChart({ data, stats }) {
  // The point where the projection crosses the target (all-win assumption).
  const crossPoint = stats.reached
    ? null
    : data.find((d) => d.wins === stats.winsNeeded)

  return (
    <section className="rounded-xl border border-gray-200 bg-white p-5 sm:p-6">
      <div className="mb-1 flex items-center gap-2">
        <LineChartIcon className="h-4 w-4 text-brand" strokeWidth={2.2} />
        <h2 className="text-base font-semibold text-gray-900">
          Winrate Projection
        </h2>
      </div>
      <p className="mb-4 text-sm text-gray-500">
        Projected winrate as you win additional matches in a row.
      </p>

      <div className="h-64 w-full sm:h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 8, right: 16, left: -16, bottom: 4 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis
              dataKey="wins"
              tick={{ fontSize: 12, fill: '#9ca3af' }}
              tickLine={false}
              axisLine={{ stroke: '#e5e7eb' }}
              label={{
                value: 'Additional wins',
                position: 'insideBottom',
                offset: -2,
                fontSize: 11,
                fill: '#9ca3af',
              }}
            />
            <YAxis
              domain={[0, 100]}
              tick={{ fontSize: 12, fill: '#9ca3af' }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(v) => `${v}%`}
            />
            <Tooltip
              formatter={(v) => [`${v}%`, 'Projected winrate']}
              labelFormatter={(l) => `${l} more wins`}
              contentStyle={{
                borderRadius: 12,
                border: '1px solid #e5e7eb',
                fontSize: 13,
              }}
            />
            <ReferenceLine
              y={stats.targetWR}
              stroke="#F59E0B"
              strokeDasharray="6 4"
              label={{
                value: `Target ${stats.targetWR}%`,
                position: 'insideTopRight',
                fontSize: 11,
                fill: '#F59E0B',
              }}
            />
            <Line
              type="monotone"
              dataKey="winrate"
              stroke="#3B82F6"
              strokeWidth={2.5}
              dot={false}
              activeDot={{ r: 5 }}
            />
            {crossPoint && (
              <ReferenceDot
                x={crossPoint.wins}
                y={crossPoint.winrate}
                r={6}
                fill="#22C55E"
                stroke="#fff"
                strokeWidth={2}
                isFront
                label={{
                  value: `${crossPoint.wins} wins`,
                  position: 'top',
                  fontSize: 11,
                  fill: '#22C55E',
                }}
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  )
}
