import { Outlet } from 'react-router-dom'
import { PublicFooter } from '../components/layout/PublicFooter'
import { PublicNavbar } from '../components/layout/PublicNavbar'
import { WhatsAppFloatingButton } from '../components/WhatsAppButton'
import { useI18n } from '../i18n/useI18n'

export function PublicLayout() {
  const { t } = useI18n()

  return (
    <div className="flex min-h-screen flex-col">
      <PublicNavbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <PublicFooter />
      <WhatsAppFloatingButton message={t('whatsapp.defaultMessage')} label={t('contact.whatsappCta')} />
    </div>
  )
}
