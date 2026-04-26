import { Link } from 'react-router-dom'
import { Button } from '../components/ui/Button'
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
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <header className="max-w-2xl">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">{t('destinations.title')}</h1>
        <p className="mt-3 text-lg text-slate-600/95">{t('destinations.subtitle')}</p>
      </header>

      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        {cards.map(({ key, dest }) => (
          <article
            key={key}
            className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200/60 bg-white shadow-elevate transition duration-500 ease-out hover:-translate-y-1 hover:border-slate-200/80 hover:shadow-elevate-lg"
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
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/55 to-transparent" />
              <div className="absolute bottom-4 start-4 end-4">
                <h2 className="text-xl font-semibold text-white">{t(`destinations.${key}.name`)}</h2>
              </div>
            </div>
            <div className="flex flex-1 flex-col p-6">
              <p className="text-sm leading-relaxed text-slate-600">{t(`destinations.${key}.blurb`)}</p>
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
  )
}
