import { zipSync, strToU8 } from 'fflate'
import { SUBMITREADY_TXT, SUBMITREADY_TXT_NAME } from './credit'
import type { FileJob } from './types'

/** Build ZIP with SUBMITREADY.txt as the first entry. */
export async function buildPackZip(jobs: FileJob[]): Promise<{
  blob: Blob
  bytes: number
  hasSidecar: true
  entryNames: string[]
}> {
  const done = jobs.filter((j) => j.status === 'done' && j.outputBlob && j.outputName)
  if (!done.length) throw new Error('No processed files to pack')

  const entries: Record<string, Uint8Array> = {}
  entries[SUBMITREADY_TXT_NAME] = strToU8(SUBMITREADY_TXT)

  for (const j of done) {
    const buf = new Uint8Array(await j.outputBlob!.arrayBuffer())
    entries[j.outputName!] = buf
  }

  const zipped = zipSync(entries, { level: 6 })
  const blob = new Blob([zipped], { type: 'application/zip' })
  return {
    blob,
    bytes: blob.size,
    hasSidecar: true,
    entryNames: Object.keys(entries),
  }
}
