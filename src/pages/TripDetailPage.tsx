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
    return <p className="whitespace-pre-line text-base leading-relaxed text-sand-700">{text}</p>
  }

  return (
    <div className="space-y-8">
      {details.intro.length > 0 ? (
        <div className="space-y-3 text-base leading-relaxed text-sand-700">
          {details.intro.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      ) : null}

      {details.program.length > 0 ? (
        <section>
          <h2 className="text-2xl font-serif font-medium text-navy-950">Program</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {details.program.map((item) => (
              <li
                key={item}
                className="rounded-xl border border-sand-200 bg-ivory-50 px-4 py-3 text-sm font-medium leading-relaxed text-sand-800 shadow-sm"
              >
                {item}
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {details.sections.length > 0 ? (
        <section>
          <h2 className="text-2xl font-serif font-medium text-navy-950">Trip Details</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {details.sections.map((section) => (
              <div key={`${section.title}-${section.value}`} className="rounded-xl border border-sand-200 bg-ivory-50 px-4 py-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-gold-600">{section.title}</p>
                <p className="mt-1 whitespace-pre-line text-sm font-semibold leading-relaxed text-navy-950">
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
      <div className="relative h-[min(70vh,640px)] w-full overflow-hidden bg-navy-950">
        <img
          src={trip.cover_image || fallbackImage}
          alt=""
          className="h-full w-full object-cover"
          referrerPolicy="no-referrer"
          onError={(event) => applyFallbackImage(event.currentTarget, category, trip.id)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/25 to-navy-950/30" />
        <div className="absolute bottom-0 mx-auto w-full max-w-7xl px-4 pb-12 sm:px-6">
          <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-gold-300">
            {destinationName(locale, trip.destination)}
          </p>
          <h1 className="mt-3 font-serif text-4xl font-medium leading-tight text-ivory-50 sm:text-5xl">
            {tripTitle(trip, locale)}
          </h1>
          <p className="mt-4 max-w-2xl text-base font-light leading-7 text-ivory-100/80">
            {tripShortDescription(trip, locale)}
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-5 text-ivory-50">
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-gold-300/80">{t('tripDetail.duration')}</p>
              <p className="mt-1 text-lg font-medium">{trip.duration}</p>
            </div>
            <div className="h-10 w-px bg-white/20" />
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-gold-300/80">{t('trips.from')}</p>
              <p className="mt-1 text-2xl font-medium text-gold-200">
                {formatPrice(trip.price, trip.currency, locale)}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <SupabaseNotice />
        <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_340px]">
          <div>
            <TripDetailsContent text={tripFullDescription(trip, locale) || tripShortDescription(trip, locale)} />

            {gallery.length > 0 ? (
              <div className="mt-10">
                <h2 className="font-serif text-2xl font-medium text-navy-950">{t('tripDetail.gallery')}</h2>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {gallery.map((url) => (
                    <img
                      key={url}
                      src={url}
                      alt=""
                      className="h-48 w-full rounded-2xl border border-sand-200 object-cover shadow-elevate transition duration-300 hover:shadow-elevate-lg"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      onError={(event) => applyFallbackImage(event.currentTarget, category, `${trip.id}-${url}`)}
                    />
                  ))}
                </div>
              </div>
            ) : null}
          </div>

          <aside className="h-fit rounded-3xl border border-sand-200 bg-ivory-50 p-6 shadow-elevate-lg lg:sticky lg:top-24">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-600">
              {t('tripDetail.destination')}
            </p>
            <p className="mt-1 font-serif text-xl font-medium text-navy-950">
              {destinationName(locale, trip.destination)}
            </p>
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
