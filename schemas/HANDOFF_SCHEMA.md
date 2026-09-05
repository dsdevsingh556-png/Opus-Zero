# HANDOFF SCHEMA
VERSION: 1.2.0

Required fields:

| Field | Notes |
|---|---|
| handoff_id | Stable id |
| schema_version | `1.2.0` |
| project_id | |
| from | ASSISTANT \| COS \| HUMAN |
| to | BUILDER \| ASSISTANT \| COS |
| current_verified_state | Summary + pointers only |
| user_intent | |
| authoritative_constraints | |
| known_answers | |
| open_questions | |
| required_action | |
| expected_output | |
| stop_conditions | |
| persistence_requirement | |
| status | DRAFT \| SENT \| ACKED \| BLOCKED |
| evidence_checksum | See below |
| cited_evidence | commit_sha, paths[], coda_row_ids[] |

## evidence_checksum
`sha256` over a canonical JSON of `cited_evidence` (sorted keys). “Verified” requires a matching checksum against re-fetched evidence. Mismatch → treat as unverified and expose.
