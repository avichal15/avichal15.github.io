# Complete Acceptance Tests — Portfolio, 3D Asset, Interactions and Delivery

Record evidence for each check. A compile or a screenshot of one state does not prove the full feature works.

## 1. Identity, content and project order
- [ ] Every real identity use says **Avichal Goyal**; no accidental different owner/person name.
- [ ] Hero includes “Hi, I'm Avichal Goyal” and the approved headline exactly: “I’m a product-minded software engineer who builds web products, AI tools, and automations that make real-world work easier.”
- [ ] Featured order is MediStudyGo → Phoney → TruGifting Solutions → Masterplayer Designs & Printing.
- [ ] MediStudyGo is past work; Masterplayer is ongoing/current; Phoney is beta/testing-stage unless current verified evidence changes this.
- [ ] All additional projects and certificates found in the source workspace remain accessible; no duplicate or conflicting catalogue was added.
- [ ] Factual claims, dates, metrics, credentials and outcomes have a local evidence source or clear owner approval.
- [ ] Phoney copy does not claim hidden/covert recording, universal device support or public-release readiness without evidence.
- [ ] OmniRoute Session Sync is described as an independent companion integration, not as the whole OmniRoute product.

## 2. Live reference research and originality
- [ ] https://www.sebg.ch/ was opened and relevant interactions were attempted, including scroll, project links, detail pages and footer.
- [ ] https://www.sebg.ch/projects/jaeger-le-coultre and https://www.sebg.ch/projects/respawwwn were checked for detail-page navigation/actions where reachable.
- [ ] Relevant mobile/responsive view was inspected or the inability to do so was recorded.
- [ ] Findings include tested / observed / not-testable status and real screenshot paths where available.
- [ ] The finished site uses an original design; it does not copy protected source code, exact compositions, assets, copy or brand identity.

## 3. Visual structure and art direction
- [ ] Hero places copy and avatar clearly on desktop; mobile layout is deliberate and readable.
- [ ] LEGO-brick surface/material language is restrained, coherent and not noisy behind text.
- [ ] Each featured project uses actual project captures or clearly labelled placeholders; fabricated UI is never presented as real.
- [ ] Desktop-browser and phone mockups align cleanly and do not obscure text or controls.
- [ ] Short human intro sits between hero and first story.
- [ ] Archive, certificates/qualifications, contact CTA and footer are present and navigable.
- [ ] The visual system feels intentional and consistent, not like an arbitrary collection of cards.

## 4. Routes, cards and outbound links
- [ ] Each project card opens an internal detail route.
- [ ] Direct-open and refresh work for each project/certificate route.
- [ ] Top actions (`Visit live site`, `View source`, `View certificate`, etc.) lead to the matching verified destination.
- [ ] Detail pages have previous/next internal navigation with preview cards.
- [ ] Missing optional URLs hide the action; no `href="#"`, invented route or generic link.
- [ ] Browser back/forward works, including deep links.
- [ ] External site embeds are not assumed to work; use tested iframes or local screenshots/mockup frames.
- [ ] Contact email, GitHub and LinkedIn links are verified against source and open correctly.

## 5. Blender source and exact model-sheet match — critical gate
- [ ] The original model sheet was located and visually inspected, and the exact source path is recorded.
- [ ] If the sheet was not found, the 3D character is explicitly marked **blocked**; no invented replacement is called exact or finished.
- [ ] Blender source is editable and well organised; model is not just a flat image or render.
- [ ] Front/side/back comparisons are made only for angles available in the source sheet.
- [ ] Side-by-side comparison or overlay renders exist at matched scale/framing.
- [ ] A discrepancy list covers silhouette, height/proportions, head/hair, face/eyes, clothing shapes/seams, distinctive marks/accessories and key color/material relationships.
- [ ] Critical visible discrepancies are corrected and the comparison loop repeated.
- [ ] No additional design element is invented where the source sheet provides no evidence; uncertainty is documented.
- [ ] Source sheet is not uploaded to third-party validation services.

