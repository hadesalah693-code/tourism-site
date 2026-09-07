import { AnimatedElement } from './AnimatedElement'

interface SectionHeadingProps {
  eyebrow?: string
  title: string
  subtitle?: string
  align?: 'left' | 'center'
  tone?: 'light' | 'dark'
  className?: string
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'left',
  tone = 'light',
  className = '',
}: SectionHeadingProps) {
  const isDark = tone === 'dark'
  const alignCls = align === 'center' ? 'text-center mx-auto' : 'text-left rtl:text-right'

  return (
    <div className={`max-w-2xl ${alignCls} ${className}`}>
      {eyebrow && (
        <AnimatedElement className="flex items-center gap-3" as="div">
          {align === 'center' && <span className="hidden sm:block h-px w-10 gold-line" />}
          <span
            className={`text-[11px] font-medium uppercase tracking-[0.32em] ${isDark ? 'text-gold-300' : 'text-gold-600'}`}
          >
            {eyebrow}
          </span>
          {align === 'center' && <span className="hidden sm:block h-px w-10 gold-line" />}
        </AnimatedElement>
      )}
      <AnimatedElement delay={80}>
        <h2
          className={`mt-5 font-serif text-4xl font-medium leading-[1.08] tracking-tight text-balance sm:text-5xl lg:text-6xl ${
            isDark ? 'text-ivory-50' : 'text-navy-950'
          }`}
        >
          {title}
        </h2>
      </AnimatedElement>
      {subtitle && (
        <AnimatedElement delay={160}>
          <p
            className={`mt-6 text-base font-light leading-8 ${isDark ? 'text-ivory-100/70' : 'text-sand-700'}`}
          >
            {subtitle}
          </p>
        </AnimatedElement>
      )}
    </div>
  )
}
