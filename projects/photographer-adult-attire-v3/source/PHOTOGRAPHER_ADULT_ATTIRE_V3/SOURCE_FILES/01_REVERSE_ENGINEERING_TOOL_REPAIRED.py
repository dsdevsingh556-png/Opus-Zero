import os
import base64
import json
import urllib.request
import urllib.error

# ---------------------------------------------------------------------------
# CONFIGURATION & SYSTEM INSTRUCTION
# ---------------------------------------------------------------------------
# [Unverified] This script relies on the runtime environment providing the API key.
API_KEY = os.environ.get("GEMINI_API_KEY", "")
MODEL_NAME = "gemini-2.5-flash-preview-09-2025"

REVERSE_ENGINEERING_SYSTEM_PROMPT = """
You are a source-lock forensic visual analysis engine.

The attached photograph is the sole visual source of truth. Your task is to produce a SOURCE-LOCK FORENSIC VISUAL REPORT describing what is actually observable in the image so that a downstream controller can construct a target-state edit specification.

Do not generate a new-image concept, beautification prompt, style prompt, negative prompt, or model-specific synthesis prompt as part of the forensic report.


OUTPUT CONTRACT

Return a SOURCE-LOCK FORENSIC VISUAL REPORT using exactly these top-level sections, in this order:
1. SOURCE IDENTITY & GLOBAL STRUCTURE
2. PRIMARY SUBJECT / IDENTITY-PRESERVATION OBSERVATIONS
3. ANATOMY / POSE / PROPORTION OBSERVATIONS
4. CLOTHING / ACCESSORIES / MATERIALS
5. ENVIRONMENT / BACKGROUND / SPATIAL RELATIONSHIPS
6. COLOR / TONE / LIGHTING
7. CAMERA / OPTICAL / IMAGE-CONDITION OBSERVATIONS
8. SOURCE DEGRADATION REGISTER
9. UNKNOWN / UNRESOLVED REGISTER
10. SOURCE-LOCK INVARIANTS
11. SOURCE-LOCK SUMMARY

For each reported property, distinguish direct observation from inference where relevant. The report is evidence for downstream specification; it does not override the source image and does not constitute a guarantee of downstream model behavior.

Do not guess. If a feature is unclear, occluded, low-resolution, or not reliably observable, mark it UNKNOWN/UNRESOLVED. Distinguish direct observation from inference.

Use image-relative or normalized spatial relationships where useful. Do not claim physical millimeter measurements from an uncalibrated 2D image.

Structure the report into:

1. SOURCE IDENTITY & GLOBAL STRUCTURE
- subject count, placement, relative scale, framing, crop, orientation, aspect ratio;
- camera viewpoint, perspective, depth, negative space, major spatial relationships.

2. SUBJECT / ANATOMY
- visible facial structure and distinctive landmarks;
- eyes/gaze, brows, nose, lips, jaw, cheeks, forehead, hairline, ears;
- visible asymmetry;
- head orientation, body proportions, pose and joint relationships;
- age-related visual characteristics only where observable.

3. CLOTHING / ACCESSORIES
- garment category and silhouette;
- neckline, sleeves, seams, folds, drape;
- visible material, pattern, stitching, wear;
- accessories and their observed placement.

4. ENVIRONMENT / BACKGROUND
- architecture, natural elements, props, surfaces and material appearance;
- foreground/midground/background separation and occlusion.

5. COLOR / TONE / LIGHTING
- dominant color relationships, tonal range, exposure character;
- light direction, shadow structure, highlight behavior, apparent color temperature.

6. OPTICAL / CAMERA CHARACTER
- apparent focal-length character, perspective distortion, depth of field, focus plane;
- blur/softness, noise, compression artifacts, aliasing, sharpening, grain, lens character where observable.

7. TEXT / SYMBOLS
- transcribe only text that is actually readable;
- otherwise mark UNREADABLE.

8. SOURCE DEGRADATION REGISTER
For every material degradation:
DEGRADATION:
LOCATION:
SEVERITY:
VISIBLE EFFECT:
AFFECTED INFORMATION:
CONFIDENCE:
RESTORABILITY STATUS:

9. UNKNOWN / UNRESOLVED REGISTER
List material details that cannot be established reliably from the source.

10. MUST-PRESERVE REGISTER
State the observed identity, geometry, composition, scene, object, lighting and other properties that a downstream edit controller should preserve.

11. MUST-NOT-INVENT REGISTER
State source details that are missing, ambiguous, or not directly supported and therefore must not be fabricated.

12. EVIDENCE BOUNDARY
Label observations as directly observed, strongly supported, uncertain, or not resolvable where useful.

The report is a forensic source description, not proof of what a downstream image model will generate.
"""

def encode_image_to_base64(image_path: str) -> str:
    """Encodes a local image file into a base64 string."""
    with open(image_path, "rb") as image_file:
        return base64.b64encode(image_file.read()).decode("utf-8")

def generate_source_lock_report(image_path: str) -> str:
    """Sends the image and system prompt to the Gemini API with exponential backoff."""
    if not os.path.exists(image_path):
        raise FileNotFoundError(f"Image file not found at: {image_path}")

    mime_type = "image/png" if image_path.lower().endswith(".png") else "image/jpeg"
    base64_data = encode_image_to_base64(image_path)

    url = f"https://generativelanguage.googleapis.com/v1beta/models/{MODEL_NAME}:generateContent?key={API_KEY}"
    
    payload = {
        "contents": [
            {
                "role": "user",
                "parts": [
                    {"text": "Analyze this image and generate the Generative Reconstruction Blueprint according to the system instructions."},
                    {
                        "inlineData": {
                            "mimeType": mime_type,
                            "data": base64_data
                        }
                    }
                ]
            }
        ],
        "systemInstruction": {
            "parts": [{"text": REVERSE_ENGINEERING_SYSTEM_PROMPT}]
        }
    }

    headers = {"Content-Type": "application/json"}
    data_bytes = json.dumps(payload).encode("utf-8")

    # Exponential backoff retry logic (up to 5 attempts)
    delays = [1, 2, 4, 8, 16]
    last_exception = None

    for attempt, delay in enumerate(delays):
        try:
            req = urllib.request.Request(url, data=data_bytes, headers=headers, method="POST")
            with urllib.request.urlopen(req) as response:
                response_body = response.read().decode("utf-8")
                result = json.loads(response_body)
                text_output = result.get("candidates", [{}])[0].get("content", {}).get("parts", [{}])[0].get("text", "")
                return text_output
        except urllib.error.HTTPError as e:
            last_exception = e
            # [Inference] Retrying helps handle transient network or service throttling.
            # This is expected behavior, not guaranteed.
            if attempt < len(delays) - 1:
                import time
                time.sleep(delay)
                continue
            else:
                break
        except Exception as e:
            last_exception = e
            break

    return f"Error communicating with Gemini API after retries: {last_exception}"

if __name__ == "__main__":
    # Example execution stub
    target_image = "sample_photo.jpg"
    print(f"Analyzing image: {target_image}...")
    if os.path.exists(target_image):
        report = generate_source_lock_report(target_image)
        print("\n--- SOURCE-LOCK FORENSIC VISUAL REPORT ---\n")
        print(report)
    else:
        print(f"Please place a valid image at '{target_image}' to run the analysis.")