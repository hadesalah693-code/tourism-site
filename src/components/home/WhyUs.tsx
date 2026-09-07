import { useI18n } from '../../i18n/useI18n'
import { AnimatedElement } from '../ui/AnimatedElement'

const items = [
  {
    key: 'trusted',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="h-6 w-6">
        <path d="M12 2l3 5 6 .5-4.5 4 .9 6-5.4-3-5.4 3 .9-6L3 7.5 9 7l3-5z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    key: 'selected',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="h-6 w-6">
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="12" cy="12" r="1" fill="currentColor" />
      </svg>
    ),
  },
  {
    key: 'guides',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="h-6 w-6">
        <path d="M12 3l8 4-8 4-8-4 8-4z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M4 11v6c0 2 4 4 8 4s8-2 8-4v-6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M20 11v6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    key: 'booking',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="h-6 w-6">
        <rect x="4" y="6" width="16" height="14" rx="2" />
        <path d="M8 6V4m8 2V4M4 10h16" strokeLinecap="round" />
        <path d="M9 15l2.5 2.5L15 14" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    key: 'support',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="h-6 w-6">
        <path d="M4 13a8 8 0 0116 0" strokeLinecap="round" />
        <path d="M4 13a2 2 0 012 2v2a2 2 0 01-2 2H3v-6h1zm16 0a2 2 0 00-2 2v2a2 2 0 002 2h1v-6h-1z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    key: 'authentic',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="h-6 w-6">
        <path d="M12 21s-8-4.5-8-11a4 4 0 017-2.5A4 4 0 0120 10c0 6.5-8 11-8 11z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
]

export function WhyUs() {
  const { t } = useI18n()

  return (
    <section className="relative bg-sand-50 py-24 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-6 lg:grid-cols-[0.45fr_0.55fr] lg:items-start lg:gap-10">
          <div className="lg:sticky lg:top-28">
            <AnimatedElement>
              <p className="text-[11px] font-medium uppercase tracking-[0.32em] text-gold-700">
                {t('why.eyebrow')}
              </p>
            </AnimatedElement>
            <AnimatedElement delay={80}>
              <h2 className="mt-6 font-serif text-4xl font-medium leading-[1.1] tracking-tight text-navy-950 sm:text-5xl lg:text-6xl">
                {t('why.title')}
              </h2>
            </AnimatedElement>
            <AnimatedElement delay={160}>
              <p className="mt-6 max-w-md text-base font-light leading-8 text-sand-700">
                {t('why.subtitle')}
              </p>
            </AnimatedElement>
          </div>

          <div className="grid grid-cols-1 gap-px overflow-hidden border border-sand-200 bg-sand-200 sm:grid-cols-2">
            {items.map(({ key, icon }, index) => (
              <AnimatedElement key={key} delay={index * 80} className="h-full" as="figure">
                <div className="group flex h-full flex-col bg-sand-50 p-7 transition-colors duration-500 hover:bg-ivory-50 sm:p-8">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-gold-500/40 text-gold-700 transition-all duration-500 group-hover:bg-gold-500 group-hover:text-navy-950">
                    {icon}
                  </div>
                  <h3 className="mt-6 font-serif text-xl font-medium text-navy-950">
                    {t(`why.items.${key}.title`)}
                  </h3>
                  <p className="mt-3 text-sm font-light leading-7 text-sand-700">
                    {t(`why.items.${key}.desc`)}
                  </p>
                </div>
              </AnimatedElement>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}