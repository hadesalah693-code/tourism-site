import { Link } from 'react-router-dom'
import { useI18n } from '../../i18n/useI18n'
import { destinationName } from '../../lib/destinations'
import { applyFallbackImage, fallbackForTrip } from '../../lib/tripImages'
import { inferTripCategory, tripCategoryLabel } from '../../lib/tripCategories'
import { formatPrice, tripFullDescription, tripShortDescription, tripTitle } from '../../lib/tripUtils'
import type { Trip } from '../../types/trip'
import { Badge } from '../ui/Badge'
import { Button } from '../ui/Button'

export function TripCard({ trip }: { trip: Trip }) {
  const { locale, t } = useI18n()
  const title = tripTitle(trip, locale)
  const shortDesc = tripShortDescription(trip, locale)
  const desc = tripFullDescription(trip, locale) || shortDesc
  const dest = destinationName(locale, trip.destination)
  const price = formatPrice(trip.price, trip.currency, locale)
  const category = inferTripCategory(trip, locale)
  const fallbackImage = fallbackForTrip(trip, category)
  const isFlyerImage = (trip.cover_image ?? '').includes('/trips/hurghada-polish/')
  const imageClassName = isFlyerImage
    ? 'h-full w-full scale-[1.7] object-cover object-[72%_42%] transition duration-700 group-hover:scale-[1.82]'
    : 'h-full w-full object-cover object-center transition duration-700 group-hover:scale-105'

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-lg border border-slate-200/70 bg-white shadow-elevate backdrop-blur transition duration-500 ease-out will-change-transform hover:-translate-y-1 hover:border-ocean-100 hover:shadow-elevate-lg">
      <div className="relative aspect-[16/11] overflow-hidden bg-slate-100">
        <img
          src={trip.cover_image || fallbackImage}
          alt={title}
          className={imageClassName}
          loading="lazy"
          referrerPolicy="no-referrer"
          onError={(event) => applyFallbackImage(event.currentTarget, category, trip.id)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-900/10 to-transparent" />
        <div className="absolute end-3 top-3 rounded-full border border-white/55 bg-white/92 px-3 py-1.5 text-sm font-bold text-ocean-800 shadow-elevate backdrop-blur">
          {price}
        </div>
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
        <h3 className="text-base font-semibold tracking-tight text-slate-900 transition duration-300 group-hover:text-ocean-800 sm:text-lg">
          {title}
        </h3>
        <p className="mt-2 line-clamp-3 min-h-[4.875rem] text-sm leading-relaxed text-slate-600/95">{desc}</p>

        <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
          <div className="rounded-lg border border-slate-200/70 bg-slate-50 px-3 py-2">
            <p className="text-[0.68rem] font-semibold uppercase text-slate-500">{t('tripDetail.duration')}</p>
            <p className="mt-0.5 font-semibold text-slate-900">{trip.duration}</p>
          </div>
          <div className="rounded-lg border border-slate-200/70 bg-slate-50 px-3 py-2">
            <p className="text-[0.68rem] font-semibold uppercase text-slate-500">{t('tripDetail.destination')}</p>
            <p className="mt-0.5 truncate font-semibold text-slate-900">{dest}</p>
          </div>
        </div>

        <div className="mt-auto flex items-center justify-between gap-3 pt-5">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">{t('trips.from')}</p>
            <p className="text-lg font-bold text-ocean-800">{price}</p>
          </div>
          <Link to={`/trips/${trip.id}`}>
            <Button size="sm" className="rounded-full px-4">
              {t('trips.cardCta')}
            </Button>
          </Link>
        </div>
      </div>
    </article>
  )
}
