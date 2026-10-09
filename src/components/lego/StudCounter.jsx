// ---------------------------------------------------------------------------
// Stud-counter HUD — fixed bottom-right chip with a gold LEGO stud.
// The number is written imperatively by useHeroScroll via countRef
// (direct textContent, zero React state churn). Desktop only.
// ---------------------------------------------------------------------------

export default function StudCounter({ countRef }) {
    return (
        <div className="absolute bottom-5 right-5 z-40 hidden md:flex items-center gap-2.5 rounded-md border border-slate-700/70 border-b-2 bg-slate-900/85 px-3.5 py-2 shadow-lg shadow-black/40 backdrop-blur-sm select-none">
            {/* Decorative gold stud */}
            <span aria-hidden="true" className="relative block h-5 w-5 rounded-full bg-gold-500 shadow-[inset_0_-2px_3px_rgba(0,0,0,0.45),0_1px_2px_rgba(0,0,0,0.5)]">
                <span className="absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold-400 shadow-[inset_0_1px_2px_rgba(255,255,255,0.55)]" />
            </span>

            <span className="sr-only">Scroll progress</span>
            <span
                ref={countRef}
                className="min-w-[3.5ch] text-right text-sm font-bold tabular-nums text-slate-100"
            >
                0
            </span>
            <span aria-hidden="true" className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                studs
            </span>
        </div>
    );
}
