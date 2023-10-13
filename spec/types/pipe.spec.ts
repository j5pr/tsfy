import { pipe } from '../../src/types/pipe';

describe('pipe', () => {
  it('should return a Pipe object', () => {
    const result = pipe(5);
    expect(result.next).withContext('next()').toBeInstanceOf(Function);
    expect(result.result).withContext('result()').toBeInstanceOf(Function);
  });

  it('should return the initial value when result() is called', () => {
    const result = pipe(5).result();
    expect(result).toBe(5);
  });

  it('should call the provided function when next() is called', () => {
    const fn = jasmine.createSpy().and.returnValue(10);
    const result = pipe(5).next(fn).result();
    expect(fn).toHaveBeenCalledWith(5);
    expect(result).toBe(10);
  });

  it('should allow chaining of next() calls', () => {
    const fn1 = jasmine.createSpy().and.returnValue(10);
    const fn2 = jasmine.createSpy().and.returnValue(11);
    const result = pipe(5).next(fn1).next(fn2).result();
    expect(fn1).toHaveBeenCalledWith(5);
    expect(fn2).toHaveBeenCalledWith(10);
    expect(result).toBe(11);
  });
});
