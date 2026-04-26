export const DESTINATIONS = ['sharm', 'hurghada', 'marsa_alam'] as const
export type Destination = (typeof DESTINATIONS)[number]

export type Trip = {
  id: string
  title_ar: string
  title_en: string
  short_description_ar: string | null
  short_description_en: string | null
  full_description_ar: string | null
  full_description_en: string | null
  destination: Destination
  duration: string
  price: number
  currency: string
  cover_image: string | null
  gallery_images: string[] | null
  is_featured: boolean
  is_active: boolean
  created_at?: string
  updated_at?: string
}

export type TripInsert = Omit<Trip, 'id' | 'created_at' | 'updated_at'> & {
  id?: string
}

export type TripUpdate = Partial<TripInsert>
