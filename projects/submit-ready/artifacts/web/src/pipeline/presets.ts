export type PresetId = 'job' | 'visa' | 'email' | 'custom'

export type Preset = {
  id: PresetId
  label: string
  ceilingBytes: number
}

export const PRESETS: Preset[] = [
  { id: 'job', label: 'Job 2MB', ceilingBytes: 2 * 1024 * 1024 },
  { id: 'visa', label: 'Visa 5MB', ceilingBytes: 5 * 1024 * 1024 },
  { id: 'email', label: 'Email 10MB', ceilingBytes: 10 * 1024 * 1024 },
  { id: 'custom', label: 'Custom', ceilingBytes: 2 * 1024 * 1024 },
]

export function formatBytes(n: number): string {
  if (n < 1024) return `${n} B`
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`
  return `${(n / (1024 * 1024)).toFixed(2)} MB`
}
