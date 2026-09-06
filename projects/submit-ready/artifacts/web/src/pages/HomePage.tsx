import { useCallback, useMemo, useState } from 'react'
import { CHECKLIST_SEAL } from '../pipeline/credit'
import { allChecklistGreen, evaluateChecklist } from '../pipeline/checklist'
import { PRESETS, formatBytes, type PresetId } from '../pipeline/presets'
import { runPipelineOnFile } from '../pipeline/runPipeline'
import type { FileJob } from '../pipeline/types'
import { buildPackZip } from '../pipeline/zipPack'

/** Shot E: checklist + ZIP + credit seal. Pipeline from shot D. */
export function HomePage() {
  const [presetId, setPresetId] = useState<PresetId>('job')
  const [customMb, setCustomMb] = useState(2)
  const [jobs, setJobs] = useState<FileJob[]>([])
  const [busy, setBusy] = useState(false)
  const [zipBytes, setZipBytes] = useState<number | null>(null)
  const [zipHasSidecar, setZipHasSidecar] = useState(false)
  const [zipUrl, setZipUrl] = useState<string | null>(null)
  const [zipError, setZipError] = useState<string | null>(null)
  const [offlineSession] = useState(true)

  const ceiling =
    presetId === 'custom'
      ? Math.max(0.1, customMb) * 1024 * 1024
      : PRESETS.find((p) => p.id === presetId)!.ceilingBytes

  const checklist = useMemo(
    () =>
      evaluateChecklist({
        jobs,
        ceilingBytes: ceiling,
        zipBytes,
        zipHasSidecar,
        offlineSession,
      }),
    [jobs, ceiling, zipBytes, zipHasSidecar, offlineSession],
  )

  const preZipGreen = checklist.filter((c) => c.id !== 6).every((c) => c.ok)
  const zipEnabled = allChecklistGreen(checklist)

  const clearZip = () => {
    if (zipUrl) URL.revokeObjectURL(zipUrl)
    setZipUrl(null)
    setZipBytes(null)
    setZipHasSidecar(false)
    setZipError(null)
  }

  const onFiles = useCallback(
    async (list: FileList | null) => {
      if (!list?.length) return
      if (zipUrl) URL.revokeObjectURL(zipUrl)
      setZipUrl(null)
      setZipBytes(null)
      setZipHasSidecar(false)
      setZipError(null)
      setBusy(true)
      const files = Array.from(list)
      const placeholders: FileJob[] = files.map((f, i) => ({
        id: `p-${i}-${f.name}`,
        sourceName: f.name,
        sourceBytes: f.size,
        kind: null,
        status: 'processing' as const,
      }))
      setJobs(placeholders)
      const out: FileJob[] = []
      for (let i = 0; i < files.length; i++) {
        out.push(await runPipelineOnFile(files[i], ceiling, i))
        setJobs([...out, ...placeholders.slice(out.length)])
      }
      setJobs(out)
      setBusy(false)
    },
    [ceiling, zipUrl],
  )

  const onBuildZip = async () => {
    setZipError(null)
    try {
      const pack = await buildPackZip(jobs)
      if (zipUrl) URL.revokeObjectURL(zipUrl)
      setZipBytes(pack.bytes)
      setZipHasSidecar(pack.hasSidecar)
      setZipUrl(URL.createObjectURL(pack.blob))
      if (pack.bytes > ceiling) {
        setZipError(`ZIP ${formatBytes(pack.bytes)} exceeds ceiling ${formatBytes(ceiling)}`)
      }
    } catch (e) {
      setZipError(e instanceof Error ? e.message : String(e))
      setZipBytes(null)
      setZipHasSidecar(false)
    }
  }

  return (
    <section>
      <h1>SubmitReady</h1>
      <p>Portal submission pack — files never leave your device.</p>

      <div className="controls">
        <label>
          Preset{' '}
          <select
            value={presetId}
            disabled={busy}
            onChange={(e) => {
              clearZip()
              setPresetId(e.target.value as PresetId)
            }}
          >
            {PRESETS.map((p) => (
              <option key={p.id} value={p.id}>
                {p.label}
              </option>
            ))}
          </select>
        </label>
        {presetId === 'custom' ? (
          <label>
            Custom MB{' '}
            <input
              type="number"
              min={0.1}
              step={0.1}
              value={customMb}
              disabled={busy}
              onChange={(e) => {
                clearZip()
                setCustomMb(Number(e.target.value))
              }}
            />
          </label>
        ) : null}
        <span className="muted">Ceiling: {formatBytes(ceiling)}</span>
      </div>

      <label className="drop">
        <input
          type="file"
          multiple
          accept=".pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png"
          disabled={busy}
          onChange={(e) => onFiles(e.target.files)}
        />
        <span>{busy ? 'Processing…' : 'Drop or choose PDF / JPG / PNG'}</span>
      </label>

      <ul className="job-list" aria-label="Pipeline results">
        {jobs.map((j) => (
          <li key={j.id} className={`job job-${j.status}`}>
            <strong>{j.sourceName}</strong> → {j.outputName ?? '—'}
            <br />
            <span className="muted">
              {formatBytes(j.sourceBytes)}
              {j.outputBytes != null ? ` → ${formatBytes(j.outputBytes)}` : ''}
              {j.kind ? ` · ${j.kind}` : ''}
              {j.typePreserved ? ' · type preserved' : ''}
              {j.exifStripped ? ' · EXIF stripped' : ''}
              {j.message ? ` · ${j.message}` : ''}
            </span>
          </li>
        ))}
      </ul>

      <div className="checklist-panel" aria-label="7-point checklist">
        <h2>7-point checklist</h2>
        <ol>
          {checklist.map((c) => (
            <li key={c.id} className={c.ok ? 'check-ok' : 'check-no'}>
              {c.ok ? '✓' : '○'} {c.label}
            </li>
          ))}
        </ol>
        <p className="credit-seal" data-credit="checklist-seal">
          {CHECKLIST_SEAL}
        </p>
        <div className="zip-actions">
          <button type="button" disabled={busy || !preZipGreen} onClick={onBuildZip}>
            Build ZIP (SUBMITREADY.txt first)
          </button>
          {zipEnabled && zipUrl ? (
            <a className="zip-download" href={zipUrl} download="submitready-pack.zip">
              Download ZIP
            </a>
          ) : (
            <span className="muted">Download enables when all 7 are green</span>
          )}
        </div>
        {zipBytes != null ? (
          <p className="muted">
            ZIP {formatBytes(zipBytes)}
            {zipHasSidecar ? ' · sidecar present' : ' · sidecar MISSING'}
          </p>
        ) : null}
        {zipError ? <p className="zip-error">{zipError}</p> : null}
      </div>
    </section>
  )
}
