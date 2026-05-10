import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { CloseIcon, MenuIcon } from '../icons'
import { LanguageSwitcher } from '../LanguageSwitcher'
import { useI18n } from '../../i18n/useI18n'

const DEFAULT_WA = '201000000000'

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 ${
    isActive
      ? 'bg-white text-ocean-900 shadow-elevate ring-1 ring-slate-200/70'
      : 'text-slate-600 hover:bg-white/70 hover:text-slate-950'
  }`

export function PublicNavbar() {
  const { t } = useI18n()
  const [open, setOpen] = useState(false)
  const phone = String(import.meta.env.VITE_WHATSAPP_NUMBER || DEFAULT_WA)
  const whatsapp = `https://wa.me/${phone.replace(/\D/g, '')}`

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
    <header className="sticky top-0 z-50 border-b border-slate-200/60 bg-sand-50/90 shadow-[0_1px_0_0_rgba(15,23,42,0.04)] backdrop-blur-xl">
      <div className="border-b border-slate-200/60 bg-slate-950 text-white">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-center gap-1 px-4 py-2 text-center text-[11px] sm:flex-row sm:justify-between sm:px-6 sm:text-xs">
          <span className="font-medium text-slate-200">Hurghada, Sharm El Sheikh, Marsa Alam</span>
          <a
            href={whatsapp}
            target="_blank"
            rel="noreferrer noopener"
            className="font-semibold text-teal-200 transition hover:text-white"
          >
            WhatsApp: +{phone.replace(/\D/g, '')}
          </a>
        </div>
      </div>
      <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-2 px-3 py-2.5 sm:gap-3 sm:px-6 sm:py-3 lg:grid-cols-[1fr_auto_1fr]">
        <Link to="/" className="flex min-w-0 items-center gap-2 sm:gap-3">
          <img
            src="/logo.png"
            alt=""
            width={40}
            height={40}
            className="h-10 w-10 shrink-0 rounded-full object-cover shadow-elevate ring-2 ring-white/95 sm:h-11 sm:w-11"
            decoding="async"
          />
          <span className="truncate text-sm font-bold tracking-tight text-slate-950 sm:text-base">{t('brand')}</span>
        </Link>

        <nav className="hidden items-center gap-1 rounded-full border border-slate-200/70 bg-white/45 p-1 shadow-sm md:flex">
          {links}
        </nav>

        <div className="flex min-w-0 items-center justify-end gap-1.5 sm:gap-2">
          <LanguageSwitcher />
          <Link
            to="/admin/login"
            className="hidden h-10 items-center rounded-full border border-slate-200/80 bg-white/80 px-3 text-xs font-semibold text-slate-600 shadow-sm transition duration-200 hover:border-slate-300 hover:bg-white hover:text-slate-900 sm:inline-flex"
          >
            {t('nav.admin')}
          </Link>
          <button
            type="button"
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-200/80 bg-white text-slate-700 shadow-sm transition hover:bg-slate-50 md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label="Menu"
          >
            {open ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-slate-200/50 bg-sand-50/98 px-3 py-3 shadow-elevate-lg md:hidden">
          <div className="grid gap-2 rounded-2xl border border-slate-200/70 bg-white p-2 shadow-elevate">{links}</div>
          <Link
            to="/admin/login"
            className="mt-3 block rounded-full border border-slate-200/80 bg-white px-3 py-2.5 text-center text-sm font-semibold text-slate-700 shadow-elevate transition hover:bg-slate-50"
            onClick={() => setOpen(false)}
          >
            {t('nav.admin')}
          </Link>
        </div>
      ) : null}
    </header>
  )
}
