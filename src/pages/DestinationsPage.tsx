import { Link } from 'react-router-dom'
import { Button } from '../components/ui/Button'
import { PageHeader } from '../components/layout/PageHeader'
import { useI18n } from '../i18n/useI18n'
import type { Destination } from '../types/trip'

const cards: { key: 'sharm' | 'hurghada' | 'marsa'; dest: Destination }[] = [
  { key: 'sharm', dest: 'sharm' },
  { key: 'hurghada', dest: 'hurghada' },
  { key: 'marsa', dest: 'marsa_alam' },
]

export function DestinationsPage() {
  const { t } = useI18n()

  return (
    <div>
      <PageHeader eyebrow="nav.destinations" title={t('destinations.title')} subtitle={t('destinations.subtitle')} />

      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-6 lg:grid-cols-3">
          {cards.map(({ key, dest }) => (
            <article
              key={key}
              className="group flex flex-col overflow-hidden rounded-2xl border border-sand-200 bg-ivory-50 shadow-elevate transition duration-500 ease-out hover:-translate-y-1 hover:border-gold-300 hover:shadow-elevate-lg"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={
                    key === 'sharm'
                      ? 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80'
                      : key === 'hurghada'
                        ? 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80'
                        : 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1200&q=80'
                  }
                  alt=""
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 to-transparent" />
                <div className="absolute bottom-4 start-4 end-4">
                  <h2 className="font-serif text-2xl font-medium text-ivory-50">{t(`destinations.${key}.name`)}</h2>
                </div>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <p className="text-sm font-light leading-relaxed text-sand-700">{t(`destinations.${key}.blurb`)}</p>
                <div className="mt-6">
                  <Link to={`/trips?destination=${dest}`}>
                    <Button variant="secondary" className="w-full">
                      {t('destinations.cta')}
                    </Button>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}