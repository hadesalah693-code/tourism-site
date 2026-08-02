import type { Booking, BookingInsert, BookingStatus } from '../types/booking'

const STORAGE_KEY = 'nh-bookings'

function nowIso() {
  return new Date().toISOString()
}

function readAll(): Booking[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as Booking[]
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function writeAll(rows: Booking[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(rows))
}

export function listLocalBookings(): Booking[] {
  return readAll().sort((a, b) => b.created_at.localeCompare(a.created_at))
}

export function insertLocalBooking(input: BookingInsert): Booking {
  const row: Booking = {
    id: input.id ?? crypto.randomUUID(),
    trip_id: input.trip_id,
    trip_title: input.trip_title ?? null,
    customer_name: input.customer_name,
    customer_email: input.customer_email ?? null,
    customer_phone: input.customer_phone,
    travel_date: input.travel_date ?? null,
    guests: input.guests,
    message: input.message ?? null,
    status: input.status ?? 'pending',
    locale: input.locale ?? null,
    created_at: nowIso(),
    updated_at: nowIso(),
  }
  writeAll([row, ...readAll()])
  return row
}

export function updateLocalBookingStatus(id: string, status: BookingStatus): Booking | null {
  const rows = readAll()
  const idx = rows.findIndex((b) => b.id === id)
  if (idx === -1) return null
  rows[idx] = { ...rows[idx], status, updated_at: nowIso() }
  writeAll(rows)
  return rows[idx]
}

export function deleteLocalBooking(id: string): boolean {
  const rows = readAll()
  const next = rows.filter((b) => b.id !== id)
  if (next.length === rows.length) return false
  writeAll(next)
  return true
}
