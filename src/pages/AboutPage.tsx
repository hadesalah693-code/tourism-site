import { PageHeader } from '../components/layout/PageHeader'
import { useI18n } from '../i18n/useI18n'

export function AboutPage() {
  const { t } = useI18n()

  return (
    <div>
      <PageHeader eyebrow="nav.about" title={t('about.title')} />

      <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
        <div className="mt-8 space-y-6 border-sand-200 text-lg font-light leading-[1.75] text-sand-700 sm:text-start">
          <p>{t('about.p1')}</p>
          <p>{t('about.p2')}</p>
          <p>{t('about.p3')}</p>
          <div className="mt-10 flex items-center gap-6 border-t border-sand-200 pt-6">
            <span className="font-serif text-3xl font-medium text-gold-600">NE</span>
            <p className="font-serif italic text-sand-800">{t('discover.quote')}</p>
          </div>
        </div>
      </div>
    </div>
  )
}