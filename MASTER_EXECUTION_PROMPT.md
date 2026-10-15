# MASTER EXECUTION PROMPT — Build Avichal Goyal's Complete Portfolio

You have been given a complete portfolio handoff kit. Treat it as the project specification, not as the website source code. Your task is to use the actual Antigravity workspace, browser, terminal, installed apps/extensions, and any available Blender automation to build and verify the best practical version of this portfolio. Do not assume you have a limited or generic setup: discover and use the tools that are genuinely available in this configured environment. At the same time, report evidence rather than pretending that unavailable tools or unperformed tests succeeded.

## 0. Read the entire brief before acting
Read in this order:
1. `AGENTS.md`
2. `AGENT_BRIEF.md`
3. `docs/CONTENT_SOURCE_OF_TRUTH.md`
4. `docs/PROJECT_AND_CERTIFICATE_ROUTING.md`
5. `docs/PRODUCT_STORIES.md`
6. `docs/IMPLEMENTATION_PLAN.md`
7. `docs/AVATAR_DECISION.md`
8. `docs/BLENDER_3D_ASSET_SPEC.md`
9. All applicable `.agents/rules/*.md`
10. `docs/TECH_REFERENCES.md`, `docs/REFERENCE_REVIEW.md`, `docs/REFERENCE_AUDIT_CHECKLIST.md`, `docs/TECH_STACK_AND_REPOS.md`, and `docs/ACCEPTANCE_TESTS.md`.

Treat this prompt and the pack as binding constraints. If two documents appear to conflict, prefer the more specific rule about the artifact in question, preserve source truth, and record the chosen resolution in the project notes.

## 1. Locate the real website project and the actual input assets
Do not assume the kit's directory is the web project. Inspect the active workspace and plausible project directories. Identify the real target through `package.json` or equivalent, source entry points, routes, `.git`, README and existing asset/data structure. Check Git status and preserve unrelated user changes. Never print secrets or environment values. Do not overwrite existing `AGENTS.md`, rule files, project data or assets blindly; compare and merge.

Search recursively (including hidden project directories where appropriate) for:
- the original character model sheet / reference images;
- existing `.blend`, `.glb`, `.gltf`, `.fbx`, `.obj`, rigs, animation clips, textures and model licensing notes;
- website source, routes, content catalogues, project/certificate lists, screenshots, thumbnails, PDFs, credentials and metadata;
- the existing Phoney `website/` source and its Three.js/GSAP implementation;
- current framework, package manager, scripts, deployment setup and visual baseline.

Record the exact file paths and visually inspect relevant images/screenshots. Do not upload private source assets to external services. If the model sheet cannot be found locally, search the active conversation/workspace attachments and all reasonable asset locations. If it is still missing, mark the exact-model build as blocked; continue everything else with a clearly identified static/neutral fallback, and make no false claim that the completed character matches the sheet.

## 2. Research the actual references in a browser
Visit each relevant website below using the available browser. Inspect real pages, click links and controls, scroll the page, resize viewports, and capture screenshots where supported. Do not rely solely on extracted text if a visual interface is available.

### Interaction and project-design reference
- Main site: https://www.sebg.ch/
- Case study: https://www.sebg.ch/projects/jaeger-le-coultre
- Case study: https://www.sebg.ch/projects/respawwwn

Inspect the hero greeting, character behavior, scroll progression, project story presentation, desktop/phone mockups, internal detail pages, top action links, previous/next project cards, all-work section, contact/footer and responsive states. Attempt meaningful mouse, keyboard, scroll and touch-like interactions. Keep an audit table showing **tested / observed / not testable**. Learn patterns only; do not clone their exact design, writing, assets or implementation.

