import { useMemo } from 'react'
import { useLang } from '../i18n'
import { buildLedger } from '../lib/calc'

function Swatch({ kind }) {
  return <span aria-hidden="true" className={`cell cell-${kind} inline-block [--cell:12px] [animation:none]`} />
}

export default function Ledger({ stats }) {
  const { t, num } = useLang()
  const ledger = useMemo(() => buildLedger(stats), [stats])

  const cells = []
  let i = 0
  const delay = () => `${Math.min(i++ * 4, 700)}ms`
  for (let k = 0; k < ledger.wins; k++) cells.push(['win', `w${k}`, delay()])
  for (let k = 0; k < ledger.losses; k++) cells.push(['loss', `l${k}`, delay()])
  for (let k = 0; k < ledger.need; k++) cells.push(['need', `n${k}`, delay()])

  return (
    <section className="mx-auto max-w-6xl px-5 pb-20 pt-14 sm:px-8 sm:pb-28 sm:pt-20">
      <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2">
        <h2 className="font-display text-3xl font-extrabold sm:text-4xl">{t.ledger.title}</h2>
        {ledger.per > 1 && <p className="text-sm text-haze">{t.ledger.per(num(ledger.per))}</p>}
      </div>

      <ul className="mt-5 flex flex-wrap gap-x-7 gap-y-2 text-base font-medium">
        <li className="flex items-center gap-2.5">
          <Swatch kind="win" />
          {t.ledger.wins(num(stats.wins))}
        </li>
        <li className="flex items-center gap-2.5">
          <Swatch kind="loss" />
          {t.ledger.losses(num(stats.losses))}
        </li>
        {stats.winsNeeded > 0 && (
          <li className="flex items-center gap-2.5">
            <Swatch kind="need" />
            {t.ledger.need(num(stats.winsNeeded))}
          </li>
        )}
      </ul>

      <div
        aria-hidden="true"
        className="mt-8 flex flex-wrap gap-[4px] [--cell:11px] sm:gap-[5px] sm:[--cell:15px] lg:[--cell:18px]"
      >
        {cells.map(([kind, key, d]) => (
          <span key={key} className={`cell cell-${kind}`} style={{ '--d': d }} />
        ))}
      </div>
    </section>
  )
}
