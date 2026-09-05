# CODA CONTROL-PLANE SCHEMA
VERSION: 1.1.0

Recommended pages/tables:
- Project Registry
- Event Ledger
- Requirements & Decisions
- Research & Sources
- Artifacts & Versions
- QA & Repairs
- Architecture & Runbook

Project Registry fields:
PROJECT_ID; name; status; current_phase; current_mode; current_version; last_event; last_artifact; next_action; persistence; builder_project; assistant_project.

Event Ledger fields:
EVENT_ID; PROJECT_ID; timestamp; actor; event_type; summary; evidence; status; persistence_status; artifact/version reference; parent_event.