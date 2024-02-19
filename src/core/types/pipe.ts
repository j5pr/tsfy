/**
 * A pipe is a function that takes a value and returns a new value by
 * calling a function on it. This is similar to the `map` function.
 */
export interface Pipe<T> {
  /**
   * Map the value to a new value
   * @param fn The function to call
   */
  then<U>(fn: (value: T) => U): Pipe<U>;

  /**
   * Return the value held by this pipe
   */
  result(): T;
}

/**
 * An asynchronous pipe that lazily evaluates the result
 */
export interface AsyncPipe<T> {
  /**
   * Map the value to a new value
   * @param fn The function to call
   */
  then<U>(fn: (value: T) => PromiseLike<U>): AsyncPipe<U>;

  /**
   * Return the value held by this pipe
   */
  result(): Promise<T>;
}

/**
 * Create a new pipe from a value
 * @param value The initial value
 */
export function pipe<T>(value: T): Pipe<T> {
  return { then: (fn) => pipe(fn(value)), result: () => value };
}

/**
 * Crate a new lazy pipe from a value. The functions passed to `next` will not
 * be evaluated until `result` is called on the final pipe.
 *
 * @param value The initial value
 */
export function lazyPipe<T>(value: T): Pipe<T> {
  function createPipe<U, V>(transform: (value: U) => V, parent: Pipe<U>) {
    const pipe: Pipe<V> = {
      then: <W>(fn: (value: V) => W) => createPipe(fn, pipe),
      result: () => transform(parent.result()),
    };

    return pipe;
  }

  return createPipe(() => value, pipe(null));
}

/**
 * Create a new asynchronous pipe from a value
 * @param value The initial value
 */
export function asyncPipe<T>(value: T): AsyncPipe<T> {
  function createPipe<U, V>(
    transform: (value: U) => PromiseLike<V>,
    parent: { result: () => Promise<U> },
  ) {
    const pipe: AsyncPipe<V> = {
      then: <W>(fn: (value: V) => PromiseLike<W>) => createPipe(fn, pipe),
      result: async () => await transform(await parent.result()),
    };

    return pipe;
  }

  return createPipe(async () => value, pipe(Promise.resolve(null)));
}
