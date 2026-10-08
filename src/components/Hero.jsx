// ---------------------------------------------------------------------------
// LEGO Multiverse Build Studio — Phase-1 cinematic hero.
// A 250vh scroll stage with a sticky h-screen viewport: the WebGL build
// studio lives at z-0 (isolated behind SceneBoundary), the real DOM content
// — crawlable h1, subtitle, statement, CTAs — overlays it in the lower
// third. GSAP owns the scroll (see useHeroScroll); framer-motion is never
// imported here.
// ---------------------------------------------------------------------------
import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import SceneBoundary from './SceneBoundary.jsx';
import StudCounter from './lego/StudCounter.jsx';
import { HERO } from './lego/content.js';
import useHeroScroll from '../hooks/useHeroScroll.js';

export default function Hero() {
    const sectionRef = useRef(null);
    const progressRef = useRef(0);
    const counterRef = useRef(null);
    // IntersectionObserver flips the Canvas frameloop: zero GPU cost once the
    // hero has scrolled fully out of view.
    const [frameloop, setFrameloop] = useState('always');

    useHeroScroll({ sectionRef, progressRef, counterRef });

    useEffect(() => {
        const section = sectionRef.current;
        if (!section || typeof IntersectionObserver === 'undefined') return undefined;
        const observer = new IntersectionObserver(
            ([entry]) => setFrameloop(entry.isIntersecting ? 'always' : 'never'),
            { rootMargin: '200px 0px' }
        );
        observer.observe(section);
        return () => observer.disconnect();
    }, []);

    return (
        <section id="hero" ref={sectionRef} className="relative" style={{ height: '250vh' }}>
            <div className="sticky top-0 h-screen overflow-hidden">
                {/* Radial slate backdrop — always present under/behind the 3D scene */}
                <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-800 via-slate-900 to-black" />
                <div className="absolute left-1/2 top-1/2 z-0 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-500/10 blur-[100px] animate-pulse" />

                {/* WebGL build studio — firewalled; failure degrades to poster/DOM */}
                <div className="absolute inset-0 z-0">
                    <SceneBoundary frameloop={frameloop} progressRef={progressRef} />
                </div>

                {/* DOM overlay — lower third, so it never collides with the
                    3D wordmark above the minifig. Pointer events pass through
                    to scroll except on interactive elements. */}
                <div className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-end pb-20 text-center">
                    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.35em] text-gold-400 md:text-sm">
                        {HERO.subtitle}
                    </p>

                    <h1 className="text-5xl font-extrabold uppercase tracking-[0.06em] text-white [text-shadow:0_1px_0_#000,0_3px_0_rgba(0,0,0,0.45),0_12px_28px_rgba(0,0,0,0.65)] md:text-6xl lg:text-7xl">
                        {HERO.title}
                    </h1>

                    <p className="mt-4 text-lg font-medium text-slate-300 md:text-xl">
                        {HERO.statement}
                    </p>

                    {/* CTAs — exact hrefs preserved for SEO/ATS */}
                    <div className="pointer-events-auto mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                        <a
                            href={HERO.ctas[0].href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center gap-2 rounded-[4px] border-b-4 border-[#7a0006] bg-[#E3000B] px-8 py-3 font-bold tracking-wide text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#c50009] hover:shadow-[0_10px_28px_rgba(227,0,11,0.35)]"
                        >
                            {HERO.ctas[0].label}
                            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                        </a>
                        <a
                            href={HERO.ctas[1].href}
                            className="rounded-[4px] border border-slate-600 border-b-4 border-b-slate-800 bg-slate-900/70 px-8 py-3 font-bold tracking-wide text-slate-200 backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-400 hover:text-white"
                        >
                            {HERO.ctas[1].label}
                        </a>
                    </div>

                    {/* Scroll hint */}
                    <div className="pointer-events-none absolute bottom-5 left-1/2 -translate-x-1/2 text-slate-400">
                        <div className="animate-bounce">
                            <ChevronDown size={24} />
                        </div>
                    </div>
                </div>

                {/* Stud-counter HUD (desktop) */}
                <StudCounter countRef={counterRef} />
            </div>
        </section>
    );
}
