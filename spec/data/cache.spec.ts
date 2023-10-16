import { Some, None } from '../../src/option/option';
import { LRUCache } from '../../src/data/cache';

describe('LRUCache', () => {
  it('should set and get values correctly', () => {
    const cache = new LRUCache<string, number>(2);
    cache.set('a', 1);
    cache.set('b', 2);
    expect(cache.get('a')).toEqual(Some(1));
    expect(cache.get('b')).toEqual(Some(2));
  });

  it('should remove the least recently used item when capacity is exceeded', () => {
    const cache = new LRUCache<string, number>(2);
    cache.set('a', 1);
    cache.set('b', 2);
    cache.set('c', 3);
    expect(cache.get('a')).toEqual(None);
    expect(cache.get('b')).toEqual(Some(2));
    expect(cache.get('c')).toEqual(Some(3));
  });

  it('should invalidate the cache correctly', () => {
    const cache = new LRUCache<string, number>(2);
    cache.set('a', 1);
    cache.set('b', 2);
    cache.invalidate();
    expect(cache.get('a')).toEqual(None);
    expect(cache.get('b')).toEqual(None);
  });

  it('should remove items correctly', () => {
    const cache = new LRUCache<string, number>(2);
    cache.set('a', 1);
    cache.set('b', 2);
    cache.remove('a');
    expect(cache.get('a')).toEqual(None);
    expect(cache.get('b')).toEqual(Some(2));
  });

  it('should return undefined for non-existent keys', () => {
    const cache = new LRUCache<string, number>(2);
    expect(cache.get('a')).toEqual(None);
  });

  it('should update the value for an existing key', () => {
    const cache = new LRUCache<string, number>(2);
    cache.set('a', 1);
    cache.set('a', 2);
    expect(cache.get('a')).toEqual(Some(2));
  });

  it('should return the correct capacity', () => {
    const cache = new LRUCache<string, number>(2);
    expect(cache.capacity).toEqual(2);
  });

  it('should return true if the key is present in the cache', () => {
    const cache = new LRUCache<string, number>(2);
    cache.set('a', 1);
    expect(cache.has('a')).toEqual(true);
  });

  it('should return false if the key is not present in the cache', () => {
    const cache = new LRUCache<string, number>(2);
    expect(cache.has('a')).toEqual(false);
  });

  it('should iterate through the cache correctly', () => {
    const cache = new LRUCache<string, number>(2);
    cache.set('a', 1);
    cache.set('b', 2);

    const entries = [...cache];
    expect(entries.length).toEqual(2);
    expect(entries[0]).toEqual(['a', 1]);
    expect(entries[1]).toEqual(['b', 2]);
  });
});
