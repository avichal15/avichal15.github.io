# Phase 0 & Phase 1 — Codebase Inventory, Live Reference Audit & Architecture Blueprint

**Generated**: 2026-10-28  
**Target Workspace**: `C:\portfolio\portfolio` (Git root: `C:\portfolio`, branch `main`)

---

## 1. Local Codebase & Asset Inventory (Phase 0)

### 1.1 Active Web Application Target
- **Project Directory**: `C:\portfolio\portfolio`
- **Framework & Tooling**: React `19.2.0`, Vite `7.3.1`, Three.js `0.183.2`, `@react-three/fiber` `9.5.0`, `@react-three/drei` `10.7.7`, Lucide React `1.16.0`, ESLint `9.39.1`.
- **Existing Entry & Components**:
  - `src/main.jsx`, `src/App.jsx`, `src/index.css`
  - `src/components/`: `Header.jsx`, `Hero.jsx`, `About.jsx`, `Skills.jsx`, `Projects.jsx`, `Experience.jsx`, `Certifications.jsx`, `Contact.jsx`, `Footer.jsx`, `Section.jsx`, `SceneBoundary.jsx`, `lego/StudCounter.jsx`, `lego/content.js`
  - `src/three/`: `LegoScene.jsx`, `Minifig.jsx`, `CameraRig.jsx`, `Baseplate.jsx`, `Wordmark.jsx`, `assets.js`, `quality.js`, `useFpsGovernor.js`, `wordmark.js`
  - `src/hooks/`: `useHeroScroll.js`

### 1.2 Discovered Authoritative Character Turnaround Sheets & Videos
All character sheets and videos were located in `C:\portfolio\` and visually inspected:
1. **Base Minifigure (6-View & 4-View Turnarounds)**:
   - `C:\portfolio\Gemini_Generated_Image_t5zvont5zvont5zv (1).png` (6 views: `FRONT`, `BACK`, `RIGHT PROFILE`, `LEFT PROFILE`, `TOP VIEW`, `3/4 VIEW`)
   - `C:\portfolio\Gemini_Generated_Image_6zda4j6zda4j6zda (1).png` (4 views, copied to `public/media/characters/sheet-base.png`)
   - **Visual Traits**: Wavy black hair with swept front lock, warm light-skin cylindrical head and C-hands, full dark beard with upturned handlebar mustache tips, all-black crewneck sweater with grey double-collar trim and subtle chest creases, black legs.
2. **MediStudyGo / Doctor Outfit Variant (4-View Turnaround)**:
   - `C:\portfolio\doctor sheet.jpg` (copied to `public/media/characters/sheet-doctor.jpg`)
   - **Visual Traits**: Same head/hair/beard/mustache, white medical lab coat over teal V-neck scrubs, dark stethoscope draped around neck, red medical ID badge clipped to left chest pocket, teal scrub trousers.
3. **Phoney & TruGifting / Tech & AI Developer Outfit Variant (4-View Turnaround)**:
   - `C:\portfolio\techy sheet.png` (copied to `public/media/characters/sheet-techy.png`)
   - **Visual Traits**: Round black-framed glasses, dark navy zip hoodie over black tee featuring a glowing cyan neural-network brain + `0101 {} <CODE> AI` graphic, cyan `DEV` lanyard badge, smartwatch on left wrist, dark blue denim jeans with brown belt.
4. **Masterplayer Designs & Printing / Print Studio Outfit Variant (4-View Turnaround)**:
   - `C:\portfolio\cool guy masterplayer sheet.jpg` (copied to `public/media/characters/sheet-masterplayer.jpg`)
   - **Visual Traits**: Rectangular dark-framed glasses, open red-and-black buffalo plaid flannel shirt over black tee with Masterplayer cat-and-printer emblem, `STAFF` lanyard badge, back print `"MASTERPLAYER DESIGNING • THE PRINT TEAM"`, dark blue jeans with brown belt and yellow scale/ruler tool in right pocket.
5. **Gotham Mode Vigilante Reference (Turnaround + Video)**:
   - `C:\portfolio\batman sheet.png` & `C:\portfolio\gemini_generated_video_3405f006.mp4`
   - **IP-Safe Adaptation Rule**: Per `.agents/rules/gotham-mode-and-ip-safety.md`, the rendered 3D Gotham mode outfit uses the dark pointed-ear brick cowl with glowing cyan eyes, yellow modular utility belt, dark armor torso, scalloped cape, and grapple-jump transformation choreography, while replacing the trademarked DC bat-oval symbol with an **original geometric brick-crest / nocturnal chevron emblem**.
6. **Hero Scene Reference Render**:
   - `C:\portfolio\watermarked_img_10815673431963708064 (1).jpg` / `C:\portfolio\portfolio\public\poster.jpg`

### 1.3 Discovered Local Project Repositories & Real Media Assets
- **Phoney (`C:\phone caller\website`)**:
  - Audited `README.md`, `DESIGN_V3.md`, `src/App.tsx`.
  - Copied real app screens into `public/media/projects/`: `current-sounds.webp`, `current-recents.webp`, `current-settings.webp`, `current-privacy.webp`, `call.webp`, `phoney-social-preview.png`, plus live website captures `phoney-desktop.png` and `phoney-mobile.png`.
- **TruGifting Solutions (`C:\Users\avich\Documents\trugifting solutions`)**:
  - Audited `index.html` and live site `https://www.trugiftingsolutions.com/`.
  - Captured `trugifting-desktop.png` and `trugifting-mobile.png`.
