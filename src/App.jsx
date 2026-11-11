import { useEffect, useMemo, useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Ledger from './components/Ledger'
import Scenarios from './components/Scenarios'
import ProjectionChart from './components/ProjectionChart'
import Method from './components/Method'
import Footer from './components/Footer'
import { analyze } from './lib/calc'

const DEFAULTS = { matches: '150', current: '52', target: '60' }
const PARAMS = { matches: 'm', current: 'wr', target: 't' }

function readInputsFromUrl() {
  const params = new URLSearchParams(window.location.search)
  const out = { ...DEFAULTS }
  for (const [key, param] of Object.entries(PARAMS)) {
    const v = params.get(param)
    if (v !== null && /^[\d.,]{1,6}$/.test(v)) out[key] = v
  }
  return out
}

export default function App() {
  const [inputs, setInputs] = useState(readInputsFromUrl)
  const setInput = (key) => (value) => setInputs((prev) => ({ ...prev, [key]: value }))

  // Keep the URL in sync so a result can be shared as a link.
  useEffect(() => {
    const url = new URL(window.location.href)
    for (const [key, param] of Object.entries(PARAMS)) url.searchParams.set(param, inputs[key])
    window.history.replaceState(null, '', url)
  }, [inputs])

  const result = useMemo(() => analyze(inputs), [inputs])

  // While an input is mid-edit and invalid, keep the sections below on the last good answer.
  const [stats, setStats] = useState(result)
  if (!result.error && result !== stats) setStats(result)

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero inputs={inputs} setInput={setInput} result={result} />
        {!stats.error && (
          <>
            <Ledger stats={stats} />
            <div className="bg-paper text-ink">
              <div className="mx-auto max-w-6xl space-y-24 px-5 py-20 sm:space-y-28 sm:px-8 sm:py-28">
                {!stats.reached && <Scenarios stats={stats} />}
                <ProjectionChart stats={stats} />
                <Method />
              </div>
            </div>
          </>
        )}
      </main>
      <Footer />
    </div>
  )
}
