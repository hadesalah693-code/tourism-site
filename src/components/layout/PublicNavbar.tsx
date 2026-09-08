import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { CloseIcon, MenuIcon } from '../icons'
import { LanguageSwitcher } from '../LanguageSwitcher'
import { useI18n } from '../../i18n/useI18n'

const DEFAULT_WA = '201000000000'

const navItems: {
  to: string
  labelKey: string
  end?: boolean
  icon: React.ReactNode
}[] = [
  {
    to: '/',
    labelKey: 'nav.home',
    end: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-5 w-5">
        <path d="M3 10.5L12 3l9 7.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M5 9.5V21h5v-6h4v6h5V9.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    to: '/destinations',
    labelKey: 'nav.destinations',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-5 w-5">
        <path d="M12 21s-7-5.2-7-11a7 7 0 1 1 14 0c0 5.8-7 11-7 11z" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="12" cy="10" r="2.5" />
      </svg>
    ),
  },
  {
    to: '/trips',
    labelKey: 'nav.trips',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-5 w-5">
        <circle cx="12" cy="12" r="9" />
        <path d="M15.5 8.5l-2 5-5 2 2-5z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    to: '/about',
    labelKey: 'nav.about',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-5 w-5">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 11v5" strokeLinecap="round" />
        <path d="M12 7.5h.01" strokeLinecap="round" strokeWidth="2.2" />
      </svg>
    ),
  },
  {
    to: '/contact',
    labelKey: 'nav.contact',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-5 w-5">
        <path d="M6.6 3.5h2.9l2 5-2.2 1.7a12.5 12.5 0 0 0 6.5 6.5l1.7-2.2 5 2v2.9A2 2 0 0 1 20.4 21 17.5 17.5 0 0 1 3 3.6a2 2 0 0 1 3.6-.1z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
]

