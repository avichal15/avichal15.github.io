// ---------------------------------------------------------------------------
// LEGO Multiverse Build Studio — single source of truth for hero content.
// DOM strings, nav data, LEGO palette, camera choreography and stud scoring
// all live here so 3D code and DOM code never drift apart.
// ---------------------------------------------------------------------------

export const HERO = {
    title: 'Avichal Goyal',
    subtitle: 'Software • AI • Automation • Product',
    statement: 'I build systems from ideas.',
    ctas: [
        {
            label: 'Open MicroCoach',
            href: 'https://projectmicrocoach.netlify.app',
            external: true,
        },
        {
            label: 'View Projects',
            href: '#projects',
            external: false,
        },
    ],
};

export const NAV_LINKS = [
    { name: 'Home', href: '#hero' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Certifications', href: '#certifications' },
    { name: 'Contact', href: '#contact' },
];

export const RESUME_HREF = '/resume.pdf';

// Official LEGO brick palette used across the 3D scene + DOM accents.
export const LEGO_COLORS = {
    red: '#E3000B',
    yellow: '#FFED00',
    blue: '#006BB6',
    lightBluishGray: '#D7D7D9',
    darkBluishGray: '#4B4F4D',
    black: '#0A0A0A',
    lime: '#BBDD00',
};

export const MINIFIG_COLORS = {
    skin: '#E0AC69',
    hair: '#101010',
    beard: '#101010',
    outfit: '#101010',
};

// Cinematic camera keyframes, progress 0 → 1.
// Opens wide and quiet, dollies in with a gentle right-hand orbit, sweeps low,
// then rises back to a final frame on the minifig with the wordmark overhead.
export const CAMERA_PATH = [
    { pos: [0, 7.2, 30], lookAt: [0, 4.6, 0] },   // wide establishing shot
    { pos: [9, 6.2, 21], lookAt: [0, 4.6, 0] },   // dolly-in, orbit right
    { pos: [11, 4.6, 11], lookAt: [0, 4.2, 0] },  // low side sweep
    { pos: [4.5, 6.4, 8.2], lookAt: [0, 5.2, 0] },// rise + tighten
    { pos: [0, 5.4, 9.8], lookAt: [0, 4.4, 0] },  // final frame: minifig + wordmark
];

// Pre-scroll intro dolly start position (farther + higher than keyframe 0).
export const CAMERA_INTRO_POS = [0, 10.5, 42];

// Stud counter scoring: cumulative points awarded at scroll thresholds.
// Sum of increments === total, so the HUD lands exactly on total at p = 1.
export const STUD_MILESTONES = {
    total: 1200,
    increments: [
        { at: 0.05, points: 120 },
        { at: 0.15, points: 140 },
        { at: 0.3, points: 180 },
        { at: 0.45, points: 180 },
        { at: 0.6, points: 200 },
        { at: 0.75, points: 190 },
        { at: 0.9, points: 190 },
    ],
};
