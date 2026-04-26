import { isSupabaseConfigured, supabase } from './supabase'

export const TRIP_IMAGES_BUCKET = 'trip-images'

export async function uploadTripImage(file: File, folder: string): Promise<{ url: string | null; error: Error | null }> {
  if (!isSupabaseConfigured) {
    return { url: null, error: new Error('Supabase is not configured') }
  }

  const ext = file.name.split('.').pop() || 'jpg'
  const path = `${folder}/${crypto.randomUUID()}.${ext}`

  const { error } = await supabase.storage.from(TRIP_IMAGES_BUCKET).upload(path, file, {
    cacheControl: '3600',
    upsert: false,
  })

  if (error) return { url: null, error: new Error(error.message) }

  const { data } = supabase.storage.from(TRIP_IMAGES_BUCKET).getPublicUrl(path)
  return { url: data.publicUrl, error: null }
}

export function publicUrlFromPath(path: string): string {
  if (!isSupabaseConfigured) return path
  const { data } = supabase.storage.from(TRIP_IMAGES_BUCKET).getPublicUrl(path)
  return data.publicUrl
}