export function PublicNavbar() {
  const { t } = useI18n()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const phone = String(import.meta.env.VITE_WHATSAPP_NUMBER || DEFAULT_WA)
  const whatsapp = `https://wa.me/${phone.replace(/\D/g, '')}`

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-700 ${
        scrolled || open
          ? 'glass-navy shadow-[0_10px_40px_rgba(46,26,8,0.08)]'
          : 'bg-transparent'
      }`}
    >
      <div
        className={`relative mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 transition-all duration-500 sm:px-6 ${
          scrolled || open ? 'py-3' : 'py-4 sm:py-5'
        }`}
      >
        {(scrolled || open) && (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold-400/60 to-transparent" />
        )}
        <Link to="/" className="group flex items-center gap-3">
          <img
            src="/logo.png"
            alt=""
            width={44}
            height={44}
            className="h-11 w-11 shrink-0 rounded-full object-cover shadow-[0_0_30px_rgba(255,107,53,0.35)] ring-1 ring-gold-400/50"
            decoding="async"
          />
          <span className="min-w-0 leading-tight">
            <span className="block font-serif text-lg tracking-wide text-navy-950 transition group-hover:text-orange-600">
              {t('brand')}
            </span>
            <span className="block text-[10px] font-medium uppercase tracking-[0.28em] text-orange-500/80">
              {t('tagline')}
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `nav-link rounded-full px-4 py-2 text-[13px] font-medium tracking-wide transition-all duration-300 ${
                  isActive
                    ? 'is-active text-orange-600'
                    : 'text-navy-800/80 hover:bg-navy-900/5 hover:text-navy-950'
                }`
              }
            >
              {t(item.labelKey)}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <Link
            to="/contact"
            className="btn-sheen relative hidden overflow-hidden rounded-full bg-gradient-to-r from-gold-400 to-orange-500 px-5 py-2.5 text-[13px] font-semibold tracking-wide text-navy-950 transition-all duration-300 hover:from-gold-300 hover:to-orange-400 md:inline-flex"
          >
            {t('nav.book')}
          </Link>
          <button
            type="button"
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-navy-900/20 text-navy-950 transition hover:border-orange-500/60 hover:text-orange-600 lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label="Menu"
          >
            {open ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open ? (
        <div className="fixed inset-0 lg:hidden" style={{ zIndex: 2147483647 }}>
          <div
            className="absolute inset-0 bg-navy-950/25 backdrop-blur-[2px]"
            onClick={() => setOpen(false)}
            aria-hidden="true"
            style={{ zIndex: 2147483647 }}
          />

          {/* Side drawer panel */}
          <div
            className="menu-drawer absolute inset-0 flex min-h-[100dvh] w-full max-w-none flex-col overflow-hidden bg-[#f5f4f1] shadow-[0_0_40px_rgba(46,26,8,0.18)]"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            style={{ zIndex: 2147483647 }}
          >
            {/* Header: brand + close */}
            <div className="menu-item flex w-full items-center justify-between gap-3 px-5 pb-3 pt-4 pt-[max(1rem,env(safe-area-inset-top))]">
              <div className="flex flex-1 justify-center">
                <img
                  src="/logo.png"
                  alt=""
                  width={40}
                  height={40}
                  className="h-10 w-10 shrink-0 rounded-full object-cover shadow-[0_0_25px_rgba(255,107,53,0.3)] ring-1 ring-gold-400/50"
                  decoding="async"
                />
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-navy-900/15 bg-white text-navy-800 transition hover:border-orange-500/60 hover:text-orange-600"
              >
                <CloseIcon className="h-4 w-4" />
              </button>
            </div>
            <div className="menu-item mx-5 h-px bg-gradient-to-r from-orange-500/40 via-gold-400/30 to-transparent" style={{ animationDelay: '60ms' }} />

            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto px-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-4">
              {/* Primary links — icon chips */}
              <nav className="flex flex-col gap-0 border-t border-b border-navy-900/10">
                {navItems.map((item, i) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.end}
                    onClick={() => setOpen(false)}
                    style={{ animationDelay: `${120 + i * 55}ms` }}
                    className={({ isActive }) =>
                      `menu-item group flex items-center justify-between border-b border-navy-900/10 px-5 py-4 transition-colors duration-300 ${
                        isActive
                          ? 'bg-orange-500/5 text-orange-700'
                          : 'text-navy-950 hover:bg-white hover:text-orange-600'
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <span className="block text-left text-[1.05rem] font-semibold uppercase tracking-[0.04em]">
                          {t(item.labelKey)}
                        </span>
                        <span
                          className={`flex h-5 w-5 items-center justify-center text-lg transition-all duration-500 ${
                            isActive ? 'text-orange-600' : 'text-navy-900/50 group-hover:text-orange-500'
                          }`}
                        >
                          <span className="inline-block -translate-y-px">⌄</span>
                        </span>
                      </>
                    )}
                  </NavLink>
                ))}
              </nav>

              {/* Explore chips */}
              <div className="menu-item mt-6" style={{ animationDelay: '450ms' }}>
                <p className="text-[9px] font-semibold uppercase tracking-[0.3em] text-navy-700/70">
                  {t('nav.explore')}
                </p>
                <div className="mt-2.5 flex flex-wrap gap-2">
                  {[
                    { to: '/trips?category=sea', labelKey: 'experiences.sea.title' },
                    { to: '/trips?category=safari', labelKey: 'experiences.desert.title' },
                    { to: '/trips?category=historical', labelKey: 'experiences.ancient.title' },
                  ].map((chip, i) => (
                    <Link
                      key={chip.to}
                      to={chip.to}
                      onClick={() => setOpen(false)}
                      className="menu-item rounded-full border border-navy-900/10 bg-white/80 px-3.5 py-1.5 text-[11px] font-medium text-navy-900 shadow-elevate transition hover:border-orange-500/50 hover:text-orange-600"
                      style={{ animationDelay: `${490 + i * 45}ms` }}
                    >
                      {t(chip.labelKey)}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="menu-item mt-6" style={{ animationDelay: '620ms' }}>
                <div className="grid gap-2">
                  <Link
                    to="/contact"
                    onClick={() => setOpen(false)}
                    className="btn-sheen relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-gold-400 to-orange-500 px-5 py-3 text-sm font-semibold tracking-wide text-navy-950 shadow-[0_12px_30px_-10px_rgba(255,107,53,0.5)] transition-transform duration-300 hover:scale-[1.02]"
                  >
                    {t('nav.book')}
                    <span>→</span>
                  </Link>
                  <a
                    href={whatsapp}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-navy-900/15 bg-white px-5 py-3 text-sm font-medium text-orange-600 shadow-elevate transition hover:border-orange-500/60 hover:text-orange-700"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                      <path d="M12.04 2A9.94 9.94 0 002.1 14.6L.05 24l9.65-2A10 10 0 1012.04 2zm5.8 14.2c-.25.7-1.45 1.35-2 1.4-.5.05-1.1.25-3.7-.8-3.1-1.25-5.1-4.5-5.25-4.7-.15-.2-1.25-1.65-1.25-3.15s.8-2.23 1.08-2.53c.28-.3.6-.38.8-.38h.58c.18 0 .43-.07.67.5.25.58.85 2 .93 2.15.08.15.13.32.02.52-.1.2-.16.32-.32.5l-.5.58c-.16.16-.33.34-.14.66.2.32.87 1.43 1.87 2.32 1.3 1.15 2.38 1.5 2.72 1.68.34.17.53.14.73-.08.2-.24.83-.97 1.06-1.3.22-.33.44-.28.75-.17.3.12 1.95.92 2.28 1.09.33.16.55.25.63.38.08.14.08.8-.16 1.5z" />
                    </svg>
                    +{phone.replace(/\D/g, '')}
                  </a>
                </div>
              </div>

              {/* Socials */}
              <div className="menu-item mt-6" style={{ animationDelay: '700ms' }}>
                <div className="flex items-center justify-center gap-3">
                  {[
                    {
                      label: 'Instagram',
                      icon: (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4">
                          <rect x="3" y="3" width="18" height="18" rx="5" />
                          <circle cx="12" cy="12" r="4" />
                          <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                        </svg>
                      ),
                    },
                    {
                      label: 'Facebook',
                      href: 'https://www.facebook.com/DolphinHouseHurghada0/?rdid=rGU6SVOsa4eMfSEY',
                      icon: (
                        <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                          <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3V2z" />
                        </svg>
                      ),
                    },
                    { label: 'WhatsApp', href: whatsapp, icon: null },
                  ].map((item) => (
                    <a
                      key={item.label}
                      href={item.href ?? 'https://instagram.com'}
                      target="_blank"
                      rel="noreferrer noopener"
                      aria-label={item.label}
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-navy-900/15 bg-white text-navy-800/70 transition-all duration-300 hover:border-orange-500/60 hover:text-orange-600"
                    >
                      {item.icon ?? (
                        <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                          <path d="M12.04 2A9.94 9.94 0 002.1 14.6L.05 24l9.65-2A10 10 0 1012.04 2zm5.8 14.2c-.25.7-1.45 1.35-2 1.4-.5.05-1.1.25-3.7-.8-3.1-1.25-5.1-4.5-5.25-4.7-.15-.2-1.25-1.65-1.25-3.15s.8-2.23 1.08-2.53c.28-.3.6-.38.8-.38h.58c.18 0 .43-.07.67.5.25.58.85 2 .93 2.15.08.15.13.32.02.52-.1.2-.16.32-.32.5l-.5.58c-.16.16-.33.34-.14.66.2.32.87 1.43 1.87 2.32 1.3 1.15 2.38 1.5 2.72 1.68.34.17.53.14.73-.08.2-.24.83-.97 1.06-1.3.22-.33.44-.28.75-.17.3.12 1.95.92 2.28 1.09.33.16.55.25.63.38.08.14.08.8-.16 1.5z" />
                        </svg>
                      )}
                    </a>
                  ))}
                </div>
                <p className="mt-4 text-center font-serif text-[11px] italic text-navy-700/60">
                  Egypt — The Gift of the Nile
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  )
}
