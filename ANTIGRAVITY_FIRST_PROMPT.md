# First Antigravity Prompt — Audit Only

You are working inside my existing portfolio workspace. Read the root `AGENTS.md` and relevant `.agents/rules/*.md` before acting.

My name is **Avichal Goyal**. I want an original, character-led, LEGO-inspired portfolio that borrows interaction principles—not source code, assets, exact layout or identity—from https://www.sebg.ch/.

The featured story order is fixed:
1. MediStudyGo (previous work)
2. Phoney (my own first Android app; beta; invite opt-in testers; explain the dialer and Audio Emojis)
3. TruGifting Solutions (independent project after MediStudyGo)
4. Masterplayer Designs & Printing (current collaboration)

Other projects, including OmniRoute Session Sync, must remain accessible in the wider project archive. The existing workspace already contains project and certificate information. That local information is the source of truth. Do not invent entries, remove existing entries or produce a second conflicting project/certificate catalogue.

I am considering HeyGen for my LEGO-style avatar, but the character needs to move around a real-time 3D scene, change outfits smoothly, idle, walk/run/jump, and transform into an alternate Gotham-inspired theme. Do not assume HeyGen can provide a reusable rigged GLB model. Audit the asset requirements and recommend a proof-of-concept before choosing the pipeline.

For the Blender requirements, also inspect `docs/BLENDER_3D_ASSET_SPEC.md` and `.agents/rules/blender-3d-asset-lead.md`. Treat the supplied model sheet as the exact visual source of truth: identify its path and views, inspect it visually, and report whether a usable model/rig already exists. Do not substitute a generic model or claim visual fidelity without comparison evidence.

## This task is AUDIT ONLY — do not modify files

1. Inspect the existing project structure, git status if available, package manager and `package.json`, app entry points, existing route system, design notes, deployment configuration and test scripts.
2. Find every existing project and certificate index/list, source metadata, project case study, certificate asset, live-site URL, repository URL, issuer/verification URL, image, image sheet and 3D/avatar/model/animation asset. Search nested folders too, including hidden project configuration and public/assets folders, without opening secrets or printing token values.
3. Summarize the current implementation and identify reusable modules rather than proposing a blank-slate rebuild.
4. Compare the current data inventory with the intended four featured projects. Report the exact matching local source files and any missing assets/links. Do not guess missing facts.
5. Inspect the existing Phoney website source for its Three.js/GSAP scene, chapter choreography, responsive slots, loading/error states and reduced-motion behavior. State what can be reused and what is product-specific.
6. Create an interaction audit plan for SEBG: hero character interactions, scroll-linked movement, project showcase layout, project-detail outbound actions, bottom “next project” navigation, all-work archive, contact/footer and mobile behavior. State honestly which items you could not test live.
7. Recommend a staged build plan with measurable acceptance criteria. The first technical prototype should validate the model/rig/outfit-swap pipeline and one reversible scroll-linked movement, not build every page.

## Required response format

Return:
- **Workspace inventory**: paths, frameworks, scripts, routes and existing data sources.
- **Project/certificate map**: current entries, their internal assets and available external links, grouped into the four featured projects, other projects and certifications.
- **Avatar pipeline decision**: what exact file format/rig/animation deliverables are required and whether existing assets meet them.
- **Reuse vs build**: existing modules worth preserving; components that need to be added.
- **Risks and unknowns**: especially model licensing, outfit transitions, cross-origin site embedding, animation/performance and missing certificate evidence.
- **Phased execution plan**: phase, scope, files likely touched, tests and acceptance criteria.
- **Questions for me**: only questions that cannot be resolved from the workspace or linked evidence.

Do not start implementation, install dependencies, reformat the repository, overwrite content, change DNS/deployment settings, or create a new scaffold until I review the audit and explicitly ask for Phase 1.
