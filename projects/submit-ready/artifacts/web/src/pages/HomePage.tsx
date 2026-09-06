import { useCallback, useState } from 'react'
import { PRESETS, formatBytes, type PresetId } from '../pipeline/presets'
import { runPipelineOnFile } from '../pipeline/runPipeline'
import type { FileJob } from '../pipeline/types'

/** Shot D: pipeline MVP — presets + process. No ZIP / checklist yet. */
export function HomePage() {
  const [presetId, setPresetId] = useState<PresetId>('job')
  const [customMb, setCustomMb] = useState(2)
  const [jobs, setJobs] = useState<FileJob[]>([])
  const [busy, setBusy] = useState(false)

  const ceiling =
    presetId === 'custom'
      ? Math.max(0.1, customMb) * 1024 * 1024
      : PRESETS.find((p) => p.id === presetId)!.ceilingBytes

  const onFiles = useCallback(
    async (list: FileList | null) => {
      if (!list?.length) return
      setBusy(true)
      const files = Array.from(list)
      const placeholders: FileJob[] = files.map((f, i) => ({
        id: `p-${i}-${f.name}`,
        sourceName: f.name,
        sourceBytes: f.size,
        kind: null,
        status: 'processing',
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
    [ceiling],
  )

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
            onChange={(e) => setPresetId(e.target.value as PresetId)}
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
              onChange={(e) => setCustomMb(Number(e.target.value))}
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
            {j.status === 'done' && j.outputBlob && j.outputName ? (
              <>
                {' '}
                <a href={URL.createObjectURL(j.outputBlob)} download={j.outputName}>
                  Download
                </a>
              </>
            ) : null}
          </li>
        ))}
      </ul>

      <p className="muted">
        Shot D pipeline MVP — ZIP pack and 7-point checklist land in shot E.
      </p>
    </section>
  )
}
