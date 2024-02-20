import { Cache } from "./index.ts";
import { LRUCache } from "./cache/lru.ts";
import { UnboundedCache } from "./cache/unbounded.ts";

/**
 * A memoized function, with the cache methods attached.
 */
export interface Memoized<K, V> extends Cache<K, V> {
  /**
   * Returns the value associated with the provided key.
   */
  (key: K): V;
}

/**
 * Memoizes a function.
 *
 * @param fn The function to memoize
 * @param store The maximum number of entries to store
 * @returns The memoized function, with the cache methods attached
 */
export function memoize<K, V>(
  fn: (key: K) => V,
  store: Cache<K, V> | number | null,
): Memoized<K, V> {
  const cache: Cache<K, V> = !store
    ? new UnboundedCache<K, V>()
    : typeof store === "number"
      ? new LRUCache<K, V>(store)
      : store;

  const get = ((key: K) => {
    return cache.get(key).unwrapOrElse(() => cache.set(key, fn(key)));
  }) as Memoized<K, V>;

  get.get = cache.get.bind(cache);
  get.set = cache.set.bind(cache);
  get.has = cache.has.bind(cache);
  get.remove = cache.remove.bind(cache);
  get.invalidate = cache.invalidate.bind(cache);

  return get;
}
