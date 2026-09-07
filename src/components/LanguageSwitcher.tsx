import { useEffect, useState } from 'react'
import { localeNames, locales, type Locale } from '../i18n/config'
import { useI18n } from '../i18n/useI18n'

export function LanguageSwitcher() {
  const { locale, setLocale } = useI18n()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <select
      value={locale}
      onChange={(e) => setLocale(e.target.value as Locale)}
      className={`h-10 w-[5.5rem] shrink-0 cursor-pointer appearance-none rounded-full border px-2 text-xs font-semibold shadow-sm transition sm:w-[6.5rem] sm:px-3 sm:text-sm focus:outline-none focus:ring-2 ${
        scrolled
          ? 'border-navy-900/10 bg-white/70 text-navy-950 shadow-elevate focus:ring-orange-500/25'
          : 'border-navy-900/15 bg-white/60 text-navy-950 backdrop-blur-md focus:ring-orange-500/25'
      }`}
      aria-label="Language"
      style={{
        backgroundImage:
          'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'12\' height=\'12\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%235c3d23\' stroke-width=\'2\'><path d=\'M6 9l6 6 6-6\'/></svg>")',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'right 0.75rem center',
      }}
    >
      {locales.map((loc) => (
        <option key={loc} value={loc} className="text-slate-900">
          {localeNames[loc]}
        </option>
      ))}
    </select>
  )
}
