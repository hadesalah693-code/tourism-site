import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { useI18n } from '../../i18n/useI18n'

const DEFAULT_WA = '201000000000'

export function PublicFooter() {
  const { t } = useI18n()
  const year = new Date().getFullYear()
  const [subscribed, setSubscribed] = useState(false)
  const phone = String(import.meta.env.VITE_WHATSAPP_NUMBER || DEFAULT_WA)
  const whatsapp = `https://wa.me/${phone.replace(/\D/g, '')}`

  const onSubscribe = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubscribed(true)
  }

  return (
    <footer className="relative overflow-hidden bg-sand-100">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_0%,rgba(255,180,120,0.14),transparent_38%),radial-gradient(circle_at_85%_100%,rgba(239,88,52,0.08),transparent_42%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-orange-400/60 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 pb-10 pt-16 sm:px-6 sm:pt-20 lg:pt-24">
        {/* Top: brand + newsletter */}
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:items-start">
          <div>
            <div className="flex items-center gap-4">
              <img
                src="/logo.png"
                alt=""
                width={56}
                height={56}
                className="h-14 w-14 shrink-0 rounded-full object-cover shadow-[0_0_36px_rgba(255,107,53,0.45)] ring-2 ring-orange-400/40"
                decoding="async"
              />
              <div>
                <p className="font-serif text-2xl tracking-wide text-navy-950">{t('brand')}</p>
                <p className="mt-1 text-[10px] font-medium uppercase tracking-[0.3em] text-orange-600">
                  {t('tagline')}
                </p>
              </div>
            </div>
            <p className="mt-6 max-w-md text-sm font-light leading-7 text-navy-800/70">
              {t('footer.legal')}
            </p>

            <div className="mt-8 flex items-center gap-3">
              {[
                {
                  label: 'Instagram',
                  href: 'https://instagram.com',
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4">
                      <rect x="3" y="3" width="18" height="18" rx="5" />
                      <circle cx="12" cy="12" r="4" />
                      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                    </svg>
                  ),
                },
                {
                  label: 'Facebook',
                  href: 'https://facebook.com',
                  icon: (
                    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3V2z" />
                    </svg>
                  ),
                },
                {
                  label: 'YouTube',
                  href: 'https://youtube.com',
                  icon: (
                    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                      <path d="M23 7a3 3 0 00-2.1-2.1C19 4.4 12 4.4 12 4.4s-7 0-8.9.5A3 3 0 001 7a31 31 0 000 10 3 3 0 002.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5A3 3 0 0023 17a31 31 0 000-10zM10 15V9l5 3z" />
                    </svg>
                  ),
                },
                {
                  label: 'WhatsApp',
                  href: whatsapp,
                  icon: (
                    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                      <path d="M12.04 2A9.94 9.94 0 002.1 14.6L.05 24l9.65-2A10 10 0 1012.04 2zm5.8 14.2c-.25.7-1.45 1.35-2 1.4-.5.05-1.1.25-3.7-.8-3.1-1.25-5.1-4.5-5.25-4.7-.15-.2-1.25-1.65-1.25-3.15s.8-2.23 1.08-2.53c.28-.3.6-.38.8-.38h.58c.18 0 .43-.07.67.5.25.58.85 2 .93 2.15.08.15.13.32.02.52-.1.2-.16.32-.32.5l-.5.58c-.16.16-.33.34-.14.66.2.32.87 1.43 1.87 2.32 1.3 1.15 2.38 1.5 2.72 1.68.34.17.53.14.73-.08.2-.24.83-.97 1.06-1.3.22-.33.44-.28.75-.17.3.12 1.95.92 2.28 1.09.33.16.55.25.63.38.08.14.08.8-.16 1.5z" />
                    </svg>
                  ),
                },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={item.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-navy-900/15 text-navy-800/70 transition-all duration-300 hover:border-orange-500/60 hover:bg-orange-500/10 hover:text-orange-600"
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div className="relative overflow-hidden rounded-2xl border border-orange-400/25 bg-white/85 p-7 shadow-elevate-lg backdrop-blur-md sm:p-8">
            <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-orange-400/15 blur-2xl" />
            <p className="font-serif text-2xl text-navy-950">{t('footer.newsletter')}</p>
            <p className="mt-3 text-sm font-light leading-6 text-navy-800/75">
              {t('footer.newsletterSub')}
            </p>
            {subscribed ? (
              <p className="mt-6 rounded-xl border border-orange-400/40 bg-orange-500/10 px-4 py-3 text-sm font-medium text-orange-700">
                {t('footer.newsletterThanks')}
              </p>
            ) : (
              <form onSubmit={onSubscribe} className="mt-6 flex flex-col gap-3 sm:flex-row sm:gap-2">
                <input
                  type="email"
                  required
                  placeholder={t('footer.newsletterPlaceholder')}
                  className="min-w-0 flex-1 rounded-full border border-navy-900/15 bg-white px-5 py-3 text-sm text-navy-950 placeholder:text-navy-800/40 focus:border-orange-500/60 focus:outline-none"
                />
                <button
                  type="submit"
                  className="shrink-0 rounded-full bg-gradient-to-r from-gold-400 to-orange-500 px-6 py-3 text-sm font-semibold text-navy-950 shadow-[0_10px_30px_-8px_rgba(255,107,53,0.6)] transition-transform duration-300 hover:scale-[1.03]"
                >
                  {t('footer.newsletterCta')}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Link columns */}
        <div className="mt-14 grid gap-10 border-t border-navy-900/10 pt-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-orange-600">
              <span className="h-1 w-4 rounded-full bg-gradient-to-r from-orange-400 to-gold-400" />
              {t('footer.explore')}
            </p>
            <ul className="mt-5 space-y-3 text-sm text-navy-800/75">
              <li><Link to="/" className="transition-colors hover:text-orange-600">{t('nav.home')}</Link></li>
              <li><Link to="/trips" className="transition-colors hover:text-orange-600">{t('nav.trips')}</Link></li>
              <li><Link to="/about" className="transition-colors hover:text-orange-600">{t('nav.about')}</Link></li>
              <li><Link to="/contact" className="transition-colors hover:text-orange-600">{t('nav.contact')}</Link></li>
            </ul>
          </div>

          <div>
            <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-orange-600">
              <span className="h-1 w-4 rounded-full bg-gradient-to-r from-orange-400 to-gold-400" />
              {t('footer.destinations')}
            </p>
            <ul className="mt-5 space-y-3 text-sm text-navy-800/75">
              <li><Link to="/trips?destination=sharm" className="transition-colors hover:text-orange-600">{t('destinationsHome.sharm.name')}</Link></li>
              <li><Link to="/trips?destination=hurghada" className="transition-colors hover:text-orange-600">{t('destinationsHome.hurghada.name')}</Link></li>
              <li><Link to="/trips?destination=marsa_alam" className="transition-colors hover:text-orange-600">{t('destinationsHome.marsa.name')}</Link></li>
              <li><Link to="/trips" className="transition-colors hover:text-orange-600">{t('destinationsHome.luxor.name')}</Link></li>
            </ul>
          </div>

          <div>
            <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-orange-600">
              <span className="h-1 w-4 rounded-full bg-gradient-to-r from-orange-400 to-gold-400" />
              {t('footer.experiences')}
            </p>
            <ul className="mt-5 space-y-3 text-sm text-navy-800/75">
              <li><Link to="/trips?category=sea" className="transition-colors hover:text-orange-600">{t('experiences.sea.title')}</Link></li>
              <li><Link to="/trips?category=safari" className="transition-colors hover:text-orange-600">{t('experiences.desert.title')}</Link></li>
              <li><Link to="/trips?category=historical" className="transition-colors hover:text-orange-600">{t('experiences.ancient.title')}</Link></li>
              <li><Link to="/trips?category=sea" className="transition-colors hover:text-orange-600">{t('experiences.diving.title')}</Link></li>
            </ul>
          </div>

          <div>
            <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-orange-600">
              <span className="h-1 w-4 rounded-full bg-gradient-to-r from-orange-400 to-gold-400" />
              {t('footer.contact')}
            </p>
            <ul className="mt-5 space-y-3 text-sm text-navy-800/75">
              <li>
                <a href={whatsapp} target="_blank" rel="noreferrer noopener" className="inline-flex items-center gap-2 transition-colors hover:text-orange-600">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 text-orange-500/80">
                    <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011-.24 11.4 11.4 0 003.58.57 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1 11.4 11.4 0 00.57 3.58 1 1 0 01-.25 1z" />
                  </svg>
                  {t('footer.phone')}
                </a>
              </li>
              <li>
                <a href="mailto:hello@sunsets.com" className="inline-flex items-center gap-2 transition-colors hover:text-orange-600">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4 text-orange-500/80">
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <path d="M3 7l9 6 9-6" />
                  </svg>
                  {t('footer.email')}
                </a>
              </li>
              <li><Link to="/admin/login" className="transition-colors hover:text-orange-600">{t('nav.admin')}</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-navy-900/10 pt-6 text-xs text-navy-700/70 sm:flex-row">
          <p>
            © {year} {t('brand')}. {t('footer.rights')}
          </p>
          <p className="font-serif italic text-orange-600/90">Egypt — The Gift of the Nile</p>
        </div>
      </div>
    </footer>
  )
}