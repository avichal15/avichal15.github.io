# Blender 3D Character Asset Specification — Avichal Goyal Portfolio

**Authority:** This is the controlling specification for the portfolio avatar's 3D modelling, rigging, animation, outfit variants, and web export. Read it before creating or approving any 3D character asset.

**Primary acceptance condition:** The finished 3D character must unmistakably be the **same character depicted in the supplied model sheet**. Do not produce a character that is merely LEGO-inspired, generally similar, or based on your own interpretation. The model sheet—not generic minifigure conventions, the artist's taste, an image generator, or a coding model's default style—is the visual source of truth.

## 1. Your role and accountability

Act as the **Principal 3D Character Artist, Blender Technical Artist, Character Rigger, Animation TD, and Web Asset Integration Lead** for this deliverable. You are accountable for the complete asset pipeline, not just for generating a render or writing a plan.

Work like a careful specialist:

- Inspect the real workspace, the supplied model sheet, existing avatar/3D assets, the current website stack, and the installed Blender/tooling before choosing an approach.
- Use Blender to make a real, editable 3D model. Use Blender Python (`bpy`) for repeatable modelling, scene setup, rigging, rendering, export, and validation when it makes the result more reliable; use Blender's UI and rendered previews for visual inspection whenever available.
- Use Antigravity's available browser and workspace tools to inspect the exact reference image, read the technical documentation linked below, inspect the existing application, and test the exported model. Do not act as if you have access to a capability you have not actually verified.
- Make routine technical decisions independently. Do not ask the owner to approve every ordinary step. Do not guess a distinctive visual detail that is missing or contradictory in the reference—document the uncertainty and ask only when it materially prevents faithful modelling.
- Work in small stages, but execute the work rather than stopping at advice. Do not move on from a failed visual-fidelity gate just to make progress elsewhere.
- Report what you genuinely inspected, generated, exported, loaded, and tested. Never say an asset is rigged, animation-ready, export-valid, or visually matched without evidence.

## 2. Non-negotiable model-sheet fidelity rule

### 2.1 Locate and freeze the authoritative reference

Before modelling:

1. Search the **entire existing workspace**, including hidden project folders and relevant `public`, `assets`, `design`, `docs`, `references`, `models`, and download/import folders, for the supplied character/model sheet and any related reference images. Check common image formats and any PDFs that may contain the sheet. Also inventory existing `.blend`, `.glb`, `.gltf`, `.fbx`, `.obj`, texture, rig, and animation files.
2. Visually open the actual candidate files. Do not rely on filenames, file descriptions, OCR, or a text-only summary to decide which picture is the model sheet.
3. Record the exact reference path, image dimensions, available views, view labels, color/material swatches, and any close-up details. Preserve the original file unchanged. Do not replace it with a newly generated interpretation.
4. If there are multiple plausible model sheets, compare them with the user's existing design notes and asset history; record why one is authoritative. If that cannot be resolved, ask one focused question and do not pretend the choice is settled.
5. If no supplied model sheet can be located, **stop the modelling stage**. Report the directories and filename patterns actually searched, then ask the owner to identify or place the reference. Do not silently substitute a search-engine image, a stock minifigure, or an AI-generated design.

Create `reference-audit.md` or an equivalent report beside the asset work, documenting the authoritative source and every view available.

### 2.2 The sheet outranks stylistic defaults

Treat the sheet as a design contract, not loose inspiration. Match all details visible in the source, including:

- overall silhouette, height-to-width ratio, head size and shape, head-to-body proportions, neck/torso/hip proportions, limb lengths and thicknesses, hand and foot shapes;
- face layout, eyes, mouth, eyebrows, expression, face placement, hair/hat/headwear, and all distinctive identity cues;
- outfit silhouette, garment layers, seams, badges, graphics, accessories, pockets, cuffs, shoes, and the placement/scale of each detail;
- the actual palette and material intent, including which areas are plastic, fabric, rubber, metallic, matte, glossy, translucent, or otherwise differentiated;
- asymmetries and small distinguishing details. Do not “clean up” a deliberate asymmetry or add detail that is not present.

Do not improvise a more realistic human body, a generic toy body, a different LEGO-like proportion, extra fingers, a new hairstyle, a new facial expression, logos, costume details, accessories, or embellishments that alter the character's identity. Use the reference's actual design even where it differs from common minifigure conventions.

