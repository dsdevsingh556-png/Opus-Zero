# Architecture — SubmitReady (client)
VERSION: 1.0.0
STATUS: **DOCUMENTED** (shot B · CoS APPROVED)
DOCUMENTED_AT: 2026-09-06T09:28:42Z
PROJECT_ID: submit-ready
HOST: GitHub Pages (static SPA assumption)
SHAPE: Browser-local web app · no server

## Purpose
Client-only portal submission packager: drop PDF/JPG/PNG → preset ceiling → local pipeline → ZIP + 7-point checklist. Files never leave the device.

## Top-level shape
```
Browser (GitHub Pages static host)
└── SPA (Vite + React|Svelte — choice at scaffold shot)
    ├── UI shell (drop zone · presets · checklist · credit · About)
    ├── Session store (in-memory / IndexedDB optional; no network sync)
    ├── Pipeline orchestrator (main thread)
    └── Web Workers (compress · PDF ops · ZIP) — no fetch to remote APIs
```

## Boundaries
| In | Out (v1) |
|---|---|
| PDF / JPG / PNG only | Word / Excel / HEIC |
| Client compress + normalize | Server convert / OCR / upload |
| Local ZIP download | Accounts / telemetry / analytics |
| GitHub Pages static assets | Backend API |

## Stack baseline (locked planning; implement in later shots)
- Bundler: Vite
- UI: React **or** Svelte (deferred to scaffold)
- PDF: pdfjs-dist (read/render) · pdf-lib (rewrite/strip/size)
- Images: Canvas and/or WASM JPEG (MozJPEG optional progressive)
- Pack: fflate or jszip
- Concurrency: Web Workers

## Hosting
Static SPA on **GitHub Pages**. Service worker optional later for true offline cache; v1 checklist #7 is session offline (no upload during use), not PWA requirement.

## Document map
- `COMPONENTS.md` — logical modules
- `DATA_AND_FLOW.md` — file lifecycle + checklist gates
- `SAFETY_LOCKS.md` — privacy / type-preserve / credit locks
- `LAYOUT.md` — UI regions (spec only; no UI build this shot)

## Non-goals this shot
No UI code · no pipeline implementation · no PAAv3 mix · no package claim
