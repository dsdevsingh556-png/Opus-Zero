import { detectKind } from './detect'
import { processImage } from './imagePipeline'
import { processPdf } from './pdfPipeline'
import { safeRename } from './rename'
import type { FileJob } from './types'

export async function runPipelineOnFile(
  file: File,
  ceilingBytes: number,
  index: number,
): Promise<FileJob> {
  const id = `${file.name}-${file.size}-${file.lastModified}-${index}`
  const kind = detectKind(file)
  if (!kind) {
    return {
      id,
      sourceName: file.name,
      sourceBytes: file.size,
      kind: null,
      status: 'rejected',
      message: 'Only PDF / JPG / PNG accepted',
    }
  }

  try {
    const result =
      kind === 'pdf'
        ? await processPdf(file, ceilingBytes)
        : await processImage(file, kind, ceilingBytes)
    const outputName = safeRename(file.name, kind, index)
    return {
      id,
      sourceName: file.name,
      sourceBytes: file.size,
      kind,
      status: 'done',
      outputName,
      outputBytes: result.blob.size,
      outputBlob: result.blob,
      typePreserved: result.typePreserved,
      exifStripped: result.exifStripped,
      message: 'OK',
    }
  } catch (e) {
    return {
      id,
      sourceName: file.name,
      sourceBytes: file.size,
      kind,
      status: 'error',
      message: e instanceof Error ? e.message : String(e),
    }
  }
}