The final result must be a **real, three-dimensional, rotatable character**. A flat billboard, textured plane, shallow card extrusion, single camera-facing sprite, or render-only illusion does not meet the requirement. The model needs credible depth and geometry from the viewpoints supported by the sheet.

### 2.3 Match in an objective review loop—do not stop at “close enough”

Use this order:

1. **Reference breakdown:** identify major silhouette landmarks, proportions, color zones, facial features, outfit components, and visible materials. If the sheet contains front/side/back or detail callouts, use all of them.
2. **Blockout:** create the primary forms and render orthographic front/side/back views. Check the silhouette and proportions before adding small details.
3. **Detail pass:** add face graphics, clothing/accessory geometry, material separations, and small distinguishing features only after the blockout matches.
4. **Reference comparison:** render with a neutral, controlled camera and lighting setup. Align the render to the corresponding sheet view, compare side by side, and create a semi-transparent overlay or difference/contact sheet where possible. Compare at both thumbnail size and 100% scale.
5. **Correction loop:** list the visible mismatches, fix them in Blender, re-render, and compare again. Repeat until the remaining differences are not material to the character's identity or design. Do not hide mismatches with camera angle, lighting, depth of field, a dramatic pose, or post-processing.
6. **Final proof:** save a reference-vs-render comparison sheet and a short report showing which views were checked and what was corrected.

For orthographic alignment, use the reference's frame and proportions rather than stretching the final render to conceal geometry errors. Where the sheet offers usable landmarks, measure them against normalized character height; target approximately **1% of total character height or less** for major silhouette landmarks after alignment. This is a review aid, not a substitute for visual judgement. Face placement, major proportions, outfit identity, and distinctive details must also pass a human visual comparison.

Base colors should be sampled from the source sheet where practical and recorded as material base-color values. Lighting highlights are allowed to differ in the render because the model is physically shaded; the underlying color assignments and color relationships must not drift from the reference.

If the sheet supplies only a front view, match that view rigorously, construct depth conservatively, and clearly mark rear/hidden details as inferred in the report. Do not invent distinctive hidden-side details. If a visible feature is ambiguous, retain the simplest interpretation consistent with the evidence and flag it rather than redesigning it.

**Hard rule:** Do not mark the model as “done”, “approved”, or “matching the sheet” until the comparison renders exist and the fidelity checklist in Section 10 passes.

## 3. Workspace and tooling reconnaissance

Before creating or modifying files:

1. Read the root `AGENTS.md` and relevant `.agents/rules/*.md`; read this specification fully.
2. Inspect the current project tree, git status, README/design documents, package manifest, existing 3D scenes/renderers, and the current 3D framework. The Phoney website may contain reusable Three.js/GSAP patterns, but inspect the local files first and reuse only what fits this portfolio.
3. Check whether Blender is actually installed and executable (for example, `blender --version` and the resolved executable path). Check the installed version and glTF export capability. Check available Python tooling, image comparison tools, and GLB validators. Do not assume a binary or package exists because a documentation page mentions it.
4. Record the current target website's model-loading approach, scale/orientation conventions, camera placement, asset path conventions, loading/failure handling, and reduced-motion behavior. Test with the actual application's loader when possible.
5. Protect existing work: inspect git status; do not overwrite or remove existing art, references, project data, deployment files, or working application code. Create a dedicated asset work area that follows repository conventions. If assets are already present, compare/reuse them before building duplicates.
6. Keep tokens, API keys, cookies, environment variables and other secrets out of logs and reports. Never upload the original model sheet, repository, or user files to a public service just to make validation easier.

Do not blindly scaffold a new website or replace the existing stack to make the character demo easier. The required output is a reusable 3D asset and a small proof of integration in the real project or a clearly isolated prototype that does not damage the current app.

## 4. Blender modelling requirements

### 4.1 Build an editable source scene

The source `.blend` is a required deliverable. Organize it so another artist can understand and edit it without reverse-engineering a single dense mesh.

Use descriptive collections and object names, for example:

- `00_Reference` — locked reference images, non-exporting;
- `10_Character_Base` — the canonical base geometry;
- `20_Outfit_Variants` — outfit-specific geometry/accessories;
- `30_Rig` — armature, controls and rig helpers;
- `40_Animation_Preview` — camera, preview actions and staging;
- `90_Export` — only what should be exported.

