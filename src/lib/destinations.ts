import type { Locale } from '../i18n/config'
import { translate } from '../i18n/translate'
import type { Destination } from '../types/trip'

const destToI18nKey: Record<Destination, 'sharm' | 'hurghada' | 'marsa'> = {
  sharm: 'sharm',
  hurghada: 'hurghada',
  marsa_alam: 'marsa',
}

export function destinationName(locale: Locale, destination: Destination): string {
  const k = destToI18nKey[destination]
  return translate(locale, `destinations.${k}.name`)
}
