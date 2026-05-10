import { localeNames, locales, type Locale } from '../i18n/config'
import { useI18n } from '../i18n/useI18n'

export function LanguageSwitcher() {
  const { locale, setLocale } = useI18n()

  return (
    <select
      value={locale}
      onChange={(e) => setLocale(e.target.value as Locale)}
      className="h-10 w-[5.5rem] shrink-0 cursor-pointer rounded-full border border-slate-200 bg-white px-2 text-xs font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-ocean-500/20 sm:w-[6.5rem] sm:px-3 sm:text-sm"
      aria-label="Language"
    >
      {locales.map((loc) => (
        <option key={loc} value={loc}>
          {localeNames[loc]}
        </option>
      ))}
    </select>
  )
}
