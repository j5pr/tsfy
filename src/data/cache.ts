import { Option, Some } from '../index.js';

/**
 * A cache that stores key-value pairs.
 */
export interface Cache<K, V> {
  /**
   * Returns true if the key is present in the cache.
   * @param key The key to lookup
   */
  has(key: K): boolean;

  /**
   * Returns the value corresponding to the key.
   * @param key The key to lookup
   */
  get(key: K): Option<V>;

  /**
   * Sets the value corresponding to the key.
   * @param key The key to set
   * @param value The value to set
   */
  set(key: K, value: V): void;

  /**
   * Removes the value corresponding to the key.
   * @param key The key to remove
   */
  remove(key: K): void;

  /**
   * Invalidates the cache.
   */
  invalidate(): void;

  /**
   * Returns an iterator over the cache, as [key, value] pairs.
   * Pairs are returned in the order of least recently used.
   */
  [Symbol.iterator](): Iterator<readonly [K, V]>;
}

/**
 * A simple LRU cache implementation that uses a `Map`.
 * @param capacity The maximum number of entries to store.
 */
export class LRUCache<K, V> implements Cache<K, V> {
  private cache: Map<K, Some<V>>;

  constructor(public readonly capacity?: number) {
    this.cache = new Map<K, Some<V>>();
  }

  has(key: K): boolean {
    return this.cache.has(key);
  }

  get(key: K): Option<V> {
    return Option.from(this.cache.get(key))
      .inspect((value) => {
        this.cache.delete(key);
        this.cache.set(key, value);
      })
      .flatten();
  }

  set(key: K, value: V): V {
    this.cache.delete(key);

    if (this.capacity && this.cache.size >= this.capacity)
      this.cache.delete(this.cache.keys().next().value);

    this.cache.set(key, Some(value));
    return value;
  }

  remove(key: K): void {
    this.cache.delete(key);
  }

  invalidate(): void {
    this.cache.clear();
  }

  [Symbol.iterator]() {
    const entries = this.cache.entries();

    return {
      next: () => {
        const next = entries.next();
        if (next.done) return { done: true, value: undefined } as const;

        const [key, value] = next.value as [K, Some<V>];
        return { done: false, value: [key, value.unwrap()] } as const;
      },
    };
  }
}
