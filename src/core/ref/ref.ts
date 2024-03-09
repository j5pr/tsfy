/**
 * A reference to a value.
 */
export interface Ref<T> {
  get(): T;
}

/**
 * A mutable reference to a value.
 */
export interface MutRef<T> extends Ref<T> {
  set(value: T): void;
}

export function ref<T>(value: T): Ref<T> {
  return {
    get: () => value,
  };
}

export function mutRef<T>(value: T): MutRef<T> {
  const ctx = { value };

  return {
    get: () => ctx.value,
    set: (value: T) => (ctx.value = value),
  };
}
