# ARCHITECTURE — photographer-adult-attire-v3
VERSION: 1.0.0
STATUS: DOCUMENTED (Shape B)
WRITTEN_AT: 2026-09-05T18:30:24Z
WRITTEN_BY: BUILDER
HANDOFF: HO-20260905-PAAv3-004
BASELINE_TIP: 98b6edb634f8c5f2d48454ac055386ea6ffe6e6f
SHAPE: B — GitHub pack + skills only (**no web app**)

## 1. Objective
Provide a source-locked **adult attire edit** operating pack for a photographer editing their own consenting adult-model photos, enforced through Opus-Zero GitHub-primary project state and a skill surface — not a product web app.

## 2. System context (Opus-Zero)
| Layer | Role for this PROJECT_ID |
|---|---|
| CoS | Routes / issues exact Builder Mode approvals |
| Assistant | Handoffs + evidence checksums in Ops |
| Builder | Executes approved one-shots; persists under `projects/photographer-adult-attire-v3/` |
| GitHub | Primary live state + artifact vault |
| Coda | Optional mirror (`OPTIONAL_MIRROR_UNAVAILABLE` when blocked) |

## 3. Shape B product boundary
**In:** governing pack under `source/`, skill surface, requirements lock, forensic QA artifacts, architecture docs, state machine.
**Out (this phase):** web UI, mobile app, hosted API, Grok Imagine automation runtime, package-complete claim.

## 4. Component map
See `COMPONENTS.md`.

## 5. Data & control flow
See `DATA_AND_FLOW.md`.

## 6. Safety locks
See `SAFETY_LOCKS.md` (adults-only, A0–A4, coverage lock, Grok Imagine-only editor).

## 7. Skills boundary
- `skills/SKILL.md` is the **operator skill surface** (how an agent consumes the pack).
- Pack `source/.../SKILL.md` is the **canonical** skill text ingested from the vision pack.
- Skills must not invent anatomy, unlock coverage, or bypass GATE-00 adult check.
- Skills do not claim runtime Grok Imagine enforcement — editor compliance is UNPROVEN at pack level.

## 8. Persistence
- Live: `state/PROJECT_STATE.json` (schema 1.2.0)
- Requirements: `requirements/REQUIREMENTS_LOCKED.md` (`requirement_lock=true`)
- Forensic: `qa/` with `PACKAGE_CLAIM_BLOCKED` until separate approval
- Architecture: this directory

## 9. Architecture state
Advanced from `LAYOUT_SEEDED` → **`SHAPE_B_DOCUMENTED`**.

## 10. Explicit non-claims
- No web app architecture is specified or implied.
- No package-complete claim.
- No live model/runtime proof beyond pack structural forensic PASS.
