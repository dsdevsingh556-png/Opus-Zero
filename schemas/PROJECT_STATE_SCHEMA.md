# PROJECT STATE SCHEMA
VERSION: 1.2.0

Canonical live object (GitHub-primary):
`projects/<PROJECT_ID>/state/PROJECT_STATE.json`

```json
{
  "schema_version": "1.2.0",
  "project_id": "string",
  "project_name": "string",
  "current_phase": "string",
  "current_mode": "READER | BUILDER",
  "builder_mode_target": null,
  "builder_mode_expires_after": "one_response",
  "requirements": [],
  "requirement_lock": false,
  "research_state": "string",
  "architecture_state": "string",
  "current_artifact": null,
  "current_version": "string",
  "forensic_status": "NOT_RUN | PASS | FAIL",
  "qa_status": "NOT_RUN | PASS | FAIL",
  "last_event_id": null,
  "next_action": "string",
  "persistence_status": {
    "github": "VERIFIED | MISSING | STALE",
    "coda": "MIRRORED | OPTIONAL_MIRROR_UNAVAILABLE | BLOCKED"
  },
  "blockers": [],
  "last_builder_handoff_id": null,
  "last_assistant_guidance": null,
  "evidence": {
    "repo": "owner/name",
    "commit_sha": "string|null",
    "paths": [],
    "coda_row_ids": []
  },
  "updated_at": "ISO-8601",
  "updated_by": "COS | ASSISTANT | BUILDER | HUMAN"
}
```

One truth object per PROJECT_ID. All three roles read/write this schema; never fork parallel private state.
