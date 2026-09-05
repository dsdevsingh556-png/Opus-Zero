#!/usr/bin/env python3
"""Validate photographer adult-attire V3 payload integrity."""
from __future__ import annotations
import argparse, hashlib, json, re
from pathlib import Path

REQUIRED = [
    ("SOURCE-01", "01_REVERSE_ENGINEERING_TOOL_REPAIRED.py"),
    ("SOURCE-02", "01_FORENSIC_CONSISTENCY_REPAIR_REPORT.md"),
    ("SOURCE-03", "02_CHATGPT_DALLE3_BIOMETRIC_V31_REPAIRED.md"),
    ("SOURCE-03-GROK", "03_GROK_IMAGINE_SOURCE_LOCKED_EDITOR.md"),
]

FORBIDDEN_EXPOSURE = re.compile(
    r"\b(nude|nudity|nipple|areola|pussy|vulva|vagina|genital|anus|bare ass|bare buttocks)\b",
    re.I,
)

def digest(text: str) -> str:
    return hashlib.sha256(text.encode("utf-8")).hexdigest()

def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--source-dir", type=Path, required=True)
    ap.add_argument("--edit-request-file", type=Path, required=True)
    ap.add_argument("--target-report-file", type=Path, required=True)
    ap.add_argument("--out", type=Path, required=True)
    a = ap.parse_args()

    sources = []
    for sid, fn in REQUIRED:
        p = a.source_dir / fn
        if not p.exists():
            raise SystemExit(f"BLOCK: missing required source: {fn}")
        t = p.read_text(encoding="utf-8")
        sources.append({"id": sid, "filename": fn, "consumed": True,
                        "sha256": digest(t), "character_count": len(t)})

    edit = a.edit_request_file.read_text(encoding="utf-8")
    target = a.target_report_file.read_text(encoding="utf-8")
    if not edit.strip():
        raise SystemExit("BLOCK: empty user edit request")
    if not target.strip():
        raise SystemExit("BLOCK: empty target reconstruction")

    flags = []
    if FORBIDDEN_EXPOSURE.search(edit) and re.search(r"\b(show|visible|expose|nude)\b", edit, re.I):
        flags.append("USER_REQUEST_CONTAINS_EXPOSURE_LANGUAGE")
    if FORBIDDEN_EXPOSURE.search(target) and re.search(r"\b(show|visible|expose|nude)\b", target, re.I):
        flags.append("TARGET_CONTAINS_EXPOSURE_LANGUAGE")

    payload = {
        "source_image_required": True,
        "live_editor": "grok-imagine",
        "ceiling": "A4",
        "coverage_lock": [
            "no nude",
            "no visible nipples",
            "no visible genitals",
            "no bare buttocks",
            "opaque coverage required",
        ],
        "user_edit_request": {
            "verbatim": True,
            "text": edit,
            "sha256_utf8": digest(edit),
            "character_count": len(edit),
        },
        "source_locked_target_reconstruction": {
            "verbatim": True,
            "text": target,
            "sha256_utf8": digest(target),
            "character_count": len(target),
        },
        "exposure_language_flags": flags,
        "rules": [
            "Transmit complete user edit request; never summarize it.",
            "Transmit complete target reconstruction; never truncate it.",
            "Transmit the source image.",
            "Honor bikini/revealing attire when requested.",
            "Block nude, nipples, genitals, and bare buttocks.",
        ],
    }
    out = {
        "workflow_version": "V3-GROK-ADULT-ATTIRE",
        "sources_in_order": sources,
        "editor_payload": payload,
        "status": "FLAG" if flags else "PASS",
    }
    a.out.parent.mkdir(parents=True, exist_ok=True)
    a.out.write_text(json.dumps(out, indent=2, ensure_ascii=False), encoding="utf-8")
    print(out["status"])
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
