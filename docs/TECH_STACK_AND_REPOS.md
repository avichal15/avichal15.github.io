# Technology Choices and Repository Reference Map

## Preferred stack for this portfolio
Use the smallest coherent stack that meets the experience:
- React + TypeScript + Vite for site shell, routing/data, semantic content and build.
- Three.js for the persistent 3D scene and character (aligned with the existing Phoney promotional site's direct-Three.js approach).
- GSAP + ScrollTrigger for scroll-linked choreography and timeline labels.
- CSS for neo-brutalist frames, layout, typography, borders and responsive behavior.
- Optional: Lenis only if native-scroll behavior remains correct, keyboard interaction works and `prefers-reduced-motion` disables smoothing. Native scroll is the baseline.
- Keep project data in typed declarative data (titles, copy, images, URLs, status, role tags, visible features, safe claims) rather than hardcoded markup duplicated across components.

Do not add React Three Fiber solely because it is popular if direct Three.js is already better matched to the team/repo. Pick one main scene architecture and document the decision.

## Existing repos belonging to Avichal (first priority to inspect)

| Purpose | Repository / URL | What to inspect |
|---|---|---|
| Existing visual/interaction architecture | https://github.com/avichal15/calling-app- | `website/README.md`, `website/DESIGN_V3.md`, `website/src/App.tsx`, `website/src/world/`, `website/src/experience.css`, `website/src/mobile.css`, `website/src/studio.css`; current scroll chapter, Three.js, GSAP, static fallback and reduced-motion design |
| Phoney product state & claims | https://github.com/avichal15/calling-app- | `work/handoff.md`, `docs/PRODUCTION_STATUS.md`, `docs/TEST_RESULTS.md`, `docs/PRD.md`, `docs/UX_SPEC.md`; treat current build and rollout status as source of truth |
| OmniRoute Session Sync | https://github.com/avichal15/omniroute-session-sync | README, GUIDE.md, architecture, tests; independent companion integration, explicit data-flow boundaries and limitations |
| Masterplayer | https://github.com/avichal15/Masterplayer | README, `DESIGN.md`, `package.json`, storefront routes, deployed/live-feature evidence; private repository access may be required |
| TruGifting | https://github.com/avichal15/trugifting-solutions | source and README if authenticated; private repo may not be externally readable |
| MediStudyGo automation helper | https://github.com/avichal15/whatsapp-to-csv-converter | actual implementation and README to describe a tool built for a former work context |
| Instagram tools | https://github.com/avichal15/Insta-manager | extension functionality and architecture |
| Recruitment analytics | https://github.com/avichal15/recruitment-funnel-dashboard | synthetic-data warning and dashboard screenshots |
| Profile README | https://github.com/avichal15/avichal15 | correct profile name, identity, current linked portfolio and positioning |

## External source projects to assess (not to copy wholesale)

- Three.js: https://github.com/mrdoob/three.js — scenes, materials, cameras, GLTF loader.
- GSAP: https://github.com/greensock/GSAP — timeline/animation library. ScrollTrigger docs: https://gsap.com/docs/v3/Plugins/ScrollTrigger/.
- React Three Fiber: https://github.com/pmndrs/react-three-fiber — alternative architecture if a declarative React scene is preferred; not required for the direct-Three.js stack.
- Drei: https://github.com/pmndrs/drei — helper collection for R3F, only if R3F selected.
- glTF Transform: https://github.com/donmccurdy/glTF-Transform — asset compression/optimization for GLB/GLTF.
- Lenis: https://github.com/darkroomengineering/lenis — optional smooth-scroll behavior, must respect reduced-motion/accessibility.
- Awwwards interactive-site skill references: `https://github.com/INSANE0777/awwwards-website-skill` is one research source surfaced during discovery. Verify repository status/license and adapt only generic techniques.
- CyberFiction inspiration category: `https://heykaran.dev/projects/cyber-fiction` (public case-study reference surfaced during research); inspect the live page, source/license and exact stack independently before any reuse.

Repository shortlist is a starting point, not a claim every dependency is needed. Pin verified package versions in `package.json` and use lockfiles. Check licenses for third-party code/assets before incorporation. No external source grants rights to SEBG assets or LEGO/DC IP.