- **Masterplayer Designs & Printing (`C:\masterplayer designs and printing`)**:
  - Audited `README.md` (live vs WIP separation) and live site `https://masterplayerprints.com/`.
  - Captured `masterplayer-desktop.png` and `masterplayer-mobile.png`.
- **MediStudyGo (`https://medistudygo.com/`)**:
  - Verified role from `C:\portfolio\portfolio\public\resume.pdf` and `C:\portfolio\Modern_Simple_ATS_Friendly_LateX_CV (27).pdf`: Associate – Product & Platform Operations (`May 2025 – Feb 2026`).
  - Captured `medistudygo-desktop.png` and `medistudygo-mobile.png`.
- **Open Source & Archive Repositories**:
  - `C:\omni` (`omniroute-session-sync` — third-party companion utility for `decolua/omniroute`).
  - `C:\insta manager` (`Insta-manager` — local-first desktop lead & outreach CRM).
  - `C:\Users\avich\Downloads\recruitment-funnel-dashboard` (`recruitment-funnel-dashboard` — copied real screenshots `dashboard-overview.png`, `channel-performance.png`, `recommendations.png`; uses synthetic demo data generated with Faker/Pandas/SQLite).
  - `https://projectmicrocoach.netlify.app/` — captured `microcoach-desktop.png`.

---

## 2. Live Browser Reference Audit (`sebg.ch` & Case Studies)

Visited and inspected in live browser (`agent-browser` Chromium + Obscura) across desktop (`1440x900`) and mobile (`390x844`) viewports:

| Target / Interaction | Status | Observed Pattern & Takeaway for Avichal's Portfolio |
| :--- | :--- | :--- |
| `https://www.sebg.ch/` Hero layout | **Tested & Observed** (`artifacts/browser-audit/sebg-home-desktop.png`) | Left-aligned oversized display greeting (`Hi, I'm Seb.`) + clear value proposition on the left; persistent 3D character on the right with subtle vertical grid background lines and top pill action bar (`Do a trick`, `Go to work`). |
| Character interaction cue | **Tested & Observed** | Floating pixel-hand / pill cue (`Psst. You can grab me.`) encourages direct pointer drag/click interaction on the 3D character without hijacking page scroll. |
| Intro -> Story chapters scroll progression | **Tested & Observed** | Between Hero and Featured Work, a conversational human intro (`I've been building for the web for over a decade...`) transitions into numbered chapters (`01`, `02`, `03`, `04`) with speech bubbles that highlight words progressively as the user scrolls. |
| Case Study: `https://www.sebg.ch/projects/jaeger-le-coultre` | **Tested & Observed** (`artifacts/browser-audit/sebg-jlc-1440.png`) | Top-left pill `← All work` with neo-brutalist black border + offset shadow; top-right pill `Visit jaeger-lecoultre.com ↗`; bold project title; 3-column metadata bar (`Year`, `Role`, `Stack`); art-directed media card on the left while the 3D character stays anchored on the right. |
| Case Study: `https://www.sebg.ch/projects/respawwwn` | **Tested & Observed** (`artifacts/browser-audit/sebg-respawwwn-1440.png`) | Same consistent case-study template with top-right `Visit respawwwn.com ↗`, structured story sections (`Overview`, `Highlights`, `Architecture`), and bottom Previous / Next project preview cards (`Previous: Jaeger-LeCoultre`, `Next: Get It Fast`). |
| Contact & Footer | **Tested & Observed** | Warm closing prompt (`Let's build something together`), one-click `Copy email` button with instant copied feedback, and direct social/GitHub/LinkedIn links. |

---

## 3. Owner Live Sites, Repositories & Technical Docs Verification Matrix

