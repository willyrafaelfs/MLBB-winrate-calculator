import { Calculator, Hash, Percent, Target } from 'lucide-react'

function Field({ id, label, icon: Icon, value, onChange, min, max, suffix }) {
  return (
    <div>
      <label
        htmlFor={id}
        className="flex items-center gap-1.5 text-sm font-medium text-gray-600 mb-2"
      >
        <Icon className="h-4 w-4 text-brand" strokeWidth={2} />
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type="number"
          inputMode="decimal"
          min={min}
          max={max}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-xl border border-gray-200 px-3.5 py-2.5 text-sm text-gray-900 outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
        />
        {suffix && (
          <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-sm text-gray-400">
            {suffix}
          </span>
        )}
      </div>
    </div>
  )
}

export default function InputSection({ inputs, setInputs, onCalculate }) {
  const update = (key) => (val) =>
    setInputs((prev) => ({ ...prev, [key]: val }))

  return (
    <section className="rounded-xl border border-gray-200 bg-white p-5 sm:p-6">
      <h2 className="mb-4 text-base font-semibold text-gray-900">
        Your Stats
      </h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Field
          id="totalMatches"
          label="Total Matches Played"
          icon={Hash}
          value={inputs.totalMatches}
          onChange={update('totalMatches')}
          min={0}
        />
        <Field
          id="currentWR"
          label="Current Winrate"
          icon={Percent}
          value={inputs.currentWR}
          onChange={update('currentWR')}
          min={0}
          max={100}
          suffix="%"
        />
        <Field
          id="targetWR"
          label="Target Winrate"
          icon={Target}
          value={inputs.targetWR}
          onChange={update('targetWR')}
          min={0}
          max={99}
          suffix="%"
        />
      </div>

      {/* Sliders mirror the winrate inputs for quick adjustment */}
      <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <div className="mb-2 flex items-center justify-between text-xs font-medium text-gray-500">
            <span>Current Winrate</span>
            <span className="text-brand">{inputs.currentWR || 0}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={inputs.currentWR || 0}
            onChange={(e) => update('currentWR')(e.target.value)}
            className="w-full cursor-pointer accent-brand"
          />
        </div>
        <div>
          <div className="mb-2 flex items-center justify-between text-xs font-medium text-gray-500">
            <span>Target Winrate</span>
            <span className="text-amber-500">{inputs.targetWR || 0}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="99"
            value={inputs.targetWR || 0}
            onChange={(e) => update('targetWR')(e.target.value)}
            className="w-full cursor-pointer accent-amber-500"
          />
        </div>
      </div>

      <button
        type="button"
        onClick={onCalculate}
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand px-4 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-600 active:scale-[0.99] sm:w-auto"
      >
        <Calculator className="h-4 w-4" strokeWidth={2.2} />
        Calculate
      </button>
      <p className="mt-2 text-xs text-gray-400">
        Results update automatically as you type.
      </p>
    </section>
  )
}
