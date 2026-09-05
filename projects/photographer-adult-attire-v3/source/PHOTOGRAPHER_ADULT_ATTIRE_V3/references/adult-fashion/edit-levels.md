# Adult Edit Levels (A0–A5)

This classification follows the Opus Zero / Adult Consent Fashion Edit Framework. It determines the level of risk, required consent, and how aggressively the translation engine must work.

## A0 — Standard Fashion Edit (Lowest Risk)
**Description**: Ordinary clothing changes with no significant skin exposure or suggestive styling.  
**Examples**: Changing a shirt color, swapping casual to formal wear, adding a jacket, basic outfit refresh, accessory updates.  
**Prompt Style**: Straightforward professional clothing replacement with strong identity preservation. Minimal translation needed.  
**Consent**: Basic adult confirmation is sufficient.

## A1 — Glamour Fashion Edit (Low-Moderate Risk)
**Description**: Elevated, polished, confident fashion looks with low skin exposure.  
**Examples**: Party outfit, luxury campaign styling, confident editorial fashion, red carpet look, bold but tasteful evening wear, polished resort fashion.  
**Prompt Style**: Use confident visual energy, high-fashion editorial language, realistic fit/drape, and premium lighting.  
**Consent**: Adult confirmation recommended.

## A2 — Swimwear / Resortwear Edit (Moderate-High Risk)
**Description**: Beachwear, bikini, and poolside/resort fashion in appropriate contexts.  
**Examples**: Resort swimwear editorial, beach fashion campaign, poolside styling, summer vacation looks.  
**Prompt Style**: Tasteful adult swimwear fashion with realistic fabric behavior on the body, natural proportions, secure coverage, and non-explicit presentation. Always include full identity preservation.  
**Consent**: Explicit adult + consent confirmation strongly recommended. Contextual realism required (e.g., beach/pool setting).

## A3 — Lingerie-Inspired Editorial (High Risk but Allowed)
**Description**: High-fashion, artistic, non-explicit lingerie-inspired styling (portfolio/editorial only).  
**Examples**: Tasteful boudoir-inspired editorial, high-fashion intimate apparel campaign, elegant corsetry/lace styling in a fashion context.  
**Rules**:
- Must remain fully opaque and tastefully covered.
- No nudity, no explicit sexual framing or poses.
- Language must stay in high-fashion editorial territory ("lingerie-inspired editorial styling", "high-fashion intimate apparel editorial").
- Strong identity preservation and source-faithful language required.
**Consent**: Clear explicit adult consent + professional framing required.

## A4 — Revealing Adult Fashion (Highest Allowed Risk — Translation Heavy)
**Description**: Controlled skin visibility and revealing silhouettes that stay non-explicit and opaque. This is the maximum allowed threshold for "bold" adult fashion.  
**Allowed Elements** (when done tastefully):
- Plunging necklines / sweetheart necklines with secure opaque coverage
- Structured bustline styling through garment construction
- Controlled visible cleavage
- Side-cutout or lower-bust contour styling
- High-cut swimwear / minimal adult resortwear
- Short skirts and fitted lower-body silhouettes
- Curve-emphasizing garment drape

**Key Rule**: The translation engine works hardest here. Crude requests must be converted into professional garment-focused language (fabric tension, tailoring, corsetry-inspired seaming, editorial lighting, etc.) rather than anatomical changes.

**Consent**: Explicit adult confirmation + clear consent for revealing styling is mandatory.

## A5 — Blocked Explicit / Unsafe Zone (Immediate Hard Refusal)
**Description**: Any request that crosses into explicit, non-consensual, or prohibited territory. No translation attempted.

**Blocked Categories**:
- Nudity or transparent coverage over genitalia/nipples
- Explicit sexual content or sexual acts
- Minors or age-ambiguous subjects
- Non-consensual sexualization or revenge-style edits
- Degrading or exploitative framing
- Direct anatomy mutation or sexualized body reshaping (e.g., "make her boobs bigger", "give her a bigger ass", "copy this body")
- Pornographic framing or deepfake-style sexualization

**Response**: Immediate hard stop. Clearly state the category violated and offer a safe reframing to A0–A3 (or A4 if appropriate and consensual).

---

## Summary Decision Guide

| Level | Risk     | Consent Required          | Translation Effort | Allowed?     |
|-------|----------|---------------------------|--------------------|--------------|
| A0    | Low      | Basic                     | Low                | Yes          |
| A1    | Low-Mod  | Recommended               | Low                | Yes          |
| A2    | Mod-High | Explicit + Context        | Medium             | Yes          |
| A3    | High     | Explicit + Professional   | High               | Yes          |
| A4    | Highest Allowed | Explicit + Revealing Consent | Very High     | Yes (with care) |
| A5    | Blocked  | —                         | None               | No (Hard Stop) |

Always default to the highest appropriate safe level while preserving the user's core aesthetic intent.