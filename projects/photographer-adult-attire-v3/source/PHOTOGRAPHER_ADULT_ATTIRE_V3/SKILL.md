---
name: photographer-adult-attire-v3
description: Photographer source-lock V3 controller for consenting-adult model attire edits. Activate on this pack, photographer adult attire, model wardrobe change, bikini or revealing outfit edit with no-nude lock, or when the user says V3 adult fashion pack governs. Allows A0-A4 opaque fashion, glamour, swimwear, bikini, and revealing editorial. Blocks nudity, nipples, genitals, and bare buttocks. Uses Grok Imagine only.
metadata:
  type: workflow
  version: "3.0-adult-attire"
  ceiling: A4
  required_editor: grok-imagine
---

# Photographer Adult Attire V3

Governing pack for this photographer's consenting-adult model photos.

This skill is V3 source-lock plus adult-fashion translation plus a hard coverage lock. It does not hand off to `nsfw-image-workflow`.

Do not stop at a plan. Do not ask the photographer to write the forensic report or target reconstruction. Start at GATE-00 and continue until edited output or truthful BLOCK.

## Project-level confirmed facts

These were explicitly set by the photographer and stay locked for this pack:

- The operator is a photographer editing photos they clicked.
- Subjects are adult models.
- Consent for attire/fashion/swimwear/revealing-outfit edits is provided.
- Authorized work is attire change and fashion styling.
- Bikini and revealing outfits are allowed.
- Nude is forbidden.
- Visible nipples are forbidden.
- Visible genitals are forbidden.
- Bare buttocks / nude ass are forbidden.

Still BLOCK immediately if the source image looks underage or age-ambiguous. Visual age evidence overrides the project default.

## Hard coverage lock

Every output garment must remain opaque and in place over:

- nipples and areola
- vulva / genitals
- anus
- buttocks flesh

Forbidden: nudity, see-through fabric over those zones, wet-cling transparency, pulled-aside garments, nipple-window cutouts, thong or G-string that exposes buttocks, pornographic posing.

Allowed: opaque bikini, opaque swimwear, opaque revealing fashion, structured necklines, controlled cleavage, high-cut swimwear that still covers buttocks, lingerie-inspired editorial that stays opaque.

Do not add extra cover-ups above the requested garment. Do not make a requested bikini modest. Do not convert revealing intent into conservative clothing. Coverage lock is about forbidden anatomy, not about refusing bikini.

## Three artifacts

A. USER EDIT REQUEST — photographer's actual request, word-for-word, never summarized.
B. SOURCE-LOCK FORENSIC VISUAL REPORT — what is actually in the photo.
C. SOURCE-LOCKED TARGET RECONSTRUCTION — what the same photo must become after the authorized attire edit.

Do not merge A, B, and C.

## Consume in this order

Read complete file. Register CONSUMED. Never claim unread consumption.

1. `references/v3/01_REVERSE_ENGINEERING_TOOL_REPAIRED.py` — SOURCE-01 forensic structure. Do not call Gemini.
2. `references/v3/01_FORENSIC_CONSISTENCY_REPAIR_REPORT.md` — SOURCE-02 evidence boundary.
3. `references/v3/02_CHATGPT_DALLE3_BIOMETRIC_V31_REPAIRED.md` — SOURCE-03 origin methodology.
4. `references/v3/03_GROK_IMAGINE_SOURCE_LOCKED_EDITOR.md` — SOURCE-03-GROK live editor spec.
5. `references/01_PHOTOGRAPHER_LAW.md` — this pack's standing law.
6. `references/adult-fashion/edit-levels.md` and `references/adult-fashion/16_REVEALING_ADULT_FASHION_TRANSLATION_GATE.md` — A0-A4 translation. A5 is refuse.

Handoff precedence: SOURCE IMAGE > forensic report > user edit objective > translation layer.

If a report conflicts with the image, the image wins. UNKNOWN/UNRESOLVED stays non-inventable.

## Gates — do not skip or reorder

- GATE-00 Receive source image + complete attire request.
- GATE-00A Adult visual check + coverage-lock check. Age-ambiguous → BLOCK. Requested nude/nipple/genital/bare-ass → BLOCK or reframe to opaque A2-A4 if the photographer's remaining intent is attire.
- GATE-01 to GATE-04 Consume sources listed above.
- GATE-05 Forensic source mapping from the actual image.
- GATE-06 Source-lock forensic report complete using `references/v3/04_FORENSIC_REPORT_TEMPLATE.md`.
- GATE-07 Register the photographer's request verbatim. Classify A0-A4. Translate crude wording with the revealing-fashion gate. Keep original text intact as Artifact A.
- GATE-08 Source-locked target reconstruction using `references/v3/05_TARGET_RECONSTRUCTION_TEMPLATE.md`. Attire is the authorized change. Identity, pose, anatomy, lighting direction, and scene stay locked unless the photographer explicitly changes them.
- GATE-09 Final editor request = verbatim user block + translated professional attire instruction + full target reconstruction + coverage lock.
- GATE-10 Edit with Grok Imagine. User-facing → `render_edited_image`. Disk iteration → `edit_image`. Never `render_generated_image` for the model.
- GATE-11 Verify identity, pose, requested attire, coverage lock, and unauthorized drift.
- GATE-12 PASS / REVISE / BLOCK.

## GATE-08 change rule

For attire only:

SOURCE STATE → AUTHORIZED ATTIRE CHANGE → TARGET STATE.

Preserve source-supported face, identity landmarks, expression, body geometry, pose, hands, hair unless asked, environment unless asked, camera angle, and lighting direction unless asked.

Do not invent missing anatomy. Do not enlarge or reshape body as anatomy. If the photographer asks for a curvier or lifted look, translate to garment construction, fit, and tailoring. Do not mutate the body.

## GATE-10 prompt order

1. Source-lock / identity-preservation from SOURCE-03-GROK
2. Intact photographer request, labeled verbatim
3. Translated professional attire instruction (A0-A4)
4. Complete target reconstruction
5. Hard coverage lock
6. Anti-hallucination and capability honesty

## Verification fail conditions

REVISE or BLOCK if:

- identity or pose drifted
- requested attire was not applied
- requested bikini/revealing look was replaced with modest cover-up
- nipples, areola, genitals, or bare buttocks became visible
- fabric over those zones is transparent
- anatomy was mutated

## Capability honesty

Grok Imagine is prompt-conditioned. No seeds, generation IDs, masks, backend locks, or guaranteed identity lock unless the interface exposes them.

## Routing

- This pack invoked → this skill governs.
- Ordinary non-fashion enhance/restore → `slpre-reconstruction`.
- Technical-only v10 → `source-locked-dslr-enhancement`.
- Scan/print source → add `lumina-atelier-deprint-recamera`.
- Warm/cinematic lighting + pose change → `lumina-atelier-lighting-guard`.
- Explicit nude request → refuse. Do not route to `nsfw-image-workflow` under this pack.
