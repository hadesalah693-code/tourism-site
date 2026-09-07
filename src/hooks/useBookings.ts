import { useCallback, useEffect, useState } from 'react'
import {
  deleteLocalBooking,
  insertLocalBooking,
  listLocalBookings,
  updateLocalBookingStatus,
} from '../lib/bookingStorage'
import { isSupabaseConfigured, supabase } from '../lib/supabase'
import type { Booking, BookingInsert, BookingStatus } from '../types/booking'

export type BookingFilters = {
  status?: BookingStatus | 'all'
}

function filterBookings(rows: Booking[], filters: BookingFilters): Booking[] {
  if (!filters.status || filters.status === 'all') return rows
  return rows.filter((b) => b.status === filters.status)
}

async function fetchBookingsFromSupabase(): Promise<Booking[] | null> {
  const { data, error } = await supabase.from('bookings').select('*').order('created_at', { ascending: false })
  if (error) return null
  return (data as Booking[]) ?? []
}

export function useBookings(filters: BookingFilters = {}) {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [usingLocal, setUsingLocal] = useState(false)

  const status = filters.status ?? 'all'

  const refetch = useCallback(async () => {
    setLoading(true)

    if (!isSupabaseConfigured) {
      setUsingLocal(true)
      setBookings(filterBookings(listLocalBookings(), { status }))
      setLoading(false)
      return
    }

    const remote = await fetchBookingsFromSupabase()
    if (remote != null) {
      setUsingLocal(false)
      setBookings(filterBookings(remote, { status }))
    } else {
      setUsingLocal(true)
      setBookings(filterBookings(listLocalBookings(), { status }))
    }
    setLoading(false)
  }, [status])

  useEffect(() => {
    void refetch()
  }, [refetch])

  return { bookings, loading, usingLocal, refetch }
}

export async function createBooking(input: BookingInsert): Promise<{ booking: Booking | null; error: string | null }> {
  if (isSupabaseConfigured) {
    const { data, error } = await supabase
      .from('bookings')
      .insert({
        trip_id: input.trip_id,
        trip_title: input.trip_title,
        customer_name: input.customer_name,
        customer_email: input.customer_email,
        customer_phone: input.customer_phone,
        travel_date: input.travel_date,
        guests: input.guests,
        message: input.message,
        locale: input.locale,
        status: 'pending',
      })
      .select('*')
      .single()

    if (!error && data) {
      return { booking: data as Booking, error: null }
    }
  }

  try {
    return { booking: insertLocalBooking(input), error: null }
  } catch {
    return { booking: null, error: 'SAVE_FAILED' }
  }
}

export async function setBookingStatus(id: string, status: BookingStatus): Promise<boolean> {
  if (isSupabaseConfigured) {
    const { error } = await supabase.from('bookings').update({ status }).eq('id', id)
    if (!error) return true
  }
  return updateLocalBookingStatus(id, status) != null
}

export async function removeBooking(id: string): Promise<boolean> {
  if (isSupabaseConfigured) {
    const { error } = await supabase.from('bookings').delete().eq('id', id)
    if (!error) return true
  }
  return deleteLocalBooking(id)
}

export function useBookingStats() {
  const [stats, setStats] = useState({ total: 0, pending: 0, confirmed: 0, cancelled: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    void (async () => {
      let rows: Booking[] = []
      if (isSupabaseConfigured) {
        const remote = await fetchBookingsFromSupabase()
        rows = remote ?? listLocalBookings()
      } else {
        rows = listLocalBookings()
      }

      if (cancelled) return
      setStats({
        total: rows.length,
        pending: rows.filter((b) => b.status === 'pending').length,
        confirmed: rows.filter((b) => b.status === 'confirmed').length,
        cancelled: rows.filter((b) => b.status === 'cancelled').length,
      })
      setLoading(false)
    })()

    return () => {
      cancelled = true
    }
  }, [])

  return { stats, loading }
}
