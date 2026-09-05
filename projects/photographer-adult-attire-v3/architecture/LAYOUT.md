# Layout — photographer-adult-attire-v3
VERSION: 1.1.0
SHAPE: B (GitHub pack + skills only; no web app)

## Tree
```
projects/photographer-adult-attire-v3/
  README.md
  architecture/          # Shape B pack architecture (this shot)
  artifacts/             # inventories, digests
  events/                # EVT-* records
  handoffs/              # HO-* acceptance records
  qa/                    # forensic QA gate artifacts
  releases/              # future release notes (empty until package claim)
  requirements/          # REQUIREMENTS_LOCKED.md (LOCKED)
  research/              # ingest notes
  skills/SKILL.md        # skill surface from pack
  source/PHOTOGRAPHER_ADULT_ATTIRE_V3/   # governing pack (verbatim)
  state/PROJECT_STATE.json
```

## Pack sub-tree (source/)
- Law / workflow / start / README / SKILL.md
- `05_SOURCE_MANIFEST.json` — SOURCE-01/02/03/03-GROK + law/coverage hashes
- `SOURCE_FILES/` — repaired tools, forensic report, biometric prompts
- `references/` — v3 twins + supporting refs
- `custom-instructions/` — Grok custom instructions
- `scripts/` — helper scripts

## Non-goals this phase
- No web app / UI / API server
- No package-complete claim without separate APPROVED
