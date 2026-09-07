import type { ReactNode } from 'react'
import { useI18n } from '../../i18n/useI18n'
import { AnimatedElement } from '../ui/AnimatedElement'

interface PageHeaderProps {
  eyebrow?: string
  title: string
  subtitle?: string
  children?: ReactNode
}

export function PageHeader({ eyebrow, title, subtitle, children }: PageHeaderProps) {
  const { t } = useI18n()

  return (
    <section className="relative overflow-hidden bg-sand-100 pt-36 sm:pt-44">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,107,53,0.1),transparent_35%),radial-gradient(circle_at_10%_80%,rgba(46,26,8,0.05),transparent_50%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px gold-line" />

      <div className="relative mx-auto max-w-7xl px-4 pb-16 sm:px-6 sm:pb-20">
        {eyebrow && (
          <AnimatedElement>
            <p className="flex items-center gap-4 text-[11px] font-medium uppercase tracking-[0.32em] text-orange-600">
              <span className="hidden h-px w-10 gold-line sm:block" />
              {t(eyebrow as never) || eyebrow}
            </p>
          </AnimatedElement>
        )}
        <AnimatedElement delay={100}>
          <h1 className="mt-6 font-serif text-4xl font-medium leading-[1.08] tracking-tight text-navy-950 sm:text-5xl lg:text-6xl">
            {title}
          </h1>
        </AnimatedElement>
        {subtitle && (
          <AnimatedElement delay={180}>
            <p className="mt-6 max-w-2xl text-base font-light leading-8 text-navy-800/80 sm:text-lg">
              {subtitle}
            </p>
          </AnimatedElement>
        )}
        {children}
      </div>
    </section>
  )
}