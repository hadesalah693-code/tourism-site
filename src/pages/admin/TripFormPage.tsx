import { type FormEvent, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Button } from '../../components/ui/Button'
import { Spinner } from '../../components/ui/Spinner'
import { useI18n } from '../../i18n/useI18n'
import { destinationName } from '../../lib/destinations'
import { loadAdminTrip, saveAdminTrip } from '../../lib/tripAdmin'
import { uploadTripImage } from '../../lib/storage'
import { DESTINATIONS, TRIP_CURRENCIES, type Destination, type Trip } from '../../types/trip'

const empty: Omit<Trip, 'id' | 'created_at' | 'updated_at'> = {
  title_ar: '',
  title_en: '',
  short_description_ar: '',
  short_description_en: '',
  full_description_ar: '',
  full_description_en: '',
  destination: 'sharm',
  duration: '',
  price: 0,
  currency: 'USD',
  cover_image: null,
  gallery_images: [],
  is_featured: false,
  is_active: true,
}

export function TripFormPage() {
  const { id } = useParams()
  const isEdit = Boolean(id)
  const navigate = useNavigate()
  const { t, locale } = useI18n()

  const [loading, setLoading] = useState(isEdit)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [form, setForm] = useState(empty)
  const [error, setError] = useState<string | null>(null)
  const [uploadNote, setUploadNote] = useState<string | null>(null)
  const [saveNote, setSaveNote] = useState<string | null>(null)

  function friendlyError(message: string | undefined) {
    if (!message) return t('admin.form.saveFailed')
    const lower = message.toLowerCase()
    if (lower.includes('failed to fetch') || lower.includes('network')) {
      return t('admin.form.networkError')
    }
    if (message === 'UPLOAD_FAILED') return t('admin.form.uploadFailed')
    if (message === 'SAVE_FAILED') return t('admin.form.saveFailed')
    return message
  }

  useEffect(() => {
    if (!id) return

    let cancelled = false
    void (async () => {
      setLoading(true)
      const row = await loadAdminTrip(id)
      if (cancelled) return
      if (!row) {
        setError(t('admin.form.notFound'))
        setLoading(false)
        return
      }
      setForm({
        title_ar: row.title_ar,
        title_en: row.title_en,
        short_description_ar: row.short_description_ar ?? '',
        short_description_en: row.short_description_en ?? '',
        full_description_ar: row.full_description_ar ?? '',
        full_description_en: row.full_description_en ?? '',
        destination: row.destination,
        duration: row.duration,
        price: row.price,
        currency: row.currency,
        cover_image: row.cover_image,
        gallery_images: row.gallery_images ?? [],
        is_featured: row.is_featured,
        is_active: row.is_active,
      })
      setLoading(false)
    })()

    return () => {
      cancelled = true
    }
  }, [id])

  async function onCover(file: File | null) {
    if (!file) return
    setUploading(true)
    setError(null)
    const { url, error: upErr, localFallback } = await uploadTripImage(file, 'covers')
    setUploading(false)
    if (upErr || !url) {
      setError(friendlyError(upErr?.message))
      return
    }
    setUploadNote(localFallback ? t('admin.form.uploadLocalHint') : null)
    setForm((f) => ({ ...f, cover_image: url }))
  }

  async function onGallery(files: FileList | null) {
    if (!files?.length) return
    setUploading(true)
    setError(null)
    let usedLocal = false
    const next: string[] = [...(form.gallery_images ?? [])]
    for (const file of Array.from(files)) {
      const { url, error: upErr, localFallback } = await uploadTripImage(file, 'gallery')
      if (upErr || !url) {
        setError(friendlyError(upErr?.message))
        break
      }
      if (localFallback) usedLocal = true
      next.push(url)
    }
    setForm((f) => ({ ...f, gallery_images: next }))
    setUploadNote(usedLocal ? t('admin.form.uploadLocalHint') : null)
    setUploading(false)
  }

  function removeGallery(url: string) {
    setForm((f) => ({
      ...f,
      gallery_images: (f.gallery_images ?? []).filter((u) => u !== url),
    }))
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError(null)
    setSaveNote(null)

    const payload = {
      title_ar: form.title_ar,
      title_en: form.title_en,
      short_description_ar: form.short_description_ar || null,
      short_description_en: form.short_description_en || null,
      full_description_ar: form.full_description_ar || null,
      full_description_en: form.full_description_en || null,
      destination: form.destination as Destination,
      duration: form.duration,
      price: Number(form.price),
      currency: form.currency,
      cover_image: form.cover_image,
      gallery_images: form.gallery_images ?? [],
      is_featured: form.is_featured,
      is_active: form.is_active,
    }

    const { trip: saved, savedLocally, error: saveErr } = await saveAdminTrip({
      ...payload,
      id: isEdit ? id : undefined,
    })
    setSaving(false)

    if (saveErr || !saved) {
      setError(friendlyError(saveErr ?? undefined))
      return
    }

    if (savedLocally) {
      setSaveNote(t('admin.form.saveLocalHint'))
    }

    if (!isEdit) {
      navigate(`/admin/trips/${saved.id}/edit`, { replace: true })
      return
    }

    navigate('/admin/trips')
  }

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Spinner />
      </div>
    )
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold text-slate-900">{isEdit ? t('admin.editTrip') : t('admin.addTrip')}</h1>
        <Link to="/admin/trips" className="text-sm font-semibold text-orange-600 hover:underline">
          ← {t('admin.trips')}
        </Link>
      </div>

      <form className="mt-8 space-y-6" onSubmit={onSubmit}>
        {error ? (
          <p className="rounded-xl border border-red-200/80 bg-red-50/95 px-4 py-3 text-sm text-red-800 shadow-elevate">{error}</p>
        ) : null}
        {uploadNote ? (
          <p className="rounded-xl border border-sky-200/80 bg-sky-50/95 px-4 py-3 text-sm text-sky-900 shadow-elevate">
            {uploadNote}
          </p>
        ) : null}
        {saveNote ? (
          <p className="rounded-xl border border-emerald-200/80 bg-emerald-50/95 px-4 py-3 text-sm text-emerald-900 shadow-elevate">
            {saveNote}
          </p>
        ) : null}

        <div className="grid gap-6 lg:grid-cols-2">
          <label className="block text-sm font-medium text-slate-700">
            {t('admin.form.titleEn')}
            <input
              required
              value={form.title_en}
              onChange={(e) => setForm((f) => ({ ...f, title_en: e.target.value }))}
              className="input-premium mt-1"
            />
          </label>
          <label className="block text-sm font-medium text-slate-700">
            {t('admin.form.titleAr')}
            <input
              required
              value={form.title_ar}
              onChange={(e) => setForm((f) => ({ ...f, title_ar: e.target.value }))}
              className="input-premium mt-1"
            />
          </label>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <label className="block text-sm font-medium text-slate-700">
            {t('admin.form.shortEn')}
            <textarea
              rows={3}
              value={form.short_description_en ?? ''}
              onChange={(e) => setForm((f) => ({ ...f, short_description_en: e.target.value }))}
              className="input-premium mt-1"
            />
          </label>
          <label className="block text-sm font-medium text-slate-700">
            {t('admin.form.shortAr')}
            <textarea
              rows={3}
              value={form.short_description_ar ?? ''}
              onChange={(e) => setForm((f) => ({ ...f, short_description_ar: e.target.value }))}
              className="input-premium mt-1"
            />
          </label>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <label className="block text-sm font-medium text-slate-700">
            {t('admin.form.fullEn')}
            <textarea
              rows={6}
              value={form.full_description_en ?? ''}
              onChange={(e) => setForm((f) => ({ ...f, full_description_en: e.target.value }))}
              className="input-premium mt-1"
            />
          </label>
          <label className="block text-sm font-medium text-slate-700">
            {t('admin.form.fullAr')}
            <textarea
              rows={6}
              value={form.full_description_ar ?? ''}
              onChange={(e) => setForm((f) => ({ ...f, full_description_ar: e.target.value }))}
              className="input-premium mt-1"
            />
          </label>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <label className="block text-sm font-medium text-slate-700">
            {t('admin.form.destination')}
            <select
              value={form.destination}
              onChange={(e) => setForm((f) => ({ ...f, destination: e.target.value as Destination }))}
              className="input-premium mt-1"
            >
              {DESTINATIONS.map((d) => (
                <option key={d} value={d}>
                  {destinationName(locale, d)}
                </option>
              ))}
            </select>
          </label>
          <label className="block text-sm font-medium text-slate-700">
            {t('admin.form.duration')}
            <input
              required
              value={form.duration}
              onChange={(e) => setForm((f) => ({ ...f, duration: e.target.value }))}
              className="input-premium mt-1"
              placeholder="5 days / 7 nights"
            />
          </label>
          <label className="block text-sm font-medium text-slate-700">
            {t('admin.form.price')}
            <input
              required
              type="number"
              min={0}
              step={1}
              value={form.price}
              onChange={(e) => setForm((f) => ({ ...f, price: Number(e.target.value) }))}
              className="input-premium mt-1"
            />
          </label>
          <label className="block text-sm font-medium text-slate-700">
            {t('admin.form.currency')}
            <select
              value={form.currency}
              onChange={(e) => setForm((f) => ({ ...f, currency: e.target.value }))}
              className="input-premium mt-1"
            >
              {TRIP_CURRENCIES.map((c) => (
                <option key={c} value={c}>
                  {t(`admin.form.currencies.${c}`)}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="rounded-2xl bg-white p-6 ring-1 ring-slate-200">
          <p className="text-sm font-semibold text-slate-900">{t('admin.form.cover')}</p>
          {form.cover_image ? (
            <img
              src={form.cover_image}
              alt=""
              className="mt-3 h-40 w-full max-w-md rounded-xl border border-slate-200/60 object-cover shadow-elevate"
            />
          ) : null}
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <label className="inline-flex cursor-pointer rounded-xl border border-orange-200 bg-orange-50 px-4 py-2 text-sm font-semibold text-orange-700 shadow-elevate transition hover:bg-orange-100">
              {uploading ? t('admin.form.uploading') : t('admin.form.chooseFile')}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => void onCover(e.target.files?.[0] ?? null)}
              />
            </label>
            {form.cover_image ? (
              <button type="button" className="text-sm text-red-600 hover:underline" onClick={() => setForm((f) => ({ ...f, cover_image: null }))}>
                {t('admin.form.remove')}
              </button>
            ) : null}
          </div>
        </div>

        <div className="rounded-2xl bg-white p-6 ring-1 ring-slate-200">
          <p className="text-sm font-semibold text-slate-900">{t('admin.form.gallery')}</p>
          <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {(form.gallery_images ?? []).map((url) => (
              <div key={url} className="relative">
                <img src={url} alt="" className="h-32 w-full rounded-xl border border-slate-200/60 object-cover shadow-elevate" />
                <button
                  type="button"
                  className="absolute end-2 top-2 rounded-lg bg-white/90 px-2 py-1 text-xs font-semibold text-red-600 shadow"
                  onClick={() => removeGallery(url)}
                >
                  {t('admin.form.remove')}
                </button>
              </div>
            ))}
          </div>
          <label className="mt-4 inline-flex cursor-pointer rounded-xl border border-slate-200/60 bg-slate-50/90 px-4 py-2 text-sm font-semibold text-slate-800 shadow-elevate transition hover:bg-slate-100/90">
            {t('admin.form.addGallery')}
            <input type="file" accept="image/*" multiple className="hidden" onChange={(e) => void onGallery(e.target.files)} />
          </label>
        </div>

        <div className="flex flex-wrap gap-6">
          <label className="flex items-center gap-2 text-sm font-medium text-slate-800">
            <input
              type="checkbox"
              checked={form.is_featured}
              onChange={(e) => setForm((f) => ({ ...f, is_featured: e.target.checked }))}
            />
            {t('admin.form.featured')}
          </label>
          <label className="flex items-center gap-2 text-sm font-medium text-slate-800">
            <input
              type="checkbox"
              checked={form.is_active}
              onChange={(e) => setForm((f) => ({ ...f, is_active: e.target.checked }))}
            />
            {t('admin.form.active')}
          </label>
        </div>

        <Button type="submit" disabled={saving || uploading}>
          {saving ? t('admin.form.saving') : t('admin.form.save')}
        </Button>
      </form>
    </div>
  )
}
