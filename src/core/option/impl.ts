import { Some, None, Option, Result, Ok, Err } from "../index.js";

type VSome<T> = { value: T } & Some<T>;

const makeSomeImpl = <T>(): Some<T> => ({
  isSome: () => true,
  isSomeAnd(this: VSome<T>, fn: (val: T) => boolean) {
    return fn(this.value);
  },
  isNone: () => false,
  expect(this: VSome<T>) {
    return this.value;
  },
  unwrap(this: VSome<T>) {
    return this.value;
  },
  unwrapOr(this: VSome<T>) {
    return this.value;
  },
  unwrapOrElse(this: VSome<T>) {
    return this.value;
  },
  inspect(this: VSome<T>, fn: (val: T) => void) {
    fn(this.value);
    return this;
  },
  okOr(this: VSome<T>) {
    return Ok(this.value);
  },
  okOrElse(this: VSome<T>) {
    return Ok(this.value);
  },
  transpose<U, E>(this: VSome<Result<U, E>>): Result<Some<U>, E> {
    const value = this.value;
    return value.isOk() ? Ok(Some(value.unwrap())) : Err(value.unwrapErr());
  },
  filter(this: VSome<T>, fn: (val: T) => boolean) {
    return fn(this.value) ? this : None;
  },
  flatten<U>(this: VSome<Option<U>>) {
    return this.value;
  },
  map<U>(this: VSome<T>, fn: (val: T) => U) {
    return Some(fn(this.value));
  },
  mapOr<U>(this: VSome<T>, _def: U, fn: (val: T) => U) {
    return fn(this.value);
  },
  mapOrElse<U>(this: VSome<T>, _def: () => U, fn: (val: T) => U) {
    return fn(this.value);
  },
  and<U>(other: Option<U>): Option<U> {
    return other;
  },
  or(this: Some<T>) {
    return this;
  },
  xor<U>(this: Some<T>, other: Option<U>) {
    return other.isSome() ? None : this;
  },
  andThen<U>(this: VSome<T>, fn: (val: T) => Option<U>) {
    return fn(this.value);
  },
  orElse(this: Some<T>) {
    return this;
  },
});

const makeNoneImpl = (): None => ({
  isSome: () => false,
  isSomeAnd: () => false,
  isNone: () => true,
  expect(err: unknown) {
    throw err;
  },
  unwrap() {
    throw new Error("[Option] Called `unwrap()` on a `None` value");
  },
  unwrapOr: <U>(def: U) => def,
  unwrapOrElse: <U>(fn: () => U) => fn(),
  inspect: () => None,
  okOr: <E>(err: E) => Err(err),
  okOrElse: <E>(fn: () => E) => Err(fn()),
  transpose: () => Ok(None),
  filter: () => None,
  flatten: () => None,
  map: () => None,
  mapOr: <U>(def: U) => def,
  mapOrElse: <U>(def: () => U) => def(),
  and: () => None,
  or: <T>(other: Option<T>) => other,
  xor: <T>(other: Option<T>) => other,
  andThen: () => None,
  orElse: <U>(fn: () => Option<U>) => fn(),
});

export const someImpl = Object.freeze(makeSomeImpl<unknown>());
export const noneImpl = Object.freeze(makeNoneImpl());
