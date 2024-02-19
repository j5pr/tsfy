/**
 * Clamp `x` to the range `[lowerBound, upperBound]`.
 *
 * Roughly equivalent to:
 * ```ts
 * function clamp(x, lowerBound, upperBound) {
 *   if (x < lowerBound) return lowerBound;
 *   if (x > upperBound) return upperBound;
 *   return x;
 * }
 * ```
 */
export const clamp = (x: number, lowerBound: number, upperBound: number) =>
  Math.max(Math.min(x, upperBound), lowerBound);

/**
 * Scale `x` in the range `[fromMin, fromMax]` to `[toMin, toMax]`.
 *
 * @param x The number to scale
 * @param fromMin The lower bound of the input range.
 * @param fromMax The upper bound of the input range.
 * @param toMin The lower bound of the output range.
 * @param toMax The upper bound of the output range.
 */
export const scale = (
  x: number,
  fromMin: number,
  fromMax: number,
  toMin: number,
  toMax: number,
) => ((x - fromMin) / (fromMax - fromMin)) * (toMax - toMin) + toMin;
