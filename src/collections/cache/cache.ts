import { Option } from "../../core/index.ts";

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
   */
  [Symbol.iterator](): Iterator<readonly [K, V]>;
}
