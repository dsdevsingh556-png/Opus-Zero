export type AllowedKind = 'pdf' | 'jpeg' | 'png'

export type FileJobStatus = 'queued' | 'processing' | 'done' | 'error' | 'rejected'

export type FileJob = {
  id: string
  sourceName: string
  sourceBytes: number
  kind: AllowedKind | null
  status: FileJobStatus
  message?: string
  outputName?: string
  outputBytes?: number
  outputBlob?: Blob
  typePreserved?: boolean
  exifStripped?: boolean
}
