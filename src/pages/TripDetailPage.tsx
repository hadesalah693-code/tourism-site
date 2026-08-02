import { useParams } from 'react-router-dom'
import { SupabaseNotice } from '../components/SupabaseNotice'
import { WhatsAppButton } from '../components/WhatsAppButton'
import { BookingForm } from '../components/booking/BookingForm'
import { Spinner } from '../components/ui/Spinner'
import { useI18n } from '../i18n/useI18n'
import { destinationName } from '../lib/destinations'
import { applyFallbackImage, fallbackForTrip } from '../lib/tripImages'
import { inferTripCategory } from '../lib/tripCategories'
import { formatPrice, tripFullDescription, tripShortDescription, tripTitle } from '../lib/tripUtils'
import { useTripById } from '../hooks/useTrips'

type ParsedTripDetails = {
  intro: string[]
  program: string[]
  sections: Array<{ title: string; value: string }>
}

const detailTitleMap: Record<string, string> = {
  timing: 'Timing',
  children: 'Children',
  requirements: 'Requirements',
  notes: 'Notes',
  'extra notes': 'Notes',
  duration: 'Duration',
}

function parseTripDetails(text: string): ParsedTripDetails {
  const details: ParsedTripDetails = { intro: [], program: [], sections: [] }
  const lines = text
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)

  let active: 'intro' | 'program' = 'intro'

  for (const line of lines) {
    const headingMatch = line.match(/^([^:]+):\s*(.*)$/)
    if (headingMatch) {
      const rawTitle = headingMatch[1].trim()
      const titleKey = rawTitle.toLowerCase()
      const value = headingMatch[2].trim()

      if (titleKey === 'program') {
        active = 'program'
        continue
      }

      active = 'intro'

      if (titleKey === 'hero image theme') continue

      const title = detailTitleMap[titleKey] ?? rawTitle
      if (value) {
        const existing = details.sections.find((section) => section.title === title)
        if (existing) existing.value = `${existing.value}\n${value}`
        else details.sections.push({ title, value })
      }
      continue
    }

    if (line.startsWith('- ')) {
      const item = line.slice(2).trim()
      if (active === 'program') details.program.push(item)
      else details.intro.push(item)
      continue
    }

    if (active === 'program') details.program.push(line)
    else details.intro.push(line)
  }

  return details
}

function TripDetailsContent({ text }: { text: string }) {
  const details = parseTripDetails(text)
  const hasStructuredDetails = details.program.length > 0 || details.sections.length > 0

  if (!hasStructuredDetails) {
    return <p className="whitespace-pre-line text-base leading-relaxed text-slate-700">{text}</p>
  }

  return (
    <div className="space-y-8">
      {details.intro.length > 0 ? (
        <div className="space-y-3 text-base leading-relaxed text-slate-700">
          {details.intro.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      ) : null}

      {details.program.length > 0 ? (
        <section>
          <h2 className="text-xl font-semibold text-slate-900">Program</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {details.program.map((item) => (
              <li
                key={item}
                className="rounded-lg border border-slate-200/70 bg-white px-4 py-3 text-sm font-medium leading-relaxed text-slate-700 shadow-sm"
              >
                {item}
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {details.sections.length > 0 ? (
        <section>
          <h2 className="text-xl font-semibold text-slate-900">Trip Details</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {details.sections.map((section) => (
              <div key={`${section.title}-${section.value}`} className="rounded-lg border border-slate-200/70 bg-slate-50 px-4 py-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{section.title}</p>
                <p className="mt-1 whitespace-pre-line text-sm font-semibold leading-relaxed text-slate-900">
                  {section.value}
                </p>
              </div>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  )
}

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
  const category = inferTripCategory(trip, locale)
  const fallbackImage = fallbackForTrip(trip, category)

  return (
    <article className="pb-16">
      <div className="relative h-[min(52vh,520px)] w-full overflow-hidden">
        <img
          src={trip.cover_image || fallbackImage}
          alt=""
          className="h-full w-full object-cover"
          referrerPolicy="no-referrer"
          onError={(event) => applyFallbackImage(event.currentTarget, category, trip.id)}
        />
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
            <TripDetailsContent text={tripFullDescription(trip, locale) || tripShortDescription(trip, locale)} />

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
                      referrerPolicy="no-referrer"
                      onError={(event) => applyFallbackImage(event.currentTarget, category, `${trip.id}-${url}`)}
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
            <BookingForm trip={trip} />
          </aside>
        </div>
      </div>
    </article>
  )
}
