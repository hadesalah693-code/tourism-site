import { useCallback, useEffect, useState } from 'react'
import { allCatalogTrips, mergeRemoteTrips } from '../lib/tripAdmin'
import { isSupabaseConfigured, supabase } from '../lib/supabase'
import type { Destination, Trip } from '../types/trip'

export type TripSort = 'newest' | 'price_asc' | 'price_desc'

export type TripFilters = {
  destination?: Destination | 'all'
  maxPrice?: number
  featuredOnly?: boolean
  includeInactive?: boolean
  sort?: TripSort
}

function sortTrips(rows: Trip[], sort: TripSort): Trip[] {
  const next = [...rows]
  if (sort === 'price_asc') {
    next.sort((a, b) => a.price - b.price)
  } else if (sort === 'price_desc') {
    next.sort((a, b) => b.price - a.price)
  } else {
    next.sort((a, b) => (b.created_at ?? '').localeCompare(a.created_at ?? ''))
  }
  return next
}

function filterTrips(source: Trip[], filters: TripFilters): Trip[] {
  let rows = source.filter((trip) => filters.includeInactive || trip.is_active)

  if (filters.destination && filters.destination !== 'all') {
    rows = rows.filter((trip) => trip.destination === filters.destination)
  }

  if (filters.featuredOnly) {
    rows = rows.filter((trip) => trip.is_featured)
  }

  if (filters.maxPrice != null && !Number.isNaN(filters.maxPrice)) {
    rows = rows.filter((trip) => trip.price <= filters.maxPrice!)
  }

  return sortTrips(rows, filters.sort ?? 'newest')
}

function filterDemoTrips(filters: TripFilters): Trip[] {
  return filterTrips(allCatalogTrips(), filters)
}

export function useTrips(filters: TripFilters = {}) {
  const [trips, setTrips] = useState<Trip[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const destination = filters.destination ?? 'all'
  const maxPrice = filters.maxPrice
  const featuredOnly = filters.featuredOnly ?? false
  const includeInactive = filters.includeInactive ?? false
  const sort = filters.sort ?? 'newest'

  const fetchTrips = useCallback(async () => {
    const activeFilters: TripFilters = {
      destination,
      maxPrice,
      featuredOnly,
      includeInactive,
      sort,
    }

    if (!isSupabaseConfigured) {
      setTrips(filterDemoTrips(activeFilters))
      setLoading(false)
      setError(null)
      return
    }

    setLoading(true)
    setError(null)

    let q = supabase.from('trips').select('*')

    if (!includeInactive) {
      q = q.eq('is_active', true)
    }

    if (destination && destination !== 'all') {
      q = q.eq('destination', destination)
    }

    if (featuredOnly) {
      q = q.eq('is_featured', true)
    }

    if (maxPrice != null && !Number.isNaN(maxPrice)) {
      q = q.lte('price', maxPrice)
    }

    if (sort === 'price_asc') {
      q = q.order('price', { ascending: true })
    } else if (sort === 'price_desc') {
      q = q.order('price', { ascending: false })
    } else {
      q = q.order('created_at', { ascending: false })
    }

    try {
      const { data, error: queryError } = await q

      if (queryError) {
        setError(null)
        setTrips(filterDemoTrips(activeFilters))
      } else {
        const rows = (data as Trip[]) ?? []
        setTrips(filterTrips(mergeRemoteTrips(rows), activeFilters))
      }
    } catch {
      setError(null)
      setTrips(filterDemoTrips(activeFilters))
    }
    setLoading(false)
  }, [destination, maxPrice, featuredOnly, includeInactive, sort])

  useEffect(() => {
    void fetchTrips()
  }, [fetchTrips])

  return { trips, loading, error, refetch: fetchTrips }
}

export function useTripById(id: string | undefined, opts?: { includeInactive?: boolean }) {
  const [trip, setTrip] = useState<Trip | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) {
      setTrip(null)
      setLoading(false)
      return
    }

    if (!isSupabaseConfigured) {
      const row = allCatalogTrips().find((item) => item.id === id) ?? null
      setTrip(row && (opts?.includeInactive || row.is_active) ? row : null)
      setLoading(false)
      return
    }

    let cancelled = false
    setLoading(true)
    setError(null)

    void (async () => {
      try {
        const { data, error: queryError } = await supabase
          .from('trips')
          .select('*')
          .eq('id', id)
          .maybeSingle()

        if (cancelled) return

        if (queryError) {
          setError(null)
          const fallback = allCatalogTrips().find((item) => item.id === id) ?? null
          setTrip(fallback && (opts?.includeInactive || fallback.is_active) ? fallback : null)
        } else {
          const row = data as Trip | null
          if (row && !opts?.includeInactive && !row.is_active) {
            setTrip(null)
          } else {
            const fallback = allCatalogTrips().find((item) => item.id === id) ?? null
            setTrip(row ?? (fallback && (opts?.includeInactive || fallback.is_active) ? fallback : null))
          }
        }
      } catch {
        if (!cancelled) {
          setError(null)
          const fallback = allCatalogTrips().find((item) => item.id === id) ?? null
          setTrip(fallback && (opts?.includeInactive || fallback.is_active) ? fallback : null)
        }
      }
      setLoading(false)
    })()

    return () => {
      cancelled = true
    }
  }, [id, opts?.includeInactive])

  return { trip, loading, error }
}

export function useTripStats() {
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    inactive: 0,
    featured: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setStats({ total: 0, active: 0, inactive: 0, featured: 0 })
      setLoading(false)
      return
    }

    let cancelled = false

    void (async () => {
      const { data, error } = await supabase.from('trips').select('is_active, is_featured')

      if (cancelled) return

      if (error || !data) {
        setStats({ total: 0, active: 0, inactive: 0, featured: 0 })
      } else {
        const rows = data as { is_active: boolean; is_featured: boolean }[]
        const total = rows.length
        const active = rows.filter((r) => r.is_active).length
        const featured = rows.filter((r) => r.is_featured).length
        setStats({
          total,
          active,
          inactive: total - active,
          featured,
        })
      }
      setLoading(false)
    })()

    return () => {
      cancelled = true
    }
  }, [])

  return { stats, loading }
}
