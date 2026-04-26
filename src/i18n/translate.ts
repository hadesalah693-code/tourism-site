import type { Locale } from './config'
import ar from './locales/ar.json'
import bg from './locales/bg.json'
import cs from './locales/cs.json'
import de from './locales/de.json'
import en from './locales/en.json'
import fr from './locales/fr.json'
import it from './locales/it.json'
import pl from './locales/pl.json'
import ro from './locales/ro.json'

const catalogs: Record<Locale, Record<string, unknown>> = {
  en: en as Record<string, unknown>,
  ar: ar as Record<string, unknown>,
  de: de as Record<string, unknown>,
  pl: pl as Record<string, unknown>,
  cs: cs as Record<string, unknown>,
  ro: ro as Record<string, unknown>,
  bg: bg as Record<string, unknown>,
  it: it as Record<string, unknown>,
  fr: fr as Record<string, unknown>,
}

function getNested(obj: Record<string, unknown>, path: string): unknown {
  const parts = path.split('.')
  let cur: unknown = obj
  for (const p of parts) {
    if (cur === null || typeof cur !== 'object') return undefined
    cur = (cur as Record<string, unknown>)[p]
  }
  return cur
}

export function translate(
  locale: Locale,
  key: string,
  vars?: Record<string, string | number>,
): string {
  const raw = getNested(catalogs[locale], key)
  let out = typeof raw === 'string' ? raw : key
  if (vars) {
    for (const [k, v] of Object.entries(vars)) {
      out = out.replaceAll(`{{${k}}}`, String(v))
    }
  }
  return out
}
