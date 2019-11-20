export const animationTiming = (time: number, from: number, to: number): number => {
    return clamp(mapValue(time, from, to, 0, 1), 0, 1);
}

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
