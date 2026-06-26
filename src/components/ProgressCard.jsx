import { CheckCircle2 } from 'lucide-react'

export default function ProgressCard({ stats }) {
  const { currentWR, targetWR, reached } = stats

  // Bar fill is current winrate relative to target (capped at 100%).
  const fillPct =
    targetWR === 0 ? 100 : Math.min(100, (currentWR / targetWR) * 100)

  return (
    <section className="rounded-xl border border-gray-200 bg-white p-5 sm:p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-base font-semibold text-gray-900">Progress</h2>
        <span className="text-sm font-medium text-gray-500">
          {currentWR}% of {targetWR}% target
        </span>
      </div>

      <div className="relative h-4 w-full overflow-hidden rounded-full bg-gray-100">
        <div
          className={`h-full rounded-full transition-all duration-500 ${
            reached ? 'bg-positive' : 'bg-amber-500'
          }`}
          style={{ width: `${fillPct}%` }}
        />
      </div>

      <div className="mt-2 flex items-center justify-between text-xs text-gray-400">
        <span>Current: {currentWR}%</span>
        <span>Target: {targetWR}%</span>
      </div>

      {reached && (
        <div className="mt-4 flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
          <CheckCircle2 className="h-4 w-4" strokeWidth={2.2} />
          You have already reached your target!
        </div>
      )}
    </section>
  )
}