| Resource | URL / Local Path | Status | Verification Evidence |
| :--- | :--- | :--- | :--- |
| **MediStudyGo** | `https://medistudygo.com/` | **200 OK (Live)** | Verified live in browser (`medistudygo-desktop.png`, `medistudygo-mobile.png`). MBBS/BDS/BPT/Nursing ed-tech platform (`50,000+ students`). |
| **Phoney Live Site** | `https://phoney.avichalgoyal.me/` | **200 OK (Live)** | Verified live in browser (`phoney-desktop.png`, `phoney-mobile.png`). Title: `Phoney — Out of pocket. Into your calls.` Android early access beta. |
| **Phoney Repo** | `https://github.com/avichal15/calling-app-` | **Private Repo (404 Anon / Local Verified)** | Verified locally at `C:\phone caller` (`website/README.md`, `website/DESIGN_V3.md`, `website/src/App.tsx`). Labelled transparently as `View source (GitHub)` with private-repo note where applicable. |
| **TruGifting Solutions Live** | `https://trugiftingsolutions.com/` | **200 OK (Live)** | Redirects cleanly to `https://www.trugiftingsolutions.com/`; verified in browser (`trugifting-desktop.png`, `trugifting-mobile.png`). |
| **TruGifting Repo** | `https://github.com/avichal15/trugifting-solutions` | **Private Repo (404 Anon / Local Verified)** | Verified locally at `C:\Users\avich\Documents\trugifting solutions`. |
| **Masterplayer Live Site** | `https://masterplayerprints.com/` | **200 OK (Live)** | Verified live in browser (`masterplayer-desktop.png`, `masterplayer-mobile.png`). Interactive WebGL 3D customizer studio + 22 studio departments live. |
| **Masterplayer Repo** | `https://github.com/avichal15/Masterplayer` | **Private Repo (404 Anon / Local Verified)** | Verified locally at `C:\masterplayer designs and printing\README.md`. Clearly separates live features from WIP roadmap. |
| **OmniRoute Session Sync** | `https://github.com/avichal15/omniroute-session-sync` | **200 OK (Public Repo)** | Public GitHub repository + local clone at `C:\omni`. Disclosed as an independent third-party companion for `decolua/omniroute`. |
| **Instagram Manager** | `https://github.com/avichal15/Insta-manager` | **200 OK (Public Repo)** | Public GitHub repository + local clone at `C:\insta manager`. |
| **Recruitment Funnel Dashboard** | `https://github.com/avichal15/recruitment-funnel-dashboard` | **200 OK (Public Repo)** | Public GitHub repository + local clone at `C:\Users\avich\Downloads\recruitment-funnel-dashboard`. Labelled as using synthetic demo data. |
| **WhatsApp to CSV Converter** | `https://github.com/avichal15/whatsapp-to-csv-converter` | **200 OK (Public Repo)** | Public GitHub repository verified (`200 OK`). |
| **GitHub Profile** | `https://github.com/avichal15` | **200 OK (Public)** | Verified (`200 OK`). |
| **LinkedIn Profile** | `https://www.linkedin.com/in/avichalgoyal007/` | **Verified Canonical URL** | Standard LinkedIn `999` anonymous bot wall; verified in owner resumes and existing portfolio source. |
| **Official Technical Docs (9 URLs)** | Antigravity Rules, `/learn`, Blender glTF 2.0, Three.js `GLTFLoader`, R3F Loading Models, GSAP `ScrollTrigger`, Khronos `glTF-Validator`, HeyGen Digital Twin & LiveAvatar | **All 9 Returned 200 OK** | Confirmed current specs. HeyGen documented as rejected for the 3D scroll rig because it produces 2D video/streaming talking heads rather than a multi-outfit Three.js `.glb` minifigure rig. |

---

## 4. Phased Implementation Architecture (Phases 2–8)

1. **Phase 2 — 3D Rigged Minifigure Asset (`.glb`) & R3F Multi-Outfit Stage**:
   - Build `scripts/build-avatar-glb.mjs` to generate `public/models/avatar_base.glb` containing hierarchical nodes (`Root`, `Hips`, `Torso`, `Head`, `Arm_L`, `Hand_L`, `Arm_R`, `Hand_R`, `Leg_L`, `Leg_R`), all 5 outfit variant mesh groups (`Outfit_Base`, `Outfit_Doctor`, `Outfit_Techy`, `Outfit_Masterplayer`, `Outfit_Gotham`), and embedded glTF keyframe animations (`Idle`, `Walk`, `Run`, `Jump`, `Wave`, `Point`).
   - Upgrade `src/three/Minifig.jsx` and `src/three/LegoScene.jsx` to support live chapter-driven outfit switching, pointer drag/click tricks, speech-bubble synchronization, and Gotham night-city transformation.
2. **Phase 3 — Canonical Content Registry & Clean Client Router**:
   - Create `src/data/portfolioData.js` as the single source of truth for Hero, Intro, 4 Flagship Chapters, 11 Archive/Open-Source projects, and 3 Certifications.
   - Support `/`, `/work`, `/work/<slug>`, `/certifications`, and `/certifications/<slug>` with clean History API navigation, Vite SPA fallback, top-right verified action buttons, and bottom Previous/Next preview cards.
3. **Phase 4–7 — Hero, 4 Flagship Chapters, Archive, Certifications, & Reversible Gotham Mode**:
   - Desktop left-copy / right-stage Hero with verbatim headline, `"Do a trick"` button, and `"Go Gotham"` transformation toggle.
   - Scroll-driven word-by-word speech bubble reading highlights and art-directed Desktop + Phone mockup compositions using real captured screenshots.
   - Interactive Web Audio API preview for Phoney's 6 cleared original Audio Emojis (`Chime`, `Pop`, `Boing`, `Buzz`, `Sparkle`, `Ta-da`) + opt-in beta tester request flow.
4. **Phase 8 — Multi-Viewport QA, Accessibility & Final Validation Report**:
   - Verify `npm run lint`, `npm run build`, and live browser checks across `320px`, `390px`, `768px`, `1280px`, `1440px`, and `1920px`.
