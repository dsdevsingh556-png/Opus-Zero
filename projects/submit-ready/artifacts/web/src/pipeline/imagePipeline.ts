/**
 * Image path: decode via createImageBitmap → canvas draw → re-encode.
 * Re-encode strips EXIF/APP1. Keeps JPEG→JPEG or PNG→PNG (type preserve #5).
 */
export async function processImage(
  file: File,
  kind: 'jpeg' | 'png',
  ceilingBytes: number,
): Promise<{ blob: Blob; exifStripped: true; typePreserved: true }> {
  const bitmap = await createImageBitmap(file)
  try {
    let width = bitmap.width
    let height = bitmap.height
    let quality = kind === 'jpeg' ? 0.92 : undefined
    let blob = await encode(bitmap, width, height, kind, quality)

    let guard = 0
    while (blob.size > ceilingBytes && guard < 12) {
      guard += 1
      if (kind === 'jpeg' && quality !== undefined && quality > 0.45) {
        quality = Math.max(0.45, quality - 0.08)
      } else {
        width = Math.max(64, Math.floor(width * 0.85))
        height = Math.max(64, Math.floor(height * 0.85))
      }
      blob = await encode(bitmap, width, height, kind, quality)
    }

    if (blob.size > ceilingBytes) {
      throw new Error(`Could not fit under ceiling (${blob.size} B > ${ceilingBytes} B)`)
    }
    return { blob, exifStripped: true, typePreserved: true }
  } finally {
    bitmap.close()
  }
}

async function encode(
  bitmap: ImageBitmap,
  width: number,
  height: number,
  kind: 'jpeg' | 'png',
  quality?: number,
): Promise<Blob> {
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')
  if (!ctx) throw new Error('Canvas unavailable')
  ctx.drawImage(bitmap, 0, 0, width, height)
  const mime = kind === 'jpeg' ? 'image/jpeg' : 'image/png'
  const blob = await new Promise<Blob | null>((resolve) =>
    canvas.toBlob((b) => resolve(b), mime, quality),
  )
  if (!blob) throw new Error('Encode failed')
  return blob
}
