import { None, Some, Ok, Err } from "tsfy";

describe("Result", () => {
  describe("Ok", () => {
    it("should create an Ok value with the given result", () => {
      const result = Ok(42);
      expect(result.unwrap()).toEqual(42);
      expect(result.err()).toBe(None);
    });

    it("should return true for isOk()", () => {
      const result = Ok(42);
      expect(result.isOk()).toBe(true);
    });

    it("should return false for isErr()", () => {
      const result = Ok(42);
      expect(result.isErr()).toBe(false);
    });

    it("should unwrap the result value", () => {
      const result = Ok(42);
      expect(result.unwrap()).toEqual(42);
    });

    it("should return the result value for unwrapOr()", () => {
      const result = Ok(42);
      expect(result.unwrapOr(0)).toEqual(42);
    });

    it("should return the result value for unwrapOrElse()", () => {
      const result = Ok(42);
      expect(result.unwrapOrElse(() => 0)).toEqual(42);
    });

    it("should return None for err()", () => {
      const result = Ok(42);
      expect(result.err().isNone()).toBe(true);
    });

    it("should return Some for ok()", () => {
      const result = Ok(42);
      expect(result.ok().isSome()).toBe(true);
      expect(result.ok().unwrap()).toEqual(42);
    });

    it("should map the result value", () => {
      const result = Ok(42);
      const mapped = result.map((val) => val * 2);
      expect(mapped.unwrap()).toEqual(84);
    });

    it("should return the result value for mapOr()", () => {
      const result = Ok(42);
      expect(result.mapOr(0, (val) => val * 2)).toEqual(84);
    });

    it("should return the result value for mapOrElse()", () => {
      const result = Ok(42);
      expect(
        result.mapOrElse(
          () => 0,
          (val) => val * 2,
        ),
      ).toEqual(84);
    });

    it("should combine with another Ok value", () => {
      const result1 = Ok(42);
      const result2 = Ok("hello");
      const combined = result1.and(result2);
      expect(combined.unwrap()).toEqual("hello");
    });

    it("should return the first Ok value for or()", () => {
      const result1 = Ok(42);
      const result2 = Ok(52);
      const combined = result1.or(result2);
      expect(combined.unwrap()).toEqual(42);
    });

    it("should combine with another Result using andThen()", () => {
      const result = Ok(42);
      const combined = result.andThen((val) => Ok(val * 2));
      expect(combined.unwrap()).toEqual(84);
    });

    it("should return itself for orElse()", () => {
      const result = Ok(42);
      const combined = result.orElse(() => Err("error"));
      expect(combined.unwrap()).toEqual(42);
    });

    it("should return true for isOkAnd() if the predicate is true", () => {
      const result = Ok(3);
      expect(result.isOkAnd((val) => val === 3)).toBe(true);
    });

    it("should return false for isOkAnd() if the predicate is false", () => {
      const result = Ok(3);
      expect(result.isOkAnd((val) => val === 4)).toBe(false);
    });

    it("should return false for isErrAnd()", () => {
      const result = Ok(3);
      expect(result.isErrAnd((val) => val === 3)).toBe(false);
    });

    it("should return the contained value for expect()", () => {
      const result = Ok(3);
      expect(result.expect("error")).toEqual(3);
    });

    it("should throw an error for expectErr()", () => {
      const result = Ok(3);
      expect(() => result.expectErr("error")).toThrowError();
    });

    it("should call the provided function for inspect()", () => {
      const result = Ok(3);
      const fn = jest.fn();
      result.inspect(fn);
      expect(fn).toHaveBeenCalledWith(3);
    });

    it("should not call the provided function for inspectErr()", () => {
      const result = Ok(3);
      const fn = jest.fn();
      result.inspectErr(fn);
      expect(fn).not.toHaveBeenCalled();
    });

    it("should return None for err()", () => {
      const result = Ok(3);
      expect(result.err()).toBe(None);
    });

    it("should return Some for ok()", () => {
      const result = Ok(3);
      expect(result.ok().isSome()).toBe(true);
      expect(result.ok().unwrap()).toEqual(3);
    });

    it("should return None for transpose()", () => {
      const result = Ok(None);
      expect(result.transpose()).toBe(None);
    });

    it("should map the contained value", () => {
      const result = Ok(3);
      const mapped = result.map((val) => val * 2);
      expect(mapped.unwrap()).toEqual(6);
    });

    it("should return itself for mapErr()", () => {
      const result = Ok(3);
      const mapped = result.mapErr((val: string) => val.toUpperCase());
      expect(mapped.unwrap()).toEqual(3);
    });
  });

  describe("Err", () => {
    it("should transpose correctly", () => {
      const result = Ok(Some(3));
      const transposed = result.transpose().unwrap();
      expect(() => transposed.unwrapErr()).toThrowError();
      expect(transposed.ok().isSome()).toBe(true);
    });

    it("should create an Err value with the given error", () => {
      const result = Err("error");
      expect(result.unwrapErr()).toEqual("error");
      expect(result.ok()).toBe(None);
    });

    it("should return false for isOk()", () => {
      const result = Err("error");
      expect(result.isOk()).toBe(false);
    });

    it("should return true for isErr()", () => {
      const result = Err("error");
      expect(result.isErr()).toBe(true);
    });

    it("should unwrap the error value", () => {
      const result = Err("error");
      expect(() => result.unwrap()).toThrowError();
    });

    it("should return the default value for unwrapOr()", () => {
      const result = Err("error");
      expect(result.unwrapOr(0)).toEqual(0);
    });

    it("should return the result of the function for unwrapOrElse()", () => {
      const result = Err("error");
      expect(result.unwrapOrElse(() => 0)).toEqual(0);
    });

    it("should return Some for err()", () => {
      const result = Err("error");
      expect(result.err().isSome()).toBe(true);
      expect(result.err().unwrap()).toEqual("error");
    });

    it("should return None for ok()", () => {
      const result = Err("error");
      expect(result.ok().isNone()).toBe(true);
    });

    it("should map the error value", () => {
      const result = Err("error");
      const mapped = result.mapErr((val) => val.toUpperCase());
      expect(mapped.unwrapErr()).toEqual("ERROR");
    });

    it("should return the default value for mapOr()", () => {
      const result = Err("error");
      expect(result.mapOr(0, (val) => val * 2)).toEqual(0);
    });

    it("should return the result of the function for mapOrElse()", () => {
      const result = Err("error");
      expect(
        result.mapOrElse(
          () => 0,
          (val) => val * 2,
        ),
      ).toEqual(0);
    });

    it("should return itself for and()", () => {
      const result1 = Err("error");
      const result2 = Ok("hello");
      const combined = result1.and(result2);
      expect(combined.unwrapErr()).toEqual("error");
    });

    it("should combine with another Err value for or()", () => {
      const result1 = Err("error");
      const result2 = Err("another error");
      const combined = result1.or(result2);
      expect(combined.unwrapErr()).toEqual("another error");
    });

    it("should return itself for andThen()", () => {
      const result = Err("error");
      const combined = result.andThen((val) => Ok(val * 2));
      expect(combined.unwrapErr()).toEqual("error");
    });

    it("should combine with another Result using orElse()", () => {
      const result = Err("error");
      const combined = result.orElse(() => Ok(42));
      expect(combined.unwrap()).toEqual(42);
    });

    it("should return false for isOkAnd()", () => {
      const result = Err("error");
      expect(result.isOkAnd(() => true)).toBe(false);
    });

    it("should return true for isErrAnd() when the predicate is true", () => {
      const result = Err("error");
      expect(result.isErrAnd((val) => val === "error")).toBe(true);
    });

    it("should return false for isErrAnd() when the predicate is false", () => {
      const result = Err("error");
      expect(result.isErrAnd((val) => val === "another error")).toBe(false);
    });

    it("should return the wrapped error", () => {
      const result = Err("error");
      expect(result.expectErr("Custom error message")).toEqual("error");
    });

    it("should not call the provided function for inspect()", () => {
      const result = Err("error");
      const mockFn = jest.fn();
      result.inspect(mockFn);
      expect(mockFn).not.toHaveBeenCalled();
    });

    it("should call the provided function for inspectErr()", () => {
      const result = Err("error");
      const mockFn = jest.fn();
      result.inspectErr(mockFn);
      expect(mockFn).toHaveBeenCalledWith("error");
    });

    it("should return itself for map()", () => {
      const result = Err("error");
      const mapped = result.map((val: string) => val.toUpperCase());
      expect(mapped.unwrapErr()).toEqual("error");
    });

    it("should map the error value for mapErr()", () => {
      const result = Err("error");
      const mapped = result.mapErr((val) => val.toUpperCase());
      expect(mapped.unwrapErr()).toEqual("ERROR");
    });

    it("should throw the error", () => {
      const result = Err("error");
      expect(() => result.expect("Custom error message")).toThrowError(
        "Custom error message",
      );
    });

    it("should return None for transpose() when the result is Ok(None)", () => {
      const result = Ok(None);
      expect(result.transpose()).toEqual(None);
    });

    it("should return Some(Ok(_)) for transpose() when the result is Ok(Some(_))", () => {
      const result = Ok(Some("value"));
      expect(result.transpose()).toEqual(Some(Ok("value")));
    });

    it("should return Some(Err(_)) for transpose() when the result is Err(_)", () => {
      const result = Err("error");
      expect(result.transpose()).toEqual(Some(Err("error")));
    });
  });
});
