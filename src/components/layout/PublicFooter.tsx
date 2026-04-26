import { Link } from 'react-router-dom'
import { useI18n } from '../../i18n/useI18n'

export function PublicFooter() {
  const { t } = useI18n()
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-slate-200/60 bg-gradient-to-b from-white to-slate-50/30">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-12 sm:px-6 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt=""
              width={48}
              height={48}
              className="h-12 w-12 shrink-0 rounded-full object-cover shadow-elevate ring-1 ring-slate-200/60"
              decoding="async"
            />
            <p className="text-lg font-semibold tracking-tight text-slate-900">{t('brand')}</p>
          </div>
          <p className="mt-2 max-w-sm text-sm leading-relaxed text-slate-600/95">{t('footer.legal')}</p>
        </div>
        <div>
          <p className="text-sm font-semibold tracking-tight text-slate-900">{t('footer.explore')}</p>
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            <li>
              <Link className="text-slate-600 transition duration-200 hover:text-ocean-800" to="/trips">
                {t('nav.trips')}
              </Link>
            </li>
            <li>
              <Link className="text-slate-600 transition duration-200 hover:text-ocean-800" to="/destinations">
                {t('nav.destinations')}
              </Link>
            </li>
            <li>
              <Link className="text-slate-600 transition duration-200 hover:text-ocean-800" to="/contact">
                {t('nav.contact')}
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-200/50 py-6 text-center text-xs text-slate-500/90">
        © {year} {t('brand')}. {t('footer.rights')}
      </div>
    </footer>
  )
}