Adapt the names if an existing asset convention is better, but keep the scene logically organized. Put reference images on separate locked/non-exporting objects or collections. Do not bake the reference sheet into the character geometry or accidentally export camera, lights, control shapes or reference planes.

Keep the mesh and material design intentionally stylized and physically convincing: clean silhouette, thoughtfully controlled bevels, stable normals, well-defined part boundaries, sensible PBR materials, and no visible faceting, floating seams, z-fighting, unexplained gaps, or accidental intersections. The desired plastic quality is premium molded plastic with subtle realistic highlights and controlled roughness—not wet chrome, cheap flat toy plastic, or overly noisy surface texture. Let the sheet determine the final look and color balance.

Prefer separate rigid pieces for parts that should not bend (such as toy-like head, hands, shoes, hard accessories, or rigid limbs) and appropriate deforming geometry only where the design calls for it. Do not force a flexible organic rig onto hard plastic parts if a hinge/parent setup will preserve their shape more accurately.

### 4.2 Geometry and web performance

- Optimize for interactive real-time web rendering, not a single offline still.
- Preserve silhouette and distinctive details before reducing polygon counts. Use bevels and smooth/flat shading deliberately; do not destroy the character's form to hit a triangle target.
- Start with a sensible target of roughly **25,000–50,000 triangles for the visible active character**, fewer where the design permits. If the exact model requires more, report measured counts and justify them with visible quality evidence.
- Prefer a small, deliberate set of PBR materials. Avoid a large number of unique materials and large textures where shared materials, vertex colors, or small packed textures retain the look.
- Begin with 1K textures where adequate and use 2K only where the face, fabric graphics or close-up details justify it. Pack or embed required textures for a portable `.glb` export.
- Remove hidden/unneeded geometry, unused datablocks, unreferenced textures, test meshes and non-exporting scene objects from the web export—not from the editable source unless safely separated.
- Measure and report triangle count, material count, texture dimensions and file size. Treat performance targets as budgets to validate, not as permission to reduce reference fidelity.

## 5. Proper rig and deformation requirements

A character is not “rigged” merely because an armature object exists. The deliverable must have a working, tested skeleton that drives the visible geometry and supports the required animation clips.

### 5.1 Stable coordinate system and rest pose

- Choose one canonical scale, ground contact plane, root origin, forward direction and rest pose based on the existing website's coordinate system. Document them in the asset manifest. Do not guess and then silently compensate with arbitrary transforms in the web code.
- Put the root/origin at a predictable point at ground level near the character's center so scroll choreography can move the character across the scene without drifting feet or changing scale.
- Apply and validate transforms as appropriate for glTF export. Keep all outfit variants aligned to the same origin, scale, forward axis and rest pose.
- Store a clear neutral rest pose and a simple rig pose sheet. The model must stand upright without unwanted tilt, scale offsets, or hovering/sinking feet.

### 5.2 Skeleton

Design the skeleton around the model sheet and the required actions. Use stable, export-safe bone names. A typical minimum is:

- `Root`
- `Hips`
- `Spine` (and `Chest` if useful)
- `Neck` and `Head` if the design supports a separate neck
- left/right shoulder or upper-arm pivots and `Hand` bones
- left/right `UpperLeg` bones, plus `LowerLeg` and `Foot` bones if the design's construction supports them

Names may follow an existing project's tested schema, but document any alternative. Keep the bone hierarchy simple, intentional and free of unnecessary export helpers. A rigid toy-like character may need pivots and rigid parenting more than smooth organic deformation; choose the method that best maintains its sheet-accurate shapes.

### 5.3 Skinning, joints and test poses

- Assign each deforming mesh to the correct armature and verify the mesh actually follows the bones.
- Use rigid weights or bone-parented rigid pieces for hard plastic parts. If soft/deformable parts exist, weight-paint them intentionally and remove unintended influences.
- Keep influence counts compatible with glTF/web use; prefer four or fewer influences per vertex unless a tested requirement justifies otherwise.
- Validate neutral pose plus extreme-but-reasonable shoulder, elbow/arm pivot, wrist/hand, hip, knee, ankle/foot, neck and head rotations. Inspect for gaps, clipping, stretching, twisted parts, flipped normals and broken silhouettes.
- If the minifigure's joints are mechanical, animate them as mechanical joints; do not bend a solid leg or arm like human flesh if it changes the design.
- Every outfit/prop that moves with the body must be attached, weighted or parented deliberately. No accessories may float behind or detach when the character moves.

