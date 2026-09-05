# CHATGPT / DALL-E 3 SOURCE-LOCKED PHOTOGRAPHIC RECOVERY
v31 — BIOMETRIC IDENTITY / GEOMETRY LOCK (REPAIRED)

EXECUTE THIS PROMPT ON THE SUPPLIED IMAGE.


## INPUT / HANDOFF CONTRACT

Inputs are interpreted in this order:
1. **SOURCE IMAGE** — primary visual source of truth.
2. **SOURCE-LOCK FORENSIC VISUAL REPORT** — structured observation derived from the source image; useful for explicitness, never a replacement for the image.
3. **USER EDIT OBJECTIVE** — defines the authorized transformation; it does not authorize unrelated changes.

When a supplied forensic report conflicts with what is directly observable in the source image, the source image wins. When a property is not observable or is marked UNKNOWN/UNRESOLVED, do not invent it. Use the report to preserve source facts and identify degradation; use the edit objective only for the requested transformation.

============================================================
CORE MISSION
============================================================

Treat the supplied image as the sole visual reference.

Preserve the same subject identity, facial structure, facial proportions, natural asymmetry, expression, pose, body proportions, clothing, objects, environment, perspective, lighting direction, framing, composition, orientation, and source aspect ratio.

SOURCE LOCK IS THE HIGHEST-PRIORITY REQUIREMENT.

This is a prompt-level preservation instruction. It does not technically guarantee identity preservation or prevent model drift.

============================================================
MODULE A: GEOMETRY AND EDITING LIMITS
============================================================

- Preserve the source image orientation and aspect ratio to the extent the active image interface supports it.
- Do not claim true spatial inpainting, masking, region locking, hidden parameter control, or pixel identity unless the active interface exposes and confirms that capability.
- When a requested regional edit cannot be isolated by the available interface, state that limitation rather than implying technical isolation.

============================================================
EXECUTION PROTOCOL
============================================================

STEP 1: FORENSIC SOURCE MAPPING (Silent)

Analyze the supplied image and record source-supported identity and geometry cues, including:

- visible facial landmarks and distinctive asymmetries;
- relative eye, nose, mouth, jaw, cheek, forehead, hairline, and ear geometry where visible;
- expression and head orientation;
- body proportions and pose;
- clothing and accessory geometry;
- object and background placement;
- perspective and composition;
- image orientation and aspect ratio.

Use image-relative or normalized positional relationships where useful.

Do not claim physical millimeter measurements from an uncalibrated 2D image.

When a feature is ambiguous, occluded, low-resolution, or not resolvable, mark it UNKNOWN/UNRESOLVED and do not invent it.

STEP 2: SOURCE-LOCKED EDIT INSTRUCTION

Use the following as the image-editing instruction:

[SUBJECT / IDENTITY]
Preserve the same individual, facial structure, facial proportions, distinctive visible landmarks, natural asymmetry, expression, apparent age, head orientation, and body geometry shown by the supplied reference.

[ACTION / EDIT]
Apply only the user-requested edit or restoration. Do not introduce unrelated changes.

[ENVIRONMENT / COMPOSITION]
Preserve the original scene, meaningful objects, spatial relationships, perspective, framing, orientation, and composition.

[PHOTOGRAPHIC RECOVERY]
Recover natural, source-supported fine detail over the preserved geometry: skin texture, hair detail, material micro-texture, edge definition, tonal transitions, and other fine structure supported by the reference.

[ANTI-HALLUCINATION]
Do not invent hidden anatomy, missing object structure, unreadable text, or unsupported texture. When detail cannot be reliably recovered, preserve ambiguity rather than substituting an idealized feature.

The exact payload wording may be adapted by the active image interface. Do not claim that a hidden system instruction, tool-call interception, seed, generation ID, backend parameter, or other private control was executed unless the interface explicitly exposes and confirms it.

============================================================
STEP 3: CONTINUITY
============================================================

For subsequent edits, reuse the established source-lock description and the supplied reference image/context where the interface supports conversational continuity.

Do not invent a seed, generation ID, latent identifier, or hidden continuity mechanism.

============================================================
STEP 4: POST-GENERATION REPORT
============================================================

Report only observable or interface-exposed facts:

1. returned output dimensions or resolution tier, if observable;
2. returned aspect ratio, if observable;
3. visible identity/geometry continuity or drift;
4. visible scope violations;
5. unresolved limitations.

Do not report “identity locked,” “parameters passed,” “generation ID obtained,” or similar claims unless they are directly evidenced by the interface.

============================================================
PRIORITY ORDER
============================================================

1. Source identity and facial geometry
2. Pose and body geometry
3. Composition and spatial relationships
4. Lighting and perspective
5. High-frequency photographic recovery
6. Secondary aesthetic refinement

NEVER trade source fidelity for apparent detail.
