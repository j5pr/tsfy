import { extend, Ok, Result } from '..';
import { someImpl, noneImpl, SomeImpl } from './impl';

interface Opt<T> {
  /**
   * The value, or undefined if this is None
   */
  readonly value?: T;

  /**
   * Whether this is a Some value
   */
  isSome(): this is Some<T>;

  /**
   * Whether this is a None value
   */
  isNone(): this is None;

  /**
   * Expect this to be a Some value, otherwise throw the given error
   * @param err The error to throw
   */
  expect(err: any): T;

  /**
   * Unwrap the value, throwing if it is a None
   */
  unwrap(): T;

  /**
   * Unwrap the value, or return the given default if it is a None
   * @param def The default value
   */
  unwrapOr<U>(def: U): T | U;

  /**
   * Unwrap the value, or return the result of the given function if it is a None
   * @param fn The function to call
   */
  unwrapOrElse<U>(fn: () => U): T | U;

  /**
   * Convert this to a Result, returning Ok if this is a Some, otherwise Err
   * @param err The error to return if this is a None
   */
  okOr<E>(err: E): Result<T, E>;

  /**
   * Convert this to a Result, returning Ok if this is a Some, otherwise Err
   * @param fn The function returning the error to return if this is a None
   */
  okOrElse<E>(fn: () => E): Result<T, E>;

  /**
   * Convert an Option of a Result to a Result of an Option
   */
  transpose<E>(this: Option<Result<T, E>>): Result<Option<T>, E>;

  /**
   * Filter the Option, returning None if the predicate returns false
   * @param fn The predicate function
   */
  filter(fn: (val: T) => boolean): Option<T>;

  /**
   * Flatten an Option of an Option into an Option
   */
  flatten<U>(this: Option<Option<U>>): Option<U>;

  /**
   * Map the value if this is a Some
   * @param fn The function to call
   */
  map<U>(fn: (val: T) => U): Option<U>;

  /**
   * Map the value if this is a Some, otherwise return the given default
   * @param def The default value
   * @param fn The function to call
   */
  mapOr<U>(def: U, fn: (val: T) => U): U;

  /**
   * Map the value if this is a Some, otherwise return the result of the given function
   * @param def The function returning the default value
   * @param fn The function to call
   */
  mapOrElse<U>(def: () => U, fn: (val: T) => U): U;

  /**
   * Return the other Option if this is a Some, otherwise None
   * @param other The other Option
   */
  and<U>(other: Option<U>): Option<U>;

  /**
   * Return this if it is a Some, otherwise the other Option
   * @param other The other Option
   */
  or(other: Option<T>): Option<T>;

  /**
   * Return None if both this and the other Option are Some, otherwise return Some
   * @param other The other Option
   */
  xor(other: Option<T>): Option<T>;

  /**
   * Return the result of the given function if this is a Some, otherwise None
   * @param fn The function to call
   */
  andThen<U>(fn: (val: T) => Option<U>): Option<U>;

  /**
   * Return this if it is a Some, otherwise the result of the given function
   * @param fn The function to call
   */
  orElse(fn: () => Option<T>): Option<T>;
}

export interface Some<T> extends Opt<T> {
  readonly value: T;

  unwrapOr<U>(def: U): T;
  unwrapOrElse<U>(fn: () => U): T;

  okOr<E>(err: E): Ok<T>;
  okOrElse<E>(fn: () => E): Ok<T>;
  transpose<E>(this: Some<Result<T, E>>): Result<Some<T>, E>;

  map<U>(fn: (val: T) => U): Some<U>;

  orElse(fn: () => Option<T>): Some<T>;
}

export interface None extends Opt<never> {
  readonly value?: undefined;

  expect(err: any): never;

  unwrap(): never;
  unwrapOr<U>(def: U): U;
  unwrapOrElse<U>(fn: () => U): U;

  okOr<E>(err: E): Result<never, E>;
  okOrElse<E>(fn: () => E): Result<never, E>;
  transpose(): Ok<None>;

  filter(fn: (val: never) => boolean): None;
  flatten(): None;
  map<U>(fn: (val: never) => U): None;

  and<U>(other: Option<U>): None;

  andThen<U>(fn: (val: never) => Option<U>): None;
  orElse<U>(fn: () => Option<U>): Option<U>;
}

export type Option<T> = Some<T> | None;

export namespace Option {
  export function from<T>(value: T | null | undefined): Option<NonNullable<T>> {
    return value == null ? None : Some(value);
  }
}

export function Some<T>(value: T): Some<T> {
  return extend(
    { value: { value, writable: false, configurable: false } },
    someImpl as SomeImpl<T>,
  );
}

export const None: None = noneImpl;
