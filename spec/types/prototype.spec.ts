import { extend } from '../../src/index.js';

describe('extend', () => {
  it('should create an object with the correct properties', () => {
    const parent = { a: 1 };
    const obj = {
      b: {
        value: 2,
        writable: true,
      },
      c: {
        get: () => 3,
        enumerable: true,
      },
    };

    const result = extend(obj, parent);

    expect(result.a).toBe(1);
    expect(result.b).toBe(2);
    expect(result.c).toBe(3);
  });

  it('should inherit properties from the parent object', () => {
    const parent = { a: 1 };
    const obj = {
      b: {
        value: 2,
        writable: true,
      },
      c: {
        get: () => 3,
        enumerable: true,
      },
    };

    const result = extend(obj, parent);

    expect(result.a).toBe(1);
  });

  it('should allow properties to be overwritten', () => {
    const parent = { a: 1 };
    const obj = {
      a: {
        value: 2,
        writable: true,
      },
    };

    const result = extend(obj, parent);

    expect(result.a).toBe(2);
  });
});
