// ---------------------------------------------------------------------------
// GSAP owns the hero scroll. One scrub tween drives:
//   1. progressRef (consumed by the three.js CameraRig via useFrame + damp)
//   2. the stud-counter HUD (direct textContent writes, never React state)
// Plus per-section ScrollTriggers that toggle the active nav brick via a
// data-attribute (see Header.jsx — id contract: `nav-brick-${href}`).
// ---------------------------------------------------------------------------
import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { STUD_MILESTONES, NAV_LINKS } from '../components/lego/content.js';

// Register exactly once, at module scope.
gsap.registerPlugin(ScrollTrigger);

function computeStuds(progress) {
    let studs = 0;
    for (const inc of STUD_MILESTONES.increments) {
        if (progress >= inc.at) studs += inc.points;
    }
    return studs;
}

export default function useHeroScroll({ sectionRef, progressRef, counterRef }) {
    const lastStuds = useRef(-1);

    useGSAP(() => {
        const section = sectionRef.current;
        if (!section) return;

        const writeStuds = (progress) => {
            const studs = computeStuds(progress);
            if (studs === lastStuds.current) return;
            lastStuds.current = studs;
            const el = counterRef.current;
            if (el) el.textContent = studs.toLocaleString('en-US');
        };

        // Scrub tween over the 250vh hero — no ease on the scrub parent.
        gsap.to({ t: 0 }, {
            t: 1,
            ease: 'none',
            scrollTrigger: {
                trigger: section,
                start: 'top top',
                end: '+=150%',
                scrub: 0.4,
                onUpdate(self) {
                    progressRef.current = self.progress;
                    writeStuds(self.progress);
                },
            },
        });

        // Nav brick active-state sync: data-active toggled imperatively to
        // avoid React state churn. CSS sticky pinning keeps anchors intact,
        // so ScrollTrigger pin is deliberately NOT used anywhere.
        NAV_LINKS.forEach(({ href }) => {
            const target = document.getElementById(href.slice(1));
            if (!target) return;
            ScrollTrigger.create({
                trigger: target,
                start: 'top center',
                end: 'bottom center',
                onToggle(self) {
                    const brick = document.getElementById(`nav-brick-${href}`);
                    if (brick) brick.setAttribute('data-active', self.isActive ? 'true' : 'false');
                },
            });
        });

        // Re-measure once webfonts are in — Exo 2 changes layout metrics.
        if (document.fonts && document.fonts.ready) {
            document.fonts.ready
                .then(() => ScrollTrigger.refresh())
                .catch(() => {});
        }
    }, { scope: sectionRef });
}
