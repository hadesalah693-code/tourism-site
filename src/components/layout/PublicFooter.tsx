import { Link } from 'react-router-dom'
import { useI18n } from '../../i18n/useI18n'

export function PublicFooter() {
  const { t } = useI18n()
  const year = new Date().getFullYear()

  return (
    <footer className="relative overflow-hidden border-t border-white/50 bg-slate-950 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(45,212,191,0.18),transparent_30%),linear-gradient(180deg,rgba(8,47,71,0.55),transparent_48%)]" />
      <div className="absolute -end-24 -top-24 h-64 w-64 rounded-full bg-ocean-500/10 blur-3xl" />

      <div className="relative mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1.4fr_0.8fr_0.9fr] lg:items-start">
        <div>
          <div className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt=""
              width={48}
              height={48}
              className="h-12 w-12 shrink-0 rounded-full object-cover shadow-elevate ring-2 ring-white/20"
              decoding="async"
            />
            <div>
              <p className="text-lg font-semibold tracking-tight text-white">{t('brand')}</p>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-teal-200">Red Sea Egypt</p>
            </div>
          </div>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-slate-300">{t('footer.legal')}</p>
          <div className="mt-6 grid max-w-md grid-cols-3 gap-2 text-center">
            {['Sea trips', 'Safari', 'History'].map((item) => (
              <span key={item} className="rounded-full border border-white/10 bg-white/8 px-3 py-2 text-xs font-semibold text-slate-200">
                {item}
              </span>
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold tracking-tight text-white">{t('footer.explore')}</p>
          <ul className="mt-4 space-y-3 text-sm text-slate-300">
            <li>
              <Link className="transition duration-200 hover:text-teal-200" to="/trips">
                {t('nav.trips')}
              </Link>
            </li>
            <li>
              <Link className="transition duration-200 hover:text-teal-200" to="/destinations">
                {t('nav.destinations')}
              </Link>
            </li>
            <li>
              <Link className="transition duration-200 hover:text-teal-200" to="/contact">
                {t('nav.contact')}
              </Link>
            </li>
          </ul>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/8 p-5 shadow-elevate backdrop-blur">
          <p className="text-sm font-semibold text-white">Plan your day</p>
          <p className="mt-2 text-sm leading-relaxed text-slate-300">
            Tell us your hotel, date, and group size. We will shape a clear Red Sea plan on WhatsApp.
          </p>
          <Link
            to="/contact"
            className="mt-4 inline-flex rounded-full bg-white px-4 py-2 text-sm font-semibold text-ocean-900 shadow-elevate transition hover:bg-teal-50"
          >
            {t('nav.contact')}
          </Link>
        </div>
      </div>

      <div className="relative border-t border-white/10 py-6 text-center text-xs text-slate-400">
        (c) {year} {t('brand')}. {t('footer.rights')}
      </div>
    </footer>
  )
}
