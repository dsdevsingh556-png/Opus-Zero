# Components — SubmitReady (logical)

## Shell
- **DropZone** — accept FileList; reject non PDF/JPG/PNG with clear error
- **PresetPicker** — Job 2MB / Visa 5MB / Email 10MB / Custom (ceiling bytes)
- **FileList** — per-file status: type · size vs ceiling · EXIF · rename · type-preserve
- **ChecklistPanel** — 7 named gates; ZIP enable only when all green + seal visible
- **CreditSeal** — locked string under checklist (CREDIT.md #1)
- **FooterColophon** — locked footer + About expand (CREDIT.md #3)
- **DownloadZIP** — builds pack with `SUBMITREADY.txt` first (CREDIT.md #2)

## Pipeline (workers; implement later)
- **TypeGate** — MIME/extension allowlist
- **ImagePipeline** — decode → strip EXIF/APP1 → re-encode JPEG/PNG under ceiling; keep PNG vs JPEG as source type
- **PdfPipeline** — pdf-lib rewrite toward size; **PDF stays PDF** (no silent raster→PDF or PDF→image unless Custom asks)
- **Rename** — safe ASCII slug + original extension
- **ZipBuilder** — fflate/jszip; overhead counted toward pack ceiling
- **OfflineGuard** — assert no outbound upload APIs in session path

## State
- **SessionStore** — files as ArrayBuffer/Blob handles; ephemeral; cleared on refresh OK for v1
- **ChecklistStore** — boolean map for gates 1–7

## Explicit non-components (v1)
Auth · cloud sync · server convert · telemetry SDK · optional credit toggle
