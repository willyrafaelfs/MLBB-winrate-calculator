import { useLang } from '../i18n'

export default function Method() {
  const { t } = useLang()
  return (
    <details className="group border-y-2 border-ink py-5">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-2xl font-extrabold sm:text-3xl [&::-webkit-details-marker]:hidden">
        {t.method.title}
        <span
          aria-hidden="true"
          className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-ink font-sans text-xl text-paper transition-transform group-open:rotate-45"
        >
          +
        </span>
      </summary>
      <div className="mt-5 max-w-[64ch] space-y-4 text-base leading-relaxed text-ink/80 sm:text-lg">
        {t.method.body.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>
    </details>
  )
}
