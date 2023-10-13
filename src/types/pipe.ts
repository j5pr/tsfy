/**
 * A pipe is a function that takes a value and returns a new value by
 * calling a function on it. This is similar to the `map` function.
 */
export interface Pipe<T> {
  /**
   * Map the value to a new value
   * @param fn The function to call
   */
  next<U>(fn: (value: T) => U): Pipe<U>;

  /**
   * Return the value held by this pipe
   */
  result(): T;
}

/**
 * Create a new pipe from a value
 * @param value The initial value
 */
export function pipe<T>(value: T): Pipe<T> {
  return { next: (fn) => pipe(fn(value)), result: () => value };
}
