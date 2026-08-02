import { Link, NavLink, Outlet } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { Button } from '../components/ui/Button'
import { useI18n } from '../i18n/useI18n'

const adminLink = ({ isActive }: { isActive: boolean }) =>
  `rounded-lg px-3.5 py-2 text-sm font-medium transition-all duration-200 ${
    isActive ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
  }`

export function AdminLayout() {
  const { signOut } = useAuth()
  const { t } = useI18n()

  return (
    <div className="min-h-screen bg-[#f6f7f9]">
      <div className="border-b border-slate-200/80 bg-white shadow-[0_1px_0_0_rgba(15,23,42,0.04)]">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt=""
              width={36}
              height={36}
              className="h-9 w-9 shrink-0 rounded-full object-cover shadow-elevate ring-1 ring-slate-200/60"
              decoding="async"
            />
            <Link to="/admin" className="text-lg font-semibold text-slate-900">
              {t('brand')} — {t('admin.dashboard')}
            </Link>
            <Link to="/" className="text-sm text-slate-500 transition hover:text-ocean-800 hover:underline">
              ← {t('nav.home')}
            </Link>
          </div>
          <Button variant="ghost" size="sm" type="button" onClick={() => void signOut()}>
            {t('admin.signOut')}
          </Button>
        </div>
        <div className="mx-auto flex max-w-6xl gap-2 px-4 pb-4 sm:px-6">
          <NavLink to="/admin" end className={adminLink}>
            {t('admin.dashboard')}
          </NavLink>
          <NavLink to="/admin/trips" className={adminLink}>
            {t('admin.trips')}
          </NavLink>
          <NavLink to="/admin/bookings" className={adminLink}>
            {t('admin.bookings.nav')}
          </NavLink>
          <NavLink to="/admin/destinations" className={adminLink}>
            {t('admin.destinations.title')}
          </NavLink>
        </div>
      </div>
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <Outlet />
      </div>
    </div>
  )
}
