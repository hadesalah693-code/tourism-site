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
