import { useLang } from '../i18n'

function Mark() {
  return (
    <span aria-hidden="true" className="grid grid-cols-2 gap-[3px]">
      <span className="h-[9px] w-[9px] rounded-[2px] bg-gold" />
      <span className="h-[9px] w-[9px] rounded-[2px] bg-gold" />
      <span className="h-[9px] w-[9px] rounded-[2px] bg-ink" />
      <span className="h-[9px] w-[9px] rounded-[2px] border border-dashed border-paper/80" />
    </span>
  )
}

export default function Header() {
  const { lang, setLang, t } = useLang()

  return (
    <header className="mx-auto flex max-w-6xl items-center justify-between px-5 pt-6 sm:px-8 sm:pt-8">
      <a href="/" className="flex items-center gap-3 rounded-sm">
        <Mark />
        <span className="font-display text-xl font-extrabold leading-none tracking-wide">
          MLBB <span className="font-bold text-haze">{t.brand}</span>
        </span>
      </a>

      <div
        role="group"
        aria-label={t.langLabel}
        className="flex rounded-full bg-ink p-1 text-sm font-semibold"
      >
        {[
          ['id', 'ID'],
          ['en', 'EN'],
        ].map(([code, label]) => (
          <button
            key={code}
            type="button"
            lang={code}
            aria-pressed={lang === code}
            onClick={() => setLang(code)}
            className={`rounded-full px-3 py-1 transition-colors ${
              lang === code ? 'bg-paper text-ink' : 'text-haze hover:text-paper'
            }`}
          >
            {label}
          </button>
        ))}
      </div>
    </header>
  )
}
