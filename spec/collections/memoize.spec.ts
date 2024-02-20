import { memoize, UnboundedCache } from "tsfy/collections";

describe("memoize", () => {
  it("should memoize a function", () => {
    const fn = jest.fn((x: number) => x * 2);
    const memoizedFn = memoize(fn, null);

    expect(memoizedFn(2)).toBe(4);
    expect(memoizedFn(2)).toBe(4);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("should memoize a function with a cache size", () => {
    const fn = jest.fn((x: number) => x * 2);
    const memoizedFn = memoize(fn, 1);

    expect(memoizedFn(2)).toBe(4);
    expect(memoizedFn(2)).toBe(4);
    expect(fn).toHaveBeenCalledTimes(1);

    expect(memoizedFn(3)).toBe(6);
    expect(memoizedFn(3)).toBe(6);
    expect(fn).toHaveBeenCalledTimes(2);
  });

  it("should clear the cache", () => {
    const fn = jest.fn((x: number) => x * 2);
    const memoizedFn = memoize(fn, new UnboundedCache());

    expect(memoizedFn(2)).toBe(4);
    expect(fn).toHaveBeenCalledTimes(1);

    memoizedFn.invalidate();

    expect(memoizedFn(2)).toBe(4);
    expect(fn).toHaveBeenCalledTimes(2);
  });
});
