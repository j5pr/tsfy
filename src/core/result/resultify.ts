import { Err, Ok, Result } from "../index.js";

/**
 * Wrap a function that throws an error in a Result
 * @param fn The function to wrap
 */
export function resultify<
  T extends (...args: unknown[]) => unknown,
  E = unknown,
>(fn: T): (...args: Parameters<T>) => Result<ReturnType<T>, E> {
  return function (...args: Parameters<T>) {
    try {
      return Ok(fn(...args) as ReturnType<T>);
    } catch (err: unknown) {
      return Err(err as E);
    }
  };
}

/**
 * Wrap an async function that throws an error in a Result
 * @param fn The function to wrap
 */
export function resultifyAsync<
  T extends (...args: unknown[]) => Promise<unknown>,
  E = unknown,
>(
  fn: T,
): (...args: Parameters<T>) => Promise<Result<Awaited<ReturnType<T>>, E>> {
  return async function (...args: Parameters<T>) {
    try {
      const result = await fn(...args);
      return Ok(result as Awaited<ReturnType<T>>);
    } catch (err) {
      return Err(err as E);
    }
  };
}
