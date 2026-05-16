export const DESTINATIONS = ['sharm', 'hurghada', 'marsa_alam'] as const
export type Destination = (typeof DESTINATIONS)[number]

export type Trip = {
  id: string
  title_ar: string
  title_en: string
  title_de?: string | null
  title_pl?: string | null
  title_cs?: string | null
  title_ro?: string | null
  title_bg?: string | null
  title_it?: string | null
  title_fr?: string | null
  short_description_ar: string | null
  short_description_en: string | null
  short_description_de?: string | null
  short_description_pl?: string | null
  short_description_cs?: string | null
  short_description_ro?: string | null
  short_description_bg?: string | null
  short_description_it?: string | null
  short_description_fr?: string | null
  full_description_ar: string | null
  full_description_en: string | null
  full_description_de?: string | null
  full_description_pl?: string | null
  full_description_cs?: string | null
  full_description_ro?: string | null
  full_description_bg?: string | null
  full_description_it?: string | null
  full_description_fr?: string | null
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
