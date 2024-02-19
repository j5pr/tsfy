export function list<T>(iter: Iterable<T> | ArrayLike<T>): T[] {
  return Array.from(iter);
}

export function set<T>(iter: Iterable<T>): Set<T> {
  return new Set(iter);
}

export function map<K, V>(iter: Iterable<readonly [K, V]>): Map<K, V> {
  return new Map(iter);
}
