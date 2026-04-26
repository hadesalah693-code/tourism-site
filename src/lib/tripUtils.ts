import type { Locale } from '../i18n/config'
import type { Trip } from '../types/trip'

export function tripTitle(trip: Trip, locale: Locale): string {
  return locale === 'ar' ? trip.title_ar : trip.title_en
}

export function tripShortDescription(trip: Trip, locale: Locale): string {
  const v = locale === 'ar' ? trip.short_description_ar : trip.short_description_en
  return v ?? ''
}

export function tripFullDescription(trip: Trip, locale: Locale): string {
  const v = locale === 'ar' ? trip.full_description_ar : trip.full_description_en
  return v ?? ''
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
