# Project and Certificate Browsing Pattern

## Desired information architecture

The home page tells a guided story through the four featured projects. A separate “All work” area and a separate certifications/qualifications area make the wider history browsable; the four featured entries must not replace or hide the inventory already present in the workspace.

Suggested routes (adapt to the framework already used):

- `/` — hero, short introduction, four featured work chapters, additional work, certifications, contact.
- `/work/<slug>` — internal detail page for a project.
- `/certifications/<slug>` — internal detail page for a certificate/qualification.
- Optional `/work` and `/certifications` indexes if useful and compatible with the existing site.

Do not add an entirely new routing library if the current application already has a router or can support these routes more simply.

## Home: guided narrative

1. **Hero**: “Hi, I'm Avichal Goyal” and the approved product-minded software engineer headline. Avatar sits on the right initially. The theme control is visible but should not obscure the first-time story.
2. **Short introduction**: concise, warm and factual. Include B.Tech graduation from SRM University only as supported by the local resume/certificate material. Explain the transition from MediStudyGo to independent project work without sounding bitter or over-explaining employment changes.
3. **Featured story 01 — MediStudyGo**.
4. **Featured story 02 — Phoney**.
5. **Featured story 03 — TruGifting Solutions**.
6. **Featured story 04 — Masterplayer Designs & Printing**.
7. **Additional projects**: use the local inventory, including OmniRoute Session Sync, without inventing a fixed count.
8. **Certifications and qualifications**: list every intended item from local data, with issuer and source/verification where available.
9. **Contact**: direct email CTA using the existing verified email address, plus LinkedIn/GitHub and other verified social handles. Avatar may settle into a small persistent or footer pose.

The avatar and background can link the sections visually, but every section's text must remain readable if animation is disabled.

## Project detail template

Each project card opens an internal detail page, not directly to the client website. The internal page is a concise case study and launch point for external links.

Suggested structure:

- breadcrumb/back to all work
- project number / status label where supported
- project title and one-paragraph first-person summary
- primary action area at the top right: `Visit live site`; `View source` when the correct repo exists; `Related documentation` only if a valid link exists
- hero media: actual desktop screenshot, and mobile screenshot when available; use local mockup frames, not an assumed cross-origin iframe
- “The situation” — problem or context
- “What I worked on” — personal contribution, accurately scoped
- “How it works” / selected features — only verified features
- tools and integrations — only those evidenced in the project files
- status/outcome — shipped, beta, ongoing or historical work as applicable
- more proof — extra images, relevant commits or docs where appropriate
- bottom navigation: **Previous project** and **Next project** with title, thumbnail and one-line preview; next card opens the next *internal* case study

For the featured stories, default sequence follows the exact featured order. The broader archive can use a separate consistent order from the existing project inventory. Don't create dead-end detail pages.

## Certificate detail template

A certificate/qualification click opens an internal record that preserves the name, issuer, date and other evidence from the local inventory. Use a credential preview/image/PDF only if present and appropriate.

Top actions, only when supported:
- `Verify credential` — issuer verification URL.
- `View certificate` — source or certificate file/document URL.
- `Download certificate` — only if the source document is actually available and download is appropriate.

Bottom navigation should move to the next/previous credential in the same collection, with a small preview card. If an issuer verification URL is missing, don't fabricate one; show the certificate evidence and explain the source in plain language.

## Link behavior

- Use normal anchors and valid internal URLs so direct navigation and browser back/forward work.
- External actions must be tested; open external sites in a new tab where appropriate and use secure `rel` values.
- Hide buttons for missing links rather than linking to `#`, an invented path or a generic home page.
- The presence of a screenshot does not imply a working/live site. Clearly distinguish preview media from the actual live-site action.
- Don't embed a full external project page until the agent verifies its embedding policy. If blocked, a screenshot mockup is the intended fallback.

## Acceptance criteria

- All existing project and certificate items remain accessible.
- Each featured project appears once in the correct order on the home page.
- A featured card opens its internal detail page; the top action opens the correct external URL.
- Previous/next cards work across all detail pages and do not dead-end unexpectedly.
- Directly loading a detail route and refreshing it succeeds.
- Missing optional data doesn't create empty headings or dead buttons.
- The page remains navigable when JavaScript/3D assets fail gracefully.
