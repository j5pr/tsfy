import { extend, None, Option, Some } from '..';
import { okImpl, errImpl, OkImpl, ErrImpl } from './impl';

interface Res<T, E> {
  /**
   * Returns `true` if the result is `Ok`.
   */
  isOk(): this is Ok<T>;

  /**
   * Returns `true` if the result is `Ok` and the value inside of it matches a predicate.
   * @param fn The predicate function
   */
  isOkAnd(fn: (val: T) => boolean): this is Ok<T>;

  /**
   * Returns `true` if the result is `Err`.
   */
  isErr(): this is Err<E>;

  /**
   * Returns `true` if the result is `Err` and the value inside of it matches a predicate.
   * @param fn The predicate function
   */
  isErrAnd(fn: (val: E) => boolean): this is Err<E>;

  /**
   * Returns the contained `Ok` value, throwing if the value is an `Err` with a custom error.
   * @param err The custom error to throw
   */
  expect(err: any): T;

  /**
   * Returns the contained `Err` value, throwing if the value is an `Ok` with a custom error.
   * @param err The custom error to throw
   */
  expectErr(err: any): E;

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
  transpose<U extends T>(this: Result<Option<U>, E>): Option<Result<U, E>>;

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
   * Calls op if the result is `Err`, otherwise returns the `Ok` value of self.
   *
   * This function can be used for control flow based on result values.
   * @param fn The function to call
   */
  orElse<F>(fn: () => Result<T, F>): Result<T, E | F>;
}

export interface Ok<T> extends Res<T, never> {
  expectErr(err: any): never;
  unwrapErr(): never;
  unwrapOr<U>(def: U): T;
  unwrapOrElse<U>(fn: () => U): T;
  inspect(fn: (val: T) => void): Ok<T>;
  inspectErr(fn: (val: never) => void): Ok<T>;

  err(): None;
  ok(): Some<T>;
  transpose<U>(this: Result<Option<U>, unknown>): Option<Ok<U>>;

  map<U>(fn: (val: T) => U): Ok<U>;
  mapErr<F>(fn: (val: never) => F): Ok<T>;

  and<U, F>(other: Result<U, F>): Result<U, F>;
  or<F>(other: Result<T, F>): Ok<T>;

  andThen<U, F>(fn: (val: T) => Result<U, F>): Result<U, F>;
  orElse<U, F>(fn: () => Result<U, F>): Ok<T>;
}

export interface Err<E> extends Res<never, E> {
  expect(err: any): never;
  unwrap(): never;
  unwrapErr(): E;
  unwrapOr<U>(def: U): U;
  unwrapOrElse<U>(fn: () => U): U;
  inspect(fn: (val: never) => void): Err<E>;
  inspectErr(fn: (val: E) => void): Err<E>;

  err(): Some<E>;
  ok(): None;
  transpose(this: Result<Option<unknown>, E>): Some<Err<E>>;

  map<U>(fn: (val: never) => U): Err<E>;
  mapErr<F>(fn: (val: E) => F): Result<never, F>;
  mapOr<U>(def: U, fn: (val: never) => U): U;
  mapOrElse<U>(def: () => U, fn: (val: never) => U): U;

  and<U>(other: Result<U, E>): Err<E>;
  or<T, F>(other: Result<T, F>): Result<T, F>;

  andThen<U, F>(fn: (val: never) => Result<U, F>): Err<E>;
  orElse<U, F>(fn: () => Result<U, F>): Result<U, F>;
}

/**
 * A Result type that is either Ok or Err
 */
export type Result<T, E> = Ok<T> | Err<E>;

/**
 * Create a new Ok value with the given result
 * @param result The result value
 * @constructor
 */
export function Ok<T>(result: T): Ok<T> {
  return extend(
    { result: { value: result, writable: false, configurable: false } },
    okImpl as OkImpl<T>,
  );
}

/**
 * Create a new Err value with the given error
 * @param error The error value
 * @constructor
 */
export function Err<E>(error: E): Err<E> {
  return extend(
    { error: { value: error, writable: false, configurable: false } },
    errImpl as ErrImpl<E>,
  );
}
