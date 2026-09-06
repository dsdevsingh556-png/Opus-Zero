import type { AllowedKind } from './types'

export function detectKind(file: File): AllowedKind | null {
  const name = file.name.toLowerCase()
  const t = (file.type || '').toLowerCase()
  if (t === 'application/pdf' || name.endsWith('.pdf')) return 'pdf'
  if (t === 'image/jpeg' || t === 'image/jpg' || name.endsWith('.jpg') || name.endsWith('.jpeg')) return 'jpeg'
  if (t === 'image/png' || name.endsWith('.png')) return 'png'
  return null
}
