import { useLang } from '../i18n'

const link = 'underline decoration-gold decoration-2 underline-offset-4 hover:text-gold'

export default function Footer() {
  const { t } = useLang()

  return (
    <footer className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <p className="text-lg">
          {t.footer.by}{' '}
          <a className={`font-semibold ${link}`} href="https://github.com/willyrafaelfs">
            Willy Rafael F. Silalahi
          </a>
        </p>
        <p className="flex gap-5 text-base text-haze">
          <span>{t.footer.source}:</span>
          <a className={link} href="https://github.com/willyrafaelfs/MLBB-winrate-calculator">
            GitHub
          </a>
          <a className={link} href="https://gitlab.com/willyrafaelfs/MLBB-winrate-calculator">
            GitLab
          </a>
        </p>
      </div>
      <p className="mt-8 text-sm text-haze/80">{t.footer.disclaimer}</p>
    </footer>
  )
}
