import { Link } from 'react-router-dom'
import { SupabaseNotice } from '../components/SupabaseNotice'
import { TripCard } from '../components/trips/TripCard'
import { Button } from '../components/ui/Button'
import { Spinner } from '../components/ui/Spinner'
import { useTrips } from '../hooks/useTrips'
import { useI18n } from '../i18n/useI18n'
import { destinationName } from '../lib/destinations'
import { TRIP_CATEGORIES, tripCategoryLabel } from '../lib/tripCategories'
import { DESTINATIONS } from '../types/trip'
import heroImage from '../assets/hero-red-sea.png'

const categoryImages = {
  sea: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=900&q=85',
  safari: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?auto=format&fit=crop&w=900&q=85',
  historical: 'https://images.unsplash.com/photo-1539768942893-daf53e448371?auto=format&fit=crop&w=900&q=85',
  other: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=900&q=85',
}

const reviews = [
  {
    name: 'Kasia M.',
    text: 'Great contact on WhatsApp, clear prices, and a beautiful Orange Bay trip.',
  },
  {
    name: 'Marek P.',
    text: 'Everything was organized from hotel pickup to lunch. Very easy booking.',
  },
  {
    name: 'Anna K.',
    text: 'The safari was the highlight of our Hurghada holiday. Fast reply and good value.',
  },
]

