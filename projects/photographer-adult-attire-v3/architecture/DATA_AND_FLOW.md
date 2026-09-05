# DATA AND FLOW — photographer-adult-attire-v3
VERSION: 1.0.0
SHAPE: B

## Operator runtime flow (pack)
```
Source photo + attire request
        |
        v
GATE-00A adult visual check + coverage-lock check --BLOCK--> stop
        | PASS
        v
Consume SOURCE-01 / SOURCE-02 / SOURCE-03 / SOURCE-03-GROK
+ photographer law + adult-fashion translation
        |
        v
Forensic source-lock report (from actual image)
        |
        v
Register verbatim request · classify A0–A4 · translate crude wording
        |
        v
Source-locked target reconstruction (attire = authorized change)
        |
        v
Editor payload → Grok Imagine
        |
        v
Verify identity / pose / attire / coverage → PASS | REVISE | BLOCK
```

## Opus-Zero control flow (this PROJECT_ID)
```
Devendra intent → Assistant handoff (Ops)
        |
        v
CoS exact APPROVED (Builder Mode one-shot)
        |
        v
Builder persists under projects/photographer-adult-attire-v3/
        |
        v
Assistant re-checksum + cited_evidence
```

## Data artifacts
| Artifact | Kind | Notes |
|---|---|---|
| Source photo | Operator input | Not stored in repo by default |
| Forensic source-lock report | Operator output | Per-image; not the pack's SOURCE_FILES forensic history doc |
| Editor payload | Operator output | Ephemeral |
| PROJECT_STATE.json | System state | GitHub-primary |
| REQUIREMENTS_LOCKED.md | Locked law summary | Must match pack law mandatories |
| qa/* | Gate evidence | PACKAGE_CLAIM_BLOCKED until separate approval |

## State machine (project phases observed)
INGEST → REQUIREMENT_LOCK → FORENSIC_QA → ARCHITECTURE (this shot) → (future: package-claim or stop)
