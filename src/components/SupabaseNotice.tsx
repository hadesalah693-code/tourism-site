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

  const notConfigured = (
    <div className="rounded-2xl border border-orange-400/30 bg-orange-400/10 px-4 py-3 text-sm text-orange-700 backdrop-blur-sm">
      {t('common.configureSupabase')}
    </div>
  )

  if (!isSupabaseConfigured) return notConfigured
  if (health === 'unknown') return null
  if (health === 'not_configured') return notConfigured

  if (health === 'ok') {
    return (
      <div className="rounded-2xl border border-emerald-400/40 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-700 backdrop-blur-sm">
        {t('common.supabaseConnected')}
      </div>
    )
  }

  return (
    <div className="rounded-2xl border border-red-400/40 bg-red-400/10 px-4 py-3 text-sm text-red-700 backdrop-blur-sm">
      <p className="font-semibold">{t('common.supabaseUnreachable')}</p>
      <p className="mt-1 text-red-600/80">{t('common.supabaseUnreachableHint')}</p>
    </div>
  )
}