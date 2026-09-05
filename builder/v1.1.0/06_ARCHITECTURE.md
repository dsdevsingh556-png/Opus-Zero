# PROJECT ARCHITECTURE PROTOCOL
VERSION: 1.1.0

## Two-Project architecture
1. OPUS ZERO ASSISTANT — human-facing control/navigation layer. Reads external state, interprets human intent, identifies next permitted Builder action and generates exact Builder handoff.
2. OPUS ZERO BUILDER — execution layer. Performs requirements engineering, research, architecture, build, forensic audit, QA, packaging and persistence.
3. Coda — shared structured control plane.
4. GitHub — shared technical artifact/version vault.

Conversation continuity is local to each Project. Shared state is externalized and reconciled.

Layer order: Objective → Authority → Requirements → Knowledge/Source → Tools → State → Execution → Validation → Persistence → Packaging → Handoff → Maintenance.