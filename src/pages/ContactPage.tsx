import { WhatsAppButton } from '../components/WhatsAppButton'
import { PageHeader } from '../components/layout/PageHeader'
import { useI18n } from '../i18n/useI18n'

const GOOGLE_MAPS_URL = 'https://maps.app.goo.gl/oaPYU5uEkCNxmcvi8?g_st=ic'

export function ContactPage() {
  const { t } = useI18n()

  return (
    <div>
      <PageHeader eyebrow="nav.contact" title={t('contact.title')} subtitle={t('contact.subtitle')} />

      <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
        <div className="rounded-3xl border border-sand-200 bg-ivory-50 p-8 shadow-elevate lg:p-10">
          <WhatsAppButton message={t('whatsapp.defaultMessage')} label={t('contact.whatsappCta')} />
          <dl className="mt-8 space-y-5 text-sm text-sand-800">
            <div className="flex flex-col gap-1">
              <dt className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-600">
                {t('contact.emailLabel')}
              </dt>
              <dd>
                <a
                  className="font-semibold text-navy-950 underline-offset-4 transition hover:text-gold-700 hover:underline"
                  href="mailto:Info@sunsettoursegypt.com"
                >
                  Info@sunsettoursegypt.com
                </a>
              </dd>
            </div>
            <div className="flex flex-col gap-1">
              <dt className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-600">
                {t('contact.hoursLabel')}
              </dt>
              <dd>{t('contact.hoursValue')}</dd>
            </div>
            <div className="flex flex-col gap-1">
              <dt className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-600">
                {t('contact.mapLabel')}
              </dt>
              <dd>
                <a
                  className="font-semibold text-navy-950 underline-offset-4 transition hover:text-gold-700 hover:underline"
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
    </div>
  )
}