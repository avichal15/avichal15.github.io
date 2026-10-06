// ---------------------------------------------------------------------------
// AUTHOR-TIME static voxel data for the brick-built "AVICHAL GOYAL" wordmark.
// Pure data + math — no rendering here. Each bitmap cell becomes one brick
// instance (see Wordmark.jsx). Total bricks ≈ 210, far under the 1.5k budget.
// ---------------------------------------------------------------------------
import { LEGO_COLORS } from '../components/lego/content.js';

// 5×7 letterform table (5 columns, 7 rows). '1' = brick, '0' = empty.
const GLYPHS = {
    A: ['01110', '10001', '10001', '11111', '10001', '10001', '10001'],
    V: ['10001', '10001', '10001', '10001', '10001', '01010', '00100'],
    I: ['11111', '00100', '00100', '00100', '00100', '00100', '11111'],
    C: ['01111', '10000', '10000', '10000', '10000', '10000', '01111'],
    H: ['10001', '10001', '10001', '11111', '10001', '10001', '10001'],
    L: ['10000', '10000', '10000', '10000', '10000', '10000', '11111'],
    G: ['01111', '10000', '10000', '10111', '10001', '10001', '01110'],
    O: ['01110', '10001', '10001', '10001', '10001', '10001', '01110'],
    Y: ['10001', '10001', '01010', '00100', '00100', '00100', '00100'],
    ' ': ['00000', '00000', '00000', '00000', '00000', '00000', '00000'],
};

const LETTER_WIDTH = 5;
const LETTER_GAP = 1;
const ROW_GAP = 1;
const GLYPH_HEIGHT = 7;

// Two-row layout: AVICHAL on row 1, GOYAL centred on row 2.
const ROWS = ['AVICHAL', 'GOYAL'];

// Primary trio with the occasional gray brick for texture.
const COLOR_CYCLE = [LEGO_COLORS.red, LEGO_COLORS.yellow, LEGO_COLORS.blue];
const GRAY_EVERY = 11;

/**
 * Produces the full wordmark brick list.
 * @returns {{x:number, y:number, color:string}[]} one entry per brick cell,
 * centred around the origin (x), y up.
 */
export function getWordmarkBricks() {
    const bricks = [];
    const widths = ROWS.map((row) => row.length * (LETTER_WIDTH + LETTER_GAP) - LETTER_GAP);
    const maxWidth = Math.max(...widths);
    let brickIndex = 0;

    ROWS.forEach((row, rowIndex) => {
        // Centre narrower rows against the widest one.
        const rowOffset = Math.round((maxWidth - widths[rowIndex]) / 2);
        const yTop = (GLYPH_HEIGHT - 1) / 2 - rowIndex * (GLYPH_HEIGHT + ROW_GAP);

        for (let li = 0; li < row.length; li += 1) {
            const glyph = GLYPHS[row[li]] ?? GLYPHS[' '];
            for (let r = 0; r < GLYPH_HEIGHT; r += 1) {
                for (let c = 0; c < LETTER_WIDTH; c += 1) {
                    if (glyph[r][c] !== '1') continue;
                    const x = li * (LETTER_WIDTH + LETTER_GAP) + c + rowOffset - maxWidth / 2;
                    const y = yTop - r;
                    const color = brickIndex % GRAY_EVERY === 7
                        ? LEGO_COLORS.lightBluishGray
                        : COLOR_CYCLE[brickIndex % COLOR_CYCLE.length];
                    bricks.push({ x, y, color });
                    brickIndex += 1;
                }
            }
        }
    });

    return bricks;
}

// Back-out(1.7) easing — the "brick snap" of the motion language.
export function backOut(t, s = 1.7) {
    const k = t - 1;
    return k * k * ((s + 1) * k + s) + 1;
}
