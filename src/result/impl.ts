import { Ok, Err, Result, Option, None, Some } from '..';
import { unreachable } from '../types/unreachable';

const makeOkImpl = <T>(): Omit<Ok<T>, 'result'> => ({
  isOk: () => true,
  isErr: () => false,
  expect(this: Ok<T>) {
    return this.result;
  },
  expectErr(err: any): never {
    throw err;
  },
  unwrap(this: Ok<T>) {
    return this.result;
  },
  unwrapErr(): never {
    throw new Error('[Result] Called `unwrapErr()` on an `Ok` value');
  },
  unwrapOr(this: Ok<T>) {
    return this.result;
  },
  unwrapOrElse(this: Ok<T>) {
    return this.result;
  },
  err: () => None,
  ok(this: Ok<T>) {
    return Some(this.result);
  },
  transpose(this: Ok<Option<T>>): Option<Ok<T>> {
    return this.result.isSome() ? Some(Ok(this.result.value)) : None;
  },
  map<U>(this: Ok<T>, fn: (val: T) => U): Ok<U> {
    return Ok(fn(this.result));
  },
  mapErr(this: Ok<T>) {
    return Ok(this.result);
  },
  mapOr<U>(this: Ok<T>, _def: U, fn: (val: T) => U) {
    return fn(this.result);
  },
  mapOrElse<U>(this: Ok<T>, _def: () => U, fn: (val: T) => U) {
    return fn(this.result);
  },
  and<U>(this: Ok<T>, other: Result<U, any>) {
    return other;
  },
  or(this: Ok<T>) {
    return this;
  },
  andThen<U>(this: Ok<T>, fn: (val: T) => Result<U, any>) {
    return fn(this.result);
  },
  orElse(this: Ok<T>) {
    return this;
  },
});

const makeErrImpl = <E>(): Omit<Err<E>, 'error'> => ({
  isOk: () => false,
  isErr: () => true,
  expect(this: Err<E>) {
    throw this.error;
  },
  expectErr(this: Err<E>) {
    return this.error;
  },
  unwrap(this: Err<E>) {
    throw new Error('[Result] Called `unwrap()` on an `Err` value');
  },
  unwrapErr(this: Err<E>): E {
    return this.error;
  },
  unwrapOr<U>(this: Err<E>, def: U) {
    return def;
  },
  unwrapOrElse<U>(this: Err<E>, fn: () => U) {
    return fn();
  },
  err(this: Err<E>) {
    return Some(this.error);
  },
  ok: () => None,
  transpose<E>(this: Result<Option<never>, E>): Some<Err<E>> {
    return Some(Err(this.error ?? unreachable()));
  },
  map<U>(this: Err<E>, _fn: (val: never) => U) {
    return this;
  },
  mapErr<F>(this: Err<E>, fn: (val: E) => F) {
    return Err(fn(this.error));
  },
  mapOr<U>(this: Err<E>, def: U, _fn: (val: never) => U) {
    return def;
  },
  mapOrElse<U>(this: Err<E>, def: () => U, _fn: (val: never) => U) {
    return def();
  },
  and<U>(this: Err<E>, _other: Result<U, E>) {
    return this;
  },
  or<U, F>(this: Err<E>, other: Result<U, F>) {
    return other;
  },
  andThen<U>(this: Err<E>, _fn: (val: never) => Result<U, any>) {
    return this;
  },
  orElse<U, F>(this: Err<E>, fn: () => Result<U, F>) {
    return fn();
  },
});

export const okImpl = Object.freeze(makeOkImpl<any>());
export const errImpl = Object.freeze(makeErrImpl<any>());

export type OkImpl<T> = ReturnType<typeof makeOkImpl<T>>;
export type ErrImpl<E> = ReturnType<typeof makeErrImpl<E>>;
