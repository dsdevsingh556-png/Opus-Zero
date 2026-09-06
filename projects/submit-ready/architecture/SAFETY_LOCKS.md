# Safety locks — SubmitReady

## Privacy (hard)
- No upload of user files
- No account / login
- No telemetry / analytics beacons in v1
- Checklist #7 must reflect offline-only session behavior

## Type preserve (hard — req #5)
- PDF stays PDF
- Images stay JPEG or PNG under ceiling
- No silent PDF conversion unless Custom explicitly asks

## Credit (hard — package claim invalid without)
1. Checklist seal string (non-removable UI)
2. ZIP sidecar `SUBMITREADY.txt` first in every pack
3. Quiet footer colophon + About expand  
See `../CREDIT.md`. Loud splash / hide-credit toggle = killed.

## Scope fences
- Inputs: PDF + JPG + PNG only
- No PAAv3 / other PROJECT_ID mixing
- No server-side processing path in architecture

## Host
Static GitHub Pages — architecture must not introduce a required backend.
