import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { TripCard } from '../components/trips/TripCard'
import { SupabaseNotice } from '../components/SupabaseNotice'
import { EmptyState } from '../components/ui/EmptyState'
import { Spinner } from '../components/ui/Spinner'
import { useI18n } from '../i18n/useI18n'
import { destinationName } from '../lib/destinations'
import { useTrips, type TripSort } from '../hooks/useTrips'
import { DESTINATIONS, type Destination } from '../types/trip'

export function TripsPage() {
  const { t, locale } = useI18n()
  const [params, setParams] = useSearchParams()

  const destinationParam = params.get('destination') as Destination | 'all' | null
  const sortParam = (params.get('sort') as TripSort | null) ?? 'newest'
  const maxPriceParam = params.get('maxPrice')

  const destination: Destination | 'all' =
    destinationParam && destinationParam !== 'all' && (DESTINATIONS as readonly string[]).includes(destinationParam)
      ? (destinationParam as Destination)
      : 'all'

  const maxPrice = maxPriceParam ? Number(maxPriceParam) : undefined

  const filters = useMemo(
    () => ({
      destination,
      sort: sortParam,
      maxPrice: maxPrice != null && !Number.isNaN(maxPrice) ? maxPrice : undefined,
    }),
    [destination, sortParam, maxPrice],
  )

  const { trips, loading, error } = useTrips(filters)

  function updateParam(key: string, value: string | null) {
    const next = new URLSearchParams(params)
    if (value == null || value === '' || value === 'all') next.delete(key)
    else next.set(key, value)
    setParams(next, { replace: true })
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <header className="max-w-2xl">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">{t('trips.title')}</h1>
        <p className="mt-3 text-lg text-slate-600/95">{t('trips.subtitle')}</p>
      </header>

      <div className="mt-8">
        <SupabaseNotice />
      </div>

      <div className="mt-8 flex flex-col gap-4 rounded-2xl border border-slate-200/60 bg-white/90 p-4 shadow-elevate sm:flex-row sm:items-end sm:justify-between">
        <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
          {t('trips.filterDestination')}
          <select
            className="input-premium"
            value={destination}
            onChange={(e) => updateParam('destination', e.target.value)}
          >
            <option value="all">{t('trips.filterDestinationAll')}</option>
            {DESTINATIONS.map((d) => (
              <option key={d} value={d}>
                {destinationName(locale, d)}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
          {t('trips.sortPrice')}
          <select
            className="input-premium"
            value={sortParam}
            onChange={(e) => updateParam('sort', e.target.value)}
          >
            <option value="newest">{t('trips.sortDefault')}</option>
            <option value="price_asc">{t('trips.sortPriceAsc')}</option>
            <option value="price_desc">{t('trips.sortPriceDesc')}</option>
          </select>
        </label>

        <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
          {t('trips.maxPrice')}
          <input
            type="number"
            min={0}
            placeholder="e.g. 2000"
            className="input-premium"
            value={maxPriceParam ?? ''}
            onChange={(e) => updateParam('maxPrice', e.target.value || null)}
          />
        </label>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <Spinner />
        </div>
      ) : error ? (
        <p className="mt-10 text-center text-red-600">{error}</p>
      ) : trips.length === 0 ? (
        <div className="mt-10">
          <EmptyState title={t('trips.empty')} />
        </div>
      ) : (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {trips.map((trip) => (
            <TripCard key={trip.id} trip={trip} />
          ))}
        </div>
      )}
    </div>
  )
}
