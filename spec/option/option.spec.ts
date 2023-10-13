import { Option, Some, None } from '../../src/option/option';

describe('Option', () => {
  describe('Some', () => {
    it('should create a Some with a value', () => {
      const some: Option<number> = Some(42);
      expect(some.isSome()).toBeTrue();
      expect(some.isNone()).toBeFalse();
      expect(some.unwrap()).toBe(42);
    });

    it('should map the value', () => {
      const some: Option<number> = Some(42);
      const mapped: Option<string> = some.map((val) => `The answer is ${val}`);
      expect(mapped.unwrap()).toBe('The answer is 42');
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
  });

  describe('None', () => {
    it('should create a None', () => {
      const none: Option<number> = None;
      expect(none.isSome()).toBeFalse();
      expect(none.isNone()).toBeTrue();
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
  });
});
