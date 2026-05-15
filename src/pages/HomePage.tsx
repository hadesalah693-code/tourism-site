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
  sea: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1200&q=88',
  safari: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?auto=format&fit=crop&w=1200&q=88',
  historical: 'https://images.unsplash.com/photo-1539768942893-daf53e448371?auto=format&fit=crop&w=1200&q=88',
  other: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=88',
}

const destinationCards: { key: 'sharm' | 'hurghada' | 'marsa'; dest: Destination; image: string; tone: string }[] = [
  {
    key: 'sharm',
    dest: 'sharm',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1600&q=88',
    tone: 'Private reefs, yacht days, and cinematic desert horizons.',
  },
  {
    key: 'hurghada',
    dest: 'hurghada',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=88',
    tone: 'Island escapes, family boat trips, and warm Red Sea mornings.',
  },
  {
    key: 'marsa',
    dest: 'marsa_alam',
    image: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1600&q=88',
    tone: 'Quiet beaches, turtles, coral gardens, and slow luxury.',
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

  const heroStats =
    locale === 'ar'
      ? [
          ['12+', 'رحلة منتقاة'],
          ['3', 'وجهات البحر الأحمر'],
          ['24/7', 'تنسيق واتساب'],
        ]
      : [
          ['12+', 'Curated escapes'],
          ['3', 'Red Sea resorts'],
          ['24/7', 'WhatsApp concierge'],
        ]

  const soulMoments =
    locale === 'ar'
      ? [
          ['إحساس البحر', 'مياه فيروزية، يوم مرتب، واختيارات تشبه مزاج الإجازة الحقيقي.'],
          ['ضيافة مصرية', 'تفاصيل واضحة، رد سريع، وروح دافئة من أول رسالة لحد الرجوع للفندق.'],
          ['رفاهية سهلة', 'نختصر عليك الاختيار ونرتب رحلة تناسب وقتك، فندقك، وميزانيتك.'],
        ]
      : [
          ['Sea Mood', 'Turquoise water, curated days, and a holiday rhythm that feels effortless.'],
          ['Egyptian Warmth', 'Clear details, fast replies, and warm hosting from first message to hotel return.'],
          ['Easy Luxury', 'We simplify choices and shape the trip around your hotel, timing, and style.'],
        ]

  return (
    <div className="overflow-hidden bg-transparent">
      <section className="relative min-h-[calc(100svh-5rem)] overflow-hidden bg-slate-950 text-white">
        <img
          src={heroImage}
          alt=""
          className="absolute inset-0 h-full w-full scale-105 object-cover motion-safe:animate-[hero-drift_22s_ease-in-out_infinite_alternate]"
          decoding="async"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_12%,rgba(251,191,36,0.24),transparent_18%),radial-gradient(circle_at_16%_28%,rgba(34,211,238,0.18),transparent_24%),linear-gradient(105deg,rgba(2,6,23,0.86)_0%,rgba(8,47,73,0.42)_45%,rgba(2,132,199,0.08)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-slate-950 via-slate-950/64 to-transparent" />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-slate-950/58 to-transparent" />
        <div className="absolute -start-24 top-24 h-80 w-80 rounded-full bg-cyan-200/14 blur-3xl" />
        <div className="absolute end-[-10rem] top-20 h-96 w-96 rounded-full bg-amber-300/18 blur-3xl" />
        <div className="absolute bottom-24 start-[12%] h-40 w-72 rotate-[-10deg] rounded-full bg-white/8 blur-3xl" />

        <div className="relative mx-auto flex min-h-[calc(100svh-5rem)] max-w-7xl flex-col justify-center px-4 pb-44 pt-20 sm:px-6 sm:pb-48 lg:pb-40">
          <div className="max-w-5xl">
            <p className="inline-flex rounded-full border border-white/18 bg-white/8 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.32em] text-teal-100 shadow-elevate backdrop-blur-md">
              {t('tagline')}
            </p>
            <h1 className="mt-8 max-w-5xl text-5xl font-semibold leading-[0.94] tracking-tight text-balance sm:text-7xl lg:text-8xl">
              {t('home.heroTitle')}
            </h1>
            <p className="mt-8 max-w-2xl text-base leading-8 text-sky-50/88 sm:text-xl sm:leading-9">
              {t('home.heroSubtitle')}
            </p>

            <div className="mt-10 grid w-full max-w-md gap-3 sm:flex sm:max-w-none sm:flex-wrap">
              <Link to="/trips" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="min-h-14 w-full rounded-full px-9 text-sm font-bold shadow-[0_0_42px_rgba(14,165,233,0.42)] sm:w-auto sm:text-base"
                >
                  {t('home.ctaPrimary')}
                </Button>
              </Link>
              <Link to="/destinations" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="min-h-14 w-full rounded-full bg-gradient-to-b from-amber-200 to-orange-500 px-9 text-sm font-bold text-slate-950 shadow-[0_0_42px_rgba(251,146,60,0.36)] hover:from-amber-100 hover:to-orange-500 sm:w-auto sm:text-base"
                >
                  {t('home.ctaSecondary')}
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-6 z-10 px-4 sm:bottom-8 sm:px-6">
          <div className="mx-auto grid max-w-7xl gap-3 lg:grid-cols-[0.78fr_1.22fr] lg:items-end">
            <div className="grid grid-cols-3 gap-2 rounded-3xl border border-white/14 bg-white/8 p-2 shadow-[0_24px_70px_rgba(2,6,23,0.28)] backdrop-blur-xl">
              {heroStats.map(([value, label]) => (
                <div key={label} className="rounded-2xl bg-white/9 px-3 py-3 text-center ring-1 ring-white/10 sm:py-4">
                  <p className="text-lg font-bold text-white sm:text-2xl">{value}</p>
                  <p className="mt-1 text-[10px] font-semibold leading-4 text-sky-100/82 sm:text-xs">{label}</p>
                </div>
              ))}
            </div>

            <div className="grid gap-2 rounded-3xl border border-white/14 bg-slate-950/28 p-2 shadow-[0_24px_70px_rgba(2,6,23,0.28)] backdrop-blur-xl sm:grid-cols-3">
              {DESTINATIONS.map((destination) => (
                <Link
                  key={destination}
                  to={`/trips?destination=${destination}`}
                  className="group flex min-h-12 items-center justify-between rounded-2xl border border-white/10 bg-white/10 px-4 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:border-amber-200/45 hover:bg-white/16 sm:min-h-14"
                >
                  <span>{destinationName(locale, destination)}</span>
                  <span className="text-amber-200 transition group-hover:translate-x-1 rtl:group-hover:-translate-x-1">→</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 -mt-10 mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-4 rounded-[2rem] border border-white/60 bg-white/78 p-3 shadow-[0_24px_80px_rgba(8,47,73,0.14)] backdrop-blur-2xl md:grid-cols-3">
          {soulMoments.map(([title, text], index) => (
            <div
              key={title}
              className="group relative overflow-hidden rounded-[1.5rem] border border-white/80 bg-gradient-to-br from-white via-ocean-50/70 to-amber-50/70 p-6 shadow-sm transition duration-500 hover:-translate-y-1 hover:shadow-elevate-lg"
            >
              <span className="pointer-events-none absolute -end-10 -top-10 h-28 w-28 rounded-full bg-teal-300/22 blur-2xl transition duration-500 group-hover:bg-amber-300/24" />
              <span className="text-xs font-bold uppercase tracking-[0.22em] text-ocean-700">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h2 className="mt-4 text-xl font-semibold tracking-tight text-slate-950">{title}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="relative bg-white/94 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-6 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-ocean-700">{t('nav.destinations')}</p>
              <h2 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950 sm:text-6xl">
                {t('destinations.title')}
              </h2>
            </div>
            <p className="max-w-2xl text-base leading-8 text-slate-600 lg:justify-self-end">
              {t('destinations.subtitle')}
            </p>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {destinationCards.map(({ key, dest, image, tone }, index) => (
              <Link
                key={dest}
                to={`/trips?destination=${dest}`}
                className={`group relative min-h-[420px] overflow-hidden rounded-[2rem] bg-slate-950 shadow-[0_24px_80px_rgba(15,23,42,0.16)] transition duration-700 hover:-translate-y-2 hover:shadow-[0_34px_100px_rgba(8,47,73,0.24)] ${
                  index === 1 ? 'lg:mt-10' : ''
                }`}
              >
                <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-110" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/28 to-transparent" />
                <div className="absolute inset-x-5 top-5 flex items-center justify-between">
                  <span className="rounded-full border border-white/24 bg-white/12 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-white backdrop-blur-md">
                    Egypt
                  </span>
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-ocean-900">0{index + 1}</span>
                </div>
                <div className="absolute inset-x-5 bottom-5">
                  <h3 className="text-3xl font-semibold text-white">{destinationName(locale, dest)}</h3>
                  <p className="mt-3 text-sm leading-6 text-sky-50/86">{locale === 'ar' ? t(`destinations.${key}.blurb`) : tone}</p>
                  <span className="mt-5 inline-flex rounded-full bg-white px-4 py-2 text-sm font-bold text-ocean-900 transition group-hover:bg-amber-200">
                    {t('destinations.cta')}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="relative bg-slate-950 py-16 text-white sm:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_8%,rgba(45,212,191,0.16),transparent_32%),radial-gradient(circle_at_78%_22%,rgba(251,146,60,0.14),transparent_30%)]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <SupabaseNotice />
          <div className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-teal-200">Bestsellers</p>
              <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-6xl">{t('home.featured')}</h2>
              <p className="mt-4 max-w-2xl text-base leading-8 text-slate-300">{t('home.featuredSub')}</p>
            </div>
            <Link to="/trips" className="w-full sm:w-auto">
              <Button className="min-h-12 w-full rounded-full px-6 sm:w-auto">{t('nav.trips')}</Button>
            </Link>
          </div>

          <div className="mt-10">
            {loading ? (
              <div className="flex justify-center py-16">
                <Spinner />
              </div>
            ) : bestsellers.length === 0 ? (
              <p className="rounded-[1.5rem] border border-white/10 bg-white/8 px-4 py-10 text-center text-slate-300 shadow-elevate">
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
        </div>
      </section>

      <section className="relative bg-white/94 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {TRIP_CATEGORIES.map((category) => (
              <Link
                key={category}
                to={`/trips?category=${category}`}
                className="group relative min-h-[300px] overflow-hidden rounded-[1.75rem] bg-slate-950 shadow-elevate-lg transition duration-500 hover:-translate-y-1.5"
              >
                <img
                  src={categoryImages[category]}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/25 to-transparent" />
                <p className="absolute bottom-5 start-5 end-5 text-2xl font-semibold text-white">
                  {tripCategoryLabel(category, locale)}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-950 px-4 py-16 text-white sm:px-6 sm:py-24">
        <div className="mx-auto grid max-w-7xl overflow-hidden rounded-[2.25rem] border border-white/10 bg-white/8 shadow-[0_30px_100px_rgba(2,6,23,0.35)] backdrop-blur lg:grid-cols-[1.05fr_0.95fr]">
          <img
            src="https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1600&q=88"
            alt=""
            className="h-full min-h-[360px] w-full object-cover"
            loading="lazy"
          />
          <div className="p-7 sm:p-10 lg:p-14">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-amber-200">Private tour</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">Need a custom trip?</h2>
            <p className="mt-5 text-base leading-8 text-slate-300">
              Tell us your hotel, date, group size, and preferred style. We will send a clear plan and price on
              WhatsApp.
            </p>
            <div className="mt-8">
              <Link to="/contact">
                <Button className="min-h-12 w-full rounded-full px-7 sm:w-auto">{t('contact.whatsappCta')}</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/60 bg-white/82 py-16 backdrop-blur sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-5 md:grid-cols-[0.8fr_1.2fr] md:items-start">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-ocean-700">Why us</p>
              <h2 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950">{t('home.why')}</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {[t('home.whyItems.one'), t('home.whyItems.two'), t('home.whyItems.three')].map((text) => (
                <div key={text} className="rounded-[1.5rem] border border-white/80 bg-white/82 p-6 shadow-elevate backdrop-blur">
                  <p className="text-sm leading-7 text-slate-600">{text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {reviews.map((review) => (
              <figure key={review.name} className="rounded-[1.5rem] border border-white/80 bg-white/88 p-6 shadow-elevate">
                <div className="text-amber-500">*****</div>
                <blockquote className="mt-4 text-sm leading-7 text-slate-600">"{review.text}"</blockquote>
                <figcaption className="mt-5 text-sm font-semibold text-slate-900">{review.name}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
