import type { Locale } from '../i18n/config'
import type { Trip } from '../types/trip'
import { tripFullDescription, tripShortDescription, tripTitle } from './tripUtils'

export type TripCategory = 'sea' | 'safari' | 'historical' | 'other'

export const TRIP_CATEGORIES: TripCategory[] = ['sea', 'safari', 'historical', 'other']

const labels: Record<TripCategory, Record<Locale, string>> = {
  sea: {
    en: 'Sea trips',
    ar: 'رحلات بحرية',
    de: 'Bootstouren',
    pl: 'Wycieczki morskie',
    cs: 'Mořské výlety',
    ro: 'Excursii pe mare',
    bg: 'Морски екскурзии',
    it: 'Gite in mare',
    fr: 'Sorties en mer',
  },
  safari: {
    en: 'Safari',
    ar: 'سفاري',
    de: 'Safari',
    pl: 'Safari',
    cs: 'Safari',
    ro: 'Safari',
    bg: 'Сафари',
    it: 'Safari',
    fr: 'Safari',
  },
  historical: {
    en: 'Historical',
    ar: 'تاريخية',
    de: 'Geschichte',
    pl: 'Historyczne',
    cs: 'Historické',
    ro: 'Istorice',
    bg: 'Исторически',
    it: 'Storiche',
    fr: 'Historiques',
  },
  other: {
    en: 'Other',
    ar: 'أخرى',
    de: 'Andere',
    pl: 'Pozostałe',
    cs: 'Ostatní',
    ro: 'Altele',
    bg: 'Други',
    it: 'Altro',
    fr: 'Autres',
  },
}

export function tripCategoryLabel(category: TripCategory, locale: Locale): string {
  return labels[category][locale] ?? labels[category].en
}

export function inferTripCategory(trip: Trip, locale: Locale): TripCategory {
  const haystack = [
    tripTitle(trip, locale),
    tripShortDescription(trip, locale),
    tripFullDescription(trip, locale),
  ]
    .join(' ')
    .toLowerCase()

  if (/(sea|boat|island|orange|hula|giftun|diving|snork|dolphin|pirate|scope|reef|beach|morsk|nurk|łódź|wysp|بحر|جزيرة|غوص|سنوركل|شاطئ)/i.test(haystack)) {
    return 'sea'
  }

  if (/(safari|quad|buggy|desert|bedouin|jeep|camel|صحر|سفاري|بدو|جمل|كواد)/i.test(haystack)) {
    return 'safari'
  }

  if (/(cairo|luxor|pyramid|museum|temple|sphinx|valley|history|kair|luksor|piramid|muzeum|القاهرة|الأقصر|هرم|متحف|معبد|تاريخ)/i.test(haystack)) {
    return 'historical'
  }

  return 'other'
}
