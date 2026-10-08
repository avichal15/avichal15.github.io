// ---------------------------------------------------------------------------
// SceneBoundary — the firewall between the page and WebGL.
// Class error boundary + WebGL probe + React.lazy chunk + Suspense poster.
// A 3D failure can NEVER take down the DOM hero.
// ---------------------------------------------------------------------------
import React, { Suspense, useMemo } from 'react';
import { resolveTier, downgradeTier } from '../three/quality.js';

// Lazy chunk — three.js / R3F / drei never enter the main bundle.
const LegoScene = React.lazy(() => import('../three/LegoScene.jsx'));

// Gradient-only placeholder for the Suspense window — zero image cost on
// first paint; the real poster is reserved for failure / tier-0 paths.
function LoadingShimmer() {
    return (
        <div
            aria-hidden="true"
            className="absolute inset-0 bg-linear-to-b from-slate-900/70 via-slate-900/25 to-slate-900"
        />
    );
}

export function PosterFallback() {
    return (
        <div className="absolute inset-0" aria-hidden="true">
            <img
                src="/poster.jpg"
                alt=""
                loading="lazy"
                decoding="async"
                fetchPriority="low"
                className="absolute inset-0 h-full w-full object-cover opacity-35"
            />
            <div className="absolute inset-0 bg-linear-to-b from-slate-900/70 via-slate-900/25 to-slate-900" />
        </div>
    );
}

class Boundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { failed: false, tier: props.initialTier };
        this.handleDowngrade = this.handleDowngrade.bind(this);
    }

    static getDerivedStateFromError() {
        return { failed: true };
    }

    componentDidCatch(error, info) {
        // Keep the console signal, never rethrow — DOM hero stays functional.
        console.warn('[lego-scene] WebGL layer failed, falling back to DOM hero.', error, info);
    }

    // FPS governor asked for mercy: drop one tier and remount the scene.
    handleDowngrade() {
        this.setState((prev) => ({ tier: downgradeTier(prev.tier) }));
    }

    render() {
        if (this.state.failed) return <PosterFallback />;
        const { tier } = this.state;
        if (tier.level === 0) return <PosterFallback />;

        return (
            <Suspense fallback={<LoadingShimmer />}>
                <LegoScene
                    tier={tier}
                    reducedMotion={this.props.reducedMotion}
                    frameloop={this.props.frameloop}
                    progressRef={this.props.progressRef}
                    onDowngrade={this.handleDowngrade}
                />
            </Suspense>
        );
    }
}

export default function SceneBoundary({ frameloop, progressRef }) {
    // Resolve capability once on the client: WebGL probe, reduced-motion,
    // cores/memory, mobile heuristics.
    const initial = useMemo(() => {
        const tier = resolveTier();
        const reducedMotion = typeof window !== 'undefined'
            && typeof window.matchMedia === 'function'
            && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        return { tier, reducedMotion };
    }, []);

    return (
        <Boundary
            initialTier={initial.tier}
            reducedMotion={initial.reducedMotion}
            frameloop={frameloop}
            progressRef={progressRef}
        />
    );
}
