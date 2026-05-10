import type { TripCategory } from './tripCategories'
import type { Trip } from '../types/trip'

const imageFallbacks: Record<TripCategory, string[]> = {
  sea: [
    'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1400&q=85',
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=85',
    'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1400&q=85',
    'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1400&q=85',
    'https://images.unsplash.com/photo-1483683804023-6ccdb62f86ef?auto=format&fit=crop&w=1400&q=85',
    'https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=1400&q=85',
  ],
  safari: [
    'https://images.unsplash.com/photo-1509316785289-025f5b846b35?auto=format&fit=crop&w=1400&q=85',
    'https://images.unsplash.com/photo-1473580044384-7ba9967e16a0?auto=format&fit=crop&w=1400&q=85',
    'https://images.unsplash.com/photo-1682686580391-615b1f28e5ee?auto=format&fit=crop&w=1400&q=85',
    'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1400&q=85',
  ],
  historical: [
    'https://images.unsplash.com/photo-1539768942893-daf53e448371?auto=format&fit=crop&w=1400&q=85',
    'https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?auto=format&fit=crop&w=1400&q=85',
    'https://images.unsplash.com/photo-1572252009286-268acec5ca0a?auto=format&fit=crop&w=1400&q=85',
    'https://images.unsplash.com/photo-1602526210295-d50f6e688f0e?auto=format&fit=crop&w=1400&q=85',
  ],
  other: [
    'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1400&q=85',
    'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=85',
    'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1400&q=85',
  ],
}

function hashKey(value: string): number {
  let hash = 0
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash * 31 + value.charCodeAt(i)) >>> 0
  }
  return hash
}

export function tripImageFallback(category: TripCategory, key = ''): string {
  const options = imageFallbacks[category]
  return options[hashKey(key) % options.length]
}

export function fallbackForTrip(trip: Trip, category: TripCategory): string {
  return tripImageFallback(category, `${trip.id}-${trip.title_en}`)
}

export function applyFallbackImage(target: HTMLImageElement, category: TripCategory, key = '') {
  const fallback = tripImageFallback(category, key)
  if (target.src !== fallback) {
    target.src = fallback
  }
}
