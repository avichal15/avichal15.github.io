# Implementation Roadmap

Work in small stages with a review checkpoint after each. Do not tell the agent to build the entire final experience in one prompt.

## Stage 0 — Audit and content lock
1. Inspect current portfolio repos and determine the target repo (prefer one canonical repo rather than making a new prototype each time).
2. Inspect SEBG with real browser tools if available: screenshots at desktop/mobile; test each character action, project CTA, dress-up, contact link and scroll chapter. Record observations and limitations.
3. Audit all supplied LEGO character-sheet images and project screenshot assets; create `public/assets/manifest.md` with filename, owner/permission, source, dimensions and intended usage.
4. Verify canonical URL and status for MediStudyGo, Phoney, TruGifting and Masterplayer; distinguish live vs in-progress features.
5. Have Avichal approve project story copy, approved metrics, contact email/socials and certificates.
**Gate:** no modeling or polished animation until identity/content/asset list is stable.

## Stage 1 — Responsive static structure
- Implement React/TypeScript application, routes, semantic text and navigation.
- Build hero, intro, four project sections, archive, education/certification area and footer with static images/placeholders.
- Add responsive project frames and mobile screens.
- Add functional internal detail routes and verified external CTA links.
**Gate:** readable and navigable without WebGL/animation at 320px mobile, 390px mobile, 1280px and 1920px desktop.

## Stage 2 — Visual system
- Define LEGO-inspired surface, stud/seam pattern, neo-brutalist frame system, type scale, border/shadow tokens and project-specific accents.
- Ensure brick texture does not undermine text legibility.
- Implement project window/phone frames and screenshot crops based on real supplied artifacts.
**Gate:** visual review for hierarchy, consistency and brand correctness before 3D.

## Stage 3 — Character model proof of concept
- Build or commission base GLB and rig from approved sheet.
- Prove idle, turn, walk and one wardrobe transition in an isolated test route.
- Confirm pivot/origin/scale, mobile texture cost, file size and first-load time.
- Prototype Gotham/bat-inspired alternate outfit with original design.
**Gate:** no scroll-story integration until model looks correct and pose/outfit swap is smooth in isolation.

## Stage 4 — Scroll choreography and word narration
- Introduce one persistent Three.js scene and GSAP timeline anchored to real DOM chapter positions.
- Implement hero-to-project travel, chapter poses, selected side changes, jump/land transition and archive shrink.
- Sync speech-bubble reading highlight with narration progress while preserving selectable accessible text.
- Make theme changes independent from timeline progress; toggling theme should not reset scroll or recreate the canvas.
**Gate:** resize, reload mid-page, scroll in both directions, rapid scroll, reduced-motion and WebGL fallback tested.

## Stage 5 — Gotham transform
- Add accessible theme toggle, theme variables, lighting/material transition and original bat-inspired avatar outfit.
- Every normal-theme asset/text must remain readable; switch back reversibly at any scroll position.
- Keep factual identity and metadata as Avichal Goyal even when visual UI shows a “Batman Mode” flourish.
**Gate:** theme works from keyboard, touch and all viewport sizes with no unreadable contrast or broken assets.

## Stage 6 — Detail pages, credentials, and final polish
- Add project data-driven routes/modals, all work grid, source links, “Visit project” links, education and verified credentials.
- Add contact CTA, mail link, GitHub and LinkedIn.
- Complete performance, keyboard, accessibility, SEO and broken-link checks.

## Stage 7 — Release verification
- Run build, lint, unit/integration tests.
- Use Playwright/browser to capture screenshot set for defined sizes and test critical click/scroll flows.
- Verify deployed URLs by anonymous HTTPS, canonical/OG metadata, all assets, contact links and project links.
- Report known limitations; don't say “fully tested” if any interactive behavior could not be exercised.
