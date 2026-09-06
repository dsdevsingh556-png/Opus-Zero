# Requirements — submit-ready
VERSION: 1.0.0
STATUS: **LOCKED**
LOCKED_AT: 2026-09-06T09:22:38Z
LOCKED_BY: BUILDER (HO-20260906-SR-001 · CoS shot A)
HOST_ASSUMPTION: GitHub Pages (override welcome)
SHAPE: Web app · Operator mode
PAAv3: untouched · no PROJECT_ID mix

## Mandatory (locked)

### Product
1. Browser-local portal submission packager only.
2. v1 inputs: **PDF + JPG + PNG** only (reject others with clear UX).
3. Presets: Job **2MB** / Visa **5MB** / Email **10MB** / Custom.
4. Pipeline: compress toward ceiling · format normalize · EXIF strip · safe rename · ZIP · 7-point checklist.
5. Privacy: **no upload · no account · no telemetry** in v1.
6. Host target assumption: **GitHub Pages** (static SPA).

### Format normalize (#5)
Keep original type: PDF stays PDF; images stay JPEG/PNG under ceiling. **No silent PDF conversion** unless Custom explicitly asks.

### Success (v1 done when)
Each file ≤ preset ceiling · EXIF gone · safe names · ZIP downloads · offline-only session · **all 7 checklist items green**.

### 7-point checklist (named)
1. Files are PDF/JPG/PNG only  
2. Each file ≤ preset ceiling (Job 2MB / Visa 5MB / Email 10MB / Custom)  
3. EXIF/APP1 stripped (or re-encode path)  
4. Safe rename applied  
5. Type preserved as Format normalize (#5)  
6. ZIP pack size ≤ ceiling (ZIP overhead counted)  
7. Offline-only this session  

### Credit / Colophon (REQUIRED — non-removable)
Package claim **invalid** without all three:

1. **Checklist seal** (under 7-point panel, before ZIP enables):  
   `Prepared offline · SubmitReady · by Devendra Singh with Opus`
2. **ZIP sidecar** `SUBMITREADY.txt` as first entry in every pack (checklist “pack complete” fails without it). Content must include offline/no-upload line. See `CREDIT.md`.
3. **Quiet colophon**: footer `SubmitReady · a Devendra Singh work · Opus Zero` + About expand (secondary but required link). Loud splash / optional toggle = **killed**.

Repo: `projects/submit-ready/CREDIT.md` must exist and match.

### Stack (planning baseline — not UI this shot)
Vite + React or Svelte · pdfjs-dist · pdf-lib · Canvas/WASM JPEG · fflate or jszip · Web Workers.

### Out of scope (v1)
- Word/Excel/HEIC
- Server convert / OCR / cloud upload
- “Beat Ghostscript” claims
- PAAv3 / other PROJECT_ID mixing
- App UI implementation in shot A

## Preferences (not locked as mandatory)
- React vs Svelte choice at scaffold shot
- MozJPEG WASM progressive enhancement over Canvas JPEG

## Change control
Unlock only via CoS/human exact approval to re-open requirements.
