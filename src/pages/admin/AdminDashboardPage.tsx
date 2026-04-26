import { Link } from 'react-router-dom'
import { SupabaseNotice } from '../../components/SupabaseNotice'
import { Button } from '../../components/ui/Button'
import { Spinner } from '../../components/ui/Spinner'
import { useI18n } from '../../i18n/useI18n'
import { useTripStats } from '../../hooks/useTrips'

export function AdminDashboardPage() {
  const { t } = useI18n()
  const { stats, loading } = useTripStats()

  const cards = [
    { label: t('admin.stats.total'), value: stats.total },
    { label: t('admin.stats.active'), value: stats.active },
    { label: t('admin.stats.featured'), value: stats.featured },
    { label: t('admin.stats.inactive'), value: stats.inactive },
  ]

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">{t('admin.dashboard')}</h1>
          <p className="mt-1 text-slate-600/95">{t('tagline')}</p>
        </div>
        <Link to="/admin/trips/new">
          <Button>{t('admin.addTrip')}</Button>
        </Link>
      </div>

      <div className="mt-6">
        <SupabaseNotice />
      </div>

      {loading ? (
        <div className="mt-10 flex justify-center">
          <Spinner />
        </div>
      ) : (
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((c) => (
            <div
              key={c.label}
              className="rounded-2xl border border-slate-200/60 bg-white p-6 shadow-elevate transition duration-300 hover:-translate-y-0.5 hover:shadow-elevate-lg"
            >
              <p className="text-sm font-medium text-slate-500/95">{c.label}</p>
              <p className="mt-3 text-3xl font-semibold tabular-nums tracking-tight text-slate-900">{c.value}</p>
            </div>
          ))}
        </div>
      )}

      <div className="mt-10 rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900 via-ocean-900 to-teal-800 p-8 text-white shadow-elevate-lg">
        <h2 className="text-lg font-semibold tracking-tight">{t('admin.table.title')}</h2>
        <p className="mt-2 max-w-xl text-sm text-sky-100/[0.88]">{t('admin.destinations.hint')}</p>
        <div className="mt-6">
          <Link to="/admin/trips">
            <Button
              variant="secondary"
              className="border border-white/20 bg-white/10 text-white shadow-none ring-0 backdrop-blur-sm hover:border-white/30 hover:bg-white/20"
            >
              {t('admin.trips')} →
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
