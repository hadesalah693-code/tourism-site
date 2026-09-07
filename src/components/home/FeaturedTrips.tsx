import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useI18n } from '../../i18n/useI18n'
import { AnimatedElement } from '../ui/AnimatedElement'
import { Spinner } from '../ui/Spinner'
import { useTrips } from '../../hooks/useTrips'
import { tripShortDescription, tripTitle, formatPrice } from '../../lib/tripUtils'
import { destinationName } from '../../lib/destinations'
import type { Trip } from '../../types/trip'

function TripSlide({ trip, index }: { trip: Trip; index: number }) {
  const { t, locale } = useI18n()
  const cover = trip.cover_image || trip.gallery_images?.[0]
  const rating = 4.5 + (index % 10) * 0.1

  return (
    <article className="group relative flex h-[520px] w-[min(calc(100vw-3.5rem),340px)] shrink-0 flex-col overflow-hidden rounded-[1.5rem] border border-sand-200/70 bg-ivory-50 shadow-elevate transition-all duration-500 hover:-translate-y-1.5 hover:shadow-elevate-lg sm:w-[400px]">
      {/* Image */}
      <div className="relative h-[62%] overflow-hidden bg-navy-900">
        {cover ? (
          <img
            src={cover}
            alt={tripTitle(trip, locale)}
            className="h-full w-full object-cover transition-transform duration-[1800ms] ease-out group-hover:scale-110"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-navy-800 to-navy-950">
            <span className="font-serif text-4xl text-white/20">{tripTitle(trip, locale)}</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 to-transparent" />

        {/* Rating */}
        <div className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-navy-950/70 px-3 py-1.5 backdrop-blur">
          <span className="text-xs text-gold-300">★</span>
          <span className="text-xs font-medium text-ivory-50">{rating.toFixed(1)}</span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col bg-ivory-50 p-6 sm:p-7">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-gold-700">
            {destinationName(locale, trip.destination)}
          </span>
          <span className="text-[11px] font-medium text-sand-500">
            {trip.duration} {t('tripsHome.duration')}
          </span>
        </div>

        <h3 className="mt-3 font-serif text-2xl font-medium leading-tight text-navy-950">
          {tripTitle(trip, locale)}
        </h3>

        <p className="mt-3 line-clamp-2 text-sm font-light leading-6 text-sand-700">
          {tripShortDescription(trip, locale)}
        </p>

        <div className="mt-auto flex items-end justify-between pt-5">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-sand-500">
              {t('tripsHome.from')}
            </p>
            <p className="mt-1 text-xl font-medium text-navy-950">
              {formatPrice(trip.price, trip.currency, locale)}
            </p>
          </div>
          <Link
            to={`/trips/${trip.id}`}
            className="inline-flex items-center gap-2 border-b border-gold-500/60 pb-1 text-xs font-semibold uppercase tracking-[0.08em] text-navy-950 transition-colors hover:border-gold-500 hover:text-gold-700"
          >
            {t('tripsHome.explore')}
            <span className="transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1">→</span>
          </Link>
        </div>
      </div>
    </article>
  )
}

export function FeaturedTrips() {
  const { t } = useI18n()
  const { trips, loading } = useTrips({ featuredOnly: true })
  const scrollerRef = useRef<HTMLDivElement>(null)

  const scroll = (offset: number) => {
    scrollerRef.current?.scrollBy({ left: offset, behavior: 'smooth' })
  }

  const slides = trips.slice(0, 8)

  return (
    <section className="overflow-hidden bg-sand-50 py-24 sm:py-32 lg:py-40">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.6fr_1.4fr] lg:items-end">
        <div>
          <AnimatedElement>
            <p className="text-[11px] font-medium uppercase tracking-[0.32em] text-gold-700">
              {t('tripsHome.eyebrow')}
            </p>
          </AnimatedElement>
          <AnimatedElement delay={80}>
            <h2 className="mt-6 font-serif text-4xl font-medium leading-[1.1] tracking-tight text-navy-950 sm:text-5xl lg:text-6xl">
              {t('tripsHome.title')}
            </h2>
          </AnimatedElement>
          <AnimatedElement delay={160}>
            <p className="mt-6 max-w-md text-base font-light leading-8 text-sand-700">
              {t('tripsHome.subtitle')}
            </p>
          </AnimatedElement>
        </div>

        <AnimatedElement delay={200} className="flex flex-wrap items-center justify-start gap-4 lg:justify-end">
          <Link
            to="/trips"
            className="inline-flex items-center gap-2 border-b border-gold-500/60 pb-1 text-xs font-semibold uppercase tracking-[0.1em] text-navy-950 transition-colors hover:text-gold-700"
          >
            {t('tripsHome.viewAll')}
            <span>→</span>
          </Link>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => scroll(-360)}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-sand-300 text-navy-950 transition hover:border-gold-500 hover:bg-gold-500/10"
              aria-label="Previous"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={() => scroll(360)}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-sand-300 text-navy-950 transition hover:border-gold-500 hover:bg-gold-500/10"
              aria-label="Next"
            >
              ›
            </button>
          </div>
        </AnimatedElement>
      </div>

      <div className="mt-14">
        {loading ? (
          <div className="flex justify-center py-20">
            <Spinner />
          </div>
        ) : (
          <div
            ref={scrollerRef}
            className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth px-4 pb-4 sm:px-6 lg:px-[max(1.5rem,calc((100vw-80rem)/2))] scrollbar-hide"
          >
            {slides.map((trip, index) => (
              <div key={trip.id} className="snap-start">
                <TripSlide trip={trip} index={index} />
              </div>
            ))}
          </div>
        )}
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  )
}
