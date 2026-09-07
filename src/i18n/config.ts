export const locales = ['en', 'ar', 'de', 'pl', 'cs', 'ro', 'bg', 'it', 'fr'] as const
export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = 'en'

export const localeNames: Record<Locale, string> = {
  en: 'English',
  ar: 'العربية',
  de: 'Deutsch',
  pl: 'Polski',
  cs: 'Čeština',
  ro: 'Română',
  bg: 'Български',
  it: 'Italiano',
  fr: 'Français',
}

export function isRtl(locale: Locale): boolean {
  return locale === 'ar'
}

export function detectBrowserLocale(): Locale {
  if (typeof navigator === 'undefined') return defaultLocale
  const preferred = navigator.languages?.length ? navigator.languages : [navigator.language]
  for (const raw of preferred) {
    const base = raw.split('-')[0].toLowerCase()
    const hit = (locales as readonly string[]).find((l) => l === base) as Locale | undefined
    if (hit) return hit
  }
  return defaultLocale
}
