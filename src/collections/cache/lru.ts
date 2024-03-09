import { opt, Ref, ref } from "../../core/index.ts";
import { Cache } from "./cache.ts";

/**
 * A simple LRU cache implementation that uses a `Map`.
 * @param capacity The maximum number of entries to store.
 */
export class LRUCache<K, V> implements Cache<K, V> {
  private cache: Map<K, Ref<V>>;

  constructor(public readonly capacity: number) {
    this.cache = new Map<K, Ref<V>>();
  }

  has(key: K): boolean {
    return this.cache.has(key);
  }

  get(key: K) {
    return opt(this.cache.get(key))
      .inspect((value) => {
        this.cache.delete(key);
        this.cache.set(key, value);
      })
      .map((ref) => ref.get());
  }

  set(key: K, value: V): V {
    this.cache.delete(key);

    if (this.cache.size >= this.capacity)
      this.cache.delete(this.cache.keys().next().value);

    this.cache.set(key, ref(value));
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

        const [key, value] = next.value as [K, Ref<V>];
        return { done: false, value: [key, value.get()] } as const;
      },
    };
  }
}
