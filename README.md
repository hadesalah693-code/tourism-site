# Nile Horizon — Egypt travel (React + Vite + Supabase)

Premium tourism site for Red Sea packages (Sharm El Sheikh, Hurghada, Marsa Alam) with bilingual public pages (English / Arabic) and a protected admin dashboard for trips, pricing, and images.

## Stack

- **React 19 + Vite 8 + TypeScript**
- **Tailwind CSS v4**
- **React Router v7**
- **Supabase** (Postgres, Auth, Storage)
- **Deploy**: Vercel or Cloudflare Pages (static build + env vars)

## Local setup

1. **Install**

   ```bash
   npm install
   ```

2. **Environment**

   Copy `.env.example` to `.env` and set:

   - `VITE_SUPABASE_URL` — from Supabase **Project Settings → API**
   - `VITE_SUPABASE_ANON_KEY` — anon public key (same page)
   - `VITE_WHATSAPP_NUMBER` — digits only, country code without `+` (e.g. `201234567890`)

3. **Supabase database**

   In the Supabase SQL editor, run `supabase/schema.sql`, then `supabase/seed.sql` for sample trips.

4. **Admin user**

   In Supabase: **Authentication → Users → Add user** (email + password). Only invited staff should receive credentials; RLS allows any authenticated user to manage trips (suitable for a small team).

5. **Storage**

   The schema creates a public bucket `trip-images` with policies for uploads by authenticated users. The app uploads cover and gallery images under `covers/` and `gallery/`.

6. **Run**

   ```bash
   npm run dev
   ```

   Open `http://localhost:5173`. Public site: `/`. Admin: `/admin/login` → `/admin`.

## Project structure (high level)

- `src/pages/` — public and admin pages
- `src/layouts/` — `PublicLayout` vs `AdminLayout`
- `src/components/` — shared UI, trip cards, navbar, WhatsApp
- `src/i18n/` — locale config, JSON dictionaries (`en`, `ar`), RTL via `document.documentElement.dir`
- `src/i18n/locales/` — add `fr.json` (and `locales` in `config.ts`) to extend languages
- `src/lib/supabase.ts` — Supabase client (env-driven)
- `src/routes/AdminRoute.tsx` — auth gate for `/admin/*`
- `supabase/` — SQL schema + seed data

## Deployment

### Vercel

1. Push the repo to GitHub/GitLab/Bitbucket.
2. **New Project** → import repo, **Framework Preset**: Vite.
3. Add environment variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `VITE_WHATSAPP_NUMBER` (optional)
4. Build command: `npm run build`, output directory: `dist`.
5. `vercel.json` includes a SPA fallback rewrite so client-side routes work.

### Cloudflare Pages

1. Connect the repo in **Workers & Pages → Create → Pages**.
2. Build command: `npm run build`, build output: `dist`.
3. **Settings → Environment variables** — add the same `VITE_*` variables for Production (and Preview if needed).
4. `public/_redirects` sends all routes to `index.html` for SPA routing.

## Scripts

| Command         | Description        |
|----------------|--------------------|
| `npm run dev`  | Dev server         |
| `npm run build`| Typecheck + build  |
| `npm run preview` | Preview production build |
| `npm run lint` | ESLint             |

## Notes

- Trip content is stored per language (`title_ar` / `title_en`, descriptions, etc.). UI chrome uses JSON files under `src/i18n/locales/`.
- When env vars are missing, the UI shows a short notice and lists/ forms stay empty; configure Supabase to load live data.
- WhatsApp links use `https://wa.me/<number>?text=...`; keep the number in E.164 digits without `+` in `VITE_WHATSAPP_NUMBER`.
