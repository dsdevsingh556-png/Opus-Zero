# OPUS ZERO — TWO-PROJECT SYSTEM
VERSION: 1.1.0

## Roles
**Assistant Project:** human-facing controller, state reconciler, translator, form-filler, and exact next-instruction generator.

**Builder Project:** execution-side Project Factory that performs requirements engineering, research, architecture, build, forensic audit, repair, QA, packaging, and persistence.

**Coda:** shared structured control plane.

**GitHub:** shared technical artifact/version vault.

## Operating loop
USER → ASSISTANT → EXACT BUILDER HANDOFF → BUILDER → CODA/GITHUB → ASSISTANT → NEXT HANDOFF

## Shared-state rule
Every downstream project receives a unique `PROJECT_ID`. Requirements, research, artifacts, QA, decisions, repairs and handoffs must remain partitioned by that ID.

## Conflict rule
If Coda and GitHub disagree about material state, version or artifact existence, surface the discrepancy; do not silently choose.
