import { Trophy, Flag, TrendingUp, Gamepad2 } from 'lucide-react'

function StatCard({ icon: Icon, label, value, accent, iconBg }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 sm:p-5">
      <div className="mb-3 flex items-center gap-2">
        <span
          className={`inline-flex h-8 w-8 items-center justify-center rounded-lg ${iconBg}`}
        >
          <Icon className={`h-4 w-4 ${accent}`} strokeWidth={2.2} />
        </span>
        <span className="text-xs font-medium uppercase tracking-wide text-gray-400">
          {label}
        </span>
      </div>
      <div className={`text-2xl font-bold sm:text-3xl ${accent}`}>{value}</div>
    </div>
  )
}

export default function ResultSummary({ stats }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
      <StatCard
        icon={Trophy}
        label="Current Wins"
        value={stats.currentWins}
        accent="text-gray-900"
        iconBg="bg-gray-100"
      />
      <StatCard
        icon={Flag}
        label="Wins Needed"
        value={stats.reached ? 0 : stats.winsNeeded}
        accent={stats.reached ? 'text-positive' : 'text-amber-500'}
        iconBg={stats.reached ? 'bg-green-50' : 'bg-amber-50'}
      />
      <StatCard
        icon={TrendingUp}
        label="Winrate Gap"
        value={stats.reached ? '0%' : `+${stats.gap}%`}
        accent="text-brand"
        iconBg="bg-blue-50"
      />
      <StatCard
        icon={Gamepad2}
        label="Matches to Play"
        value={stats.reached ? 0 : stats.matchesToPlay}
        accent="text-gray-900"
        iconBg="bg-gray-100"
      />
    </div>
  )
}
