# PROJECT STATE SCHEMA
VERSION: 1.2.0

Canonical live object (GitHub-primary):
`projects/<PROJECT_ID>/state/PROJECT_STATE.json`

One truth object per PROJECT_ID. Fields include schema_version, project_id, current_phase, current_mode (READER|BUILDER), requirements, requirement_lock, forensic_status, qa_status, persistence_status.github/coda, evidence{repo,commit_sha,paths,coda_row_ids}, updated_at, updated_by.
