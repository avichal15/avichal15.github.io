# Reference Audit Checklist — SEBG and Existing Portfolio Prototypes

## Status note

This is a checklist for a deliberate visual/interaction audit. The research so far established the visible content structure of SEBG and inspected some of the project page text. The available read-only browser tools did not support independently clicking every control, recording the live animation at different scroll positions, or capturing a full set of visual screenshots in this session. Do not report every item below as already tested.

## SEBG: homepage

Reference: https://www.sebg.ch/

Inspect manually in desktop and mobile browser. Record observations, not assumptions:

- [ ] Initial character pose and first screen hierarchy.
- [ ] Welcome/intro text; where and when supporting text enters.
- [ ] How the character responds to hover, click, pointer drag or other interaction affordances that are actually available.
- [ ] Whether scroll is native, eased, pinned or hijacked; estimate the scroll distance for each major scene.
- [ ] How the character moves between hero and projects; camera changes vs model motion; transitions forward and backward.
- [ ] Any controls/menu for character actions, sound or dress-up; whether they work by pointer, keyboard and touch.
- [ ] Project-specific desktop/mobile previews, aspect ratios and how they enter/leave.
- [ ] Project intro text timing, character speech/typing effect and whether the animation can be interrupted.
- [ ] “All work”/project grid behavior and card open transitions.
- [ ] Footer/contact links, hover/copy actions and character pose.
- [ ] Direct project URL and browser back behavior.
- [ ] Mobile: touch controls, canvas costs, whether the full scene simplifies and whether text stays readable.
- [ ] Keyboard focus, reduced motion and behavior if an animation fails.

## SEBG: project detail page

At least open one project from the homepage (for example `https://www.sebg.ch/projects/jaeger-le-coultre`) and record:

- [ ] Top-right actions and exact labels: live project, repository/source, related links, etc.
- [ ] Project story order and first-person writing style.
- [ ] Images/screenshots and desktop/mobile frame treatment.
- [ ] Project detail layout at two desktop widths and mobile.
- [ ] Bottom next/previous-project preview/template and navigation target.
- [ ] Back-to-all-work behavior and whether current project is excluded from suggested next items.
- [ ] How direct URL opening, page refresh and browser back work.

## Three portfolio prototypes

Open each Google Sites preview and record its actual screen layout, copy, working links and useful assets:

- https://sites.google.com/view/avichal-goyal-creative-enginee/full-page-embed
- https://sites.google.com/view/avichal-goyal-i-build-ai-websi/full-page-embed
- https://sites.google.com/view/avichalgoyalfull-stackaisystem/full-page-embed

For each:

- [ ] Capture full-screen desktop screenshot(s) and mobile screenshot(s).
- [ ] Identify any sections, project data, certificate data or assets worth migrating.
- [ ] Test each project card, certificate, CTA, navigation item and footer link.
- [ ] Separate useful content from design experiments that should not be carried over.

## Your existing codebase

- [ ] Inspect `package.json`, scripts and route structure.
- [ ] Read current design notes/README and inspect existing animation/3D modules.
- [ ] Locate the character sheet, model output, texture, sound and screenshot asset paths.
- [ ] Compare implementation against `website/DESIGN_V3.md` and existing Phoney three.js/GSAP structure if accessible from the local workspace.
- [ ] Record the browser, viewport size, device/GPU if known, and the action used for each test.

## Evidence format

For each interaction record:

`Reference | route | viewport | starting state | action | expected behavior | observed behavior | timing/visual issues | keyboard/touch result | screenshot/recording path`.

Do not guess precise animation duration from memory. If timing matters, capture a short screen recording and inspect it frame by frame.
