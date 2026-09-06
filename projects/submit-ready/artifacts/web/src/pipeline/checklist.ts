import type { FileJob } from './types'
import { SUBMITREADY_TXT_NAME } from './credit'

export type ChecklistId = 1 | 2 | 3 | 4 | 5 | 6 | 7

export type ChecklistItem = {
  id: ChecklistId
  label: string
  ok: boolean
}

export function evaluateChecklist(args: {
  jobs: FileJob[]
  ceilingBytes: number
  zipBytes: number | null
  zipHasSidecar: boolean
  offlineSession: boolean
}): ChecklistItem[] {
  const done = args.jobs.filter((j) => j.status === 'done')
  const any = args.jobs.length > 0
  const allDoneOk = any && args.jobs.every((j) => j.status === 'done')
  const typesOk =
    allDoneOk &&
    done.every((j) => j.kind === 'pdf' || j.kind === 'jpeg' || j.kind === 'png')
  const sizeOk =
    allDoneOk && done.every((j) => (j.outputBytes ?? Infinity) <= args.ceilingBytes)
  const exifOk = allDoneOk && done.every((j) => j.exifStripped === true)
  const renameOk = allDoneOk && done.every((j) => !!j.outputName)
  const typePreserveOk = allDoneOk && done.every((j) => j.typePreserved === true)
  const zipOk =
    args.zipBytes != null &&
    args.zipBytes <= args.ceilingBytes &&
    args.zipHasSidecar
  void SUBMITREADY_TXT_NAME

  return [
    { id: 1, label: 'Files are PDF/JPG/PNG only', ok: typesOk },
    { id: 2, label: 'Each file ≤ preset ceiling', ok: sizeOk },
    { id: 3, label: 'EXIF/APP1 stripped (or re-encode path)', ok: exifOk },
    { id: 4, label: 'Safe rename applied', ok: renameOk },
    { id: 5, label: 'Type preserved (#5)', ok: typePreserveOk },
    { id: 6, label: 'ZIP pack size ≤ ceiling (overhead counted)', ok: zipOk },
    { id: 7, label: 'Offline-only this session', ok: args.offlineSession },
  ]
}

export function allChecklistGreen(items: ChecklistItem[]): boolean {
  return items.length === 7 && items.every((i) => i.ok)
}
