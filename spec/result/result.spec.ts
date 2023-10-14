import { None, Some } from '../../src/option/option';
import { Ok, Err } from '../../src/result/result';

describe('Result', () => {
  describe('Ok', () => {
    it('should create an Ok value with the given result', () => {
      const result = Ok(42);
      expect(result.unwrap()).toEqual(42);
      expect(result.err()).toBe(None);
    });

    it('should return true for isOk()', () => {
      const result = Ok(42);
      expect(result.isOk()).toBe(true);
    });

    it('should return false for isErr()', () => {
      const result = Ok(42);
      expect(result.isErr()).toBe(false);
    });

    it('should unwrap the result value', () => {
      const result = Ok(42);
      expect(result.unwrap()).toEqual(42);
    });

    it('should return the result value for unwrapOr()', () => {
      const result = Ok(42);
      expect(result.unwrapOr(0)).toEqual(42);
    });

    it('should return the result value for unwrapOrElse()', () => {
      const result = Ok(42);
      expect(result.unwrapOrElse(() => 0)).toEqual(42);
    });

    it('should return None for err()', () => {
      const result = Ok(42);
      expect(result.err().isNone()).toBe(true);
    });

    it('should return Some for ok()', () => {
      const result = Ok(42);
      expect(result.ok().isSome()).toBe(true);
      expect(result.ok().unwrap()).toEqual(42);
    });

    it('should map the result value', () => {
      const result = Ok(42);
      const mapped = result.map((val) => val * 2);
      expect(mapped.unwrap()).toEqual(84);
    });

    it('should return the result value for mapOr()', () => {
      const result = Ok(42);
      expect(result.mapOr(0, (val) => val * 2)).toEqual(84);
    });

    it('should return the result value for mapOrElse()', () => {
      const result = Ok(42);
      expect(
        result.mapOrElse(
          () => 0,
          (val) => val * 2,
        ),
      ).toEqual(84);
    });

    it('should combine with another Ok value', () => {
      const result1 = Ok(42);
      const result2 = Ok('hello');
      const combined = result1.and(result2);
      expect(combined.unwrap()).toEqual('hello');
    });

    it('should return the first Ok value for or()', () => {
      const result1 = Ok(42);
      const result2 = Ok(52);
      const combined = result1.or(result2);
      expect(combined.unwrap()).toEqual(42);
    });

    it('should combine with another Result using andThen()', () => {
      const result = Ok(42);
      const combined = result.andThen((val) => Ok(val * 2));
      expect(combined.unwrap()).toEqual(84);
    });

    it('should return itself for orElse()', () => {
      const result = Ok(42);
      const combined = result.orElse(() => Err('error'));
      expect(combined.unwrap()).toEqual(42);
    });
  });

  describe('Err', () => {
    it('should transpose correctly', () => {
      const result = Ok(Some(3));
      const transposed = result.transpose().unwrap();
      expect(() => transposed.unwrapErr()).toThrowError();
      expect(transposed.ok().isSome()).toBe(true);
    });

    it('should create an Err value with the given error', () => {
      const result = Err('error');
      expect(result.unwrapErr()).toEqual('error');
      expect(result.ok()).toBe(None);
    });

    it('should return false for isOk()', () => {
      const result = Err('error');
      expect(result.isOk()).toBe(false);
    });

    it('should return true for isErr()', () => {
      const result = Err('error');
      expect(result.isErr()).toBe(true);
    });

    it('should unwrap the error value', () => {
      const result = Err('error');
      expect(() => result.unwrap()).toThrowError();
    });

    it('should return the default value for unwrapOr()', () => {
      const result = Err('error');
      expect(result.unwrapOr(0)).toEqual(0);
    });

    it('should return the result of the function for unwrapOrElse()', () => {
      const result = Err('error');
      expect(result.unwrapOrElse(() => 0)).toEqual(0);
    });

    it('should return Some for err()', () => {
      const result = Err('error');
      expect(result.err().isSome()).toBe(true);
      expect(result.err().unwrap()).toEqual('error');
    });

    it('should return None for ok()', () => {
      const result = Err('error');
      expect(result.ok().isNone()).toBe(true);
    });

    it('should map the error value', () => {
      const result = Err('error');
      const mapped = result.mapErr((val) => val.toUpperCase());
      expect(mapped.unwrapErr()).toEqual('ERROR');
    });

    it('should return the default value for mapOr()', () => {
      const result = Err('error');
      expect(result.mapOr(0, (val) => val * 2)).toEqual(0);
    });

    it('should return the result of the function for mapOrElse()', () => {
      const result = Err('error');
      expect(
        result.mapOrElse(
          () => 0,
          (val) => val * 2,
        ),
      ).toEqual(0);
    });

    it('should return itself for and()', () => {
      const result1 = Err('error');
      const result2 = Ok('hello');
      const combined = result1.and(result2);
      expect(combined.unwrapErr()).toEqual('error');
    });

    it('should combine with another Err value for or()', () => {
      const result1 = Err('error');
      const result2 = Err('another error');
      const combined = result1.or(result2);
      expect(combined.unwrapErr()).toEqual('another error');
    });

    it('should return itself for andThen()', () => {
      const result = Err('error');
      const combined = result.andThen((val) => Ok(val * 2));
      expect(combined.unwrapErr()).toEqual('error');
    });

    it('should combine with another Result using orElse()', () => {
      const result = Err('error');
      const combined = result.orElse(() => Ok(42));
      expect(combined.unwrap()).toEqual(42);
    });
  });
});
