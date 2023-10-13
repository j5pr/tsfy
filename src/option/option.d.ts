import { Ok, Result } from '..';
interface Opt<T> {
    readonly value?: T;
    isSome(): this is Some<T>;
    isNone(): this is None;
    expect(err: any): T;
    unwrap(): T;
    unwrapOr<U>(def: U): T | U;
    unwrapOrElse<U>(fn: () => U): T | U;
    okOr<E>(err: E): Result<T, E>;
    okOrElse<E>(fn: () => E): Result<T, E>;
    transpose<E>(this: Option<Result<T, E>>): Result<Option<T>, E>;
    filter(fn: (val: T) => boolean): Option<T>;
    flatten<U>(this: Option<Option<U>>): Option<U>;
    map<U>(fn: (val: T) => U): Option<U>;
    mapOr<U>(def: U, fn: (val: T) => U): U;
    mapOrElse<U>(def: () => U, fn: (val: T) => U): U;
    and<U>(other: Option<U>): Option<U>;
    or(other: Option<T>): Option<T>;
    xor(other: Option<T>): Option<T>;
    andThen<U>(fn: (val: T) => Option<U>): Option<U>;
    orElse<U>(fn: () => Option<U>): Option<T | U>;
}
export interface Some<T> extends Opt<T> {
    readonly value: T;
    unwrapOr<U>(def: U): T;
    unwrapOrElse<U>(fn: () => U): T;
    okOr<E>(err: E): Ok<T>;
    okOrElse<E>(fn: () => E): Ok<T>;
    transpose<E>(this: Some<Result<T, E>>): Result<Some<T>, E>;
    map<U>(fn: (val: T) => U): Some<U>;
    orElse<U>(fn: () => Option<U>): Some<T>;
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
export declare namespace Option {
    function from<T>(value: T | null | undefined): Option<NonNullable<T>>;
}
export declare function Some<T>(value: T): Some<T>;
export declare const None: None;
export {};
//# sourceMappingURL=option.d.ts.map