import type { AllowedKind } from './types'

const EXT: Record<AllowedKind, string> = { pdf: 'pdf', jpeg: 'jpg', png: 'png' }

/** Safe ASCII slug + original-type extension. */
export function safeRename(originalName: string, kind: AllowedKind, index: number): string {
  const base = originalName.replace(/\.[^.]+$/, '')
  const slug = base
    .normalize('NFKD')
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-')
    .toLowerCase()
    .slice(0, 48) || `file-${index + 1}`
  return `${slug}.${EXT[kind]}`
}
