/**
 * Performs no operation, and returns nothing.
 */
export const noop = () => {};

/**
 * Returns the value passed to it.
 */
export const identity = <T>(x: T) => x;

/**
 * Casts a value to a different type.
 */
export const cast = <T>(x: unknown) => x as T;
