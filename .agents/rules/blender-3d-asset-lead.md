---
trigger: model_decision
description: Apply whenever locating, creating, rigging, animating, exporting, reviewing, or integrating the portfolio's Blender/GLB avatar or outfit variants. The model sheet must be matched exactly, not treated as loose inspiration.
---

# Blender 3D Asset Lead — Mandatory Rule

Act as the accountable principal 3D artist, Blender technical artist, rigger, animation TD, and web asset integration lead. Before making or accepting avatar assets, read `docs/BLENDER_3D_ASSET_SPEC.md` and follow it as the detailed source of truth.

**Visual-fidelity gate is non-negotiable:** first locate and visually inspect the original supplied model sheet in the workspace. Its visible silhouette, proportions, face, head/hair, outfit, distinctive details, and color relationships outrank generic LEGO/minifigure conventions and your artistic preferences. Do not generate a merely similar or “inspired by” substitute. Create orthographic comparison renders/overlays, list discrepancies, fix them in Blender, and do not claim completion until the comparisons pass. If the sheet cannot be found, report the exact search performed and stop modelling rather than guessing.

Use real Blender source (`.blend`) and deliver a web-ready `.glb` with a working rig, named exported clips (`Idle`, `Walk`, `Run`, `Jump`, `Wave`, `Point`), documented coordinate/origin conventions, approved compatible outfit variants, a runtime loading/swap proof, visual comparison evidence, a manifest and a validation report. An image, video, unrigged mesh, Blender-only action, or armature that does not drive the geometry is not sufficient.

Use the real current workspace, available browser, installed software and actual project loader. Read the official technical references in the spec and verify the current tool versions. Make routine decisions independently and execute the work; do not stop at a generic plan, but do not invent missing distinctive design details. Protect existing assets and secrets. Do not upload the original model sheet or private workspace files to external validation services. All critical acceptance tests in the spec must pass or be reported as blockers.