### Portfolio-owner project sites/repos
- MediStudyGo: https://medistudygo.com/
- Phoney site as owner-supplied: https://phoney.avichalgoyal.me/
- Phoney repository: https://github.com/avichal15/calling-app-
- Phoney website README: https://github.com/avichal15/calling-app-/blob/main/website/README.md
- Phoney website design notes: https://github.com/avichal15/calling-app-/blob/main/website/DESIGN_V3.md
- Phoney website app source: https://github.com/avichal15/calling-app-/blob/main/website/src/App.tsx
- TruGifting Solutions: https://trugiftingsolutions.com/
- Candidate TruGifting repo: https://github.com/avichal15/trugifting-solutions
- Masterplayer Designs & Printing: https://masterplayerprints.com/
- Masterplayer repository: https://github.com/avichal15/Masterplayer
- OmniRoute Session Sync: https://github.com/avichal15/omniroute-session-sync
- Instagram Manager: https://github.com/avichal15/Insta-manager
- Recruitment Funnel Dashboard: https://github.com/avichal15/recruitment-funnel-dashboard
- WhatsApp to CSV Converter: https://github.com/avichal15/whatsapp-to-csv-converter
- Owner GitHub profile: https://github.com/avichal15
- Owner LinkedIn: https://www.linkedin.com/in/avichalgoyal007/

Verify URLs, content, status, live functionality, public accessibility and repository evidence at execution time. Private repositories may not be publicly inspectable; use local workspace evidence. A URL written in this brief is a lead, not proof that a feature is live. Do not silently change the supplied Phoney spelling/domain; if redirects or canonical URLs differ, document the evidence and use the verified owner-approved destination.

### Official technical documentation — visit the current versions
- Antigravity workspace rules: https://www.antigravity.google/docs/rules/
- Antigravity `/learn`: https://www.antigravity.google/docs/commands/learn
- Blender glTF 2.0 exporter: https://docs.blender.org/manual/en/latest/addons/scene_gltf2.html
- Three.js GLTFLoader: https://threejs.org/docs/pages/GLTFLoader.html
- React Three Fiber model loading (only if the current app uses it or it is justified): https://r3f.docs.pmnd.rs/tutorials/loading-models
- GSAP ScrollTrigger (only if compatible with the current app): https://gsap.com/docs/v3/Plugins/ScrollTrigger/
- Khronos glTF Validator: https://github.com/KhronosGroup/glTF-Validator
- HeyGen Digital Twin guide: https://www.heygen.com/en-in/academy/avatars/how-to-create-a-digital-twin
- HeyGen LiveAvatar help: https://help.heygen.com/en/articles/10035615-how-to-get-started-with-liveavatar

Confirm current API/version details rather than relying on old snippets. Use HeyGen only if it meets the true reusable 3D rig/outfit/animation requirements; a video/talking-head avatar alone does not qualify.

## 3. Define the quality bar and then execute, not just plan
Build a distinctive, genuinely useful professional portfolio for hiring teams and potential clients. Do not stop after writing the audit or a generic proposal. Produce a concise baseline and phase plan, then continue through reversible implementation phases to the best end-to-end result supported by available source assets and tools. Keep progress and changes inspectable. Do not ask the owner to re-state details already in the pack or present in the local project. Ask only when a decision is truly blocking and cannot be resolved through evidence.

### Approved positioning
Intro: **“Hi, I'm Avichal Goyal.”**
Headline, verbatim: **“I’m a product-minded software engineer who builds web products, AI tools, and automations that make real-world work easier.”**
Voice: first-person, calm, warm, straightforward and slightly playful. No inflated agency slogans, made-up outcomes or self-deprecation.

### Design vision
- Character-led, scroll-driven storytelling using Avichal's exact source-sheet character translated into a polished 3D minifigure aesthetic.
- Tactile LEGO-inspired brick/material language and purposeful neo-brutalism; strong type scale, disciplined spacing, intentional borders/shadows, readable contrasts—not noisy toy-shop styling.
- Main hero text on the left and the full character on the right at desktop sizes; an intentional mobile composition at narrow widths.
- A small human introduction between hero and project story.
- Persistent character/world across scenes; project-themed outfits, props, facial/emote changes and environment material/color changes. Use walk/run/jump/climb only where motion is physically credible; do not make repetitive generic animation the point of the site.
- Scroll progress should drive reversible timelines and character positions. Keep native scroll, links, browser history, keyboard and touch behavior intact.
- Use genuine project screenshots and product media. Desktop + phone frame combinations should look art-directed, not like generic floating rectangles. If a screenshot is not found, use a labelled placeholder and record what is missing—never pass an invented UI off as a real screenshot.
- Case-study detail pages must have top-right real actions (`Visit live site`, `View source` and other verified links) and bottom previous/next internal preview cards.
- All existing projects and credentials stay available in a separate archive; featured stories are not the entire catalogue.
- A reversible “Go Gotham” / “Transform” mode can darken the world and use an **original** brick-built masked-hero style. Do not copy Batman/DC characters, logos or protected costume assets. Keep Avichal's true name, SEO, accessibility content, contact and structured data factual.

