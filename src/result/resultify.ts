import { Err, Ok, Result } from '..';

/**
 * Wrap a function that throws an error in a Result
 * @param fn The function to wrap
 */
export function resultify<T extends (...args: any[]) => any, E = unknown>(
  fn: T,
): (...args: Parameters<T>) => Result<ReturnType<T>, E> {
  return function () {
    try {
      return Ok(fn(...arguments));
    } catch (err: unknown) {
      return Err(err as E);
    }
  };
}

/**
 * Wrap an async function that throws an error in a Result
 * @param fn The function to wrap
 */
export function resultifyAsync<T extends (...args: any[]) => Promise<any>, E = unknown>(
  fn: T,
): (...args: Parameters<T>) => Promise<Result<Awaited<ReturnType<T>>, E>> {
  return async function () {
    try {
      const result = await fn(...arguments);
      return Ok(result);
    } catch (err) {
      return Err(err as E);
    }
  };
}
