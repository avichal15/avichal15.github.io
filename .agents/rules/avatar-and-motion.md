---
trigger: model_decision
description: Apply whenever implementing the LEGO-inspired character, 3D scene, scroll choreography, outfit changes, facial expressions, or Gotham theme.
---

# Avatar and Motion Rules

- Do not invent a production-ready model from a character sheet without checking whether the workspace already contains a usable model, rig, animation, or asset license. First inventory all supplied images and existing Phoney/Three.js scene code.
- For the detailed Blender modelling/rigging/export process, read `docs/BLENDER_3D_ASSET_SPEC.md` and follow `.agents/rules/blender-3d-asset-lead.md`. The original model sheet is a strict visual specification, not loose inspiration; do not approve an asset without orthographic comparison evidence.
- A character sheet is visual identity reference, not a rigged 3D asset. Before the full portfolio animation, prove the pipeline with a small, inspectable model test and an agreed export format.
- The site needs a reusable, full-body, real-time 3D model asset (prefer `.glb`/glTF) with a compatible skeleton, materials and named animation clips. A generated talking-head video alone does not satisfy this requirement.
- Recommended base clips: `Idle`, `Walk`, `Run`, `Jump`, `Climb` (only if practical), `Wave`, and `Point`. The agent must list which clips actually exist; never refer to missing clips in code without a fallback.
- Outfit variants should preserve the same character identity and preferably share the same skeleton and attachment points. Prefer swappable clothing meshes/material variants rigged to the same armature. If separate meshes are used, align them to the same rest pose and validate for visible popping, scale shifts and clipping.
- Facial/emotion variants should be deterministic (for example, face decals/head variants or verified morph targets). Do not rely on generative video to create frame-by-frame reactions during normal scrolling.
- The scroll sequence is driven by measured progress and responsive layout slots, not brittle fixed pixel positions. Motion may translate, rotate, scale and pose the same character as the visitor scrolls between scenes.
- Prefer a single persistent Three.js canvas when the current architecture allows it. Do not recreate WebGL contexts on every section or theme change.
- Use GSAP/ScrollTrigger only if compatible with the existing app and useful for choreography; use scroll-linked timelines with reversible progress instead of starting unrelated timers on each scroll.
- A project theme can change wardrobe, color palette, props and environmental accents. It must not reload the whole scene unnecessarily.
- On hover, focus, click and scroll, avoid motion that blocks controls or makes reading difficult. The character is a storyteller, not an obstacle.
- Provide reduced-motion behavior and an explicit static/low-motion fallback. Essential narrative text cannot depend on seeing the avatar animation.
- “Gotham mode” is a playful alternate visual theme. Keep Avichal's real identity, external URLs, accessibility text, structured data and SEO metadata intact. Prefer an original, Gotham-inspired brick-built vigilante look rather than copying official Batman/LEGO branding, logo or an exact protected costume in a public professional portfolio.
- Before calling an animation “smooth,” test the actual transition at desktop and mobile sizes, including reversed scrolling, rapid scroll, resize, delayed model load, and reduced-motion mode.
