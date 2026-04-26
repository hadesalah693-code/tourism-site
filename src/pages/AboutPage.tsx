import { useI18n } from '../i18n/useI18n'

export function AboutPage() {
  const { t } = useI18n()

  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">{t('about.title')}</h1>
      <div className="mt-8 space-y-6 text-lg leading-[1.75] text-slate-600/95">
        <p>{t('about.p1')}</p>
        <p>{t('about.p2')}</p>
        <p>{t('about.p3')}</p>
      </div>
    </div>
  )
}
