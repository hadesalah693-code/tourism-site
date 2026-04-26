import { Link } from 'react-router-dom'
import { TripCard } from '../components/trips/TripCard'
import { SupabaseNotice } from '../components/SupabaseNotice'
import { Button } from '../components/ui/Button'
import { Spinner } from '../components/ui/Spinner'
import { useI18n } from '../i18n/useI18n'
import { useTrips } from '../hooks/useTrips'

export function HomePage() {
  const { t } = useI18n()
  const { trips, loading } = useTrips({ featuredOnly: true })

  return (
    <div>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-ocean-900 to-teal-800" />
        <div
          className="absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              'radial-gradient(ellipse 80% 50% at 20% 0%, rgba(255,255,255,0.15) 0%, transparent 55%), radial-gradient(circle at 85% 15%, rgba(45,212,191,0.35) 0%, transparent 40%)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent" />
        <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:py-28">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-teal-200/95">{t('tagline')}</p>
            <h1 className="mt-5 text-4xl font-semibold tracking-tight text-white text-balance sm:text-5xl sm:leading-[1.1]">
              {t('home.heroTitle')}
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-sky-100/[0.92]">{t('home.heroSubtitle')}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/trips">
                <Button size="lg">{t('home.ctaPrimary')}</Button>
              </Link>
              <Link to="/destinations">
                <Button
                  variant="secondary"
                  size="lg"
                  className="border border-white/25 bg-white/12 text-white shadow-none ring-0 backdrop-blur-sm transition duration-300 hover:border-white/35 hover:bg-white/20"
                >
                  {t('home.ctaSecondary')}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <SupabaseNotice />
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900">{t('home.featured')}</h2>
            <p className="mt-1 text-slate-600/95">{t('home.featuredSub')}</p>
          </div>
          <Link
            to="/trips"
            className="text-sm font-semibold text-ocean-800 transition duration-200 hover:text-ocean-950 hover:underline hover:underline-offset-4"
          >
            {t('nav.trips')} →
          </Link>
        </div>

        <div className="mt-8">
          {loading ? (
            <div className="flex justify-center py-16">
              <Spinner />
            </div>
          ) : trips.length === 0 ? (
            <p className="rounded-2xl border border-slate-200/70 bg-white/90 px-4 py-10 text-center text-slate-600 shadow-elevate">
              {t('trips.empty')}
            </p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {trips.slice(0, 3).map((trip) => (
                <TripCard key={trip.id} trip={trip} />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="border-y border-slate-200/60 bg-gradient-to-b from-white to-sand-50/50">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <h2 className="text-center text-2xl font-semibold tracking-tight text-slate-900">{t('home.why')}</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[t('home.whyItems.one'), t('home.whyItems.two'), t('home.whyItems.three')].map((text) => (
              <div
                key={text}
                className="rounded-2xl border border-slate-200/60 bg-white/80 p-6 shadow-elevate transition duration-300 ease-out hover:-translate-y-0.5 hover:border-slate-200/90 hover:shadow-elevate-lg"
              >
                <p className="text-sm leading-relaxed text-slate-600">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
