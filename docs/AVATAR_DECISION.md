# Avatar Decision: HeyGen vs a Reusable Real-Time 3D Character

> **Implementation authority:** For exact model-sheet fidelity, Blender modelling, rigging, animation, outfit variants, exports, and acceptance testing, follow [`BLENDER_3D_ASSET_SPEC.md`](BLENDER_3D_ASSET_SPEC.md). The spec is stricter and more detailed than this pipeline summary.

## Recommendation

**Do not choose HeyGen as the primary tool for making the portfolio's reusable 3D avatar.** Use HeyGen as an optional tool for pre-rendered character narration or a separate talking-avatar experiment, but only use it as the main pipeline if it proves—before significant spend—that it can deliver the exact reusable 3D files you need under terms that let you use them on the portfolio.

The portfolio needs the character to exist inside the website's 3D world and be controlled by scroll progress. It needs full-body movement (idle, walk/run, jump, and potentially climb), reliable outfit changes, project-specific poses, and an alternate theme. Those are real-time scene/model requirements, not only talking-video requirements.

## What official HeyGen documentation establishes

- HeyGen's Digital Twin creator is designed to produce avatar videos and alternate “Looks” with outfit/pose/background variations. The documented output workflow is video export, not a documented general-purpose rigged GLB export pipeline. See the [Digital Twin guide](https://www.heygen.com/en-in/academy/avatars/how-to-create-a-digital-twin).
- HeyGen LiveAvatar can accept a custom non-human or 3D character, but the documented process asks for a prepared video of more than two minutes, a real-person consent video, and may require a manual approval request after automatic rejection. Its help article warns that avatar performance is optimized for distinct human facial features; less human-like characters may not lip-sync well. It also describes the custom LiveAvatar recording as chest-up and explicitly says full-body recordings are not supported. See [Getting Started with LiveAvatar](https://help.heygen.com/en/articles/10035615-how-to-get-started-with-liveavatar).
- As of the research checked for this document, I did not find official documentation establishing that HeyGen exports a rigged, reusable minifigure model with a skeleton, swappable clothing meshes and named animation clips that can be imported into Three.js. Lack of documentation is not proof that no private/export feature exists, so validate directly with HeyGen before purchasing for this purpose.

## Why that matters for this portfolio

A video avatar can make a talking head clip or character narration. But it cannot be repositioned arbitrarily in perspective in a persistent Three.js scene, directed to run from one side of a project chapter to the other in response to scroll, or reliably share the same skeleton across outfit variants. Using keyed video clips for each project would make smooth transitions and responsive composition much harder.

## Recommended pipeline

### Stage 1 — lock the design

Use Avichal's existing character sheet as the visual authority. Inventory every supplied view/image. Confirm front/side/back, proportions, face, hair/hat, torso, hands, feet, color/material references, and which elements are allowed to change by outfit. The model must look like the same character across all variants.

### Stage 2 — build one base model

Create or commission one well-made, stylized brick-built minifigure in Blender (or another 3D package that can export correctly). Build the recognizable minifigure shapes intentionally; don't expect a coding agent to infer a clean 3D topology from a flat image alone. Separate head, torso, arms, hands, hips and legs where it helps rigging and outfit changes. Keep topology and texture detail appropriate for real-time use.

### Stage 3 — rig and outfit variants

Prefer a single shared skeleton and named body/outfit meshes with consistent attachment points. Create normal/casual, doctor/medical, and an original Gotham-inspired vigilante variant. Reuse the same base head/face proportions to preserve identity. Validate that clothes don't clip and that swapping them doesn't change scale or root position. Create emotions as approved head/face-decal variants or verified morphs; don't create a completely unrelated character for every chapter.

### Stage 4 — required deliverables

Request these items from the model creator, not just a rendered video:

- editable source project (`.blend` preferred)
- real-time web export (`.glb`/glTF) with embedded or well-documented materials/textures
- documented skeleton/armature and consistent root/origin/scale
- named animation clips, if created: `Idle`, `Walk`, `Run`, `Jump`, `Wave`, `Point`; `Climb` only if the creator can deliver a credible climb cycle
- separate/shared-rig outfit meshes for normal, doctor and alternate Gotham look
- asset license/usage rights suitable for a public portfolio and proof that any supplied textures/character components may be used
- a turntable render and a simple validation scene

Do not accept a beautiful MP4/PNG as the only deliverable when you need a controllable real-time model.

### Stage 5 — test a small proof of concept before building the full site

Load the GLB into the *existing* 3D stack or a minimal isolated scene. Verify scale, camera framing, material quality, WebGL performance, idle/walk/run playback, outfit swap, and a reversible 0→1 scroll-linked movement. Check mobile and reduced-motion fallback. Only then expand to project-specific choreography.

## Technical route

- The Phoney website already uses React + Three.js + GSAP, according to `website/package.json`, `website/src/App.tsx`, and `website/DESIGN_V3.md`. Its persistent-world and scroll choreography may be reusable after inspection of the local workspace. Reuse it where compatible instead of rebuilding the model renderer.
- Three.js / React Three Fiber can load glTF/GLB models; Blender's official glTF exporter supports mesh, materials, armatures/skinning, animations and shape keys within supported glTF constraints. Links are listed in `TECH_REFERENCES.md`.
- If building a model in Blender is not feasible, hire a 3D artist to deliver the exact files, rig and usage rights. This may be faster and more reliable than repeatedly prompting general 3D generation models.

## HeyGen's optional role

A generated video of the character introducing Avichal or a project could be used as an optional short editorial media clip, not as the main scrolling avatar. For any paid workflow, first make a tiny test and confirm the output license, credits/limits, background transparency/quality, whether character shapes remain consistent, and whether output is a video or an actual rigged asset.

## Intellectual-property note

For a public, professional portfolio, prefer an original brick-built character and an original Gotham-inspired dark-mode variant. Avoid official Batman/LEGO logos and a direct copy of an official costume unless you have permission or have decided to accept the potential IP risk. The playful mode should not erase Avichal Goyal's real name from metadata, contact details or accessible text.
