# CONTROL PLANE
VERSION: 1.2.0

## Primary: GitHub
Repo: technical vault + **live operational state**.
- System docs: `architecture/`, `assistant/`, `builder/`, `schemas/`, `contract-kit/`
- Per project: `projects/<PROJECT_ID>/` including `state/PROJECT_STATE.json`, `events/`, `handoffs/`

## Optional mirror: Coda
Operational UI / human-friendly tables when healthy.
When blocked: set `persistence_status.coda = OPTIONAL_MIRROR_UNAVAILABLE` and continue on GitHub. Do not block Builder handoffs solely on Coda.

## Event ledger (GitHub files)
`projects/<PROJECT_ID>/events/YYYYMMDDTHHMMSSZ_<EVENT_ID>.json` plus optional `events/INDEX.md`.
