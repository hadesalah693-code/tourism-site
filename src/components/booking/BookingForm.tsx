import { type FormEvent, useState } from 'react'
import { Button } from '../ui/Button'
import { useI18n } from '../../i18n/useI18n'
import { createBooking } from '../../hooks/useBookings'
import type { Trip } from '../../types/trip'
import { tripTitle } from '../../lib/tripUtils'

type BookingFormProps = {
  trip: Trip
}

export function BookingForm({ trip }: BookingFormProps) {
  const { t, locale } = useI18n()
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [travelDate, setTravelDate] = useState('')
  const [guests, setGuests] = useState(1)
  const [message, setMessage] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    setError(null)

    const { error: saveError } = await createBooking({
      trip_id: trip.id,
      trip_title: tripTitle(trip, locale),
      customer_name: name.trim(),
      customer_phone: phone.trim(),
      customer_email: email.trim() || null,
      travel_date: travelDate || null,
      guests,
      message: message.trim() || null,
      locale,
    })

    setSubmitting(false)
    if (saveError) {
      setError(t('booking.error'))
      return
    }

    setDone(true)
    setName('')
    setPhone('')
    setEmail('')
    setTravelDate('')
    setGuests(1)
    setMessage('')
  }

  if (done) {
    return (
      <div className="rounded-xl border border-emerald-200/80 bg-emerald-50/90 px-4 py-3 text-sm text-emerald-900">
        <p className="font-semibold">{t('booking.successTitle')}</p>
        <p className="mt-1 text-emerald-800/90">{t('booking.successBody')}</p>
        <button
          type="button"
          className="mt-3 text-sm font-semibold text-emerald-900 underline"
          onClick={() => setDone(false)}
        >
          {t('booking.newRequest')}
        </button>
      </div>
    )
  }

  return (
    <form className="mt-6 space-y-3 border-t border-sand-200 pt-6" onSubmit={(e) => void onSubmit(e)}>
      <h3 className="font-serif text-xl font-medium text-navy-950">{t('booking.title')}</h3>
      <p className="text-sm font-light text-sand-700">{t('booking.subtitle')}</p>

      <label className="block text-sm font-medium text-sand-800">
        {t('booking.name')}
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input-premium mt-1"
        />
      </label>

      <label className="block text-sm font-medium text-sand-800">
        {t('booking.phone')}
        <input
          type="tel"
          required
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="input-premium mt-1"
        />
      </label>

      <label className="block text-sm font-medium text-sand-800">
        {t('booking.email')}
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input-premium mt-1"
        />
      </label>

      <label className="block text-sm font-medium text-sand-800">
        {t('booking.travelDate')}
        <input
          type="date"
          value={travelDate}
          onChange={(e) => setTravelDate(e.target.value)}
          className="input-premium mt-1"
        />
      </label>

      <label className="block text-sm font-medium text-sand-800">
        {t('booking.guests')}
        <input
          type="number"
          min={1}
          max={50}
          required
          value={guests}
          onChange={(e) => setGuests(Number(e.target.value))}
          className="input-premium mt-1"
        />
      </label>

      <label className="block text-sm font-medium text-sand-800">
        {t('booking.message')}
        <textarea
          rows={3}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="input-premium mt-1 resize-none"
        />
      </label>

      {error ? <p className="text-sm text-red-600">{error}</p> : null}

      <Button type="submit" className="w-full" disabled={submitting}>
        {submitting ? t('booking.submitting') : t('booking.submit')}
      </Button>
    </form>
  )
}


