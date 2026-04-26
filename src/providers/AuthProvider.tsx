import type { Session, User } from '@supabase/supabase-js'
import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import {
  clearStoredLocalAdmin,
  createMockUser,
  getAdminDisplayEmail,
  getStoredLocalAdminEmail,
  isLocalAdminConfigured,
  localPasswordMatches,
  setStoredLocalAdminEmail,
} from '../lib/localAdminAuth'
import { AuthContext, type AuthContextValue } from './auth-context'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const displayEmail = getAdminDisplayEmail()
    if (
      isLocalAdminConfigured() &&
      getStoredLocalAdminEmail() === displayEmail
    ) {
      setUser(createMockUser(displayEmail))
    }
    setLoading(false)
  }, [])

  const signIn = useCallback(async (password: string) => {
    if (!isLocalAdminConfigured()) {
      return { error: new Error('NOT_CONFIGURED') }
    }
    if (!localPasswordMatches(password)) {
      return { error: new Error('INVALID') }
    }
    const displayEmail = getAdminDisplayEmail()
    setUser(createMockUser(displayEmail))
    setSession(null)
    setStoredLocalAdminEmail(displayEmail)
    return { error: null }
  }, [])

  const signOut = useCallback(async () => {
    clearStoredLocalAdmin()
    setUser(null)
    setSession(null)
  }, [])

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      session,
      loading,
      signIn,
      signOut,
    }),
    [user, session, loading, signIn, signOut],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
