---
trigger: model_decision
description: Apply when running, testing, reviewing, or claiming completion of portfolio features.
---

# Quality and Validation Rules

- First discover the project's existing package manager and scripts. Do not assume npm, Vite, Next.js, React Three Fiber or any particular framework until `package.json` and entry points are inspected.
- Use the smallest change that fits the current architecture. Pin additions to justified dependencies and avoid installing multiple libraries that solve the same job.
- Before visual work, capture the baseline and identify existing broken behavior. Keep a concise change log.
- Test direct navigation and reload for every project/certificate route, all top action links, next/previous detail navigation, and missing optional URLs.
- Verify hero and each project transition on desktop, tablet and mobile. Scroll both forward and backward; test fast scrolling, resizing and browser history.
- Check normal mode ↔ Gotham mode from the hero, a project detail page, the archive, and with keyboard focus. Theme state should not break navigation or content.
- Verify avatar/model loading states, an error/static fallback, keyboard access, touch input, and `prefers-reduced-motion`.
- Confirm no horizontal overflow, no text behind/under the character, no clipped dialogs, no dead buttons, and no console errors from missing models/animations.
- Run existing typecheck, lint, unit tests and production build scripts when available. Report exact results. Do not claim a visual or device test that was not performed.
- Do not mark placeholder buttons as functional. Any not-yet-ready feature must be omitted, disabled with an explanation, or clearly labelled as a preview.
