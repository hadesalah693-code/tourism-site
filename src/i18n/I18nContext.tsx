import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import { defaultLocale, isRtl, type Locale, locales } from './config'
import { I18nContext, type I18nContextValue } from './i18n-context'
import { translate } from './translate'

const STORAGE_KEY = 'nh-locale'

function readStoredLocale(): Locale {
  try {
    const v = localStorage.getItem(STORAGE_KEY)
    if (v && (locales as readonly string[]).includes(v)) return v as Locale
  } catch {
    /* ignore */
  }
  return defaultLocale
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => {
    if (typeof window === 'undefined') return defaultLocale
    return readStoredLocale()
  })

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next)
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      /* ignore */
    }
  }, [])

  useEffect(() => {
    const dir = isRtl(locale) ? 'rtl' : 'ltr'
    document.documentElement.dir = dir
    document.documentElement.lang = locale
  }, [locale])

  const t = useCallback(
    (key: string, vars?: Record<string, string | number>) => translate(locale, key, vars),
    [locale],
  )

  const value = useMemo<I18nContextValue>(
    () => ({
      locale,
      setLocale,
      t,
      dir: isRtl(locale) ? 'rtl' : 'ltr',
    }),
    [locale, setLocale, t],
  )

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}
