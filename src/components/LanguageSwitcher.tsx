import { localeNames, locales, type Locale } from '../i18n/config'
import { useI18n } from '../i18n/useI18n'

export function LanguageSwitcher() {
  const { locale, setLocale } = useI18n()

  return (
    <select
      value={locale}
      onChange={(e) => setLocale(e.target.value as Locale)}
      className="input-premium min-w-[8.5rem] max-w-[12rem] shrink-0 cursor-pointer py-2 text-sm font-medium"
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
