import type { User } from '@supabase/supabase-js'

const STORAGE_KEY = 'nh-local-admin-email'

export const MOCK_ADMIN_USER_ID = '00000000-0000-4000-8000-000000000001'

export function isLocalAdminConfigured(): boolean {
  const p = import.meta.env.VITE_ADMIN_PASSWORD
  return Boolean(p && String(p).length > 0)
}

export function getAdminDisplayEmail(): string {
  const e = import.meta.env.VITE_ADMIN_USER_EMAIL
  return (typeof e === 'string' && e.trim()) || 'admin@local'
}

export function localPasswordMatches(password: string): boolean {
  if (!isLocalAdminConfigured()) return false
  const p = import.meta.env.VITE_ADMIN_PASSWORD as string
  return p === password
}

export function createMockUser(email: string): User {
  return {
    id: MOCK_ADMIN_USER_ID,
    aud: 'authenticated',
    role: 'authenticated',
    email,
    email_confirmed_at: new Date().toISOString(),
    app_metadata: {},
    user_metadata: {},
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  } as User
}

export function isMockAdminUser(user: User | null | undefined): boolean {
  return user?.id === MOCK_ADMIN_USER_ID
}

export function getStoredLocalAdminEmail(): string | null {
  try {
    return localStorage.getItem(STORAGE_KEY)
  } catch {
    return null
  }
}

export function setStoredLocalAdminEmail(email: string) {
  try {
    localStorage.setItem(STORAGE_KEY, email)
  } catch {
    /* ignore */
  }
}

export function clearStoredLocalAdmin() {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch {
    /* ignore */
  }
}