## 4. Fixed story and content policy
Featured order must remain exactly:
1. MediStudyGo — former work. Possible content areas include learner provisioning/onboarding, workflow automation, CRM, reporting and cross-functional operations, but verify each from local evidence before describing.
2. Phoney — personal Android app, currently beta/testing. Explain dialer experience and Audio Emojis. Invite opt-in testers. Never imply it is fully publicly released if release gates remain; never promote hidden/covert recording. Recording claims need confirmation from current code and consent flow.
3. TruGifting Solutions — independent project after MediStudyGo. Verify shipped work and role.
4. Masterplayer Designs & Printing — current ongoing collaboration. Clearly separate shipped work from work in progress.

Other work (including OmniRoute Session Sync, InstaManager, Recruitment Funnel Dashboard and WhatsApp to CSV Converter) belongs in the additional-project/archive system unless source data or the owner changes the plan. Preserve all additional items found in the real folder. Keep certificates and education sourced from real files. Verify official wording of degree/campus/certificate data before publishing.

## 5. Work phase by phase
Follow `docs/IMPLEMENTATION_PLAN.md` and `docs/IMPLEMENTATION_ROADMAP.md`. At the end of every phase, update a local progress note with what changed, how to run it, test evidence, remaining risks and what comes next. Continue to subsequent phases without waiting for confirmation on routine reversible work.

### Phase 0 — audit and inventory
- Record stack, scripts, routes, local data sources, all content entries, actual project screenshots, certificate docs, avatar/model assets, current design baseline, Git status and tests.
- Capture the current site if possible. Distinguish verified facts, owner-reported facts and unknowns.

### Phase 1 — live reference and visual blueprint
- Actually visit and inspect the URLs above, at desktop and mobile viewports where possible.
- Create an original design system, page/storyboard, avatar-state diagram, responsive plan, routing map and risk register in documentation.

### Phase 2 — Blender asset feasibility / vertical slice
- Follow `docs/BLENDER_3D_ASSET_SPEC.md` in full and the mandatory Blender rule.
- Do not make a whole site animation depend on an unvalidated asset. Prove the model loads, an actual rig animation plays, one outfit can transition without scale/pose pop, and one scroll-linked motion reverses correctly.
- When the source model sheet exists, generate a Blender blockout and exact orthographic comparison before polishing. If it does not exist, document the blocker and continue the rest of the website with the approved non-fabricated fallback.

### Phase 3 — content and route foundation
- Reuse the existing stack; do not add framework/library just because it is familiar.
- Create/normalize a single canonical data registry from the existing project and certificate inventory; no duplicate lists or data loss.
- Ensure internal project/certificate detail routes work when opened directly and refreshed.

### Phase 4 — hero and intro
- Implement greeting/headline, avatar placement and loading/failure fallback, theme control and concise personal intro.
- Ensure legibility and actionability even before model load or with WebGL disabled.

### Phase 5 — flagship stories in the fixed order
- Implement one section at a time, starting with MediStudyGo, testing narrative copy, true screenshots, desktop/mobile mockups, character pose/motion, project theme and direct case-study route.
- Then apply the validated system to Phoney, TruGifting and Masterplayer.
- Verify text accuracy and current live links per project.

### Phase 6 — all-work and credential archive
- Include all source-inventoried projects, certifications and qualifications, not just the 4 feature stories.
- Detail pages need actual top actions and previous/next internal preview links. Hide missing optional links; never use `#` or invented URLs.

### Phase 7 — Gotham / transform mode and finishing
- Make toggle reversible, keyboard/touch accessible, responsive, and continuous across page sections. Avoid complete canvas remount/reload where possible.
- Preserve semantic identity and SEO content, all navigation and animation fallbacks.