## 6. Animation deliverables

Create separate, named animation actions/clips. Names must be stable and documented exactly as exported. Use a consistent frame rate (target 30 fps unless the existing runtime requires another rate) and record it.

Required clips:

- `Idle` — natural readable idle; no unintended root drift; looping and seamless.
- `Walk` — clear, appealing walk cycle; loopable and in-place for web scroll choreography.
- `Run` — convincing faster movement; loopable and in-place.
- `Jump` — clear take-off, apex and landing, with a controlled return to a usable rest pose.
- `Wave` — readable friendly greeting, no broken wrist/arm geometry.
- `Point` — clear pointing gesture; direction and hand pose should be usable for pointing toward project content.
- `Climb` — optional only if a credible animation can actually be delivered and tested. Do not export a token placeholder and claim the clip is complete.

Keep locomotion in place so the website can control horizontal position based on scroll progress without fighting root motion. `Jump` may animate the body vertically, but do not add uncontrolled forward root displacement. If root motion is intentionally used, document it and prove that it can be safely separated from the site's scroll controls.

Use separate looping and one-shot clip behavior in the web test. Check starts/ends for pops, foot sliding, jitter, scale changes, broken joints and inconsistent timing. Make idle-to-walk-to-run changes blend or transition cleanly. Rapid switching must not leave bones or outfit state in a stale pose.

Set up the `.blend` with clearly named actions/NLA tracks and test the exported `.glb` clips after re-import or with the actual target loader. Animation names that exist only in Blender but do not appear in the exported asset do not count.

## 7. Outfit and expression variants

The same avatar will tell the story across different portfolio chapters. The character must remain recognizably the same person in every outfit.

### 7.1 Base identity comes first

- Complete and validate the base character against the model sheet before making extra costumes.
- Preserve core identity across outfits: head/face geometry, facial feature placement, skin/plastic color, hair/headwear unless the reference explicitly authorizes changes, proportions, hands, foot scale, rig, origin, rest pose and animation semantics.
- A wardrobe change may alter only the approved clothing, accessories, materials and theme styling. It must not quietly redesign the face or body.

### 7.2 Requested variants

Inventory exact outfit directions already specified in the portfolio docs, model sheet, and asset files. The previously discussed directions include a base/casual outfit, a medical/doctor-related look where appropriate, and an **original Gotham-inspired brick-built vigilante** theme. Build only supported variants and document the evidence/design rationale. If project-specific costumes are not sufficiently defined, create a brief set of outfit concepts/previews and record the assumptions before modelling every costume.

The Gotham look must be an original design, not an exact copy of a protected branded costume or logo. It is a visual theme; it must not change the site's actual owner identity, SEO, contact details or accessible name.

### 7.3 Technical implementation

Use either:

- outfit meshes/collections that use a shared skeleton and are switched deliberately at runtime; or
- separate outfit GLBs that use exactly compatible skeleton names, bone order/hierarchy where required, rest pose, scale, origin and coordinate conventions.

Choose the method after testing the current loader. Do not assume that toggling Blender collection visibility, glTF material variants, or exporting multiple skinned meshes works in the target runtime without proving it. Provide a small runtime outfit-swap test that shows at least two outfits on the same pose and checks that no mesh pops, shifts or clips. If separate GLBs are used, prove that the app can bind the variant mesh to the canonical skeleton/animation system or clearly document a verified alternative.

### 7.4 Facial expressions

Keep the default face faithful to the sheet. Additional expressions (for example, happy, curious, surprised or focused) are optional variants, and should be implemented through tested face meshes, decals/textures, or supported morph targets. Do not replace the base face or make the character's default look drift. Add only expressions that suit the design and render cleanly at the portfolio's normal on-screen size.

## 8. Required deliverables

Use the existing repository's asset conventions if they are already sensible. Otherwise create one clear, dedicated asset folder (for example `assets/3d/avatar/` or `public/assets/3d/avatar/`) and document the final paths. Do not scatter duplicate exports across unrelated directories.

Minimum deliverables:

