# Avichal Goyal Portfolio — Master Agent Brief

## Purpose
Build a distinctive, story-driven portfolio for **Avichal Goyal**. It must simultaneously work as (1) a credible portfolio for software/product/AI engineering roles and (2) a direct introduction for potential clients. The experience should feel personable, confident, creative, and unusually well-crafted—not like a generic agency landing page, a template, or a buzzword-heavy résumé.

## Correct identity and positioning
- Name: **Avichal Goyal**. Never use Avichal Chahana/Chenana or another person's identity.
- Headline, verbatim: **“I’m a product-minded software engineer who builds web products, AI tools, and automations that make real-world work easier.”**
- Intro begins: **“Hi, I’m Avichal Goyal.”**
- Style of writing: straightforward, warm, calm, slightly playful and conversational. Confident without bragging. Explain work as a person telling a story, not a sales deck.
- Education: B.Tech in Computer Science Engineering; SRM Institute of Science and Technology. Confirm preferred official campus/certificate wording before publishing a specific campus claim.
- Work status: MediStudyGo is past work, not current. Masterplayer Designs & Printing is current ongoing work. Phoney is Avichal's own application in beta/testing stage.

## Primary inspiration and boundaries
Reference: https://www.sebg.ch/
- Learn from the *experience pattern*: a playful character greets the visitor, guides a scroll-led tour, responds to interaction, gives short first-person explanations of projects, and remains part of the ending/contact experience.
- Project case studies combine story copy with large desktop previews and phone mockups. The visitor should understand a project as it is revealed, rather than read a conventional list of features.
- There is a secondary all-work grid and individual project pages.
- Do **not** copy Sebastien Graf's name, character, project text, proprietary visuals, exact scenes, layouts, CSS, assets, or branding. Create an original LEGO-inspired visual language and use Avichal's own approved character sheet and project screenshots.
- Website interaction testing is required before claiming a reference has been inspected: test buttons, cursor/touch interaction, scrolling, project links, responsive layout, and animation. If no browser-control tool can click and capture visual state, document the limitation instead of pretending it was tested.

## Project narrative order — fixed
1. **MediStudyGo** — former work / contribution during engagement. Website: https://medistudygo.com/ . Show website mockup plus mobile app screens if approved assets exist. Explain the actual systems/work personally delivered, only after validation against known records or Avichal's confirmation. Candidate topics from prior context include onboarding/learner provisioning, automations, CRM/workflows, reporting and cross-functional operations; do not imply all were engineering features or all remain live.
2. **Phoney** — Avichal's own Android calling application, currently beta/testing stage. Product site: https://phoney.avichalgoyal.me/ (also user calls it `phoney.avichalgoyal.me`; do not silently substitute `phony`). GitHub: https://github.com/avichal15/calling-app- . Describe it as Avichal's first Android application built from scratch, if the owner confirms that exact wording. Explain the dialer experience and Audio Emojis, inviting interested visitors to ask about beta testing. Be accurate about what's available on-device and in beta. Never advertise “record calls without any declaration”; the implementation has explicit recording-consent/acknowledgement UX and the product/legal requirements vary. Safe phrasing: “Includes a call-recording feature with an explicit consent flow” only if the current shipped/beta implementation supports it. Don't make legal, privacy, compatibility, or production readiness guarantees.
3. **TruGifting Solutions** — website: https://trugiftingsolutions.com/ (an indexed related site uses `trugiftingsolutions.in`; use the URL the owner named as primary, and verify canonical domain before final link). GitHub candidate: https://github.com/avichal15/trugifting-solutions (private repo may not be fetchable anonymously). Tell the story of the website/product work in plain language. Confirm actual contribution list and live status before making claims.
4. **Masterplayer Designs & Printing** — current ongoing client work. Website: https://masterplayerprints.com/ (also repo: https://github.com/avichal15/Masterplayer). Discuss real delivered/in-progress work without overpromising. Repository README describes an e-commerce storefront, Shopify theme/checkout integration, product customizer, B2B bulk/GST calculator, and related features; verify which are currently deployed before implying they are live on the named domain. Explain it as ongoing collaboration, not a completed case study.

Open-source work to show as a separate “Under the hood / Open source” section or fifth story-card in the work grid:
- **OmniRoute Session Sync**: https://github.com/avichal15/omniroute-session-sync — community-maintained Chrome extension/local bridge for keeping selected browser-session credentials in sync with OmniRoute through the management API. It is an independent companion integration, not OmniRoute core. Be precise about this contribution. Avoid implying the OmniRoute owner said the pain point was theirs until exact evidence/quote is provided and approved; user reports the owner described the issue as a pain point.
- **InstaManager**: https://github.com/avichal15/Insta-manager — creator-focused Chrome extension for Instagram Web.
- **Recruitment Funnel Dashboard**: https://github.com/avichal15/recruitment-funnel-dashboard — synthetic recruitment funnel analytics dashboard; clearly label data synthetic.
- **WhatsApp to CSV Converter**: https://github.com/avichal15/whatsapp-to-csv-converter — README says it was created for MediStudyGo because writing prompts were exhausting.

