# CODA CONTROL-PLANE SCHEMA
VERSION: 1.1.0

Recommended tables/pages:
- Project Registry
- Event Ledger
- Requirements & Decisions
- Research & Sources
- Artifacts & Versions
- QA & Repairs
- Architecture & Runbook

Core Project Registry fields:
PROJECT_ID; name; status; current_phase; current_mode; active_requirements; current_version; last_event; last_artifact; next_action; persistence; builder_project; assistant_project.

Core Event Ledger fields:
EVENT_ID; PROJECT_ID; timestamp; actor; event_type; turn/reference; summary; evidence; status; persistence_status; artifact/version references; parent_event.
