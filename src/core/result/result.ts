import { Option } from "../index.ts";
import { okImpl, errImpl } from "./impl.ts";

/**
 * `Result<T, E>` is the type used for returning and propagating errors.
 * It is a union with the variants, `Ok(T)`, representing success and containing a value,
 * and `Err(E)`, representing error and containing an error value.
 */
export interface Result<T, E> {
  /**
   * Returns `true` if the result is `Ok`.
   */
  isOk(): boolean;

  /**
   * Returns `true` if the result is `Ok` and the value inside of it matches a predicate.
   * @param fn The predicate function
   */
  isOkAnd(fn: (val: T) => boolean): boolean;

  /**
   * Returns `true` if the result is `Err`.
   */
  isErr(): boolean;

  /**
   * Returns `true` if the result is `Err` and the value inside of it matches a predicate.
   * @param fn The predicate function
   */
  isErrAnd(fn: (val: E) => boolean): boolean;

  /**
   * Returns the contained `Ok` value, throwing if the value is an `Err` with a custom error.
   * @param err The custom error to throw
   */
  expect(err: unknown): T;

  /**
   * Returns the contained `Err` value, throwing if the value is an `Ok` with a custom error.
   * @param err The custom error to throw
   */
  expectErr(err: unknown): E;

  /**
   * Returns the contained `Ok` value, throwing if the value is an `Err`.
   */
  unwrap(): T;

  /**
   * Returns the contained `Err` value, throwing if the value is an `Ok`.
   */
  unwrapErr(): E;

  /**
   * Returns the contained `Ok` value or a provided default.
   * @param def The provided default
   */
  unwrapOr<U>(def: U): T | U;

  /**
   * Returns the contained `Ok` value or computes it from a closure.
   * @param fn The function providing the default value
   */
  unwrapOrElse<U>(fn: () => U): T | U;

  /**
   * Calls the provided closure with a reference to the contained value (if `Ok`).
   * @param fn The function to call
   */
  inspect(fn: (val: T) => void): Result<T, E>;

  /**
   * Calls the provided closure with a reference to the contained value (if `Err`).
   * @param fn The function to call
   */
  inspectErr(fn: (val: E) => void): Result<T, E>;

  /**
   * Converts from `Result<T, E>` to `Option<E>`.
   */
  err(): Option<E>;

  /**
   * Converts from `Result<T, E>` to `Option<T>`.
   */
  ok(): Option<T>;

  /**
   * Transposes a `Result` of an `Option` into an `Option` of a `Result`.
   *
   * `Ok(None)` will be mapped to `None`. `Ok(Some(_))` and
   * `Err(_)` will be mapped to `Some(Ok(_))` and `Some(Err(_))`.
   */
  transpose<U>(this: Result<Option<U>, E>): Option<Result<U, E>>;

  /**
   * Maps a `Result<T, E>` to `Result<U, E>` by applying a function
   * to a contained `Ok` value,leaving an `Err` value untouched.
   *
   * This function can be used to compose the results of two functions.
   * @param fn The function to apply
   */
  map<U>(fn: (val: T) => U): Result<U, E>;

  /**
   * Maps a `Result<T, E>` to `Result<T, F>` by applying a function
   * to a contained `Err` value, leaving an `Ok` value untouched.
   *
   * This function can be used to pass through a successful result while handling an error.
   * @param fn The function to apply
   */
  mapErr<F>(fn: (val: E) => F): Result<T, F>;

  /**
   * Returns the provided default (if `Err`), or applies a function to the contained value (if `Ok`).
   * @param def The provided default
   * @param fn The function to apply
   */
  mapOr<U>(def: U, fn: (val: T) => U): U;

  /**
   * Maps a `Result<T, E>` to `U` by applying fallback function default
   * to a contained `Err` value, or function `fn` to a contained `Ok` value.
   *
   * This function can be used to unpack a successful result while handling an error.
   * @param def The function providing the default value
   * @param fn The function to apply
   */
  mapOrElse<U>(def: () => U, fn: (val: T) => U): U;

  /**
   * Returns `other` if the result is `Ok`, otherwise returns the `Err` value of self.
   * @param other The other `Result`
   */
  and<U>(other: Result<U, E>): Result<T | U, E>;

  /**
   * Returns `other` if the result is `Err`, otherwise returns the `Ok` value of self.
   * @param other The other `Result`
   */
  or<F>(other: Result<T, F>): Result<T, E | F>;

  /**
   * Calls `fn` if the result is `Ok`, otherwise returns the `Err` value of self.
   *
   * This function can be used for control flow based on Result values.
   * @param fn The function to call
   */
  andThen<U>(fn: (val: T) => Result<U, E>): Result<T | U, E>;

  /**
   * Calls `fn` if the result is `Err`, otherwise returns the `Ok` value of self.
   *
   * This function can be used for control flow based on result values.
   * @param fn The function to call
   */
  orElse<F>(fn: () => Result<T, F>): Result<T, E | F>;
}

export function Ok(): Result<void, never>;
export function Ok<T>(result: T): Result<T, never>;
export function Ok<T>(result?: T): Result<T, never> {
  return { __proto__: okImpl, result } as unknown as Result<T, never>;
}

export function Err(): Result<never, void>;
export function Err<E>(error: E): Result<never, E>;
export function Err<E>(error?: E): Result<never, E> {
  return { __proto__: errImpl, error } as unknown as Result<never, E>;
}
