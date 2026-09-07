import { useI18n } from '../../i18n/useI18n'
import { AnimatedElement } from '../ui/AnimatedElement'

const reviews = ['one', 'two', 'three'] as const

export function SocialProof() {
  const { t } = useI18n()

  return (
    <section className="relative overflow-hidden bg-ivory-50 py-24 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-8 lg:grid-cols-[0.5fr_1.5fr] lg:items-end">
          <AnimatedElement>
            <p className="text-[11px] font-medium uppercase tracking-[0.32em] text-gold-700">
              {t('socialProof.eyebrow')}
            </p>
          </AnimatedElement>
          <AnimatedElement delay={80}>
            <h2 className="font-serif text-4xl font-medium leading-[1.1] tracking-tight text-navy-950 sm:text-5xl lg:text-6xl">
              {t('socialProof.title')}
            </h2>
          </AnimatedElement>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[0.5fr_1.5fr] lg:items-end">
          <AnimatedElement delay={120}>
            <p className="max-w-sm text-base font-light leading-8 text-sand-700">
              {t('socialProof.subtitle')}
            </p>
          </AnimatedElement>
          <AnimatedElement delay={180} className="lg:justify-self-end">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-gold-400 to-orange-500 px-7 py-3.5 text-sm font-semibold text-navy-950 shadow-[0_18px_50px_-12px_rgba(255,107,53,0.5)] transition-transform duration-300 hover:scale-[1.03]"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
              </svg>
              {t('socialProof.followCta')}
            </a>
          </AnimatedElement>
        </div>

        {/* Reviews */}
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {reviews.map((key, index) => (
            <AnimatedElement key={key} delay={index * 100} as="figure">
              <div className="flex h-full flex-col border border-sand-200 bg-sand-50 p-7 transition-transform duration-500 hover:-translate-y-1">
                <div className="flex items-center gap-1 text-gold-500">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
                <blockquote className="mt-5 flex-1 text-sm font-light leading-7 text-navy-950">
                  "{t(`socialProof.reviews.${key}.text`)}"
                </blockquote>
                <figcaption className="mt-6 flex items-center justify-between border-t border-sand-200 pt-5">
                  <div>
                    <p className="text-sm font-semibold text-navy-950">{t(`socialProof.reviews.${key}.name`)}</p>
                    <p className="text-xs text-sand-500">{t(`socialProof.reviews.${key}.country`)}</p>
                  </div>
                  <span className="text-[10px] font-medium uppercase tracking-[0.15em] text-gold-700">
                    {t(`socialProof.reviews.${key}.trip`)}
                  </span>
                </figcaption>
              </div>
            </AnimatedElement>
          ))}
        </div>
      </div>
    </section>
  )
}