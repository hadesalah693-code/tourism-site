import { useParams } from 'react-router-dom'
import { SupabaseNotice } from '../components/SupabaseNotice'
import { WhatsAppButton } from '../components/WhatsAppButton'
import { Spinner } from '../components/ui/Spinner'
import { useI18n } from '../i18n/useI18n'
import { destinationName } from '../lib/destinations'
import { formatPrice, tripFullDescription, tripShortDescription, tripTitle } from '../lib/tripUtils'
import { useTripById } from '../hooks/useTrips'

const FALLBACK =
  'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1600&q=80'

export function TripDetailPage() {
  const { id } = useParams()
  const { t, locale } = useI18n()
  const { trip, loading } = useTripById(id)

  const waMessage =
    trip != null
      ? `${t('whatsapp.defaultMessage')} — ${tripTitle(trip, locale)} (${trip.id})`
      : t('whatsapp.defaultMessage')

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Spinner />
      </div>
    )
  }

  if (!trip) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6">
        <p className="text-lg text-slate-700">{t('tripDetail.notFound')}</p>
      </div>
    )
  }

  const gallery = trip.gallery_images?.filter(Boolean) ?? []

  return (
    <article className="pb-16">
      <div className="relative h-[min(52vh,520px)] w-full overflow-hidden">
        <img src={trip.cover_image || FALLBACK} alt="" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/20 to-transparent" />
        <div className="absolute bottom-0 mx-auto w-full max-w-6xl px-4 pb-10 sm:px-6">
          <p className="text-sm font-semibold uppercase tracking-widest text-teal-200/90">
            {destinationName(locale, trip.destination)}
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-white sm:text-4xl">{tripTitle(trip, locale)}</h1>
          <p className="mt-3 max-w-2xl text-sky-100/95">{tripShortDescription(trip, locale)}</p>
          <div className="mt-6 flex flex-wrap items-center gap-4 text-white">
            <div>
              <p className="text-xs uppercase tracking-wide text-sky-200/80">{t('tripDetail.duration')}</p>
              <p className="text-lg font-semibold">{trip.duration}</p>
            </div>
            <div className="h-10 w-px bg-white/20" />
            <div>
              <p className="text-xs uppercase tracking-wide text-sky-200/80">{t('trips.from')}</p>
              <p className="text-2xl font-semibold">{formatPrice(trip.price, trip.currency, locale)}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <SupabaseNotice />
        <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_320px]">
          <div>
            <p className="whitespace-pre-line text-base leading-relaxed text-slate-700">
              {tripFullDescription(trip, locale) || tripShortDescription(trip, locale)}
            </p>

            {gallery.length > 0 ? (
              <div className="mt-10">
                <h2 className="text-xl font-semibold text-slate-900">{t('tripDetail.gallery')}</h2>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {gallery.map((url) => (
                    <img
                      key={url}
                      src={url}
                      alt=""
                      className="h-48 w-full rounded-2xl border border-slate-200/60 object-cover shadow-elevate transition duration-300 hover:shadow-elevate-lg"
                      loading="lazy"
                    />
                  ))}
                </div>
              </div>
            ) : null}
          </div>

          <aside className="h-fit rounded-2xl border border-slate-200/60 bg-white/95 p-6 shadow-elevate-lg">
            <p className="text-sm text-slate-600">{t('tripDetail.destination')}</p>
            <p className="mt-1 text-lg font-semibold text-slate-900">{destinationName(locale, trip.destination)}</p>
            <div className="mt-6">
              <WhatsAppButton label={t('tripDetail.book')} message={waMessage} />
            </div>
          </aside>
        </div>
      </div>
    </article>
  )
}
