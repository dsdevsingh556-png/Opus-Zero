import { PDFDocument } from 'pdf-lib'

/**
 * PDF path: load + save via pdf-lib (rewrite strips many metadata trails).
 * PDF stays PDF — no rasterize / no silent conversion (#5).
 */
export async function processPdf(
  file: File,
  ceilingBytes: number,
): Promise<{ blob: Blob; exifStripped: true; typePreserved: true }> {
  const bytes = new Uint8Array(await file.arrayBuffer())
  const doc = await PDFDocument.load(bytes, { ignoreEncryption: true, updateMetadata: false })
  doc.setTitle('')
  doc.setAuthor('')
  doc.setSubject('')
  doc.setKeywords([])
  doc.setProducer('SubmitReady')
  doc.setCreator('SubmitReady')
  const out = await doc.save({ useObjectStreams: true })
  const blob = new Blob([out], { type: 'application/pdf' })
  if (blob.size > ceilingBytes) {
    throw new Error(
      `PDF still ${blob.size} B after rewrite (ceiling ${ceilingBytes} B). Further PDF shrink lands in a later shot.`,
    )
  }
  return { blob, exifStripped: true, typePreserved: true }
}
