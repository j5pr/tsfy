import { extend, None, Option, Some } from '..';
import { okImpl, errImpl, OkImpl, ErrImpl } from './impl';

interface Res<T, E> {
  /**
   * The result value, or undefined if this is an Err
   */
  readonly result?: T;

  /**
   * The error value, or undefined if this is an Ok
   */
  readonly error?: E;

  /**
   * Whether this is an Ok value
   */
  isOk(): this is Ok<T>;

  /**
   * Whether this is an Err value
   */
  isErr(): this is Err<E>;

  /**
   * Expect this to be an Ok value, otherwise throw the given error
   * @param err The error to throw
   */
  expect(err: any): T;

  /**
   * Expect this to be an Err value, otherwise throw the given error
   * @param err The error to throw
   */
  expectErr(err: any): E;

  /**
   * Unwrap the result value, throwing if it is an Err
   */
  unwrap(): T;

  /**
   * Unwrap the error value, throwing if it is an Ok
   */
  unwrapErr(): E;

  /**
   * Unwrap the result value, or return the given default if it is an Err
   * @param def The default value
   */
  unwrapOr<U>(def: U): T | U;

  /**
   * Unwrap the result value, or return the result of the given function if it is an Err
   * @param fn The function to call
   */
  unwrapOrElse<U>(fn: () => U): T | U;

  /**
   * Convert this to an Option, returning Some if this is an Ok, otherwise None
   */
  err(): Option<E>;

  /**
   * Convert this to an Option, returning Some if this is an Err, otherwise None
   */
  ok(): Option<T>;

  /**
   * Transpose a Result of Option into an Option of Result
   */
  transpose<E>(this: Result<Option<T>, E>): Option<Result<T, E>>;

  /**
   * Map the result value if this is an Ok
   * @param fn The function to call
   */
  map<U>(fn: (val: T) => U): Result<U, E>;

  /**
   * Map the error value if this is an Err
   * @param fn The function to call
   */
  mapErr<F>(fn: (val: E) => F): Result<T, F>;

  /**
   * Map the result value if this is an Ok, otherwise return the given default
   * @param def The default value
   * @param fn The function to call
   */
  mapOr<U>(def: U, fn: (val: T) => U): U;

  /**
   * Map the result value if this is an Ok, otherwise return the result of the given function
   * @param def The function returning the default value
   * @param fn The function to call
   */
  mapOrElse<U>(def: () => U, fn: (val: T) => U): U;

  /**
   * Combine this with another Result, returning Ok if both are Ok, otherwise Err
   * @param other The other Result
   */
  and<U>(other: Result<U, E>): Result<T | U, E>;

  /**
   * Combine this with another Result, returning Err if both are Err, otherwise Ok
   * @param other The other Result
   */
  or<F>(other: Result<T, F>): Result<T, E | F>;

  /**
   * Combine this with another Result, returning Ok if both are Ok, otherwise Err
   * @param fn The function to call
   */
  andThen<U>(fn: (val: T) => Result<U, E>): Result<T | U, E>;

  /**
   * Combine this with another Result, returning Err if both are Err, otherwise Ok
   * @param fn The function to call
   */
  orElse<F>(fn: () => Result<T, F>): Result<T, E | F>;
}

/**
 * A Result type that is Ok and has a value
 */
export interface Ok<T> extends Res<T, never> {
  readonly result: T;
  readonly error?: undefined;

  expectErr(err: any): never;
  unwrapErr(): never;
  unwrapOr<U>(def: U): T;
  unwrapOrElse<U>(fn: () => U): T;

  err(): None;
  ok(): Some<T>;
  transpose(this: Result<Option<T>, never>): Option<Ok<T>>;

  map<U>(fn: (val: T) => U): Ok<U>;
  mapErr<F>(fn: (val: never) => F): Ok<T>;

  and<U, F>(other: Result<U, F>): Result<U, F>;
  or<F>(other: Result<T, F>): Ok<T>;

  andThen<U, F>(fn: (val: T) => Result<U, F>): Result<U, F>;
  orElse<U, F>(fn: () => Result<U, F>): Ok<T>;
}

/**
 * A Result type that is Err and has an error
 */
export interface Err<E> extends Res<never, E> {
  readonly result?: undefined;
  readonly error: E;

  expect(err: any): never;
  unwrap(): never;
  unwrapErr(): E;
  unwrapOr<U>(def: U): U;
  unwrapOrElse<U>(fn: () => U): U;

  err(): Some<E>;
  ok(): None;
  transpose<E>(this: Result<Option<never>, E>): Some<Err<E>>;

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
