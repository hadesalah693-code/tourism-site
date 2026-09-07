import { Link } from 'react-router-dom'
import { useI18n } from '../../i18n/useI18n'
import { DESTINATIONS } from '../../types/trip'
import { destinationName } from '../../lib/destinations'

export function AdminDestinationsPage() {
  const { t, locale } = useI18n()

  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight text-slate-900">{t('admin.destinations.title')}</h1>
      <p className="mt-3 max-w-2xl text-slate-600/95">{t('admin.destinations.hint')}</p>

      <ul className="mt-8 space-y-3">
        {DESTINATIONS.map((d) => (
          <li
            key={d}
            className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200/60 bg-white px-5 py-4 shadow-elevate transition duration-200 hover:shadow-elevate-lg"
          >
            <div>
              <p className="font-semibold text-slate-900">{destinationName(locale, d)}</p>
              <p className="text-xs text-slate-500">{d}</p>
            </div>
            <Link
              to={`/trips?destination=${d}`}
              className="text-sm font-semibold text-orange-600 transition hover:text-orange-800 hover:underline"
            >
              {t('destinations.cta')}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
