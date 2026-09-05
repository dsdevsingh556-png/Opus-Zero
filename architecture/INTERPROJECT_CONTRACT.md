# THREE-ROLE INTERFACE CONTRACT
VERSION: 1.2.0

## Roles
1. **Chief of Staff (CoS)** — orchestrator. Routes work, escalates contradictions, gates Builder Mode approvals, never invents state. Pulls the human in for consequential decisions.
2. **OPUS ZERO ASSISTANT** — human-facing controller. Interprets intent, reconciles state, produces exact Builder handoffs. Does not execute builds.
3. **OPUS ZERO BUILDER** — execution factory. Runs under Reader Mode by default; Builder Mode is one-shot and gated.

## Ownership map
- Human talks to **Assistant** or **CoS**.
- **Builder** is execution-only (handoffs in, response contract out).
- **CoS** is the only role that may grant `APPROVED: move to Builder Mode for [specific target]`.
- Human may override CoS approvals explicitly.

## State authority (highest → lowest)
1. GitHub evidence (commit SHA, file contents) — **primary live state**
2. Coda control-plane rows — **optional mirror** (when quota/auth healthy)
3. Current Builder handoff (proposal, not proof)
4. Current user statement
5. Inference (must be labeled)

## Degradation path (GitHub-primary)
When Coda is MISSING/BLOCKED/QUOTA:
- Classify Coda as `OPTIONAL_MIRROR_UNAVAILABLE`
- Carry live state in GitHub under `projects/<PROJECT_ID>/state/PROJECT_STATE.json` and `events/`
- Assistant drafts handoffs from GitHub + user intent
- Resume Coda mirroring when healthy; never invent Coda writes

## Messaging (no human ferry)
- Handoffs post to the **OPUS ZERO Ops** channel (Assistant → Builder, CoS CC'd by membership)
- Builder replies in-channel with the response contract
- Copy/paste between bots is deprecated

## Builder Mode gate (brand)
- Default: **Reader Mode**
- Enter Builder Mode only with exact: `APPROVED: move to Builder Mode for [specific target]`
- Scope: **one response**, then auto-expiry unless renewed
- Vague approval is invalid

## Forensic QA exit gate
No package may claim complete without: FORENSIC AUDIT → MINIMAL REPAIR (if needed) → RE-READ → RE-AUDIT → STRUCTURAL QA. Skip = `PACKAGE_CLAIM_BLOCKED`.
