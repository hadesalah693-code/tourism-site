import { Link } from 'react-router-dom'
import { SupabaseNotice } from '../../components/SupabaseNotice'
import { Badge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'
import { EmptyState } from '../../components/ui/EmptyState'
import { Spinner } from '../../components/ui/Spinner'
import { useI18n } from '../../i18n/useI18n'
import { destinationName } from '../../lib/destinations'
import { formatPrice, tripTitle } from '../../lib/tripUtils'
import { removeAdminTrip } from '../../lib/tripAdmin'
import { useTrips } from '../../hooks/useTrips'

export function AdminTripsPage() {
  const { t, locale } = useI18n()
  const { trips, loading, refetch } = useTrips({ includeInactive: true, destination: 'all' })

  async function remove(id: string) {
    if (!confirm(t('admin.table.confirmDelete'))) return
    await removeAdminTrip(id)
    void refetch()
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">{t('admin.table.title')}</h1>
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
      ) : trips.length === 0 ? (
        <div className="mt-10">
          <EmptyState
            title={t('admin.table.empty')}
            action={
              <Link to="/admin/trips/new">
                <Button>{t('admin.addTrip')}</Button>
              </Link>
            }
          />
        </div>
      ) : (
        <div className="mt-8 overflow-x-auto rounded-2xl border border-slate-200/60 bg-white shadow-elevate">
          <table className="min-w-full divide-y divide-slate-200/80 text-sm">
            <thead className="bg-slate-50/90 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
              <tr>
                <th className="px-4 py-3">{t('admin.form.titleEn')}</th>
                <th className="px-4 py-3">{t('admin.form.destination')}</th>
                <th className="px-4 py-3">{t('admin.form.price')}</th>
                <th className="px-4 py-3">{t('admin.form.featured')}</th>
                <th className="px-4 py-3">{t('admin.status.active')}</th>
                <th className="px-4 py-3 text-end">{t('admin.table.actions')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {trips.map((trip) => (
                <tr key={trip.id} className="transition-colors duration-150 hover:bg-slate-50/90">
                  <td className="px-4 py-3 font-medium text-slate-900">{tripTitle(trip, locale)}</td>
                  <td className="px-4 py-3 text-slate-600">{destinationName(locale, trip.destination)}</td>
                  <td className="px-4 py-3 tabular-nums text-slate-800">
                    {formatPrice(trip.price, trip.currency, locale)}
                  </td>
                  <td className="px-4 py-3">
                    {trip.is_featured ? <Badge variant="warning">{t('trips.featuredBadge')}</Badge> : '—'}
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant={trip.is_active ? 'success' : 'muted'}>
                      {trip.is_active ? t('admin.status.active') : t('admin.status.inactive')}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-end">
                    <Link
                      to={`/admin/trips/${trip.id}/edit`}
                      className="font-semibold text-orange-600 transition hover:text-orange-800 hover:underline"
                    >
                      {t('admin.table.edit')}
                    </Link>
                    <button
                      type="button"
                      className="ms-3 font-semibold text-red-600/95 transition hover:text-red-800 hover:underline"
                      onClick={() => void remove(trip.id)}
                    >
                      {t('admin.table.delete')}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
