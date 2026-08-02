import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AdminLayout } from './layouts/AdminLayout'
import { PublicLayout } from './layouts/PublicLayout'
import { AboutPage } from './pages/AboutPage'
import { ContactPage } from './pages/ContactPage'
import { DestinationsPage } from './pages/DestinationsPage'
import { HomePage } from './pages/HomePage'
import { TripDetailPage } from './pages/TripDetailPage'
import { TripsPage } from './pages/TripsPage'
import { AdminBookingsPage } from './pages/admin/AdminBookingsPage'
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage'
import { AdminDestinationsPage } from './pages/admin/AdminDestinationsPage'
import { AdminLoginPage } from './pages/admin/AdminLoginPage'
import { AdminTripsPage } from './pages/admin/AdminTripsPage'
import { TripFormPage } from './pages/admin/TripFormPage'
import { AuthProvider } from './providers/AuthProvider'
import { AdminRoute } from './routes/AdminRoute'
import { I18nProvider } from './i18n/I18nContext'

export default function App() {
  return (
    <I18nProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<PublicLayout />}>
              <Route index element={<HomePage />} />
              <Route path="destinations" element={<DestinationsPage />} />
              <Route path="trips" element={<TripsPage />} />
              <Route path="trips/:id" element={<TripDetailPage />} />
              <Route path="about" element={<AboutPage />} />
              <Route path="contact" element={<ContactPage />} />
            </Route>

            <Route path="admin/login" element={<AdminLoginPage />} />

            <Route element={<AdminRoute />}>
              <Route path="admin" element={<AdminLayout />}>
                <Route index element={<AdminDashboardPage />} />
                <Route path="trips" element={<AdminTripsPage />} />
                <Route path="trips/new" element={<TripFormPage />} />
                <Route path="trips/:id/edit" element={<TripFormPage />} />
                <Route path="destinations" element={<AdminDestinationsPage />} />
                <Route path="bookings" element={<AdminBookingsPage />} />
              </Route>
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </I18nProvider>
  )
}
