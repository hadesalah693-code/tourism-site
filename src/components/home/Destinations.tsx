import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useI18n } from '../../i18n/useI18n'
import { AnimatedElement } from '../ui/AnimatedElement'
import { useParallax } from '../../hooks/useParallax'

type DestKey = 'cairo' | 'giza' | 'luxor' | 'hurghada' | 'sharm' | 'marsa' | 'aswan'

const destinations: { key: DestKey; image: string; tripFilter?: string }[] = [
  { key: 'cairo', image: 'https://images.unsplash.com/photo-1570459027562-4a916cc6113f?auto=format&fit=crop&w=1600&q=88', tripFilter: 'hurghada' },
  { key: 'giza', image: 'https://images.unsplash.com/photo-1539650116574-8aebd259f5c5?auto=format&fit=crop&w=1600&q=88', tripFilter: 'hurghada' },
  { key: 'luxor', image: 'https://images.unsplash.com/photo-1568322445389-f64ac2515020?auto=format&fit=crop&w=1600&q=88', tripFilter: 'hurghada' },
  { key: 'hurghada', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=88', tripFilter: 'hurghada' },
  { key: 'sharm', image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1600&q=88', tripFilter: 'sharm' },
  { key: 'marsa', image: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1600&q=88', tripFilter: 'marsa_alam' },
  { key: 'aswan', image: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1600&q=88', tripFilter: 'hurghada' },
]

export function Destinations() {
  const { t } = useI18n()
  const [active, setActive] = useState<DestKey>('giza')
  const parallaxRef = useParallax<HTMLDivElement>(0.08)

  const current = destinations.find((d) => d.key === active)!

  return (
    <section className="relative overflow-hidden bg-ivory-50 py-24 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-8 lg:grid-cols-[0.5fr_1.5fr] lg:items-start">
          {/* Left rail: heading + destination list */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <AnimatedElement>
              <p className="text-[11px] font-medium uppercase tracking-[0.32em] text-gold-700">
                {t('destinationsHome.eyebrow')}
              </p>
            </AnimatedElement>
            <AnimatedElement delay={80}>
              <h2 className="mt-6 font-serif text-4xl font-medium leading-[1.1] tracking-tight text-navy-950 sm:text-5xl">
                {t('destinationsHome.title')}
              </h2>
            </AnimatedElement>
            <AnimatedElement delay={160}>
              <p className="mt-6 max-w-sm text-base font-light leading-8 text-sand-700">
                {t('destinationsHome.subtitle')}
              </p>
            </AnimatedElement>

            {/* Destination navigation */}
            <AnimatedElement delay={240}>
              <ul className="mt-10 space-y-1">
                {destinations.map(({ key }) => (
                  <li key={key}>
                    <button
                      type="button"
                      onClick={() => setActive(key)}
                      className={`group flex w-full items-center gap-3 border-b border-sand-200 py-3 text-left transition-colors duration-300 rtl:text-right ${
                        active === key ? 'border-gold-500' : 'hover:border-sand-300'
                      }`}
                    >
                      <span
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-[11px] font-medium transition-colors duration-300 ${
                          active === key
                            ? 'border-gold-500 bg-gold-500/10 text-gold-700'
                            : 'border-sand-300 text-sand-500'
                        }`}
                      >
                        {String(destinations.findIndex((d) => d.key === key) + 1).padStart(2, '0')}
                      </span>
                      <span
                        className={`font-serif text-xl font-medium transition-colors duration-300 ${
                          active === key ? 'text-navy-950' : 'text-sand-600 group-hover:text-navy-950'
                        }`}
                      >
                        {t(`destinationsHome.${key}.name`)}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </AnimatedElement>
          </div>

          {/* Right: active destination showcase */}
          <div className="lg:pl-8">
            <AnimatedElement key={active} animation="fade-up" className="relative">
              <div className="relative overflow-hidden">
                <div ref={parallaxRef} className="will-change-transform">
                  <img
                    key={current.image}
                    src={current.image}
                    alt={t(`destinationsHome.${active}.name`)}
                    className="aspect-[16/10] w-full scale-105 object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-transparent to-navy-950/20" />

                <div className="absolute bottom-0 left-0 right-0 p-7 sm:p-9">
                  <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-gold-300">
                    {t(`destinationsHome.${active}.tag`)}
                  </p>
                  <h3 className="mt-2 font-serif text-4xl font-medium text-ivory-50 sm:text-5xl">
                    {t(`destinationsHome.${active}.name`)}
                  </h3>
                  <Link
                    to={`/trips?destination=${current.tripFilter ?? 'hurghada'}`}
                    className="mt-5 inline-flex items-center gap-2 rounded-full border border-ivory-100/30 px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.08em] text-ivory-50 transition-colors duration-300 hover:border-gold-300 hover:text-gold-200"
                  >
                    {t('destinationsHome.cta')}
                    <span>→</span>
                  </Link>
                </div>
              </div>
            </AnimatedElement>
          </div>
        </div>
      </div>
    </section>
  )
}
