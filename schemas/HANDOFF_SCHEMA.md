# HANDOFF SCHEMA
VERSION: 1.2.0

Required: handoff_id, schema_version, project_id, from, to, current_verified_state, user_intent, authoritative_constraints, known_answers, open_questions, required_action, expected_output, stop_conditions, persistence_requirement, status, evidence_checksum, cited_evidence.

evidence_checksum = sha256 of canonical JSON of cited_evidence. Mismatch → unverified.
