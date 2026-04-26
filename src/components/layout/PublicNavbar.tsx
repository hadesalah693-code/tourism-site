import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { CloseIcon, MenuIcon } from '../icons'
import { LanguageSwitcher } from '../LanguageSwitcher'
import { useI18n } from '../../i18n/useI18n'

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 ${
    isActive
      ? 'bg-white/90 text-slate-900 shadow-elevate ring-1 ring-slate-200/50'
      : 'text-slate-600 hover:bg-white/70 hover:text-slate-900'
  }`

export function PublicNavbar() {
  const { t } = useI18n()
  const [open, setOpen] = useState(false)

  const links = (
    <>
      <NavLink to="/" className={linkClass} onClick={() => setOpen(false)} end>
        {t('nav.home')}
      </NavLink>
      <NavLink to="/destinations" className={linkClass} onClick={() => setOpen(false)}>
        {t('nav.destinations')}
      </NavLink>
      <NavLink to="/trips" className={linkClass} onClick={() => setOpen(false)}>
        {t('nav.trips')}
      </NavLink>
      <NavLink to="/about" className={linkClass} onClick={() => setOpen(false)}>
        {t('nav.about')}
      </NavLink>
      <NavLink to="/contact" className={linkClass} onClick={() => setOpen(false)}>
        {t('nav.contact')}
      </NavLink>
    </>
  )

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/50 bg-sand-50/80 shadow-[0_1px_0_0_rgba(15,23,42,0.04)] backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link to="/" className="flex items-center gap-2.5">
          <img
            src="/logo.png"
            alt=""
            width={40}
            height={40}
            className="h-10 w-10 shrink-0 rounded-full object-cover shadow-elevate ring-2 ring-white/95"
            decoding="async"
          />
          <span className="text-base font-semibold tracking-tight text-slate-900">{t('brand')}</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">{links}</nav>

        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <Link
            to="/admin/login"
            className="hidden rounded-full border border-slate-200/80 bg-white/90 px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm transition duration-200 hover:border-slate-300 hover:bg-slate-50 sm:inline-block"
          >
            {t('nav.admin')}
          </Link>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200/80 bg-white text-slate-700 shadow-sm transition hover:bg-slate-50 md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label="Menu"
          >
            {open ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-slate-200/50 bg-sand-50/95 px-4 py-4 md:hidden">
          <div className="flex flex-col gap-1">{links}</div>
          <Link
            to="/admin/login"
            className="mt-3 block rounded-xl border border-slate-200/80 bg-white px-3 py-2 text-center text-sm font-semibold text-slate-800 shadow-elevate transition hover:bg-slate-50"
            onClick={() => setOpen(false)}
          >
            {t('nav.admin')}
          </Link>
        </div>
      ) : null}
    </header>
  )
}
