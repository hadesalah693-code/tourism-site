import { isSupabaseConfigured, supabase } from './supabase'

export const TRIP_IMAGES_BUCKET = 'trip-images'

/** Try Supabase Storage when project env vars are set (falls back to local embed on failure). */
export const useRemoteImageStorage = isSupabaseConfigured

const MAX_DATA_URL_WIDTH = 1920
const MAX_DATA_URL_BYTES = 900_000

function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      if (typeof reader.result === 'string') resolve(reader.result)
      else reject(new Error('READ_FAILED'))
    }
    reader.onerror = () => reject(new Error('READ_FAILED'))
    reader.readAsDataURL(file)
  })
}

async function fileToCompressedDataUrl(file: File): Promise<string> {
  if (!file.type.startsWith('image/')) {
    return fileToDataUrl(file)
  }

  try {
    const bitmap = await createImageBitmap(file)
    const scale = Math.min(1, MAX_DATA_URL_WIDTH / bitmap.width)
    const width = Math.round(bitmap.width * scale)
    const height = Math.round(bitmap.height * scale)

    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height
    const ctx = canvas.getContext('2d')
    if (!ctx) {
      bitmap.close()
      return fileToDataUrl(file)
    }

    ctx.drawImage(bitmap, 0, 0, width, height)
    bitmap.close()

    let quality = 0.88
    let dataUrl = canvas.toDataURL('image/jpeg', quality)
    while (dataUrl.length > MAX_DATA_URL_BYTES && quality > 0.45) {
      quality -= 0.08
      dataUrl = canvas.toDataURL('image/jpeg', quality)
    }
    return dataUrl
  } catch {
    return fileToDataUrl(file)
  }
}

export type UploadTripImageResult = {
  url: string | null
  error: Error | null
  localFallback?: boolean
}

async function uploadToSupabase(file: File, folder: string): Promise<{ url: string | null; error: Error | null }> {
  const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg'
  const safeExt = ['jpg', 'jpeg', 'png', 'webp', 'gif'].includes(ext) ? ext : 'jpg'
  const path = `${folder}/${crypto.randomUUID()}.${safeExt}`

  const { error } = await supabase.storage.from(TRIP_IMAGES_BUCKET).upload(path, file, {
    cacheControl: '3600',
    upsert: false,
    contentType: file.type || 'image/jpeg',
  })

  if (error) return { url: null, error: new Error(error.message) }

  const { data } = supabase.storage.from(TRIP_IMAGES_BUCKET).getPublicUrl(path)
  return { url: data.publicUrl, error: null }
}

/** Saves image in-browser (default). Optional Supabase Storage when explicitly enabled. */
export async function uploadTripImage(file: File, folder: string): Promise<UploadTripImageResult> {
  if (useRemoteImageStorage) {
    try {
      const remote = await uploadToSupabase(file, folder)
      if (remote.url) return { ...remote, localFallback: false }
    } catch {
      /* fall through to local embed */
    }
  }

  try {
    const url = await fileToCompressedDataUrl(file)
    return { url, error: null, localFallback: true }
  } catch {
    return { url: null, error: new Error('UPLOAD_FAILED') }
  }
}

export function publicUrlFromPath(path: string): string {
  if (!isSupabaseConfigured) return path
  const { data } = supabase.storage.from(TRIP_IMAGES_BUCKET).getPublicUrl(path)
  return data.publicUrl
}
