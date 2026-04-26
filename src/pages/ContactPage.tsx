import { WhatsAppButton } from '../components/WhatsAppButton'
import { useI18n } from '../i18n/useI18n'

const GOOGLE_MAPS_URL =
  'https://maps.app.goo.gl/oaPYU5uEkCNxmcvi8?g_st=ic'

export function ContactPage() {
  const { t } = useI18n()

  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">{t('contact.title')}</h1>
      <p className="mt-4 text-lg text-slate-600/95">{t('contact.subtitle')}</p>

      <div className="mt-10 rounded-2xl border border-slate-200/60 bg-white/90 p-8 shadow-elevate">
        <WhatsAppButton message={t('whatsapp.defaultMessage')} label={t('contact.whatsappCta')} />
        <dl className="mt-8 space-y-4 text-sm text-slate-700">
          <div>
            <dt className="font-semibold text-slate-900">{t('contact.emailLabel')}</dt>
            <dd>
              <a
                className="font-medium text-ocean-800 transition duration-200 hover:text-ocean-950 hover:underline hover:underline-offset-4"
                href="mailto:hello@nilehorizon.example"
              >
                hello@nilehorizon.example
              </a>
            </dd>
          </div>
          <div>
            <dt className="font-semibold text-slate-900">{t('contact.hoursLabel')}</dt>
            <dd>{t('contact.hoursValue')}</dd>
          </div>
          <div>
            <dt className="font-semibold text-slate-900">{t('contact.mapLabel')}</dt>
            <dd>
              <a
                className="font-medium text-ocean-800 transition duration-200 hover:text-ocean-950 hover:underline hover:underline-offset-4"
                href={GOOGLE_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t('contact.mapCta')}
              </a>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  )
}
