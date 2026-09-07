import { Link } from 'react-router-dom'
import { useI18n } from '../../i18n/useI18n'
import { AnimatedElement } from '../ui/AnimatedElement'
import { useParallax } from '../../hooks/useParallax'

const legacyImage =
  'https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?auto=format&fit=crop&w=1600&q=88'
const detailImage =
  'https://images.unsplash.com/photo-1539768942893-daf53e448371?auto=format&fit=crop&w=1200&q=88'

export function Discover() {
  const { t, dir } = useI18n()
  const parallaxRef = useParallax<HTMLDivElement>(0.06)

  return (
    <section className="relative overflow-hidden bg-sand-50 py-24 sm:py-32 lg:py-40">
      {/* Subtle background texture */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(115deg, var(--color-sand-600) 0 1px, transparent 1px 26px)',
        }}
      />

      <div className="relative mx-auto grid max-w-7xl gap-14 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-20">
        {/* Editorial text column */}
        <div className={`${dir === 'rtl' ? 'lg:order-2' : ''}`}>
          <AnimatedElement>
            <p className="text-[11px] font-medium uppercase tracking-[0.32em] text-gold-700">
              {t('discover.eyebrow')}
            </p>
          </AnimatedElement>

          <AnimatedElement delay={80}>
            <h2 className="mt-6 font-serif text-4xl font-medium leading-[1.1] tracking-tight text-navy-950 text-balance sm:text-5xl lg:text-6xl">
              {t('discover.title')}
            </h2>
          </AnimatedElement>

          <AnimatedElement delay={160}>
            <div className={`mt-8 max-w-xl space-y-6 text-base font-light leading-8 text-sand-700`}>
              <p>{t('discover.p1')}</p>
              <p>{t('discover.p2')}</p>
              <p>{t('discover.p3')}</p>
            </div>
          </AnimatedElement>

          <AnimatedElement delay={240}>
            <div className="mt-10 grid max-w-md grid-cols-3 gap-6 border-t border-sand-200 pt-8">
              {[
                t('discover.fact1'),
                t('discover.fact2'),
                t('discover.fact3'),
              ].map((fact, i) => (
                <div key={i} className={dir === 'rtl' ? 'text-right' : 'text-left'}>
                  <p className="font-serif text-2xl font-medium text-gold-700 sm:text-3xl">{String(i + 1).padStart(2, '0')}</p>
                  <p className="mt-2 text-xs font-medium leading-5 text-sand-700">{fact}</p>
                </div>
              ))}
            </div>
          </AnimatedElement>

          <AnimatedElement delay={320}>
            <Link
              to="/about"
              className="group mt-12 inline-flex items-center gap-3 border-b border-gold-500/60 pb-2 text-sm font-semibold tracking-[0.08em] uppercase text-navy-950 transition-colors duration-300 hover:border-gold-500 hover:text-gold-700"
            >
              {t('discover.cta')}
              <span className="transition-transform duration-500 group-hover:translate-x-1 rtl:group-hover:-translate-x-1">→</span>
            </Link>
          </AnimatedElement>
        </div>

        {/* Visual column - asymmetric editorial composition */}
        <div className={`relative ${dir === 'rtl' ? 'lg:order-1' : ''}`}>
          <AnimatedElement animation="scale-in" className="relative">
            <div className="relative overflow-hidden">
              <div ref={parallaxRef} className="will-change-transform">
                <img
                  src={legacyImage}
                  alt="Ancient Egyptian temple columns carved in stone"
                  className="aspect-[4/5] w-full scale-105 object-cover"
                  loading="lazy"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/50 to-transparent" />
            </div>

            {/* Overlapping detail image */}
            <div className="absolute -bottom-12 -right-6 hidden w-[45%] overflow-hidden border-8 border-sand-50 shadow-2xl sm:block rtl:right-auto rtl:-left-6">
              <img
                src={detailImage}
                alt="Detailed hieroglyphic carvings"
                className="aspect-square w-full object-cover"
                loading="lazy"
              />
            </div>

            {/* Quote plaque */}
            <div className="absolute -bottom-8 left-6 max-w-[220px] border border-sand-200 bg-ivory-50 p-5 shadow-elevate-lg rtl:left-auto rtl:right-6 sm:-bottom-14 sm:left-10 sm:p-6 rtl:sm:left-auto rtl:sm:right-10">
              <p className="font-serif text-lg font-medium italic leading-snug text-navy-950">
                "{t('discover.quote')}"
              </p>
              <p className="mt-3 text-[10px] font-medium uppercase tracking-[0.2em] text-gold-700">
                {t('discover.quoteAuthor')}
              </p>
            </div>

            {/* Decorative rotated text */}
            <div className="pointer-events-none absolute -right-2 top-6 hidden lg:block rtl:right-auto rtl:-left-2">
              <p className="rotate-90 text-[10px] font-medium uppercase tracking-[0.5em] text-sand-400/70">
                {t('discover.legacy')}
              </p>
            </div>
          </AnimatedElement>
        </div>
      </div>
    </section>
  )
}
