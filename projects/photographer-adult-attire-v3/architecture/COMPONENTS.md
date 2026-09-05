# COMPONENTS — photographer-adult-attire-v3
VERSION: 1.0.0
SHAPE: B

## C1 — Governing pack (source of truth for edit law)
Path: `source/PHOTOGRAPHER_ADULT_ATTIRE_V3/`
- `01_PROJECT_LAW.md` — photographer law / ceiling / forbidden
- `02_WORKFLOW_SEQUENCE.md` — GATE-00 → verify PASS/REVISE/BLOCK
- `05_SOURCE_MANIFEST.json` — hashed SOURCE-* bindings
- `SOURCE_FILES/` — repaired tools + forensic report + biometric prompts
- `references/`, `custom-instructions/`, `scripts/`
Authority: highest pack-internal authority under locked REQUIREMENTS.

## C2 — Skill surface
Path: `skills/SKILL.md` (+ pack twin under source)
Purpose: tell an operator agent how to run the pack workflow without weakening locks.
Boundary: documentation/skill only — not a running service.

## C3 — Requirements lock
Path: `requirements/REQUIREMENTS_LOCKED.md`
State flag: `requirement_lock=true`
Change control: unlock only via new exact CoS/human APPROVED.

## C4 — Forensic QA gate artifacts
Path: `qa/`
Proves ingest/pack structural honesty for Shape B. Does **not** unlock package claim.

## C5 — Project control state
Path: `state/PROJECT_STATE.json`
Holds phase, mode, lock, forensic/qa status, evidence tips (ingest/lock/forensic/architecture).

## C6 — Ops coordination (external)
Handoffs HO-* posted in OPUS ZERO Ops; GitHub commits are evidence.

## C7 — Editor (external, pack-specified)
**Grok Imagine only** — invoked by the human/operator per pack workflow; not hosted by this repo in Shape B.

## Explicitly absent components (Shape B)
- Web frontend / backend / auth / billing
- Automated image pipeline service
- Coda-required control rows (optional mirror)
