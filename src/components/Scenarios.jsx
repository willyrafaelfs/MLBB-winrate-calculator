import { useMemo } from 'react'
import { useLang } from '../i18n'
import { buildScenarios } from '../lib/calc'

const cols = 'grid grid-cols-[4.75rem_1fr] gap-x-5 sm:grid-cols-[7.5rem_1fr]'

export default function Scenarios({ stats }) {
  const { t, num, pct } = useLang()
  const all = useMemo(() => buildScenarios(stats), [stats])
  const rows = all.filter((r) => r.possible)
  const blocked = all.filter((r) => !r.possible)
  const highestBlocked = blocked.length ? blocked[blocked.length - 1].forwardWR : null
  const max = Math.max(1, ...rows.map((r) => r.matches))

  return (
    <section>
      <h2 className="font-display text-4xl font-extrabold leading-none sm:text-5xl">
        {t.scenarios.title}
      </h2>
      <p className="mt-4 max-w-[58ch] text-lg leading-relaxed text-ink/75">
        {t.scenarios.sub(pct(stats.targetWR))}
      </p>

      {rows.length === 0 ? (
        <p className="mt-10 max-w-[58ch] border-l-4 border-ember pl-5 text-lg font-medium leading-relaxed">
          {t.scenarios.none}
        </p>
      ) : (
        <>
          <div className={`${cols} mt-10 border-b-2 border-ink pb-2 text-sm font-semibold text-ink/60`}>
            <span>{t.scenarios.forward}</span>
            <span>{t.scenarios.result}</span>
          </div>

          <ul>
            {rows.map((r) => (
              <li key={r.forwardWR} className={`${cols} items-center border-b border-ink/15 py-4`}>
                <span className="font-display text-4xl font-extrabold leading-none sm:text-5xl">
                  {num(r.forwardWR)}%
                </span>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-baseline gap-x-3">
                    <span className="text-lg font-semibold">
                      {t.scenarios.matches(num(r.matches))}
                    </span>
                    <span className="text-sm text-ink/60">{t.scenarios.wins(num(r.wins))}</span>
                  </div>
                  <div className="mt-2 h-2.5 w-full rounded-full bg-ink/10">
                    <div
                      className="h-full rounded-full bg-dawn transition-[width] duration-500 ease-out"
                      style={{ width: `${Math.max(2, (r.matches / max) * 100)}%` }}
                    />
                  </div>
                </div>
              </li>
            ))}
          </ul>

          {highestBlocked !== null && (
            <p className="mt-5 text-base text-ink/60">{t.scenarios.never(pct(highestBlocked))}</p>
          )}
        </>
      )}
    </section>
  )
}
