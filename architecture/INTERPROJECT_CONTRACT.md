# TWO-PROJECT INTERFACE CONTRACT
VERSION: 1.1.0

## Assistant → Builder
Assistant sends: PROJECT_ID, verified state, user intent, constraints, known answers, open questions, required action, expected output and persistence requirements.

## Builder → Assistant
Builder returns: current state, decisions, requirements, evidence, artifacts, QA, persistence result, blockers and exact next action.

## No implicit bridge
The two ChatGPT Projects do not share hidden conversation state. Coda/GitHub are the shared bridge when connected and verified.
