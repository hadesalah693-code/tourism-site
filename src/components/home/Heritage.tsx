import { Link } from 'react-router-dom'
import { useI18n } from '../../i18n/useI18n'
import { AnimatedElement } from '../ui/AnimatedElement'
import { useParallax } from '../../hooks/useParallax'

const artefacts = [
  {
    image: 'https://images.unsplash.com/photo-1543342578-389944a0d060?auto=format&fit=crop&w=1200&q=88',
    labelKey: 'heritage.artefact1',
  },
  {
    image: 'https://images.unsplash.com/photo-1539768942893-daf53e448371?auto=format&fit=crop&w=1200&q=88',
    labelKey: 'heritage.artefact2',
  },
  {
    image: 'https://images.unsplash.com/photo-1550639525-c97d455acf70?auto=format&fit=crop&w=1200&q=88',
    labelKey: 'heritage.artefact3',
  },
]

export function Heritage() {
  const { t, dir } = useI18n()
  const parallaxRef = useParallax<HTMLDivElement>(0.07)

  return (
    <section className="relative overflow-hidden bg-sand-50 py-24 sm:py-32 lg:py-40">
      {/* Museum-wall texture */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, var(--color-navy-900) 0 1px, transparent 1px 8px), repeating-linear-gradient(90deg, var(--color-navy-900) 0 1px, transparent 1px 8px)',
        }}
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_85%,rgba(255,107,53,0.13),transparent_40%)]" />

      <div className="relative mx-auto grid max-w-7xl gap-14 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-20">
        {/* Text */}
        <div className={`${dir === 'rtl' ? 'lg:order-2' : ''}`}>
          <AnimatedElement>
            <p className="text-[11px] font-medium uppercase tracking-[0.32em] text-orange-600">
              {t('heritage.eyebrow')}
            </p>
          </AnimatedElement>
          <AnimatedElement delay={80}>
            <h2 className="mt-6 font-serif text-4xl font-medium leading-[1.1] tracking-tight text-navy-900 sm:text-5xl lg:text-6xl">
              {t('heritage.title')}
            </h2>
          </AnimatedElement>
          <AnimatedElement delay={160}>
            <p className="mt-7 max-w-xl text-base font-light leading-8 text-navy-800/80">
              {t('heritage.p1')}
            </p>
          </AnimatedElement>
          <AnimatedElement delay={220}>
            <p className="mt-5 max-w-xl text-base font-light leading-8 text-navy-800/80">
              {t('heritage.p2')}
            </p>
          </AnimatedElement>

          <AnimatedElement delay={300}>
            <Link
              to="/trips?category=historical"
              className="group mt-10 inline-flex items-center gap-3 border-b border-orange-500/60 pb-2 text-sm font-semibold uppercase tracking-[0.08em] text-orange-600 transition-colors duration-300 hover:border-orange-700 hover:text-orange-700"
            >
              {t('heritage.cta')}
              <span className="transition-transform duration-500 group-hover:translate-x-1 rtl:group-hover:-translate-x-1">→</span>
            </Link>
          </AnimatedElement>
        </div>

        {/* Museum-style composition */}
        <div ref={parallaxRef} className={`relative will-change-transform ${dir === 'rtl' ? 'lg:order-1' : ''}`}>
          <AnimatedElement animation="scale-in">
            {/* Main artefact - large */}
            <div className="relative mx-auto max-w-[420px] overflow-hidden border border-gold-400/30 bg-white p-2 shadow-[0_40px_100px_rgba(46,26,8,0.18)]">
              <div className="relative overflow-hidden">
                <img
                  src={artefacts[0].image}
                  alt={t('heritage.artefact1')}
                  className="aspect-[4/5] w-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white/40 to-transparent" />
              </div>
              <div className="relative px-3 py-4">
                <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-orange-600">
                  {t('heritage.artefact1')}
                </p>
                <p className="mt-1 text-xl font-serif italic text-navy-800/70">№ 001</p>
              </div>
            </div>

            {/* Overlapping secondary artefacts */}
            <div className="absolute -bottom-14 -left-4 w-[38%] overflow-hidden border border-gold-400/25 bg-white p-1.5 shadow-2xl rtl:-right-4 rtl:left-auto sm:-left-10 rtl:sm:-right-10">
              <img
                src={artefacts[1].image}
                alt={t('heritage.artefact2')}
                className="aspect-square w-full object-cover"
                loading="lazy"
              />
            </div>

            <div className="absolute -top-10 right-0 w-[30%] overflow-hidden border border-gold-400/25 bg-white p-1.5 shadow-2xl rtl:right-auto rtl:-left-0 sm:-right-6 rtl:sm:-left-6">
              <img
                src={artefacts[2].image}
                alt={t('heritage.artefact3')}
                className="aspect-[3/4] w-full object-cover"
                loading="lazy"
              />
            </div>
          </AnimatedElement>
        </div>
      </div>
    </section>
  )
}