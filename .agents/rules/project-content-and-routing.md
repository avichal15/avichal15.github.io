---
trigger: model_decision
description: Apply when inspecting, importing, displaying, routing, or editing portfolio projects, certificates, links, and case-study content.
---

# Project and Certificate Content Rules

- Audit the current folder before adding a content model. Prefer adapting an existing inventory or data file. Never create competing sources of truth for the same projects/certificates.
- Preserve all owner-provided project and certificate entries. The four featured projects are a curated front page; all other inventoried work and credentials remain accessible in a project archive or certification section.
- Featured order is immutable unless the owner explicitly changes it: MediStudyGo → Phoney → TruGifting Solutions → Masterplayer Designs & Printing.
- Use one reusable detail-page template for project entries and a compatible credential-detail template for certifications.
- Every project detail page should include: title, brief overview, context/problem, Avichal's role, what he actually built, tools/technical decisions where evidenced, screenshots/mockups, current status, and a clear outcome. Omit unsupported sections instead of fabricating content.
- Project detail-page top actions, where the relevant URL exists: `Visit live site`, `View source / GitHub`, and any relevant supporting link. Hide unavailable actions; never invent URLs.
- Certification detail pages should use issuer, exact credential name, date/expiry when known, credential ID only if present in the local source, evidence image/PDF if present, and `Verify credential` or `View certificate` linking to the actual issuer URL. Do not create fake certificate pages or verification URLs.
- At the bottom of each detail page, provide an editorial “Next project” preview card with a thumbnail, title and short description, plus previous/next navigation where applicable. It should link to an internal detail page, not jump straight to the external project URL.
- External links must be real anchors. Use safe new-tab attributes where appropriate. Do not use JavaScript-only click handlers for ordinary navigation.
- Do not assume websites allow iframe embedding. Use approved screenshots in desktop and mobile frames. Clearly label screenshots as previews when needed; external buttons visit the original website.
- Use stable slugs generated from the existing canonical IDs/slugs when available. Do not derive identity from display titles at render time if the data already has a slug.
- Maintain direct URL routes that survive reload. Detail pages should work when opened directly, not only after clicking a card.
- Keep all card, detail-page, next-project and certification data driven by the shared inventory so ordering and links stay consistent.
