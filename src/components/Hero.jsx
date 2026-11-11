import { useLang } from '../i18n'

function StatInput({ id, value, onChange, label, invalid, maxLength = 6 }) {
  const width = Math.max(1.4, String(value).length + 0.35)
  return (
    <input
      id={id}
      type="text"
      inputMode="decimal"
      autoComplete="off"
      spellCheck={false}
      maxLength={maxLength}
      aria-label={label}
      aria-invalid={invalid || undefined}
      value={value}
      onChange={(e) => onChange(e.target.value.replace(/[^\d.,]/g, ''))}
      onFocus={(e) => e.target.select()}
      className="stat-input text-[1.2em]"
      style={{ width: `${width}ch` }}
    />
  )
}

export default function Hero({ inputs, setInput, result }) {
  const { t, num, pct } = useLang()
  const bad = (f) => result.error && result.field === f

  return (
    <section className="mx-auto max-w-6xl px-5 pt-14 sm:px-8 sm:pt-24">
      <p className="max-w-[30ch] text-[1.75rem] font-medium leading-[1.35] text-paper sm:text-[2.6rem] lg:text-[3.1rem]">
        {t.sentence.a}{' '}
        <StatInput
          id="matches"
          label={t.fields.matches}
          value={inputs.matches}
          onChange={setInput('matches')}
          invalid={bad('matches')}
          maxLength={6}
        />{' '}
        {t.sentence.b}{' '}
        <span className="whitespace-nowrap">
          <StatInput
            id="current"
            label={t.fields.current}
            value={inputs.current}
            onChange={setInput('current')}
            invalid={bad('current')}
          />
          %{t.sentence.cPunct}
        </span>{' '}
        {t.sentence.c}{' '}
        <span className="whitespace-nowrap">
          <StatInput
            id="target"
            label={t.fields.target}
            value={inputs.target}
            onChange={setInput('target')}
            invalid={bad('target')}
          />
          %{t.sentence.d}
        </span>
      </p>

      <div aria-live="polite" className="mt-12 min-h-[9rem] sm:mt-16">
        {result.error ? (
          <p className="max-w-[30ch] text-2xl font-semibold leading-snug text-ember sm:text-3xl">
            {t.errors[result.error]}
          </p>
        ) : result.reached ? (
          <>
            <h1 className="text-balance font-display text-[3.4rem] font-black uppercase leading-[0.86] sm:text-[6.5rem] lg:text-[8.5rem]">
              {t.reached.head}
            </h1>
            <p className="mt-6 max-w-[46ch] text-lg leading-relaxed text-haze sm:text-xl lg:text-2xl">
              {t.reached.sub(num(result.buffer), pct(result.targetWR))}
            </p>
          </>
        ) : (
          <>
            <h1 className="text-balance font-display text-[3.4rem] font-black uppercase leading-[0.86] sm:text-[6.5rem] lg:text-[8.5rem]">
              {t.need.head(result.winsNeeded, num(result.winsNeeded))}
            </h1>
            <p className="mt-6 max-w-[46ch] text-lg leading-relaxed text-haze sm:text-xl lg:text-2xl">
              {t.need.sub(pct(result.finalWR), num(result.finalMatches))}
            </p>
          </>
        )}
      </div>
    </section>
  )
}
