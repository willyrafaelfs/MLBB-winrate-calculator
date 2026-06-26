import { ListChecks } from 'lucide-react'

export default function ScenarioTable({ scenarios, stats }) {
  const possible = scenarios.filter((s) => s.possible)

  return (
    <section className="rounded-xl border border-gray-200 bg-white p-5 sm:p-6">
      <div className="mb-1 flex items-center gap-2">
        <ListChecks className="h-4 w-4 text-brand" strokeWidth={2.2} />
        <h2 className="text-base font-semibold text-gray-900">
          What If Scenarios
        </h2>
      </div>
      <p className="mb-4 text-sm text-gray-500">
        How many more matches you need if you keep a given winrate going forward.
      </p>

      {stats.reached ? (
        <p className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
          Target already reached — no additional matches needed.
        </p>
      ) : possible.length === 0 ? (
        <p className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-500">
          None of these winrates are above your {stats.targetWR}% target, so they
          can't get you there. Aim higher than your target going forward.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 text-left text-xs uppercase tracking-wide text-gray-400">
                <th className="py-2 pr-3 font-medium">Forward Winrate</th>
                <th className="py-2 pr-3 font-medium">Additional Matches</th>
                <th className="py-2 pr-3 font-medium">Additional Wins</th>
                <th className="py-2 font-medium">Total Matches After</th>
              </tr>
            </thead>
            <tbody>
              {possible.map((s) => (
                <tr
                  key={s.forwardWR}
                  className="border-b border-gray-100 last:border-0"
                >
                  <td className="py-2.5 pr-3 font-semibold text-gray-900">
                    {s.forwardWR}%
                  </td>
                  <td className="py-2.5 pr-3 text-amber-600">
                    {s.additionalMatches}
                  </td>
                  <td className="py-2.5 pr-3 text-positive">
                    {s.additionalWins}
                  </td>
                  <td className="py-2.5 text-gray-700">{s.totalAfter}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}
