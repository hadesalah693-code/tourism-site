import { demoTrips } from '../data/demoTrips'
import {
  deleteLocalAdminTrip,
  getLocalAdminTrip,
  listLocalAdminTrips,
  saveLocalAdminTrip,
} from './localTripsStorage'
import { isSupabaseConfigured, supabase } from './supabase'
import type { Trip, TripInsert } from '../types/trip'

function mergeTrips(...groups: Trip[][]): Trip[] {
  const map = new Map<string, Trip>()
  for (const group of groups) {
    for (const trip of group) map.set(trip.id, trip)
  }
  return [...map.values()]
}

export function allCatalogTrips(): Trip[] {
  return mergeTrips(demoTrips, listLocalAdminTrips())
}

/** Remote Supabase rows override demo/local entries with the same id. */
export function mergeRemoteTrips(remote: Trip[]): Trip[] {
  return mergeTrips(demoTrips, listLocalAdminTrips(), remote)
}

export async function saveAdminTrip(
  payload: TripInsert & { id?: string },
): Promise<{ trip: Trip; savedLocally: boolean; error: string | null }> {
  if (isSupabaseConfigured) {
    try {
      if (payload.id) {
        const { data, error } = await supabase
          .from('trips')
          .update(payload)
          .eq('id', payload.id)
          .select('*')
          .single()
        if (!error && data) {
          return { trip: data as Trip, savedLocally: false, error: null }
        }
      } else {
        const { data, error } = await supabase.from('trips').insert(payload).select('*').single()
        if (!error && data) {
          return { trip: data as Trip, savedLocally: false, error: null }
        }
      }
    } catch {
      /* Supabase unreachable — save locally below */
    }
  }

  try {
    return { trip: saveLocalAdminTrip(payload), savedLocally: true, error: null }
  } catch {
    return { trip: saveLocalAdminTrip(payload), savedLocally: true, error: 'SAVE_FAILED' }
  }
}

export async function removeAdminTrip(id: string): Promise<boolean> {
  if (isSupabaseConfigured) {
    try {
      const { error } = await supabase.from('trips').delete().eq('id', id)
      if (!error) return true
    } catch {
      /* local fallback */
    }
  }
  return deleteLocalAdminTrip(id)
}

export async function loadAdminTrip(id: string): Promise<Trip | null> {
  const local = getLocalAdminTrip(id)
  if (local) return local

  if (isSupabaseConfigured) {
    try {
      const { data, error } = await supabase.from('trips').select('*').eq('id', id).maybeSingle()
      if (!error && data) return data as Trip
    } catch {
      /* ignore */
    }
  }

  return demoTrips.find((t) => t.id === id) ?? null
}

export { listLocalAdminTrips, getLocalAdminTrip }
