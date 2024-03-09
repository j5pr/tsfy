import { Result } from "../index.ts";
import { someImpl, noneImpl } from "./impl.ts";

/**
 * Type `Option` represents an optional value: every `Option` is
 * either `Some` and contains a value, or `None`, and does not.
 */
export interface Option<out T>
  extends Iterable<T extends Iterable<infer U> ? U : never> {
  /**
   * Returns true if the option is a `Some` value.
   */
  isSome(): boolean;

  /**
   * Returns true if the option is a `Some` and the value inside of it matches a predicate.
   */
  isSomeAnd(fn: (val: T) => boolean): boolean;

  /**
   * Returns true if the option is a `None` value.
   */
  isNone(): boolean;

  /**
   * Returns the contained `Some` value, throwing if the value is a `None` with a custom error.
   * @param err The custom error to throw
   */
  expect(err: unknown): T;

  /**
   * Returns the contained `Some` value, throwing if the value is a `None`.
   */
  unwrap(): T;

  /**
   * Returns the contained `Some` value or a provided default.
   * @param def The provided default
   */
  unwrapOr<U>(def: U): T | U;

  /**
   * Returns the contained `Some` value or computes it from a closure.
   * @param fn The function to evaluate
   */
  unwrapOrElse<U>(fn: () => U): T | U;

  /**
   * Calls the provided closure with a reference to the contained value (if `Some`).
   * @param fn The function to evaluate
   */
  inspect(fn: (val: T) => void): Option<T>;

  /**
   * Transforms the `Option<T>` into a `Result<T, E>`,
   * mapping `Some(v)` to `Ok(v)` and `None` to `Err(err)`.
   * @param err The provided error
   */
  okOr<E>(err: E): Result<T, E>;

  /**
   * Transforms the `Option<T>` into a `Result<T, E>`,
   * mapping `Some(v)` to `Ok(v)` and `None` to `Err(err())`.
   * @param err The function provide the error
   */
  okOrElse<E>(err: () => E): Result<T, E>;

  /**
   * Transposes an `Option` of a `Result` into a `Result` of an `Option`.
   *
   * None will be mapped to `Ok(None)`. `Some(Ok(_))` and
   * `Some(Err(_))` will be mapped to `Ok(Some(_))` and `Err(_)`.
   */
  transpose<U, E>(this: Option<Result<U, E>>): Result<Option<U>, E>;

  /**
   * Returns `None` if the option is `None`, otherwise calls
   * predicate with the wrapped value and returns:
   * - `Some(t)` if predicate returns `true` (where `t` is the wrapped value); and
   * - `None` if predicate returns false.
   * @param fn The predicate function
   */
  filter(fn: (val: T) => boolean): Option<T>;

  /**
   * Converts from `Option<Option<T>>` to `Option<T>`.
   */
  flatten<U>(this: Option<Option<U>>): Option<U>;

  /**
   * Maps an `Option<T>` toc`Option<U>` by applying a function to a
   * contained value (if `Some`) or returns `None` (if `None`).
   * @param fn The function to evaluate
   */
  map<U>(fn: (val: T) => U): Option<U>;

  /**
   * Returns the provided default result (if `None`), or
   * applies a function to the contained value (if `Some`).
   * @param def The provided default
   * @param fn The function to evaluate
   */
  mapOr<U>(def: U, fn: (val: T) => U): U;

  /**
   * Computes a default function result (if `None`), or
   * applies a different function to the contained value (if `Some`).
   * @param def The function providing the default value
   * @param fn The function to evaluate
   */
  mapOrElse<U>(def: () => U, fn: (val: T) => U): U;

  /**
   * Returns `None` if the option is `None`, otherwise returns `other`.
   * @param other The other Option
   */
  and<U>(other: Option<U>): Option<U>;

  /**
   * Returns the option if it contains a value, otherwise returns `other`.
   * @param other The other Option
   */
  or<U>(other: Option<U>): Option<T | U>;

  /**
   * Return None if both this and the other Option are Some, otherwise return Some
   * @param other The other Option
   */
  xor<U>(other: Option<U>): Option<T | U>;

  /**
   * Returns `None` if the option is `None`, otherwise calls the function
   * with the wrapped value and returns the result.
   *
   * Some languages call this operation flatmap.
   * @param fn The function to evaluate
   */
  andThen<U>(fn: (val: T) => Option<U>): Option<U>;

  /**
   * Returns the option if it contains a value, otherwise
   * calls the function and returns the result.
   * @param fn The function to evaluate
   */
  orElse(fn: () => Option<T>): Option<T>;
}

/**
 * Create an `Option<T>` from `T | null | undefined`, returning `None` if the value
 * is `null` or `undefined`, otherwise returns `Some<T>`.
 * @param value The value to convert
 * @returns An `Option<T>`
 */
export function opt<T>(value: T | null | undefined): Option<NonNullable<T>> {
  return value === null || value === undefined ? None : Some(value);
}

export function Some(): Option<void>;
export function Some<T>(value: T): Option<T>;
export function Some<T>(value?: T): Option<T> {
  return { __proto__: someImpl, value } as unknown as Option<T>;
}

export const None = noneImpl;
