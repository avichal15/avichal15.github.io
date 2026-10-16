# Asset Inputs and Deliverables Contract

This document distinguishes the **inputs the agent must find or receive** from the **outputs the agent must produce**. It prevents an instruction ZIP from being mistaken for finished website code or a finished 3D model.

## Inputs to locate in the active workspace

| Input | Preferred source | Required handling |
|---|---|---|
| Existing portfolio website | Current active repo/workspace | Reuse stack and working components; check Git status before modifications. |
| Original character model sheet | Existing project assets or active user-provided attachment | Mandatory for exact 3D fidelity. Preserve original; do not fabricate a replacement. |
| Existing 3D assets | `.blend`, `.glb`, `.gltf`, textures, rigs, animation actions | Audit quality/licence/compatibility before reuse. |
| Project screenshots | Existing website repos/assets or authorised real captures | Use true product captures; label placeholders honestly. |
| Certificates/qualifications | Existing files, CV or portfolio inventory | Preserve exact names, issuers, dates and verification links only when present. |
| Contact/education details | Existing approved CV/site source | Reconcile disagreements; do not expose private details without approval. |
| Project source repos | Local clone, connected GitHub integration or public URLs in `AGENT_BRIEF.md` | Verify work and current feature/release status rather than trusting a URL alone. |

## Required generated 3D files

Adapt these paths to the existing repo, but make the locations discoverable and document the final paths in the asset manifest. Do not create a second competing public-asset directory if one already exists.

- Editable Blender source: `artifacts/blender/avichal_minifigure.blend` (or a documented existing equivalent).
- Production web asset: `public/models/avichal/avichal_minifigure.glb` (or current public asset convention).
- Optional separated outfit-variant GLBs only if shared-armature swap cannot be robustly achieved in the main asset; keep the same scale/rest pose/skeleton contract.
- Reference renders: `artifacts/blender/reference/`.
- Front/side/back orthographic match renders: `artifacts/blender/comparison/`.
- Alpha overlays and discrepancy sheets: `artifacts/blender/comparison/`.
- Asset manifest: `artifacts/blender/asset-manifest.json`.
- Validation report: `artifacts/blender/VALIDATION_REPORT.md`.
- Short screen recording or frame sequence of animation/outfit swap/browser-load proof when tool support allows it.

## Asset manifest fields

At minimum, record:
- asset file paths and generated-at date;
- Blender version and export settings actually used;
- authoritative model-sheet path and a stable hash if available locally;
- triangle/vertex counts, texture count and texture dimensions, file size;
- armature name, root/pelvis conventions, coordinate units, forward/up axes, origin/ground contact convention;
- exported animation names and tested duration/loop behavior;
- outfit variants and how the runtime selects them;
- materials and texture dependencies;
- GLB validator result and any warnings;
- actual website loader used and test route/browser/viewports;
- known limitations and any reference details that cannot be assessed because the sheet lacks the view.

## Required outputs from the complete portfolio build

1. Working updated portfolio source inside the true existing project.
2. Updated source-driven project and certificate inventory/routing without data loss.
3. Reusable project-detail and certificate-detail templates, real action links, previous/next navigation and the all-work/archive section.
4. Hero, short bio, four featured stories in fixed order, archive, credentials and contact/footer.
5. Responsive LEGO/neo-brutalist visual system with intentional project mockups.
6. Real 3D character model pipeline with validated rig/animations/outfit swaps when the model sheet exists; an accessible honest fallback if blocked.
7. Functional reversible Gotham-inspired transformation mode that preserves factual identity.
8. Automated checks and browser evidence, updated technical notes and `docs/FINAL_VALIDATION_REPORT.md` based on the template.
9. No deployment unless explicitly approved.
