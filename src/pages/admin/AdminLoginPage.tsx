import { type FormEvent, useState } from 'react'
import { Link, Navigate, useLocation } from 'react-router-dom'
import { Button } from '../../components/ui/Button'
import { isLocalAdminConfigured } from '../../lib/localAdminAuth'
import { useI18n } from '../../i18n/useI18n'
import { useAuth } from '../../hooks/useAuth'

export function AdminLoginPage() {
  const { t } = useI18n()
  const { signIn, user, loading } = useAuth()
  const location = useLocation()
  const from = (location.state as { from?: string } | null)?.from ?? '/admin'

  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  if (loading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-ocean-500 border-t-transparent" />
      </div>
    )
  }

  if (user) {
    return <Navigate to={from} replace />
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    setSubmitting(true)
    const { error: err } = await signIn(password)
    setSubmitting(false)
    if (err) {
      if (err.message === 'NOT_CONFIGURED') {
        setError(t('admin.passwordNotConfigured'))
      } else if (err.message === 'INVALID') {
        setError(t('admin.invalidPassword'))
      } else {
        setError(err.message)
      }
    }
  }

  const canSignIn = isLocalAdminConfigured()

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-4 py-16 sm:px-6">
      <Link to="/" className="mb-8 text-sm text-slate-500 transition hover:text-ocean-800 hover:underline">
        ← {t('nav.home')}
      </Link>
      <div className="rounded-2xl border border-slate-200/60 bg-white/95 p-8 shadow-elevate-lg">
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">{t('admin.loginTitle')}</h1>
        <p className="mt-2 text-sm text-slate-600/95">{t('admin.loginHint')}</p>
        {!canSignIn ? (
          <p className="mt-3 text-sm text-amber-800">{t('admin.passwordNotConfigured')}</p>
        ) : null}
        <form className="mt-6 space-y-4" onSubmit={onSubmit}>
          <label className="block text-sm font-medium text-slate-700">
            {t('admin.password')}
            <input
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-premium mt-1"
            />
          </label>
          {error ? <p className="text-sm text-red-600">{error}</p> : null}
          <Button type="submit" className="w-full" disabled={submitting || !canSignIn}>
            {submitting ? t('common.loading') : t('admin.signIn')}
          </Button>
        </form>
      </div>
    </div>
  )
}
