import { createContext } from 'react'
import type { Locale } from './config'

export type I18nContextValue = {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: string, vars?: Record<string, string | number>) => string
  dir: 'ltr' | 'rtl'
}

export const I18nContext = createContext<I18nContextValue | null>(null)
