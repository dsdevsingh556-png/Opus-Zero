# Data and flow — SubmitReady

## Happy path
1. User drops files → TypeGate (checklist #1)
2. User picks preset ceiling (or Custom)
3. Per file:
   - Branch by type (PDF vs image)
   - Compress / rewrite toward ceiling (checklist #2)
   - Strip EXIF/APP1 or re-encode path (checklist #3)
   - Safe rename; keep extension (checklist #4)
   - Assert type preserved: PDF→PDF; JPEG→JPEG; PNG→PNG (checklist #5) — **no silent PDF conversion** unless Custom explicitly asks
4. Aggregate → ZipBuilder with `SUBMITREADY.txt` as **first** entry
5. Pack size ≤ ceiling including ZIP overhead (checklist #6)
6. OfflineGuard confirms session had no upload (checklist #7)
7. Checklist seal visible → enable DownloadZIP

## Format normalize (#5) decision table
| Source | Default output | Forbidden unless Custom asks |
|---|---|---|
| PDF | PDF | Rasterize to JPEG/PNG; wrap images into PDF silently |
| JPEG | JPEG under ceiling | Convert to PDF |
| PNG | PNG under ceiling | Convert to PDF / force JPEG without Custom |

## Data residency
All bytes stay in browser memory / local download. No `fetch` of user file contents to third parties.

## Failure modes
- Unsupported type → reject, list stays clean
- Cannot meet ceiling → mark file red; ZIP blocked until resolved or removed
- Missing `SUBMITREADY.txt` in pack → checklist pack-complete **fails**
