# Reference Review — SEBG and Implementation Sources

## SEBG.ch: patterns to learn from
Reference: https://www.sebg.ch/

Readable page text confirms the opening “Hi, I'm Seb. Scroll down and I'll show you around,” the project narration for Jaeger-LeCoultre, Respawwwn and Sierre Anniviers, a short “I build websites that move” positioning statement, a collection of individual project links, a “Do a trick” interaction, “Dress me up”, and contact via email/LinkedIn/GitHub. A browser-readable pass also showed character prompts such as Dance, Punching bag, Panic, Fly, Vanish, Hiccup, Peekaboo, Selfie, Dizzy, Sneeze and Sulk. This supports the idea that the character works as a tour guide and interactive companion, not merely a hero image.

### Interaction checklist for the human/AI implementer
- Initial load: character pose, loading behavior, first-screen hierarchy and prompt to scroll.
- Scroll: character locomotion between scene anchors; project reveal timings; word-highlight synchronization; no sudden jump or overlap.
- Project previews: desktop images, phone images, project copy and outbound “View project” actions.
- Character actions: test all visible buttons; verify pressed/hover/focus states and whether each action visibly performs.
- Dress-up / transform: check asset/material swap, animation continuity, repeatability and whether the world/theme changes without flashing or resetting scroll.
- Contact: email, LinkedIn, GitHub and footer controls.
- Responsive: mobile interaction/character position, project previews and whether motion controls remain reachable.
- A11y/performance: reduced motion, keyboard operation, contrast, image alt text, no scroll trapping, failure fallback.

### What is not claimed here
This document records a content and interaction-pattern review, not a completed hands-on visual QA session for every SEBG button. The available text-oriented browser read does not provide reliable screenshot capture or button click automation. Any implementation agent with full browser tools must run the full checklist and record screenshots/video or test notes. Do not report buttons or motion as “tested” before doing it.

## Avichal's own existing implementation is a valuable reference
Repository: https://github.com/avichal15/calling-app-/
- `website/README.md`: documents a mobile-first Phoney promotional site with one continuous Three.js world across five chapters, character/scene controls, a simple/static mode, reduced-motion behavior and a clear statement that this marketing site does not access microphone, contacts or authentication.
- `website/DESIGN_V3.md`: describes its current visual direction, measured scene slots, shared 3D scene, GSAP scroll-chapter choreography, static fallback, reduced-motion behavior, and local QA dimensions.
- `website/src/App.tsx`: shows the existing React state/chapter architecture and a GSAP entrance effect; inspect rather than blindly copying it.
- `website/src/world/` (inspect repo) holds the scene/world implementation. `website/src/experience.css`, `website/src/mobile.css` and `website/src/studio.css` contain layout and responsive styles.
- `docs/PRODUCTION_STATUS.md`, `docs/TEST_RESULTS.md`, `work/handoff.md` document current product/release and test status. Read them before writing Phoney claims.

This repo is the first implementation reference for how Avichal already uses Three.js + GSAP + React and how he documented fallbacks and QA. Reuse concepts, not necessarily code: the main portfolio's story, art direction, content model and brand system differ from Phoney.

## Technology / source references

1. **Three.js** — https://github.com/mrdoob/three.js — direct scene/renderer/model foundation.
2. **GSAP** — https://github.com/greensock/GSAP — use GSAP timelines with ScrollTrigger (https://gsap.com/docs/v3/Plugins/ScrollTrigger/) for scroll-linked animation and timeline labels. Do not bind expensive DOM layout writes to every raw scroll event.
3. **React Three Fiber** — https://github.com/pmndrs/react-three-fiber — optional only if the project is intentionally built with declarative React scene components. Since Phoney already uses direct Three.js, prefer one approach rather than mixing React Three Fiber with a direct renderer without a clear reason.
4. **Drei** — https://github.com/pmndrs/drei — optional helpers if React Three Fiber is chosen; not a requirement for direct Three.js.
5. **GLTF Transform** — https://github.com/donmccurdy/glTF-Transform — optimize validated GLB/GLTF assets (prune, compress, resize textures) after rigging; keep editable source model separately.
6. **gltf.report** — https://gltf.report/ — inspect model geometry/material/texture size before shipping.
7. **CyberFiction reference** — https://github.com/heykaranofficial/cyberfiction (verify availability/status; referenced for the genre of avatar-led scroll storytelling, not to clone).
8. **Lenis** — https://github.com/darkroomengineering/lenis — optional smoothing layer only if native scroll + ScrollTrigger integration is correctly configured. Avoid scroll hijacking and preserve browser expectations/accessibility.

Before adopting any external repository or dependency, verify current maintenance, license, security, bundle size and whether a small hand-written implementation is simpler. Avoid collecting many “cool” repos when one proven stack covers the use case.
