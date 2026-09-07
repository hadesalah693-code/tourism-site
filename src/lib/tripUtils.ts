import type { Locale } from '../i18n/config'
import type { Trip } from '../types/trip'

const localeField = {
  ar: 'ar',
  en: 'en',
  de: 'de',
  pl: 'pl',
  cs: 'cs',
  ro: 'ro',
  bg: 'bg',
  it: 'it',
  fr: 'fr',
} as const satisfies Record<Locale, string>

function localizedTripValue(
  trip: Trip,
  base: 'title' | 'short_description' | 'full_description',
  locale: Locale,
): string {
  const key = `${base}_${localeField[locale]}` as keyof Trip
  const value = trip[key]
  if (typeof value === 'string' && value.trim()) return value

  if (locale !== 'en') {
    const fallback = trip[`${base}_en` as keyof Trip]
    if (typeof fallback === 'string') return fallback
  }

  return ''
}

export function tripTitle(trip: Trip, locale: Locale): string {
  return localizedTripValue(trip, 'title', locale)
}

export function tripShortDescription(trip: Trip, locale: Locale): string {
  return localizedTripValue(trip, 'short_description', locale)
}

export function tripFullDescription(trip: Trip, locale: Locale): string {
  return localizedTripValue(trip, 'full_description', locale)
}

const numberFormatLocale: Record<Locale, string> = {
  en: 'en-US',
  ar: 'ar-EG',
  de: 'de-DE',
  pl: 'pl-PL',
  cs: 'cs-CZ',
  ro: 'ro-RO',
  bg: 'bg-BG',
  it: 'it-IT',
  fr: 'fr-FR',
}

export function formatPrice(price: number, currency: string, locale: Locale): string {
  try {
    return new Intl.NumberFormat(numberFormatLocale[locale] ?? 'en-US', {
      style: 'currency',
      currency: currency || 'USD',
      maximumFractionDigits: 0,
    }).format(price)
  } catch {
    return `${price} ${currency}`
  }
}
