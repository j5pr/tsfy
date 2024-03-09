import { Option, opt, Ref, ref } from "../../core/index.ts";
import { Cache } from "./cache.ts";

/**
 * A simple unbounded cache implementation that uses a `Map`.
 */
export class UnboundedCache<K, V> implements Cache<K, V> {
  private cache = new Map<K, Ref<V>>();

  has(key: K): boolean {
    return this.cache.has(key);
  }

  get(key: K): Option<V> {
    return opt(this.cache.get(key)).map((ref) => ref.get());
  }

  set(key: K, value: V): V {
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
