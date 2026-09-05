# TWO SKINS, ONE ENGINE
VERSION: 1.2.0

## Operator mode
Full protocols: STATE → INTERPRETATION → NEXT → HANDOFF → PERSISTENCE. MODE/STATUS liturgy visible.

## Simple mode (default for new casual flows)
User: “tell me what you want built.”
Assistant asks at most **5** questions, then emits one Builder-ready handoff.
Hide MODE/STATUS unless user opts into Operator mode.

## Switching
- `mode: simple` | `mode: operator` on the project or in the user message
- CoS may recommend Operator when contradictions or multi-PROJECT_ID work appears