export function HomePage() {
  const { t, locale } = useI18n()
  const { trips, loading } = useTrips({ featuredOnly: true })
  const bestsellers = trips.slice(0, 6)

  return (
    <div className="bg-sand-50">
      <section className="bg-white">
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:py-16">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ocean-700">{t('tagline')}</p>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 text-balance sm:text-5xl sm:leading-[1.05]">
              {t('brand')}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
              Local tours in Hurghada, Sharm El Sheikh, and Marsa Alam with quick WhatsApp booking, clear prices, and
              hand-picked sea, safari, and history programs.
            </p>
            <div className="mt-7 grid gap-3 sm:flex sm:flex-wrap">
              <Link to="/trips" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto">{t('home.ctaPrimary')}</Button>
              </Link>
              <Link to="/contact" className="w-full sm:w-auto">
                <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                  {t('contact.whatsappCta')}
                </Button>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 items-end gap-3 sm:gap-4">
            <img
              src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=900&q=85"
              alt=""
              className="aspect-[4/5] w-full rounded-lg object-cover shadow-elevate-lg"
              loading="lazy"
            />
            <div className="space-y-4">
              <div className="rounded-lg border border-slate-200 bg-sand-50 p-3 shadow-elevate sm:p-5">
                <img src="/logo.png" alt="" className="mx-auto h-16 w-16 rounded-full object-cover shadow-elevate sm:h-24 sm:w-24" />
                <p className="mt-3 text-center text-xs font-semibold text-slate-900 sm:mt-4 sm:text-sm">Egypt tours made simple</p>
              </div>
              <img
                src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=85"
                alt=""
                className="aspect-[16/10] w-full rounded-lg object-cover shadow-elevate-lg"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden">
        <img src={heroImage} alt="" className="absolute inset-0 h-full w-full object-cover" decoding="async" />
        <div className="absolute inset-0 bg-slate-950/45" />
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-slate-950/80 via-slate-950/25 to-transparent" />
        <div className="relative mx-auto flex min-h-[520px] max-w-6xl flex-col justify-center px-4 py-12 sm:min-h-[560px] sm:px-6 sm:py-16">
          <div className="max-w-3xl text-white">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-teal-200">{t('tagline')}</p>
            <h2 className="mt-5 text-3xl font-semibold tracking-tight text-balance sm:text-6xl sm:leading-[1.05]">
              {t('home.heroTitle')}
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-sky-100/[0.94] sm:text-lg">{t('home.heroSubtitle')}</p>
            <div className="mt-8 grid gap-3 sm:flex sm:flex-wrap">
              <Link to="/trips" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto">{t('home.ctaPrimary')}</Button>
              </Link>
              <Link to="/destinations" className="w-full sm:w-auto">
                <Button
                  variant="secondary"
                  size="lg"
                  className="w-full border border-white/25 bg-white/12 text-white shadow-none ring-0 backdrop-blur-sm transition duration-300 hover:border-white/35 hover:bg-white/20 sm:w-auto"
                >
                  {t('home.ctaSecondary')}
                </Button>
              </Link>
            </div>
          </div>

          <div className="mt-10 grid gap-3 rounded-lg border border-white/20 bg-white/12 p-3 backdrop-blur-md sm:mt-12 sm:grid-cols-3">
            {DESTINATIONS.map((destination) => (
              <Link
                key={destination}
                to={`/trips?destination=${destination}`}
                className="rounded-md border border-white/15 bg-white/92 px-4 py-4 text-sm font-semibold text-slate-900 shadow-sm transition duration-200 hover:bg-white"
              >
                {destinationName(locale, destination)}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-12">
        <SupabaseNotice />
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ocean-700">Tour categories</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">Find your trip type</h2>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {TRIP_CATEGORIES.map((category) => (
            <Link
              key={category}
              to={`/trips?category=${category}`}
              className="group overflow-hidden rounded-lg bg-white shadow-elevate transition duration-300 hover:-translate-y-1 hover:shadow-elevate-lg"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={categoryImages[category]}
                  alt=""
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 to-transparent" />
                <p className="absolute bottom-4 start-4 end-4 text-lg font-semibold text-white">
                  {tripCategoryLabel(category, locale)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-14 sm:px-6">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ocean-700">Bestsellers</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">{t('home.featured')}</h2>
          <p className="mt-1 text-slate-600/95">{t('home.featuredSub')}</p>
        </div>

        <div className="mt-8">
          {loading ? (
            <div className="flex justify-center py-16">
              <Spinner />
            </div>
          ) : bestsellers.length === 0 ? (
            <p className="rounded-lg border border-slate-200/70 bg-white/90 px-4 py-10 text-center text-slate-600 shadow-elevate">
              {t('trips.empty')}
            </p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {bestsellers.map((trip) => (
                <TripCard key={trip.id} trip={trip} />
              ))}
            </div>
          )}
        </div>

        <div className="mt-9 text-center">
          <Link to="/trips">
            <Button variant="secondary">{t('nav.trips')}</Button>
          </Link>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 sm:py-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <img
            src="https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1400&q=85"
            alt=""
            className="aspect-[4/3] w-full rounded-lg object-cover shadow-elevate-lg"
            loading="lazy"
          />
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ocean-700">Private tour</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">Need a custom trip?</h2>
            <p className="mt-4 text-slate-600">
              Tell us your hotel, date, group size, and preferred style. We will send a clear plan and price on
              WhatsApp.
            </p>
            <div className="mt-6">
              <Link to="/contact">
                <Button className="w-full sm:w-auto">{t('contact.whatsappCta')}</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200/60 bg-sand-50">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <div className="grid gap-4 text-center sm:grid-cols-3">
            {[
              ['12+', 'Top excursions'],
              ['3', 'Red Sea destinations'],
              ['24/7', 'WhatsApp support'],
            ].map(([value, label]) => (
              <div key={label} className="rounded-lg bg-white p-6 shadow-elevate">
                <p className="text-3xl font-semibold text-ocean-800">{value}</p>
                <p className="mt-2 text-sm font-medium text-slate-600">{label}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ocean-700">Why us</p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">{t('home.why')}</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {[t('home.whyItems.one'), t('home.whyItems.two'), t('home.whyItems.three')].map((text) => (
                <div key={text} className="rounded-lg border border-slate-200/70 bg-white p-5 shadow-elevate">
                  <p className="text-sm leading-relaxed text-slate-600">{text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12">
            <div className="text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ocean-700">Reviews</p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">Guest opinions</h2>
            </div>
            <div className="mt-7 grid gap-5 md:grid-cols-3">
              {reviews.map((review) => (
                <figure key={review.name} className="rounded-lg border border-slate-200/70 bg-white p-6 shadow-elevate">
                  <div className="text-ocean-700">*****</div>
                  <blockquote className="mt-4 text-sm leading-relaxed text-slate-600">"{review.text}"</blockquote>
                  <figcaption className="mt-5 text-sm font-semibold text-slate-900">{review.name}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
