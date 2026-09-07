export const BOOKING_STATUSES = ['pending', 'confirmed', 'cancelled'] as const
export type BookingStatus = (typeof BOOKING_STATUSES)[number]

export type Booking = {
  id: string
  trip_id: string
  trip_title: string | null
  customer_name: string
  customer_email: string | null
  customer_phone: string
  travel_date: string | null
  guests: number
  message: string | null
  status: BookingStatus
  locale: string | null
  created_at: string
  updated_at: string
}

export type BookingInsert = Omit<Booking, 'id' | 'created_at' | 'updated_at' | 'status'> & {
  id?: string
  status?: BookingStatus
}

export type BookingUpdate = Partial<Omit<BookingInsert, 'trip_id'>>
