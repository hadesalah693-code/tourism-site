import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { TripCard } from '../components/trips/TripCard'
import { SupabaseNotice } from '../components/SupabaseNotice'
import { EmptyState } from '../components/ui/EmptyState'
import { Spinner } from '../components/ui/Spinner'
import { PageHeader } from '../components/layout/PageHeader'
import { useI18n } from '../i18n/useI18n'
import { destinationName } from '../lib/destinations'
import { inferTripCategory, TRIP_CATEGORIES, tripCategoryLabel, type TripCategory } from '../lib/tripCategories'
import { useTrips, type TripSort } from '../hooks/useTrips'
import { DESTINATIONS, type Destination } from '../types/trip'

export function TripsPage() {
  const { t, locale } = useI18n()
  const [params, setParams] = useSearchParams()

  const destinationParam = params.get('destination') as Destination | 'all' | null
  const categoryParam = params.get('category') as TripCategory | 'all' | null
  const sortParam = (params.get('sort') as TripSort | null) ?? 'newest'
  const maxPriceParam = params.get('maxPrice')

  const destination: Destination | 'all' =
    destinationParam && destinationParam !== 'all' && (DESTINATIONS as readonly string[]).includes(destinationParam)
      ? (destinationParam as Destination)
      : 'all'

  const maxPrice = maxPriceParam ? Number(maxPriceParam) : undefined
  const category: TripCategory | 'all' =
    categoryParam && categoryParam !== 'all' && TRIP_CATEGORIES.includes(categoryParam as TripCategory)
      ? (categoryParam as TripCategory)
      : 'all'

  const filters = useMemo(
    () => ({
      destination,
      sort: sortParam,
      maxPrice: maxPrice != null && !Number.isNaN(maxPrice) ? maxPrice : undefined,
    }),
    [destination, sortParam, maxPrice],
  )

  const { trips, loading, error } = useTrips(filters)
  const visibleTrips = useMemo(
    () => (category === 'all' ? trips : trips.filter((trip) => inferTripCategory(trip, locale) === category)),
    [category, locale, trips],
  )

  function updateParam(key: string, value: string | null) {
    const next = new URLSearchParams(params)
    if (value == null || value === '' || value === 'all') next.delete(key)
    else next.set(key, value)
    setParams(next, { replace: true })
  }

  return (
    <div>
      <PageHeader eyebrow="tagline" title={t('trips.title')} subtitle={t('trips.subtitle')} />

      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="mt-8">
          <SupabaseNotice />
        </div>

        <div className="mt-6 grid gap-4 rounded-2xl border border-sand-200 bg-ivory-50 p-4 shadow-elevate sm:mt-8 sm:grid-cols-2 lg:grid-cols-4">
          <label className="flex flex-col gap-2 text-sm font-medium text-sand-800">
            Category
            <select
              className="input-premium"
              value={category}
              onChange={(e) => updateParam('category', e.target.value)}
            >
              <option value="all">All categories</option>
              {TRIP_CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {tripCategoryLabel(c, locale)}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-2 text-sm font-medium text-sand-800">
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

          <label className="flex flex-col gap-2 text-sm font-medium text-sand-800">
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

          <label className="flex flex-col gap-2 text-sm font-medium text-sand-800">
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
        ) : visibleTrips.length === 0 ? (
          <div className="mt-10">
            <EmptyState title={t('trips.empty')} />
          </div>
        ) : (
          <div className="mt-8 grid gap-5 sm:mt-10 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {visibleTrips.map((trip) => (
              <TripCard key={trip.id} trip={trip} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
