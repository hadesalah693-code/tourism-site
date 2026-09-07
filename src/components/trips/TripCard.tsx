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
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-sand-200 bg-ivory-50 shadow-elevate transition duration-500 ease-out will-change-transform hover:-translate-y-1 hover:border-gold-300 hover:shadow-elevate-lg">
      <div className="relative aspect-[16/11] overflow-hidden bg-navy-900">
        <img
          src={trip.cover_image || fallbackImage}
          alt={title}
          className={imageClassName}
          loading="lazy"
          referrerPolicy="no-referrer"
          onError={(event) => applyFallbackImage(event.currentTarget, category, trip.id)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/75 via-navy-900/10 to-transparent" />
        <div className="absolute end-3 top-3 rounded-full border border-gold-300/50 bg-navy-950/70 px-3 py-1.5 text-sm font-medium text-gold-200 shadow-elevate backdrop-blur">
          {price}
        </div>
        {trip.is_featured ? (
          <div className="absolute start-3 top-3">
            <Badge variant="warning">{t('trips.featuredBadge')}</Badge>
          </div>
        ) : null}
        <div className="absolute bottom-3 start-3 end-3 flex flex-wrap items-end gap-2">
          <span className="rounded-full border border-ivory-100/50 bg-ivory-50/92 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-navy-950 shadow-sm backdrop-blur-sm">
            {tripCategoryLabel(category, locale)}
          </span>
          <span className="rounded-full border border-white/35 bg-navy-950/55 px-3 py-1 text-xs font-semibold text-ivory-50 shadow-sm backdrop-blur-sm">
            {dest}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <h3 className="font-serif text-xl font-medium tracking-tight text-navy-950 transition duration-300 group-hover:text-gold-700 sm:text-2xl">
          {title}
        </h3>
        <p className="mt-2 line-clamp-3 min-h-[4.875rem] text-sm font-light leading-relaxed text-sand-700">{desc}</p>

        <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
          <div className="rounded-xl border border-sand-200 bg-ivory-50 px-3 py-2">
            <p className="text-[0.68rem] font-semibold uppercase text-sand-500">{t('tripDetail.duration')}</p>
            <p className="mt-0.5 font-semibold text-navy-950">{trip.duration}</p>
          </div>
          <div className="rounded-xl border border-sand-200 bg-ivory-50 px-3 py-2">
            <p className="text-[0.68rem] font-semibold uppercase text-sand-500">{t('tripDetail.destination')}</p>
            <p className="mt-0.5 truncate font-semibold text-navy-950">{dest}</p>
          </div>
        </div>

        <div className="mt-auto flex items-center justify-between gap-3 pt-5">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-sand-500">{t('trips.from')}</p>
            <p className="text-lg font-semibold text-gold-700">{price}</p>
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