1. **Editable Blender master:** `avatar_master.blend`, organized collections, packed/linked textures as appropriate, reference images or clearly documented local references, rig, named actions, outfit variants, preview camera/lights, and no broken external paths.
2. **Web export:** `avatar_base.glb` with geometry, PBR materials/textures, skeleton/skin and all required exported animation clips. `.glb` is preferred for a single portable file.
3. **Outfit exports or variant setup:** all approved outfit variants, with a working and documented swap strategy tested in the actual target loader.
4. **Reference comparison evidence:** front/side/back turntable/contact sheet as supported by the source; model-sheet-vs-render overlays or side-by-side comparisons; high-resolution beauty render plus useful wireframe/rig screenshots.
5. **Rig and animation evidence:** rig pose sheet; an animation contact sheet or short preview for each required clip; list of clips detected in the exported file.
6. **Reproducibility:** Blender Python build/export script(s), exact Blender version, exact export settings, and readable logs. If fully scripted modelling is not a good fit, provide scripted setup/export/validation plus a clear manual workflow rather than pretending the process is automated.
7. **Asset manifest:** `avatar_asset_manifest.json` or `.md` recording source reference path, deliverable paths, Blender version, units, model dimensions, axes, root convention, skeleton/bone names, clip names/frame ranges/loop settings, outfit names, materials/textures, triangle and material counts, file sizes, license/attribution notes, known limitations, and validation results.
8. **Validation report:** clear pass/fail results for the acceptance tests in Section 10, including any known gaps. No false “all passed” status.
9. **Runtime proof:** a small scene/test page in the existing stack—or an isolated prototype if needed—showing GLB load, idle/walk/run/jump playback, at least one gesture, outfit swap, camera framing, and a reversible 0→1 scroll-linked movement. Include a static or low-motion fallback and record a mobile check.

Keep the model sheet original and unchanged. Do not include it in a public export or upload it to external sites unless the owner explicitly approves.

## 9. Blender export and technical verification

Use the Blender glTF 2.0 exporter and verify the exact options against the installed Blender version. Prefer a single `.glb` per deployable variant when appropriate, with packed textures and no accidental references to local file paths. Confirm geometry, materials, skins and animation are truly exported.

After export:

1. Re-import the exported GLB into a clean Blender scene or load it with the target website's actual glTF loader.
2. Inspect the loaded model from front, side, back and three-quarter views; verify scale, axes, materials, face visibility, normals and ground placement.
3. Enumerate animation clips from the exported asset and test each required clip. Confirm looping clips loop and one-shot clips end predictably.
4. Run an available **local** glTF validator if one is installed. If it is not available, use the official Khronos validator website only when uploading that generated export is acceptable. Never upload the source model sheet, workspace or any secrets to the validator.
5. Test at actual portfolio camera sizes and lighting—not only in Blender's best-looking studio setup. Verify that the character reads well at small sizes and that materials survive the runtime's lighting/color-management path.
6. Measure file size and inspect performance. If compression or simplification is considered, compare the compressed result to the uncompressed reference and ensure no visual loss breaks the fidelity gate.
7. Load and unload cleanly. Ensure the web integration does not leave stale GPU textures/materials or create multiple WebGL contexts. Preserve the current app's existing loading and error conventions.

## 10. Acceptance checklist — all critical items must pass

### Reference fidelity — critical

- [ ] The correct, original model sheet was located, opened visually and recorded by exact path.
- [ ] All available views and callouts were used; no source view was silently ignored.
- [ ] The base model's silhouette, proportions, face, hair/headwear, outfit, distinctive details and base-color assignments match the sheet.
- [ ] Front/side/back comparison renders exist for every supported reference view.
- [ ] Overlays/side-by-side views were inspected; material differences were corrected rather than hidden by lighting or camera angle.
- [ ] No unapproved redesign, generic placeholder, random decoration, missing accessory, invented logo or identity drift remains.

### Blender source and rig — critical

- [ ] The editable `.blend` opens without missing references, textures, linked assets or broken external paths.
- [ ] Collections, objects, materials, rig and actions are named and organized.
- [ ] A real functional armature or equivalent validated bone/parent rig drives the character.
- [ ] Major joint rotations and animation poses show no unacceptable stretching, broken silhouette, clipping or detached parts.
- [ ] Root/origin, scale, ground plane and forward/up conventions are documented and consistent across outfits.

### Animation and outfits — critical

- [ ] `Idle`, `Walk`, `Run`, `Jump`, `Wave`, and `Point` exist in the exported file and have been played from the target loader (not only from Blender).
- [ ] `Idle`, `Walk` and `Run` loop without visible pops; locomotion does not introduce unwanted root travel.
- [ ] Gesture clips have a controlled beginning/end; no mesh snapping or stale pose after rapid clip changes.
- [ ] Outfit variants keep identity, scale, origin, rest pose and skeleton compatibility; at least one runtime change is demonstrated.
- [ ] No unacceptable outfit clipping, floating props, geometry gaps or texture/material mismatch occurs.

