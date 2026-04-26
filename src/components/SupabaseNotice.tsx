import { isSupabaseConfigured } from '../lib/supabase'
import { useI18n } from '../i18n/useI18n'

export function SupabaseNotice() {
  const { t } = useI18n()
  if (isSupabaseConfigured) return null

  return (
    <div className="rounded-2xl border border-amber-200/80 bg-amber-50/95 px-4 py-3 text-sm text-amber-950 shadow-elevate backdrop-blur-sm">
      {t('common.configureSupabase')}
    </div>
  )
}
