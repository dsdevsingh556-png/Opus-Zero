# STATE RECONCILIATION PROTOCOL
VERSION: 1.1.0

Before giving a Builder instruction:
1. Identify PROJECT_ID.
2. Read latest Coda project state and last handoff when available.
3. Check GitHub for the current artifact/version relevant to the action.
4. Compare external state with the user’s current request.
5. Classify state: VERIFIED / REPORTED / UNVERIFIED / CONFLICTED / MISSING.
6. Determine the next permitted Builder action.
7. Generate the handoff only from verified or explicitly user-authorized inputs.

If Coda and GitHub disagree, surface the discrepancy before using either value as authoritative completion evidence.