### Web delivery — critical

- [ ] `.glb` loads in the real app/approved test harness and is not just a static render.
- [ ] Camera framing, scale, face readability, lighting and materials look correct in the target runtime.
- [ ] Scroll-linked movement is reversible when scrolling down and back up; rapid scrolling and resize do not break the state.
- [ ] Reduced-motion/static fallback remains usable; essential content is not dependent on animation or WebGL.
- [ ] A mobile-size pass and load/error-state pass were performed and documented.
- [ ] File sizes, triangle/material counts, export warnings, validation errors and remaining limitations are reported.

A failed critical item means **not ready**. State exactly what failed, fix it, and rerun the relevant test. Do not downgrade the acceptance criteria silently.

## 11. Mandatory working sequence for Antigravity

Follow this sequence in the actual existing workspace:

### Phase A — reference and project audit

- Read workspace instructions and inspect source files/assets.
- Locate and visually inspect the model sheet; create a reference inventory and proportion/color/detail checklist.
- Inspect current Blender availability and target website loader conventions.
- Read the official technical references below using the browser if available. Prefer official docs and the version matching the installed software.
- Produce a concise `reference-audit.md` with source paths, confirmed facts, uncertainties and a proposed asset layout.

### Phase B — build a faithful blockout

- Build the major forms in Blender and set up locked reference images/orthographic cameras.
- Render the blockout and compare it with the model sheet.
- Fix the silhouette and proportions before proceeding. Save the comparison evidence.

### Phase C — finish the source model and rig

- Add sheet-accurate detailing and materials.
- Rig the body with a stable root and appropriate rigid/deforming joints.
- Test the neutral pose and joint range. Save the editable `.blend` before creating exports.

### Phase D — animate and variant-test

- Create all required clips that can be delivered credibly.
- Create the first approved outfit variant(s) using the same identity and compatible rig.
- Test animation continuity, mesh intersections, outfit swaps and the exported clips.

### Phase E — export and integrate proof

- Export `.glb` with verified settings; validate and inspect the exported asset.
- Load it in the target app or an isolated test page using the project's existing stack.
- Prove clips, variant swap, framing, scroll reversibility and fallback. Do not build every portfolio section as part of this asset task.

### Phase F — report actual status

Report: exact paths created/changed, model sheet path, Blender version, files/versions exported, animation clip names, outfit approach, visual comparison outcome, validation status, runtime/mobile tests performed, and unresolved blockers. Attach or link the generated comparison renders from the workspace when the environment supports it.

Do not conclude with a generic “done.” Summarize evidence for every critical acceptance item, including any failure.

## 12. Technical references to visit

Use these as live documentation, not as decorative links. Open the relevant page, confirm it applies to the installed version, and follow the supported workflow rather than guessing exporter settings.

- **Antigravity workspace rules and file discovery:** https://www.antigravity.google/docs/rules/
- **Antigravity `/learn` and persistent workspace knowledge:** https://antigravity.google/docs/commands/learn
- **Blender manual — glTF 2.0 import/export (GLB, materials, skinning, animation):** https://docs.blender.org/manual/en/latest/addons/scene_gltf2.html
- **Blender manual — armatures:** https://docs.blender.org/manual/en/latest/animation/armatures/index.html
- **Blender Python API:** https://docs.blender.org/api/current/
- **Blender Python API — glTF export operator:** https://docs.blender.org/api/dev/bpy.ops.export_scene.html (confirm operator options against the installed Blender version before using them)
- **Three.js GLTFLoader:** https://threejs.org/docs/pages/GLTFLoader.html
- **Khronos glTF Validator project and local validation options:** https://github.com/KhronosGroup/glTF-Validator
- **Khronos live glTF Validator:** https://github.khronos.org/glTF-Validator (only use with acceptable export-upload handling; never upload the source model sheet)
- **GSAP ScrollTrigger (if compatible with the existing app):** https://gsap.com/docs/v3/Plugins/ScrollTrigger/

The asset decisions must be driven by the supplied model sheet, tested Blender exports, and the actual portfolio loader. Documentation, generator output, and a beautiful still render do not replace those checks.
