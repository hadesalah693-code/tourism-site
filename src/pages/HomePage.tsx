import { Link } from 'react-router-dom'
import { SupabaseNotice } from '../components/SupabaseNotice'
import { TripCard } from '../components/trips/TripCard'
import { Button } from '../components/ui/Button'
import { Spinner } from '../components/ui/Spinner'
import { useTrips } from '../hooks/useTrips'
import { useI18n } from '../i18n/useI18n'
import { destinationName } from '../lib/destinations'
import { TRIP_CATEGORIES, tripCategoryLabel } from '../lib/tripCategories'
import { DESTINATIONS, type Destination } from '../types/trip'
import heroImage from '../assets/hero-red-sea.png'

const categoryImages = {
  sea: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=900&q=85',
  safari: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?auto=format&fit=crop&w=900&q=85',
  historical: 'https://images.unsplash.com/photo-1539768942893-daf53e448371?auto=format&fit=crop&w=900&q=85',
  other: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=900&q=85',
}

const destinationCards: { key: 'sharm' | 'hurghada' | 'marsa'; dest: Destination; image: string }[] = [
  {
    key: 'sharm',
    dest: 'sharm',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=85',
  },
  {
    key: 'hurghada',
    dest: 'hurghada',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=85',
  },
  {
    key: 'marsa',
    dest: 'marsa_alam',
    image: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1200&q=85',
  },
]

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
  const soulMoments =
    locale === 'ar'
      ? [
          ['بحر صافي', 'مياه فيروزية ورحلات مختارة بهدوء من غير زحمة أو تعقيد.'],
          ['تنظيم مصري أصيل', 'استقبال دافئ، أسعار واضحة، وتفاصيل صغيرة تفرق في يومك.'],
          ['حجز مطمئن', 'نرد عليك بسرعة ونرتب الرحلة حسب فندقك ووقتك.'],
        ]
      : [
          ['Clear Red Sea', 'Turquoise water and hand-picked trips without noise or confusion.'],
          ['Egyptian Warmth', 'Warm hosting, clear prices, and small details that shape the day.'],
          ['Easy Booking', 'Fast replies and a trip plan matched to your hotel and timing.'],
        ]

  return (
    <div className="bg-transparent">
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
            <div className="mt-8 grid w-full max-w-sm gap-3 sm:flex sm:max-w-none sm:flex-wrap">
              <Link to="/trips" className="w-full sm:w-auto">
                <Button size="lg" className="min-h-12 w-full px-7 text-sm font-semibold sm:w-auto sm:text-base">
                  {t('home.ctaPrimary')}
                </Button>
              </Link>
              <Link to="/destinations" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="min-h-12 w-full px-7 text-sm font-semibold sm:w-auto sm:text-base"
                >
                  {t('home.ctaSecondary')}
                </Button>
              </Link>
            </div>
          </div>

          <div className="mt-10 grid gap-2 rounded-2xl border border-white/20 bg-slate-950/28 p-2 shadow-elevate-lg backdrop-blur-md sm:mt-12 sm:grid-cols-3 sm:gap-3 sm:p-3">
            {DESTINATIONS.map((destination) => (
              <Link
                key={destination}
                to={`/trips?destination=${destination}`}
                className="group relative flex min-h-14 items-center justify-between overflow-hidden rounded-xl border border-white/25 bg-gradient-to-b from-white/96 to-ocean-50/92 px-4 py-3 text-sm font-semibold text-slate-900 shadow-sm shadow-slate-950/10 transition duration-300 hover:-translate-y-0.5 hover:border-teal-200/80 hover:from-white hover:to-white hover:shadow-elevate-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ocean-500 sm:min-h-16 sm:px-5"
              >
                <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-teal-300/80 to-transparent opacity-70 transition duration-300 group-hover:opacity-100" />
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-ocean-100 bg-white text-ocean-700 shadow-sm transition duration-300 group-hover:border-ocean-200 group-hover:bg-ocean-50">
                  <span className="text-base leading-none">›</span>
                </span>
                <span className="truncate px-3 text-center">{destinationName(locale, destination)}</span>
                <span className="h-2 w-2 shrink-0 rounded-full bg-teal-400/80 shadow-[0_0_14px_rgba(45,212,191,0.7)] transition duration-300 group-hover:scale-125 group-hover:bg-teal-500" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="relative -mt-8 z-10 mx-auto max-w-6xl px-4 sm:-mt-10 sm:px-6">
        <div className="grid gap-3 rounded-2xl border border-white/60 bg-white/72 p-3 shadow-elevate-lg backdrop-blur-xl md:grid-cols-3">
          {soulMoments.map(([title, text], index) => (
            <div
              key={title}
              className="group relative overflow-hidden rounded-xl border border-white/70 bg-gradient-to-br from-white/92 via-ocean-50/72 to-sand-50/92 p-5 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-elevate"
            >
              <span className="pointer-events-none absolute -end-8 -top-8 h-24 w-24 rounded-full bg-teal-300/18 blur-2xl transition duration-500 group-hover:bg-teal-300/28" />
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-ocean-700">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-3 text-lg font-semibold tracking-tight text-slate-950">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ocean-700">{t('nav.destinations')}</p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">
                {t('destinations.title')}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">{t('destinations.subtitle')}</p>
            </div>
            <Link to="/destinations" className="w-full sm:w-auto">
              <Button variant="secondary" className="w-full sm:w-auto">
                {t('home.ctaSecondary')}
              </Button>
            </Link>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {destinationCards.map(({ key, dest, image }) => (
              <Link
                key={dest}
                to={`/trips?destination=${dest}`}
                className="group overflow-hidden rounded-lg border border-slate-200/70 bg-white shadow-elevate transition duration-300 hover:-translate-y-1 hover:shadow-elevate-lg"
              >
                <div className="relative aspect-[16/11] overflow-hidden">
                  <img
                    src={image}
                    alt=""
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/20 to-transparent" />
                  <div className="absolute bottom-4 start-4 end-4">
                    <h3 className="text-xl font-semibold text-white">{destinationName(locale, dest)}</h3>
                  </div>
                </div>
                <div className="p-5">
                  <p className="min-h-[4.5rem] text-sm leading-relaxed text-slate-600">{t(`destinations.${key}.blurb`)}</p>
                  <div className="mt-5 inline-flex items-center rounded-full bg-ocean-50 px-4 py-2 text-sm font-semibold text-ocean-800 transition duration-200 group-hover:bg-ocean-700 group-hover:text-white">
                    {t('destinations.cta')}
                  </div>
                </div>
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