### Phase 8 — test, optimize and prepare handoff
- Run build, lint, typecheck and tests available in the existing project; don't invent absent scripts.
- Test desktop, tablet, 390px and 320px mobile widths (or nearest practical), route reload/back-forward, keyboard, touch, `prefers-reduced-motion`, WebGL failure, animation reversal, fast scroll, resize mid-scroll, theme toggle and all outbound links.
- Validate the exported GLB, named animations, loaded asset and real-browser rendering. Use the current installed runtime and validator if available. Capture comparison renders, validation output, browser screenshots and console/runtime findings.
- Do not deploy or modify DNS/hosting without explicit approval.

## 6. Blender character deliverable — strict separate gate
The original sheet is not a vague moodboard. It is the exact appearance specification. Read `docs/BLENDER_3D_ASSET_SPEC.md` completely and use `ANTIGRAVITY_BLENDER_ASSET_PROMPT.md` as the focused subtask. Minimum intended output: editable `.blend`, web-ready `.glb`, functional armature/skinning, named `Idle`, `Walk`, `Run`, `Jump`, `Wave`, `Point` clips, compatible same-identity outfit variants, comparison renders/overlays, asset manifest, validation report, and proof that the actual website loader can load/play/swap the asset. Include `Climb` only if technically and visually credible. Never pretend a missing clip, rig, outfit, or test exists.

### Required model-sheet comparison loop
1. Identify the exact file path and reference views; preserve the original.
2. Record visible design traits in a reference sheet without inventing unseen features.
3. Match camera focal length/orthographic scale and frame the Blender model to the reference views.
4. Produce front/side/back (where the sheet provides them) comparison renders and transparent overlays.
5. Create a discrepancy report covering silhouette, body/limb proportions, head/hair, eyes/face, outfit seams/details, accessories, colors/material roughness and all distinguishing marks.
6. Correct the mesh/materials and re-render. Repeat until all visible critical traits pass. Where a view/detail is absent from the sheet, document the uncertainty; do not manufacture a false claim of exactness.
7. Test the rig at deformation stress poses, run each animation, swap every outfit, export GLB, validate the GLB and load it in the actual site. Test forward and reverse scroll transitions.

## 7. Antigravity tooling expectations
- Discover all available local tools, browser controls, terminal access, Blender installation, Python/bpy support, repository integrations and relevant installed plugins before choosing a limited workflow.
- Use an actual browser to inspect and capture reference sites and the running portfolio. Use screenshots/recordings when the environment supports them. If there is an interactive browser or desktop control interface, use it for UI checks instead of relying only on source text.
- Use Python/Blender scripts for repeatable builds where practical, but inspect results visually in Blender and in the web runtime; script success alone is not visual approval.
- Verify relevant docs from the real official sites listed above before relying on exact current settings/API calls. If using additional tools, visit their official documentation and record URLs in `docs/TECH_REFERENCES.md`.
- Prefer local validation to external uploads, especially for private/copyrighted source images, certificates and project files.
- Use the most capable environment your setup exposes; do not assume every computer or agent has the same tool access. If a capability is absent, offer the next-best reproducible local path and explicitly log the constraint.

## 8. Required completion report
Fill in `docs/FINAL_VALIDATION_REPORT_TEMPLATE.md` with:
- actual target workspace and baseline commit/status;
- phases completed and files changed;
- stack and commands used, with pass/fail outputs;
- exact browser URLs visited and interactions genuinely tested;
- screenshot/evidence paths;
- inventory counts for projects/certificates and any unresolved source gaps;
- Blender source `.blend` and output `.glb` paths, rig/clip/outfit manifest, size, validator results, model-sheet comparison report and in-browser proof—or precise blocker if the sheet was absent;
- responsive/accessibility/reduced-motion/WebGL fallback results;
- remaining bugs/limitations, what was not tested, and recommended next steps.

**Definition of done:** a working, original portfolio that preserves real source content, tells the four flagship stories in order, exposes all existing work/credentials, supports project/certificate detail routes and real external links, has tested responsive/accessibility/fallback behavior, and (when the actual model sheet is available) uses a 3D character that demonstrably matches the sheet and works in the real page. Honest incomplete items are better than fabricated success.
