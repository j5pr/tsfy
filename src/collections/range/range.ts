export function range(stop: number): Generator<number, void>;
export function range(start: number, stop: number): Generator<number, void>;

export function range(
  start: number,
  stop: number,
  step: number,
): Generator<number, void>;

export function* range(a: number, b?: number, step: number = 1) {
  const stop = b !== undefined ? b : a;
  const start = b !== undefined ? a : 0;
  for (let i = start; step >= 0 ? i < stop : i > stop; i += step) yield i;
}
