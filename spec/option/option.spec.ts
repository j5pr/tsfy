import { Err, Ok, Result } from '../../src/result/result';
import { Option, Some, None } from '../../src/option/option';

describe('Option', () => {
  describe('Some', () => {
    it('should create a Some with a value', () => {
      const some: Option<number> = Some(42);
      expect(some.isSome()).toBe(true);
      expect(some.isNone()).toBe(false);
      expect(some.unwrap()).toBe(42);
    });

    it('should return true if isSomeAnd() is called with a matching predicate', () => {
      const some: Option<number> = Some(42);
      expect(some.isSomeAnd((val) => val === 42)).toBe(true);
    });

    it('should return false if isSomeAnd() is called with a non-matching predicate', () => {
      const some: Option<number> = Some(42);
      expect(some.isSomeAnd((val) => val === 99)).toBe(false);
    });

    it('should return the value if expect() is called', () => {
      const some: Option<number> = Some(42);
      expect(some.expect('Value does not exist')).toBe(42);
    });

    it('should return the value if unwrapOr() is called', () => {
      const some: Option<number> = Some(42);
      expect(some.unwrapOr(99)).toBe(42);
    });

    it('should return the value if unwrapOrElse() is called', () => {
      const some: Option<number> = Some(42);
      expect(some.unwrapOrElse(() => 99)).toBe(42);
    });

    it('should call the provided function with the value if inspect() is called', () => {
      const some: Option<number> = Some(42);
      const fn = jest.fn();
      some.inspect(fn);
      expect(fn).toHaveBeenCalledWith(42);
    });

    it('should return an Ok with the value if okOr() is called', () => {
      const some: Option<number> = Some(42);
      expect(some.okOr('Error')).toEqual(Ok(42));
    });

    it('should return an Ok with the value if okOrElse() is called', () => {
      const some: Option<number> = Some(42);
      expect(some.okOrElse(() => 'Error')).toEqual(Ok(42));
    });

    it('should return itself if filter() is called with a matching predicate', () => {
      const some: Option<number> = Some(42);
      expect(some.filter((val) => val === 42)).toBe(some);
    });

    it('should return None if filter() is called with a non-matching predicate', () => {
      const some: Option<number> = Some(42);
      expect(some.filter((val) => val === 99)).toBe(None);
    });

    it('should return the inner Option if flatten() is called', () => {
      const some: Option<Option<number>> = Some(Some(42));
      expect(some.flatten()).toEqual(Some(42));
    });

    it('should return the mapped value if map() is called', () => {
      const some: Option<number> = Some(42);
      const mapped: Option<string> = some.map((val) => `The answer is ${val}`);
      expect(mapped.unwrap()).toBe('The answer is 42');
    });

    it('should return the provided default value if mapOr() is called with None', () => {
      const none: Option<number> = None;
      expect(none.mapOr('default', (val) => `The answer is ${val}`)).toBe(
        'default',
      );
    });

    it('should return the mapped value if mapOr() is called with Some', () => {
      const some: Option<number> = Some(42);
      expect(some.mapOr('default', (val) => `The answer is ${val}`)).toBe(
        'The answer is 42',
      );
    });

    it('should return the provided default value if mapOrElse() is called with None', () => {
      const none: Option<number> = None;
      expect(
        none.mapOrElse(
          () => 'default',
          (val) => `The answer is ${val}`,
        ),
      ).toBe('default');
    });

    it('should return the mapped value if mapOrElse() is called with Some', () => {
      const some: Option<number> = Some(42);
      expect(
        some.mapOrElse(
          () => 'default',
          (val) => `The answer is ${val}`,
        ),
      ).toBe('The answer is 42');
    });

    it('should return the other Option if and() is called', () => {
      const some: Option<number> = Some(42);
      const other: Option<string> = Some('hello');
      expect(some.and(other)).toBe(other);
    });

    it('should return itself if or() is called', () => {
      const some: Option<number> = Some(42);
      const other: Option<number> = Some(99);
      expect(some.or(other)).toBe(some);
    });

    it('should return None if xor() is called with Some', () => {
      const some: Option<number> = Some(42);
      const other: Option<number> = Some(99);
      expect(some.xor(other)).toBe(None);
    });

    it('should return itself if xor() is called with None', () => {
      const some: Option<number> = Some(42);
      const other: Option<number> = None;
      expect(some.xor(other)).toBe(some);
    });

    it('should return the mapped Option if andThen() is called', () => {
      const some: Option<number> = Some(42);
      const mapped: Option<string> = some.andThen((val) =>
        Some(`The answer is ${val}`),
      );
      expect(mapped.unwrap()).toBe('The answer is 42');
    });

    it('should return itself if orElse() is called', () => {
      const some: Option<number> = Some(42);
      const other: Option<number> = Some(99);
      expect(some.orElse(() => other)).toBe(some);
    });

    it('should return Ok(Some(val)) when transposed on Some(Ok(val))', () => {
      const some: Option<Result<number, string>> = Some(Ok(42));
      const result: Result<Option<number>, string> = some.transpose();
      expect(result).toEqual(Ok(Some(42)));
    });

    it('should return Err(err) when transposed on Some(Err(err))', () => {
      const some: Option<Result<number, string>> = Some(Err('error message'));
      const result: Result<Option<number>, string> = some.transpose();
      expect(result).toEqual(Err('error message'));
    });
  });

  describe('None', () => {
    it('should create a None', () => {
      const none: Option<number> = None;
      expect(none.isSome()).toBe(false);
      expect(none.isNone()).toBe(true);
      expect(() => none.unwrap()).toThrowError();
    });

    it('should return the default value if unwrapOr() is called', () => {
      const none: Option<number> = None;
      expect(none.unwrapOr(42)).toBe(42);
    });

    it('should return the result of the function if unwrapOrElse() is called', () => {
      const none: Option<number> = None;
      expect(none.unwrapOrElse(() => 42)).toBe(42);
    });

    it('should return the other Option if and() is called', () => {
      const none: Option<number> = None;
      const other: Option<string> = Some('hello');
      expect(none.and(other)).toBe(none);
    });

    it('should return the result of the function if orElse() is called', () => {
      const none: Option<number> = None;
      const other: Option<number> = Some(99);
      expect(none.orElse(() => other)).toBe(other);
    });

    it('should return false when isSomeAnd() is called', () => {
      const none: Option<number> = None;
      expect(none.isSomeAnd((val) => val > 0)).toBe(false);
    });

    it('should return true when isNone() is called', () => {
      const none: Option<number> = None;
      expect(none.isNone()).toBe(true);
    });

    it('should throw an error when expect() is called', () => {
      const none: Option<number> = None;
      expect(() => none.expect('error message')).toThrowError('error message');
    });

    it('should throw an error when unwrap() is called', () => {
      const none: Option<number> = None;
      expect(() => none.unwrap()).toThrowError();
    });

    it('should call the function when inspect() is called', () => {
      const none: Option<number> = None;
      const mockFn = jest.fn();
      none.inspect(mockFn);
      expect(mockFn).not.toHaveBeenCalled();
    });

    it('should return an Ok when okOr() is called', () => {
      const none: Option<number> = None;
      expect(none.okOr('error')).toEqual(Err('error'));
    });

    it('should return an Ok when okOrElse() is called', () => {
      const none: Option<number> = None;
      expect(none.okOrElse(() => 'error')).toEqual(Err('error'));
    });

    it('should return None when filter() is called', () => {
      const none: Option<number> = None;
      expect(none.filter((val) => val > 0)).toBe(none);
    });

    it('should return None when flatten() is called', () => {
      const none: Option<Option<number>> = None;
      expect(none.flatten()).toBe(none);
    });

    it('should return None when map() is called', () => {
      const none: Option<number> = None;
      expect(none.map((val) => val + 1)).toBe(none);
    });

    it('should return the default value when mapOr() is called', () => {
      const none: Option<number> = None;
      expect(none.mapOr('default', (val) => val + 'no!')).toBe('default');
    });

    it('should return the default value when mapOrElse() is called', () => {
      const none: Option<number> = None;
      expect(
        none.mapOrElse(
          () => 'default',
          (val) => val + 'no!',
        ),
      ).toBe('default');
    });

    it('should return None when and() is called', () => {
      const none: Option<number> = None;
      const other: Option<string> = Some('hello');
      expect(none.and(other)).toBe(none);
    });

    it('should return the other Option when or() is called', () => {
      const none = None;
      const other = Some(99);
      expect(none.or(other)).toBe(other);
    });

    it('should return second value when xor() is called', () => {
      const none: Option<number> = None;
      const other: Option<number> = Some(99);
      expect(none.xor(other)).toBe(other);
    });

    it('should return None when andThen() is called', () => {
      const none: Option<number> = None;
      expect(none.andThen((val) => Some(val + 1))).toBe(none);
    });

    it('should call the function when orElse() is called', () => {
      const none: Option<number> = None;
      const mockFn = jest.fn();
      none.orElse(mockFn);
      expect(mockFn).toHaveBeenCalled();
    });

    it('should return Ok(None) when transposed on None', () => {
      const none: Option<Result<number, string>> = None;
      const result: Result<Option<number>, string> = none.transpose();
      expect(result).toEqual(Ok(None));
    });
  });
});
