import { isSupabaseConfigured, supabase } from './supabase'

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined
const key = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined

export type SupabaseHealth = 'unknown' | 'ok' | 'unreachable' | 'not_configured'

let cached: SupabaseHealth = 'unknown'

export function getSupabaseHealth(): SupabaseHealth {
  return cached
}

/** Ping Supabase REST — updates cached health status. */
export async function checkSupabaseConnection(): Promise<SupabaseHealth> {
  if (!isSupabaseConfigured || !url || !key) {
    cached = 'not_configured'
    return cached
  }

  try {
    const res = await fetch(`${url.replace(/\/$/, '')}/rest/v1/`, {
      method: 'HEAD',
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
      },
    })
    // 200, 401, 404 = server reachable
    cached = res.status < 500 ? 'ok' : 'unreachable'
  } catch {
    cached = 'unreachable'
  }

  return cached
}

/** Lightweight query via supabase-js (validates key + schema). */
export async function probeSupabaseTripsTable(): Promise<boolean> {
  if (!isSupabaseConfigured) return false
  try {
    const { error } = await supabase.from('trips').select('id').limit(1)
    return !error
  } catch {
    return false
  }
}

export function supabaseProjectRef(): string | null {
  if (!url) return null
  const m = url.match(/https:\/\/([^.]+)\.supabase\.co/)
  return m?.[1] ?? null
}