## 6. Blender rig, animation and wardrobe variants
- [ ] Armature actually drives the mesh through skinning/weights or verified rigid attachments; no fake/nonfunctional rig.
- [ ] Root/origin, floor contact, unit scale, forward/up axes and rest pose are documented and consistent.
- [ ] Stress poses do not show severe joint collapse, bad twists, disconnected limbs, clothing penetration or broken attachments.
- [ ] Exported clips exist and are individually tested: `Idle`, `Walk`, `Run`, `Jump`, `Wave`, `Point`.
- [ ] `Climb` is included only if it exists and is visually credible; runtime never invokes an absent clip without fallback.
- [ ] Same-identity outfit variants share a compatible skeleton/rest pose or a documented stable swap design.
- [ ] Each outfit swap is tested for scale, grounding, root offset, skin/clothing intersections, material flash, ghost silhouette and pose discontinuity.
- [ ] Face/emote states are deterministic and work in the exported runtime format.

## 7. GLB export and real website integration
- [ ] `.blend` source and production `.glb` paths are written in an asset manifest.
- [ ] GLB loads in the actual project loader, not only in Blender or a separate viewer.
- [ ] All intended materials, textures, skeleton skinning and animations survive export/import.
- [ ] Current Khronos glTF validation is run if available; results and warnings are recorded honestly.
- [ ] Actual website proof shows the model loading, at least one animation playing, an outfit state change if variants are ready, and an animation/scroll transition reversing correctly.
- [ ] Asset size, geometry/texture cost and loading performance are reported; optimise without changing character identity.
- [ ] No unnecessary WebGL context recreation across story/theme transitions.

## 8. Scroll choreography and transform mode
- [ ] Native scrolling is not hijacked or locked.
- [ ] Scroll-driven movement is reversible when scrolling back up.
- [ ] Forward, reverse, fast scroll, resize mid-scroll and late model loading are tested.
- [ ] Character rests at intended story positions and remains grounded; no jump or pose pop across sections.
- [ ] Character never blocks body copy, CTA buttons, links or phone mockups.
- [ ] Normal ↔ Gotham mode is reversible, labelled, keyboard/touch accessible and changes atmosphere coherently without page reload or scroll reset.
- [ ] Gothic/Gotham character treatment is original; no unlicensed logo, exact protected costume or source artwork.
- [ ] Real identity, SEO, accessibility labels, contact and structured data remain truthful in all themes.

## 9. Accessibility and resilience
- [ ] Keyboard can reach and operate all links, buttons, toggles and project controls; focus is visible.
- [ ] Touch/mobile does not depend on hover-only interactions.
- [ ] `prefers-reduced-motion` gives a calm, fully navigable low-motion or static version.
- [ ] WebGL/model load failure shows a suitable static fallback; essential narrative and links remain available.
- [ ] Semantic headings, landmarks, meaningful alt text and correct link/button semantics exist.
- [ ] No autoplay audio; any sound requires an explicit user action.
- [ ] Contrast remains readable over brick surfaces and in Gotham mode.
- [ ] No horizontal overflow or clipped content at 320px, 390px, tablet, 1280px, 1440px and 1920px widths (or nearest practical test sizes).

## 10. Engineering and handoff
- [ ] Existing build, typecheck, lint and test scripts were identified from project config and actually run.
- [ ] Failures are logged; no nonexistent check is claimed as passing.
- [ ] Browser console/runtime checked; no unhandled errors or missing asset failures remain, or each is documented.
- [ ] External URLs were checked during the current work.
- [ ] No private tokens, credentials or unnecessary personal data appear in commits, logs or output files.
- [ ] No deployment, DNS/hosting change or public publishing occurred without explicit approval.
- [ ] `docs/FINAL_VALIDATION_REPORT.md` is completed from the template with evidence paths and clear known limitations.
