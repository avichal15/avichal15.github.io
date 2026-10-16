# Character, 3D Asset, and Motion Specification

## Target
A reusable LEGO-inspired character based on Avichal's own approved character sheet. The character should feel like a premium, photorealistically rendered toy/collectible with convincing lighting and materials, but still clearly constructed from block/toy forms. The visual language must feel original—not a direct licensed LEGO, Batman/DC, or SEBG character asset.

## Start from the source sheet
Before modeling, inspect all supplied references and produce an asset-readiness report:
- list files, dimensions, alpha channel and view angles;
- identify exact identity details that must remain consistent (face/head shape, hairstyle, glasses/accessories, body proportions, signature outfit, colors);
- mark which views are front/side/back/three-quarter and which are only concept references;
- note missing back/side views and any ambiguous features;
- ask for a reference sheet with neutral front, side, back and three-quarter views if needed; do not invent identity details.

A 2D sheet alone rarely provides all geometry. Use it as guidance and validate every major view against it.

## Model architecture recommendation
- Make a single reusable character rig with compatible body proportions and separable wardrobe/prop meshes.
- Store baseline outfit, doctor outfit, Masterplayer/work outfit and Gotham/bat-inspired outfit as variants on the same rig where feasible. Prefer mesh/material/prop swaps at named timeline labels over replacing the entire character object.
- Rig spine, head/neck, upper/lower arms, hands, hips, upper/lower legs and feet; define root motion and foot planting.
- Use a small set of polished clips/poses: `idle`, `look-at`, `wave`, `walk`, `run`, `climb`, `jump`, `land`, `celebrate`, `work/point`, `doctor-idle`, `transform`, `bat-idle`, `contact-idle`.
- If the character is an actual LEGO-style minifigure, joint articulation may be toy-like; don't force human-motion realism where it would break the toy aesthetic. “Photorealistic” should apply mainly to materials, lighting, shadows and render quality—not realistic human anatomy.

## Outfit transformation
- Do not simply crossfade two unrelated full-body PNGs during motion: silhouettes will ghost, scale may pop, and pose will mismatch.
- Preferred: one rig and matched underlying body; animate clothing/props and materials with a short staged transformation (pose/turn, light or brick-part sweep, swap at occluded beat, settle in new outfit). Use two compatible skinned models only if shared rig compatibility and timing are verified.
- If animation assets are unavailable, use a controlled cut at an occluded turn with a light sweep, not a broken pseudo-morph.
- All variant models must share root scale, origin, orientation, contact position and idle pose. Bake and document pivots/origin.
- For Batman/Gotham mode, use an original bat-inspired block-built suit and silhouette. Avoid exact Batman logo/face/film model.

## Scroll choreography
- One central timeline maps scroll progress to character and scene state. Use GSAP ScrollTrigger/timeline and either direct Three.js or R3F—not both accidentally.
- Use measured anchor locations for avatar travel; compute targets from actual viewport/layout measurements, not fixed magic pixel values that fail on resize.
- Smooth interpolation: position and rotation eased with explicit timeline labels; ensure foot-contact beats align with ground; use consistent world scale and camera framing.
- Character should transition from right hero position to travelling left/background, then reposition as each chapter needs. Later jump/crossing can bring it back to right side. At the archive, smoothly reduce to a bottom-left circular portrait/icon; if using a DOM overlay instead of 3D zoom, crossfade without showing both characters simultaneously.
- Character must never cover project copy, click targets, phone mockups, or keyboard focus indication.
- Do not override native page scroll with full-page scroll jacking. Scroll remains browser-native.

## Reading highlight / speech bubble
- Store the narration as text in HTML/DOM; highlight active word/phrase based on measured scroll timeline or audio/text pacing. No forced text-to-speech required.
- Use a stable tokenization/mapping so wrapping lines/resizing does not desynchronize the highlight. Highlight a phrase/word with contrast and mild emphasis; don't create a visual typewriter effect that makes the content hard to scan.
- The avatar's speech bubble should have one current narrative at a time, a generous line length and no overlay on interactive controls.
- Provide a static copy presentation when reduced motion is active.

## Background material
- LEGO-brick feeling should be an abstract, coherent, restrained surface system: subtle studs/seams, consistent brick scale, surface roughness and material color shifts per story. Avoid dense individual bricks across every pixel, which can slow rendering and reduce text contrast.
- Prefer lightweight normal/roughness maps, repeated procedural pattern or instanced studs over thousands of separate meshes.
- Story-specific color/material transitions: MediStudyGo healthcare/learning palette (validated against brand assets), Phoney reaction colors, TruGifting brand palette, Masterplayer color palette. Never sample or claim exact brand colors without approved assets.
- In Gotham mode, dim the brick city, add subtle directional light/fog/rain only if performance allows. Ensure all body text and buttons maintain WCAG-appropriate contrast.

## Technical and performance constraints
- Keep one persistent renderer/canvas if feasible. Do not recreate the WebGL renderer on every scroll chapter or theme change.
- Preload and cache model/material variants; dispose of unused geometries/materials/textures only when actually no longer used.
- Compress GLB and textures after quality checks. Test first-load payload, memory, GPU load, long sessions, device pixel ratio and WebGL loss.
- Use lazy-load/prefetch boundaries: hero character/first project fast path; later project imagery can load near viewport. Avoid loading every high-res image and all character variants up front.
- If WebGL is unavailable or initialization fails, display pre-rendered poster images / static avatar, keep the entire site functional and expose a retry control. Do not leave a blank canvas.
- Reduced motion: turn locomotion into simple discrete poses/crossfades; no continuous running, parallax, pulsing lights or forced smooth scrolling. Honor `prefers-reduced-motion` and offer a visible animation pause/static mode.
- Ensure the character's visual states communicate information but do not contain text that exists nowhere else.
