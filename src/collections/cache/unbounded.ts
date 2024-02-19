import { Option, Some } from "../../core/index.js";
import { Cache } from "./cache.js";

/**
 * A simple unbounded cache implementation that uses a `Map`.
 */
export class UnboundedCache<K, V> implements Cache<K, V> {
  private cache = new Map<K, Some<V>>();

  has(key: K): boolean {
    return this.cache.has(key);
  }

  get(key: K): Option<V> {
    return Option.from(this.cache.get(key)).flatten();
  }

  set(key: K, value: V): V {
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
