import { useMemo, useState } from 'react'
import { Crosshair } from 'lucide-react'
import InputSection from './components/InputSection'
import ResultSummary from './components/ResultSummary'
import ProgressCard from './components/ProgressCard'
import ScenarioTable from './components/ScenarioTable'
import ProjectionChart from './components/ProjectionChart'
import { buildProjection, buildScenarios, computeStats } from './lib/calc'

export default function App() {
  const [inputs, setInputs] = useState({
    totalMatches: 30,
    currentWR: 70,
    targetWR: 90,
  })

  // Recalculate on every input change (the Calculate button is optional/cosmetic).
  const stats = useMemo(
    () =>
      computeStats({
        totalMatches: Number(inputs.totalMatches),
        currentWR: Number(inputs.currentWR),
        targetWR: Number(inputs.targetWR),
      }),
    [inputs]
  )

  const scenarios = useMemo(() => buildScenarios(stats), [stats])
  const projection = useMemo(() => buildProjection(stats), [stats])

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand">
              <Crosshair className="h-5 w-5 text-white" strokeWidth={2.2} />
            </span>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">
                MLBB Winrate Tracker
              </h1>
              <p className="text-sm text-gray-500">
                Calculate matches needed to reach your target winrate
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl space-y-6 px-4 py-6 sm:px-6 sm:py-8">
        <InputSection
          inputs={inputs}
          setInputs={setInputs}
          onCalculate={() => setInputs((prev) => ({ ...prev }))}
        />

        <ResultSummary stats={stats} />

        <ProgressCard stats={stats} />

        <ScenarioTable scenarios={scenarios} stats={stats} />

        <ProjectionChart data={projection} stats={stats} />
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200">
        <div className="mx-auto max-w-5xl px-4 py-6 text-center text-sm text-gray-400 sm:px-6">
          Built with React + Vite
        </div>
      </footer>
    </div>
  )
}
