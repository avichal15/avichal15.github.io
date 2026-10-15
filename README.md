# Avichal Goyal — Complete Antigravity Portfolio Handoff Kit

This is a **standalone instruction and execution package** for building Avichal Goyal's complete portfolio in the Antigravity environment. It combines the full product brief, persistent workspace rules, first-run audit prompt, end-to-end execution prompt, the complete Blender 3D asset specification, a dedicated Blender task prompt, project/certificate routing requirements, design and motion rules, research references, phased roadmap and acceptance tests.

> **Important scope note:** This ZIP contains the complete build brief and instructions for producing the 3D asset. It does not contain Avichal's private existing website repository, source screenshots/certificates, the original character model sheet, or a completed `.blend`/`.glb` model. Those are source inputs / generated deliverables. The agent must locate them in the active workspace or clearly report if a required source input is missing. It must never fabricate a model sheet or claim an unbuilt 3D asset is included.

## Use this kit

### Recommended: let Antigravity execute the full project
1. Open Antigravity with the actual portfolio workspace available. If the project folder is not obvious, let the agent find it by inspecting the active workspace and plausible project directories; it must confirm the target by checking the project files and Git metadata rather than treating this instruction ZIP as the website source.
2. Attach or extract this ZIP so the agent can read every file. If it extracts the package, it should do so into a safe working directory, then **merge** `AGENTS.md` and `.agents/rules/` into the actual target workspace only after comparing existing rules. Never overwrite existing rules or project files blindly.
3. Open `MASTER_EXECUTION_PROMPT.md` and paste its full contents into Antigravity. This is the main execution prompt for the full portfolio build.
4. Allow it to inspect, research, plan, implement in phases, use available browser and local tools, build and validate the Blender asset when the source sheet is available, test the real site, and report evidence. It should not stop after writing a plan unless a genuine blocker exists.

### If you want an inventory report before any code changes
Use `ANTIGRAVITY_FIRST_PROMPT.md`. It is intentionally **audit-only** and must not mutate the target workspace.

### If you want to isolate the Blender work
Use `ANTIGRAVITY_BLENDER_ASSET_PROMPT.md` after the agent has found the real model sheet and audited existing avatar assets. The detailed contract is `docs/BLENDER_3D_ASSET_SPEC.md`.

## File map

- `AGENTS.md` — always-on workspace constraints and source-of-truth hierarchy.
- `AGENT_BRIEF.md` — complete product and portfolio brief, identity, story, copy and visual intent.
- `MASTER_EXECUTION_PROMPT.md` — **main one-prompt full-build instruction**. Use this for autonomous, phased work.
- `ANTIGRAVITY_FIRST_PROMPT.md` — audit-only first prompt, preserving the original cautious workflow.
- `ANTIGRAVITY_BLENDER_ASSET_PROMPT.md` — dedicated Blender modelling/rigging/export task prompt.
- `.agents/rules/*.md` — persistent focused rules for content, avatar, Blender, visual design, browser research/evidence and QA.
- `docs/BLENDER_3D_ASSET_SPEC.md` — strict model-sheet fidelity, editable Blender source, rig, clips, wardrobe variants, GLB export, proof and acceptance gates.
- `docs/PROJECT_AND_CERTIFICATE_ROUTING.md` — routes, detail pages, top actions, archives and previous/next navigation.
- `docs/CONTENT_SOURCE_OF_TRUTH.md` — content inventory and truthfulness rules.
- `docs/PRODUCT_STORIES.md` — project-specific story direction and factual boundaries.
- `docs/IMPLEMENTATION_PLAN.md` and `docs/IMPLEMENTATION_ROADMAP.md` — staged execution plans. The master prompt uses the implementation plan as the canonical phase gate; the roadmap is supporting detail.
- `docs/ACCEPTANCE_TESTS.md` and `docs/PORTFOLIO_ACCEPTANCE_TESTS.md` — engineering, content, 3D, accessibility, responsive and visual completion checks.
- `docs/AVATAR_DECISION.md`, `docs/PORTFOLIO_AVATAR_AND_MOTION.md`, `docs/REFERENCE_REVIEW.md`, `docs/REFERENCE_AUDIT_CHECKLIST.md` and `docs/TECH_STACK_AND_REPOS.md` — pipeline rationale, motion design, source/repo inventory and reference-study requirements.
- `docs/TECH_REFERENCES.md` — official documentation and project URLs that the agent must actually visit and verify.
- `docs/FINAL_VALIDATION_REPORT_TEMPLATE.md` — required final evidence-based handoff report.
- `docs/ASSET_INPUTS_AND_DELIVERABLES.md` — what must be found, generated and handed back.

## Non-negotiable operating rules

1. Correct identity: **Avichal Goyal**.
2. Featured order: **MediStudyGo → Phoney → TruGifting Solutions → Masterplayer Designs & Printing**.
3. Preserve and expose all additional projects and credentials already present in the actual workspace.
4. Treat the actual supplied character sheet as the exact visual truth for the 3D model. If missing, keep working on the rest of the site with an honest placeholder/fallback, but do not invent the character or declare the Blender work complete.
5. Use the existing website framework and data wherever possible; no blind rebuild or destructive overwrite.
6. Do not copy SEBG's proprietary assets/design verbatim. Research its interaction patterns and create an original experience.
7. Do not deploy, change DNS, publish secrets, or overwrite source assets without explicit authorization.
8. Report what was actually run, opened, clicked, rendered, compared and tested. Never claim a check was performed just because a prompt requested it.
