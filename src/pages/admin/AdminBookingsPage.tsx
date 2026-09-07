import { useState } from 'react'
import { Link } from 'react-router-dom'
import { SupabaseNotice } from '../../components/SupabaseNotice'
import { Badge } from '../../components/ui/Badge'
import { EmptyState } from '../../components/ui/EmptyState'
import { Spinner } from '../../components/ui/Spinner'
import { useI18n } from '../../i18n/useI18n'
import { removeBooking, setBookingStatus, useBookings } from '../../hooks/useBookings'
import { BOOKING_STATUSES, type BookingStatus } from '../../types/booking'

function statusBadgeVariant(status: BookingStatus): 'warning' | 'success' | 'muted' {
  if (status === 'pending') return 'warning'
  if (status === 'confirmed') return 'success'
  return 'muted'
}

function formatWhen(iso: string, locale: string) {
  try {
    return new Intl.DateTimeFormat(locale, { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(iso))
  } catch {
    return iso
  }
}

export function AdminBookingsPage() {
  const { t, locale } = useI18n()
  const [statusFilter, setStatusFilter] = useState<BookingStatus | 'all'>('all')
  const { bookings, loading, usingLocal, refetch } = useBookings({ status: statusFilter })

  async function onStatusChange(id: string, status: BookingStatus) {
    await setBookingStatus(id, status)
    void refetch()
  }

  async function onDelete(id: string) {
    if (!confirm(t('admin.bookings.confirmDelete'))) return
    await removeBooking(id)
    void refetch()
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">{t('admin.bookings.title')}</h1>
          <p className="mt-1 text-sm text-slate-600">{t('admin.bookings.subtitle')}</p>
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as BookingStatus | 'all')}
          className="input-premium w-auto min-w-[10rem]"
        >
          <option value="all">{t('admin.bookings.filterAll')}</option>
          {BOOKING_STATUSES.map((s) => (
            <option key={s} value={s}>
              {t(`admin.bookings.status.${s}`)}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-6">
        <SupabaseNotice />
        {usingLocal ? (
          <p className="mt-3 rounded-lg border border-amber-200/80 bg-amber-50 px-4 py-2 text-sm text-amber-900">
            {t('admin.bookings.localHint')}
          </p>
        ) : null}
      </div>

      {loading ? (
        <div className="mt-10 flex justify-center">
          <Spinner />
        </div>
      ) : bookings.length === 0 ? (
        <div className="mt-10">
          <EmptyState title={t('admin.bookings.empty')} />
        </div>
      ) : (
        <div className="mt-8 overflow-x-auto rounded-2xl border border-slate-200/60 bg-white shadow-elevate">
          <table className="min-w-full divide-y divide-slate-200/80 text-sm">
            <thead className="bg-slate-50/90 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
              <tr>
                <th className="px-4 py-3">{t('admin.bookings.colDate')}</th>
                <th className="px-4 py-3">{t('admin.bookings.colTrip')}</th>
                <th className="px-4 py-3">{t('admin.bookings.colCustomer')}</th>
                <th className="px-4 py-3">{t('admin.bookings.colPhone')}</th>
                <th className="px-4 py-3">{t('admin.bookings.colTravel')}</th>
                <th className="px-4 py-3">{t('admin.bookings.colGuests')}</th>
                <th className="px-4 py-3">{t('admin.bookings.colStatus')}</th>
                <th className="px-4 py-3 text-end">{t('admin.table.actions')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {bookings.map((booking) => (
                <tr key={booking.id} className="align-top transition-colors duration-150 hover:bg-slate-50/90">
                  <td className="px-4 py-3 whitespace-nowrap text-slate-600">
                    {formatWhen(booking.created_at, locale)}
                  </td>
                  <td className="px-4 py-3">
                    <p className="font-medium text-slate-900">{booking.trip_title ?? booking.trip_id}</p>
                    <Link
                      to={`/trips/${booking.trip_id}`}
                      className="text-xs font-semibold text-orange-600 hover:underline"
                    >
                      {t('admin.bookings.viewTrip')}
                    </Link>
                  </td>
                  <td className="px-4 py-3">
                    <p className="font-medium text-slate-900">{booking.customer_name}</p>
                    {booking.customer_email ? (
                      <p className="text-xs text-slate-500">{booking.customer_email}</p>
                    ) : null}
                    {booking.message ? (
                      <p className="mt-1 max-w-xs text-xs text-slate-600 line-clamp-2">{booking.message}</p>
                    ) : null}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-slate-700">{booking.customer_phone}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-slate-700">{booking.travel_date ?? '—'}</td>
                  <td className="px-4 py-3 tabular-nums text-slate-800">{booking.guests}</td>
                  <td className="px-4 py-3">
                    <Badge variant={statusBadgeVariant(booking.status)}>
                      {t(`admin.bookings.status.${booking.status}`)}
                    </Badge>
                    <select
                      value={booking.status}
                      onChange={(e) => void onStatusChange(booking.id, e.target.value as BookingStatus)}
                      className="input-premium mt-2 w-full min-w-[7rem] py-1 text-xs"
                      aria-label={t('admin.bookings.changeStatus')}
                    >
                      {BOOKING_STATUSES.map((s) => (
                        <option key={s} value={s}>
                          {t(`admin.bookings.status.${s}`)}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-4 py-3 text-end">
                    <button
                      type="button"
                      className="font-semibold text-red-600/95 transition hover:text-red-800 hover:underline"
                      onClick={() => void onDelete(booking.id)}
                    >
                      {t('admin.table.delete')}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
