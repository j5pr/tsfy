import { Some, None, Option, Result, Ok, Err } from '..';

const makeSomeImpl = <T>(): Omit<Some<T>, 'value'> => ({
  isSome: () => true,
  isNone: () => false,
  expect(this: Some<T>) {
    return this.value;
  },
  unwrap(this: Some<T>) {
    return this.value;
  },
  unwrapOr(this: Some<T>) {
    return this.value;
  },
  unwrapOrElse(this: Some<T>) {
    return this.value;
  },
  okOr(this: Some<T>) {
    return Ok(this.value);
  },
  okOrElse(this: Some<T>) {
    return Ok(this.value);
  },
  transpose<E>(this: Some<Result<T, E>>): Result<Some<T>, E> {
    const value = this.value;
    return value.isOk() ? Ok(Some(value.result)) : Err(value.error);
  },
  filter(this: Some<T>, fn: (val: T) => boolean) {
    return fn(this.value) ? this : None;
  },
  flatten<U>(this: Some<Option<U>>) {
    return this.value;
  },
  map<U>(this: Some<T>, fn: (val: T) => U) {
    return Some(fn(this.value));
  },
  mapOr<U>(this: Some<T>, _def: U, fn: (val: T) => U) {
    return fn(this.value);
  },
  mapOrElse<U>(this: Some<T>, _def: () => U, fn: (val: T) => U) {
    return fn(this.value);
  },
  and<U>(other: Option<U>): Option<U> {
    return other;
  },
  or(this: Some<T>) {
    return this;
  },
  xor(this: Some<T>, other: Option<T>) {
    return other.isSome() ? None : this;
  },
  andThen<U>(this: Some<T>, fn: (val: T) => Option<U>) {
    return fn(this.value);
  },
  orElse(this: Some<T>) {
    return this;
  },
});

const makeNoneImpl = (): None => ({
  isSome: () => false,
  isNone: () => true,
  expect(err: any) {
    throw err;
  },
  unwrap() {
    throw new Error('[Option] Called `unwrap()` on a `None` value');
  },
  unwrapOr: <U>(def: U) => def,
  unwrapOrElse: <U>(fn: () => U) => fn(),
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

export const someImpl = Object.freeze(makeSomeImpl<any>());
export const noneImpl = Object.freeze(makeNoneImpl());

export type SomeImpl<T> = ReturnType<typeof makeSomeImpl<T>>;
