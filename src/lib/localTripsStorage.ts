import type { Trip, TripInsert } from '../types/trip'

const STORAGE_KEY = 'nh-admin-trips'

function nowIso() {
  return new Date().toISOString()
}

function readAll(): Trip[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as Trip[]
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function writeAll(rows: Trip[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(rows))
}

export function listLocalAdminTrips(): Trip[] {
  return readAll().sort((a, b) => (b.created_at ?? '').localeCompare(a.created_at ?? ''))
}

export function getLocalAdminTrip(id: string): Trip | null {
  return readAll().find((t) => t.id === id) ?? null
}

export function saveLocalAdminTrip(input: TripInsert & { id?: string }): Trip {
  const rows = readAll()
  const ts = nowIso()
  const existingIdx = input.id ? rows.findIndex((t) => t.id === input.id) : -1

  if (existingIdx >= 0) {
    const updated: Trip = {
      ...rows[existingIdx],
      ...input,
      id: rows[existingIdx].id,
      updated_at: ts,
    }
    rows[existingIdx] = updated
    writeAll(rows)
    return updated
  }

  const created: Trip = {
    id: input.id ?? crypto.randomUUID(),
    title_ar: input.title_ar,
    title_en: input.title_en,
    short_description_ar: input.short_description_ar ?? null,
    short_description_en: input.short_description_en ?? null,
    full_description_ar: input.full_description_ar ?? null,
    full_description_en: input.full_description_en ?? null,
    destination: input.destination,
    duration: input.duration,
    price: input.price,
    currency: input.currency,
    cover_image: input.cover_image ?? null,
    gallery_images: input.gallery_images ?? [],
    is_featured: input.is_featured ?? false,
    is_active: input.is_active ?? true,
    created_at: ts,
    updated_at: ts,
  }
  writeAll([created, ...rows])
  return created
}

export function deleteLocalAdminTrip(id: string): boolean {
  const rows = readAll()
  const next = rows.filter((t) => t.id !== id)
  if (next.length === rows.length) return false
  writeAll(next)
  return true
}
