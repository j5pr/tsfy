import { Cache, LRUCache } from '..';

/**
 * Memoizes a function using a `LRUCache`.
 *
 * @param fn The function to memoize
 * @param size The maximum number of entries to store
 * @returns The memoized function, with the cache methods attached
 */
export function memoize<K, V>(fn: (key: K) => V, size?: number) {
  const cache = new LRUCache<K, V>(size);

  const get: ((key: K) => V) & Cache<K, V> = (key: K): V =>
    cache.get(key).unwrapOrElse(() => cache.set(key, fn(key))) as any;

  get.get = cache.get.bind(cache);
  get.set = cache.set.bind(cache);
  get.has = cache.has.bind(cache);
  get.remove = cache.remove.bind(cache);
  get.invalidate = cache.invalidate.bind(cache);

  return get;
}