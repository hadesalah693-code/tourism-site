import { Link } from 'react-router-dom'
import { useI18n } from '../../i18n/useI18n'
import { destinationName } from '../../lib/destinations'
import { applyFallbackImage, fallbackForTrip } from '../../lib/tripImages'
import { inferTripCategory, tripCategoryLabel } from '../../lib/tripCategories'
import { formatPrice, tripShortDescription, tripTitle } from '../../lib/tripUtils'
import type { Trip } from '../../types/trip'
import { Badge } from '../ui/Badge'
import { Button } from '../ui/Button'

export function TripCard({ trip }: { trip: Trip }) {
  const { locale, t } = useI18n()
  const title = tripTitle(trip, locale)
  const desc = tripShortDescription(trip, locale)
  const dest = destinationName(locale, trip.destination)
  const price = formatPrice(trip.price, trip.currency, locale)
  const category = inferTripCategory(trip, locale)
  const fallbackImage = fallbackForTrip(trip, category)

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-lg border border-slate-200/70 bg-white shadow-elevate transition duration-500 ease-out will-change-transform hover:-translate-y-1 hover:border-slate-300/80 hover:shadow-elevate-lg">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={trip.cover_image || fallbackImage}
          alt=""
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          loading="lazy"
          referrerPolicy="no-referrer"
          onError={(event) => applyFallbackImage(event.currentTarget, category, trip.id)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-transparent" />
        {trip.is_featured ? (
          <div className="absolute start-3 top-3">
            <Badge variant="warning">{t('trips.featuredBadge')}</Badge>
          </div>
        ) : null}
        <div className="absolute bottom-3 start-3 end-3 flex flex-wrap items-end gap-2">
          <span className="rounded-full border border-white/50 bg-white/92 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-800 shadow-sm backdrop-blur-sm">
            {tripCategoryLabel(category, locale)}
          </span>
          <span className="rounded-full border border-white/35 bg-slate-950/55 px-3 py-1 text-xs font-semibold text-white shadow-sm backdrop-blur-sm">
            {dest}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <h3 className="text-base font-semibold tracking-tight text-slate-900 transition duration-300 group-hover:text-ocean-800 sm:text-lg">{title}</h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate-600/95">{desc}</p>
        <div className="mt-4 flex items-end justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">{t('trips.from')}</p>
            <p className="text-xl font-semibold text-ocean-800">{price}</p>
            <p className="text-xs text-slate-500">{trip.duration}</p>
          </div>
          <Link to={`/trips/${trip.id}`}>
            <Button variant="secondary" size="sm">
              {t('trips.cardCta')}
            </Button>
          </Link>
        </div>
      </div>
    </article>
  )
}
