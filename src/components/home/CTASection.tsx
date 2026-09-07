import { Link } from 'react-router-dom'
import { useI18n } from '../../i18n/useI18n'
import { AnimatedElement } from '../ui/AnimatedElement'
import { Magnetic } from '../ui/Magnetic'
import { useParallax } from '../../hooks/useParallax'

const ctaImage =
  'https://images.unsplash.com/photo-1539650116574-8aebd259f5c5?auto=format&fit=crop&w=2000&q=88'

export function CTASection() {
  const { t, dir } = useI18n()
  const parallaxRef = useParallax<HTMLDivElement>(0.1)

  return (
    <section className="relative overflow-hidden bg-sand-50 py-28 sm:py-36 lg:py-44">
      <div ref={parallaxRef} className="absolute inset-0 will-change-transform">
        <img
          src={ctaImage}
          alt="The Great Sphinx and pyramids at golden hour"
          className="h-[130%] w-full scale-105 object-cover opacity-60"
          loading="lazy"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-sand-50 via-sand-100/70 to-sand-50/85" />

      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6">
        <div className="rounded-[2rem] border border-white/70 bg-white/80 px-6 py-14 shadow-elevate-lg backdrop-blur-md sm:px-12 sm:py-16">
          <AnimatedElement animation="fade-up">
            <p className="text-[11px] font-medium uppercase tracking-[0.4em] text-orange-600">
              {t('ctaSection.eyebrow')}
            </p>
          </AnimatedElement>

          <AnimatedElement delay={150}>
            <h2 className="mt-7 font-serif text-4xl font-medium leading-[1.05] tracking-tight text-navy-950 text-balance sm:text-6xl lg:text-7xl">
              {t('ctaSection.title')}
            </h2>
          </AnimatedElement>

          <AnimatedElement delay={300}>
            <p className="mx-auto mt-7 max-w-xl text-base font-light leading-8 text-navy-800/80 sm:text-lg">
              {t('ctaSection.subtitle')}
            </p>
          </AnimatedElement>

          <AnimatedElement delay={450}>
            <div className={`mt-11 flex flex-col justify-center gap-4 sm:flex-row ${dir === 'rtl' ? 'sm:flex-row-reverse' : ''}`}>
              <Magnetic>
                <Link
                  to="/trips"
                  className="btn-sheen group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-gold-300 via-gold-500 to-orange-500 px-10 py-4 text-sm font-semibold uppercase tracking-[0.08em] text-navy-950 shadow-[0_18px_50px_-12px_rgba(255,107,53,0.5)] transition-all duration-500 hover:from-gold-200 hover:via-gold-400 hover:to-orange-400"
                >
                  {t('ctaSection.cta')}
                  <span className="transition-transform duration-500 group-hover:translate-x-1 rtl:group-hover:-translate-x-1">→</span>
                </Link>
              </Magnetic>
              <Magnetic>
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-3 rounded-full border border-navy-900/15 bg-white px-10 py-4 text-sm font-semibold uppercase tracking-[0.08em] text-navy-900 transition-all duration-500 hover:border-orange-500/50 hover:text-orange-600"
                >
                  {t('ctaSection.secondary')}
                </Link>
              </Magnetic>
            </div>
          </AnimatedElement>
        </div>
      </div>

      {/* Decorative floating rings */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[8%] top-[18%] h-40 w-40 rounded-full border border-orange-500/20 float-slow" style={{ animationDuration: '18s' }} />
        <div className="absolute bottom-[15%] right-[10%] h-56 w-56 rounded-full border border-orange-400/15 float-slower" style={{ animationDuration: '22s' }} />
      </div>
    </section>
  )
}