## Experience map
A. **Hero / character introduction**
- Primary text: “Hi, I’m Avichal Goyal.” followed by the exact headline above.
- Main avatar sits on the right; typography on the left. LEGO-brick surface texture appears throughout, subtly—not as noisy clipart or a toy-store theme.
- A clear “Transform” control under the avatar toggles the alternate Gotham-inspired theme. The regular state should work beautifully without touching this control.
- The character starts with an idle/emotive pose and is the visual guide through the page.

B. **Short personal introduction between hero and first project**
Suggested draft (edit only for factual precision):
“Hi, I’m Avichal. I studied Computer Science at SRM and I like figuring out how things should work, then building the software to make that happen. I’ve worked across product operations, web projects, automations and my own apps. After my time at MediStudyGo, I started taking on more independent projects—while continuing to build things of my own. Here’s a quick look at what I’ve been working on.”
Avoid “student” after graduation. Use “B.Tech graduate” or “Computer Science graduate”. Do not frame leaving MediStudyGo negatively or divulge confidential reasons.

C. **Four scroll-led flagship project chapters**
- Each chapter has a concise first-person speech bubble, subtle word/character reading highlight synchronized with scroll progress, and aligned visual product mockups.
- Use a wide desktop-browser frame plus a separate phone frame when appropriate (MediStudyGo first). Keep the actual story copy in the DOM, accessible and selectable; highlighting is a visual layer only.
- Avatar walks/climbs/runs between chapters, then performs a themed wardrobe/prop transformation. It can cross sides on selected transitions; do not force every transition to use the exact same animation.
- Screenshots and mockups should be real project assets, not invented branded interfaces. Put placeholders in clearly labeled asset slots until screenshots arrive.
- Content must stay readable and usable with animation disabled, on mobile, and if WebGL fails.

D. **Project index / archive**
- After the four showcase chapters, the avatar shrinks/moves into a small persistent circular avatar at bottom-left (or another corner only if responsive usability requires it).
- Show clickable project cards; each opens an internal portfolio detail route/modal with problem, role, contribution, implementation, outcome, lessons, screenshots and relevant links.
- Show education, certifications, and technical focus below/alongside the archive. Certification names, issuer, date, and credential URLs must be supplied/verified; never invent certificates.
- A project detail offers “Visit live project” and, where applicable, “View source” or “View certificate”. External actions clearly open the real destination. Never make the project card only a dead mockup.

E. **Contact / footer**
- Big approachable contact call-to-action with avatar standing nearby.
- Prominent email button (default known address from app repo: `avichalgoyal15@gmail.com`; confirm before launch), GitHub `https://github.com/avichal15`, LinkedIn `https://www.linkedin.com/in/avichalgoyal007/`, and approved social links only.
- Copy-to-clipboard should provide visible confirmation. All contacts remain real clickable links.

## Theme-transform interaction
- Button label in normal mode: “Go Gotham” or “Transform” (choose one and keep accessible name explicit).
- Click toggles a complete, cohesive dark Gotham mood: low-light brick city/skyline, dramatic but readable light, restrained rain/spotlight treatment, darker materials and LEGO Batman-inspired *original generic masked-hero styling*.
- Do not use Batman/DC logos, exact film character models, or protected artwork without appropriate rights. The character should be a playful, block-built, bat-inspired version rather than an unlicensed replica.
- User's display identity changes only in the visual theme treatment: show an optional stylized “BATMAN MODE” label, but keep accessible and factual identity as “Avichal Goyal” in metadata, document title, footer/legal/contact, assistive text, canonical/SEO metadata, and any contexts where identity must remain accurate. Never literally change the person's name across all factual contexts.
- Toggle must animate using existing geometry/materials and preloaded assets, not remount the entire scene or reload the page. Button works with keyboard and touch, has a clear pressed/state indication, and can toggle back reliably.

## Tone and microcopy
- MediStudyGo: matter-of-fact reflection on the systems/work Avichal contributed to during his time there. Not “I revolutionized healthcare”.
- Phoney: “This is Phoney. I built my first Android app from scratch. It’s a dialer with a few extra ideas—Audio Emojis are the fun part. It’s in beta, so I’m looking for people who want to test it and tell me what breaks.” Use as a direction, not a claim that any listed feature works on every device.
- TruGifting: plain explanation of what site/problem was tackled; owner to confirm role/results.
- Masterplayer: “I’m working with Masterplayer Designs & Printing on their digital storefront and the systems around it.” Then list only verified current deliverables.
- Open source: explain the friction, the integration, and what changed. Be explicit that OmniRoute Session Sync is an independent community-maintained project.

## Quality bar
The target is an original portfolio with a clear hierarchy and memorable motion—not motion for motion's sake. Prioritize readable copy, stable project screenshots, believable character motion, scroll continuity, accessible controls, and excellent mobile fallback. Do not attempt all the most expensive effects simultaneously in the first build.

## Definition of done
See `docs/ACCEPTANCE_TESTS.md` and `docs/IMPLEMENTATION_ROADMAP.md`. No section is done just because the JSX compiles: verify real desktop/mobile behavior, project destinations, motion state changes, loading/failure fallbacks, reduced-motion behavior and all controls.
