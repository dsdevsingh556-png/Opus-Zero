/** Routing stub + layout placeholders. Pipeline / drop zone / checklist: later shots. */
export function HomePage() {
  return (
    <section>
      <h1>SubmitReady</h1>
      <p>Portal submission pack — files never leave your device.</p>
      <div className="stub-grid" aria-label="UI stubs">
        <div className="stub">Drop zone (stub)</div>
        <div className="stub">Presets Job 2MB / Visa 5MB / Email 10MB / Custom (stub)</div>
        <div className="stub">File list (stub)</div>
        <div className="stub">7-point checklist (stub)</div>
        <div className="stub">ZIP download (stub — blocked until checklist green)</div>
      </div>
      <p className="muted">Shot C scaffold only — no PDF/image processing yet.</p>
    </section>
  )
}
