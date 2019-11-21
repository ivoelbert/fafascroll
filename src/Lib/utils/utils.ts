export const animationTiming = (time: number, from: number, to: number): number => {
    return clamp(mapValue(time, from, to, 0, 1), 0, 1);
};

export const timeSlice = (time: number, from: number, to: number): number => {
    return clamp(mapValue(time, from, to, 0, 1), 0, 1);
};

export const clamp = (value: number, min: number, max: number): number => {
    return Math.min(Math.max(value, min), max);
};

export const mapValue = (num: number, in_min: number, in_max: number, out_min: number, out_max: number): number => {
    return ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
};

export type TabulateFunction<T> = (idx: number) => T;
export const tabulate = <T>(n: number, f: TabulateFunction<T>): T[] => {
    return [...new Array(n)].map((_, idx: number): T => f(idx));
};

export const lerpColor = (a: string, b: string, amount: number) => {
    var ah = +a.replace('#', '0x'),
        ar = ah >> 16,
        ag = (ah >> 8) & 0xff,
        ab = ah & 0xff,
        bh = +b.replace('#', '0x'),
        br = bh >> 16,
        bg = (bh >> 8) & 0xff,
        bb = bh & 0xff,
        rr = ar + amount * (br - ar),
        rg = ag + amount * (bg - ag),
        rb = ab + amount * (bb - ab);

    return '#' + (((1 << 24) + (rr << 16) + (rg << 8) + rb) | 0).toString(16).slice(1);
};

export const easing = {
    // accelerating from zero velocity
    inQuad: (t: number): number => t * t,
    // decelerating to zero velocity
    easeOutQuad: (t: number): number => t * (2 - t),
    // acceleration until halfway, then deceleration
    easeInOutQuad: (t: number): number => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t),

    // accelerating from zero velocity
    easeInCubic: (t: number): number => t * t * t,
    // decelerating to zero velocity
    easeOutCubic: (t: number): number => --t * t * t + 1,
    // acceleration until halfway, then deceleration
    easeInOutCubic: (t: number): number => (t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1),
};
