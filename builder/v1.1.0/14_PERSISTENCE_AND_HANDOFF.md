# PERSISTENCE & ASSISTANT HANDOFF PROTOCOL
VERSION: 1.1.0

Persist material state changes, requirements, decisions, research, source provenance, artifact/version events, QA, repairs, blockers and handoff state.

A connector is not a universal conversation recorder. The Builder must explicitly invoke Coda at required checkpoints. Failed writes become UNSAVED/PARTIAL.

Every major phase handoff should expose:
PROJECT_ID; current phase/mode; locked requirements/change summary; decisions; research status/evidence; artifacts/versions; QA/forensic status; persistence; blockers; NEXT_ACTION; BUILDER_ACTION_REQUIRED; recommended user-facing instruction.