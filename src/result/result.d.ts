import { None, Option, Some } from '..';
interface Res<T, E> {
    readonly result?: T;
    readonly error?: E;
    isOk(): this is Ok<T>;
    isErr(): this is Err<E>;
    expect(err: any): T;
    expectErr(err: any): E;
    unwrap(): T;
    unwrapErr(): E;
    unwrapOr<U>(def: U): T | U;
    unwrapOrElse<U>(fn: () => U): T | U;
    err(): Option<E>;
    ok(): Option<T>;
    transpose<E>(this: Result<Option<T>, E>): Option<Result<T, E>>;
    map<U>(fn: (val: T) => U): Result<U, E>;
    mapErr<F>(fn: (val: E) => F): Result<T, F>;
    mapOr<U>(def: U, fn: (val: T) => U): U;
    mapOrElse<U>(def: () => U, fn: (val: T) => U): U;
    and<U>(other: Result<U, E>): Result<T | U, E>;
    or<F>(other: Result<T, F>): Result<T, E | F>;
    andThen<U, F>(fn: (val: T) => Result<U, F>): Result<U, E | F>;
    orElse<U, F>(fn: () => Result<U, F>): Result<T | U, F>;
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
export declare function Ok<T>(result: T): Ok<T>;
/**
 * Create a new Err value with the given error
 * @param error The error value
 * @constructor
 */
export declare function Err<E>(error: E): Err<E>;
export {};
//# sourceMappingURL=result.d.ts.map