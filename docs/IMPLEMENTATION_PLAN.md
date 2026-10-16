# Phased Implementation Plan

Execute the phases in order and maintain a working build throughout. Do not stop after making a plan or wait for approval after every routine reversible phase. Pause only for genuinely blocking missing source input/owner decision, destructive actions, credential/security exposure, or deployment. Test the difficult elements before implementing all surrounding UI.

## Phase 0 — audit and content map (read-only)

**Goal:** learn the existing workspace, content catalog, certificates, stack, assets and working features.

Deliverables: inventory, route/content map, asset map, current architecture summary, missing facts/links, reference audit findings, risk register and a specific file-level plan.

Acceptance: during this read-only audit phase, no workspace mutation or dependency installs; no invented project/certificate entries; exact four featured projects listed in intended order. The separate MASTER_EXECUTION_PROMPT authorizes implementation after the baseline is recorded.

## Phase 1 — visual system and interaction blueprint

**Goal:** convert references into an original design system and section-by-section layout before coding the entire animation.

Deliverables: palette/type/spacing/material tokens, wireframes for hero/story/project detail/archive/certificates/contact, character-state diagram, project route map, mobile adaptation, Gotham-mode behavior, and a written interaction flow.

Acceptance: Avichal can inspect the plan and recognize the requested experience; typography and project mockups remain clear without 3D; no SEBG assets or direct clone.

## Phase 2 — avatar asset feasibility proof

**Goal:** validate the asset route, not make the whole website.

Deliverables: character-sheet audit; model/asset provider recommendation; one working GLB in a standalone or existing test scene; one animation clip; reversible scroll-linked position; outfit-swap spike if shared-rig assets are available; static fallback.

Acceptance: model has consistent identity/scale/materials; no visible flash or root pop on one outfit swap; direct manual scroll forward/back works; loading error is contained; mobile and reduced-motion fallback function. If asset isn't available, stop and prepare an exact modelling brief instead of fabricating a substitute.

## Phase 3 — foundation, routing and content registry

**Goal:** preserve the existing app and establish data-driven internal detail pages.

Deliverables: canonical content source of truth, featured order, project/archive routes, certification routes, reusable project/certificate detail templates, outbound actions, next/previous navigation.

Acceptance: all source inventory items remain accessible; four featured slots are correct; every internal route survives refresh; every shown outbound URL is verified or omitted.

## Phase 4 — hero and introduction

**Goal:** make the first impression right before full scrollytelling.

Deliverables: hero greeting/headline, right-side character stage, simple transform toggle, short introduction and start-of-story cue.

Acceptance: text layout does not overlap at agreed desktop/tablet/mobile sizes; avatar loads or fallback appears; CTA and theme toggle work; no-scroll introductory state is understandable.

## Phase 5 — featured project chapters

Implement only one chapter at a time, starting with MediStudyGo. Use actual screenshots with desktop/mobile framing, conversational narration, and scroll-driven character poses. After the first chapter is approved, extend the pattern in fixed order: Phoney, TruGifting, Masterplayer.

Acceptance: each chapter has evidence-backed copy; character movement is reversible; no external site is assumed embeddable; next/previous internal navigation works.

## Phase 6 — archive, credentials and contact

**Goal:** make the entire work history and evidence discoverable.

Acceptance: all projects/certificates found in Phase 0 are represented; certificate issuer/verification actions are real; contact uses verified details; no archive entry is lost just because it isn't a featured chapter.

## Phase 7 — Gotham mode and finishing motion

**Goal:** add the playful alternate look after the normal portfolio works.

Deliverables: dark palette, atmospheric brick/world changes, original Gotham-inspired character variant, a smooth reversible theme transition, persistent toggle affordance, reset path.

Acceptance: theme toggle works by mouse, keyboard and touch; underlying name/SEO/contact/link semantics stay truthful; reduced-motion and fallback modes remain readable and usable.

## Phase 8 — acceptance, performance and release

Test the exact cases in `ACCEPTANCE_TESTS.md` and `AGENTS.md`. Use actual browser checks, screenshots and logs. Run the existing project build/test/lint commands. Verify all links, responsive layouts, direct internal routes, WebGL fallback, reduced motion and no console errors. State clearly anything still untested. Do not deploy until Avichal explicitly requests deployment and checks the deployment target.
