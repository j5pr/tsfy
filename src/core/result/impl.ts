import { Ok, Err, Result, Option, None, Some } from "../index.js";

type VOk<T> = { result: T } & Ok<T>;
type VErr<E> = { error: E } & Err<E>;

const makeOkImpl = <T>(): Ok<T> => ({
  isOk: () => true,
  isOkAnd(this: VOk<T>, fn: (val: T) => boolean) {
    return fn(this.result);
  },
  isErr: () => false,
  isErrAnd: () => false,
  expect(this: VOk<T>) {
    return this.result;
  },
  expectErr(err: unknown): never {
    throw err;
  },
  unwrap(this: VOk<T>) {
    return this.result;
  },
  unwrapErr(): never {
    throw new Error("[Result] Called `unwrapErr()` on an `Ok` value");
  },
  unwrapOr(this: VOk<T>) {
    return this.result;
  },
  unwrapOrElse(this: VOk<T>) {
    return this.result;
  },
  inspect(this: VOk<T>, fn: (val: T) => void) {
    fn(this.result);
    return this;
  },
  inspectErr(this: VOk<T>) {
    return this;
  },
  err: () => None,
  ok(this: VOk<T>) {
    return Some(this.result);
  },
  transpose<U>(this: VOk<Option<U>>): Option<Ok<U>> {
    return this.result.isSome() ? Some(Ok(this.result.unwrap())) : None;
  },
  map<U>(this: VOk<T>, fn: (val: T) => U): Ok<U> {
    return Ok(fn(this.result));
  },
  mapErr(this: VOk<T>) {
    return Ok(this.result);
  },
  mapOr<U>(this: VOk<T>, _def: U, fn: (val: T) => U) {
    return fn(this.result);
  },
  mapOrElse<U>(this: VOk<T>, _def: () => U, fn: (val: T) => U) {
    return fn(this.result);
  },
  and<U, F>(this: VOk<T>, other: Result<U, F>) {
    return other;
  },
  or(this: VOk<T>) {
    return this;
  },
  andThen<U, F>(this: VOk<T>, fn: (val: T) => Result<U, F>) {
    return fn(this.result);
  },
  orElse(this: VOk<T>) {
    return this;
  },
});

const makeErrImpl = <E>(): Err<E> => ({
  isOk: () => false,
  isOkAnd: () => false,
  isErr: () => true,
  isErrAnd(this: VErr<E>, fn: (val: E) => boolean) {
    return fn(this.error);
  },
  expect(err: unknown) {
    throw err;
  },
  expectErr(this: VErr<E>) {
    return this.error;
  },
  unwrap(this: VErr<E>) {
    throw new Error("[Result] Called `unwrap()` on an `Err` value");
  },
  unwrapErr(this: VErr<E>): E {
    return this.error;
  },
  unwrapOr<U>(this: VErr<E>, def: U) {
    return def;
  },
  unwrapOrElse<U>(this: VErr<E>, fn: () => U) {
    return fn();
  },
  inspect(this: VErr<E>) {
    return this;
  },
  inspectErr(this: VErr<E>, fn: (val: E) => void) {
    fn(this.error);
    return this;
  },
  err(this: VErr<E>) {
    return Some(this.error);
  },
  ok: () => None,
  transpose(this: VErr<E>): Some<Err<E>> {
    return Some(Err(this.error));
  },
  map(this: VErr<E>) {
    return this;
  },
  mapErr<F>(this: VErr<E>, fn: (val: E) => F) {
    return Err(fn(this.error));
  },
  mapOr<U>(this: VErr<E>, def: U) {
    return def;
  },
  mapOrElse<U>(this: VErr<E>, def: () => U) {
    return def();
  },
  and(this: VErr<E>) {
    return this;
  },
  or<U, F>(this: VErr<E>, other: Result<U, F>) {
    return other;
  },
  andThen(this: VErr<E>) {
    return this;
  },
  orElse<U, F>(this: VErr<E>, fn: () => Result<U, F>) {
    return fn();
  },
});

export const okImpl = Object.freeze(makeOkImpl<unknown>());
export const errImpl = Object.freeze(makeErrImpl<unknown>());
