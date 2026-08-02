/**
 * One-time Supabase setup: runs supabase/enable.sql against your project database.
 *
 * Add to .env (from Dashboard → Settings → Database → Database password):
 *   SUPABASE_DB_PASSWORD=your-database-password
 *
 * Run: npm run supabase:setup
 */
import { readFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import pg from 'pg'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')

function loadEnv() {
  try {
    const raw = readFileSync(resolve(root, '.env'), 'utf8')
    for (const line of raw.split('\n')) {
      const trimmed = line.trim()
      if (!trimmed || trimmed.startsWith('#')) continue
      const eq = trimmed.indexOf('=')
      if (eq === -1) continue
      const key = trimmed.slice(0, eq).trim()
      const val = trimmed.slice(eq + 1).trim()
      if (!(key in process.env)) process.env[key] = val
    }
  } catch {
    /* .env optional if vars exported */
  }
}

loadEnv()

const url = process.env.VITE_SUPABASE_URL?.replace(/\/$/, '')
const password = process.env.SUPABASE_DB_PASSWORD

if (!url || !password) {
  console.error(`
Missing credentials. In .env set:
  VITE_SUPABASE_URL=https://uygjecmenksrkltpsofi.supabase.co
  SUPABASE_DB_PASSWORD=<from Supabase Dashboard → Settings → Database>

Or run enable.sql manually in SQL Editor:
  https://supabase.com/dashboard/project/uygjecmenksrkltpsofi/sql/new
`)
  process.exit(1)
}

const ref = url.match(/https:\/\/([^.]+)\.supabase\.co/)?.[1]
if (!ref) {
  console.error('Invalid VITE_SUPABASE_URL')
  process.exit(1)
}

const connectionString = `postgresql://postgres:${encodeURIComponent(password)}@db.${ref}.supabase.co:5432/postgres`
const sql = readFileSync(resolve(root, 'supabase/enable.sql'), 'utf8')

const client = new pg.Client({ connectionString, ssl: { rejectUnauthorized: false } })

try {
  console.log(`Connecting to Supabase project ${ref}…`)
  await client.connect()
  console.log('Running enable.sql…')
  await client.query(sql)
  console.log('Done — trips, bookings, storage bucket, and RLS policies are ready.')
} catch (err) {
  console.error('Setup failed:', err instanceof Error ? err.message : err)
  console.error(`
If the password is wrong, reset it in Dashboard → Settings → Database.
Or paste supabase/enable.sql in SQL Editor:
  https://supabase.com/dashboard/project/${ref}/sql/new
`)
  process.exit(1)
} finally {
  await client.end()
}
