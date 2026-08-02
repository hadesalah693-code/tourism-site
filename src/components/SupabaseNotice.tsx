import { useEffect, useState } from 'react'
import { isSupabaseConfigured } from '../lib/supabase'
import { checkSupabaseConnection, type SupabaseHealth } from '../lib/supabaseHealth'
import { useI18n } from '../i18n/useI18n'

export function SupabaseNotice() {
  const { t } = useI18n()
  const [health, setHealth] = useState<SupabaseHealth>('unknown')

  useEffect(() => {
    if (!isSupabaseConfigured) return
    void checkSupabaseConnection().then(setHealth)
  }, [])

  if (!isSupabaseConfigured) {
    return (
      <div className="rounded-2xl border border-amber-200/80 bg-amber-50/95 px-4 py-3 text-sm text-amber-950 shadow-elevate backdrop-blur-sm">
        {t('common.configureSupabase')}
      </div>
    )
  }

  if (health === 'unknown') return null

  if (health === 'ok') {
    return (
      <div className="rounded-2xl border border-emerald-200/80 bg-emerald-50/95 px-4 py-3 text-sm text-emerald-900 shadow-elevate backdrop-blur-sm">
        {t('common.supabaseConnected')}
      </div>
    )
  }

  return (
    <div className="rounded-2xl border border-red-200/80 bg-red-50/95 px-4 py-3 text-sm text-red-900 shadow-elevate backdrop-blur-sm">
      <p className="font-semibold">{t('common.supabaseUnreachable')}</p>
      <p className="mt-1 text-red-800/90">{t('common.supabaseUnreachableHint')}</p>
    </div>
  )
}
