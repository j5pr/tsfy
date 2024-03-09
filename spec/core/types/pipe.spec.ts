import { asyncPipe, lazyPipe, pipe } from "tsfy";

describe("pipe", () => {
  describe("pipe", () => {
    it("should return a Pipe object", () => {
      const result = pipe(5);
      expect(result.then).toBeInstanceOf(Function);
      expect(result.result).toBeInstanceOf(Function);
    });

    it("should return the initial value when result() is called", () => {
      const result = pipe(5).result();
      expect(result).toBe(5);
    });

    it("should call the provided function when next() is called", () => {
      const fn = jest.fn().mockReturnValue(10);
      const result = pipe(5).then(fn).result();
      expect(fn).toHaveBeenCalledWith(5);
      expect(result).toBe(10);
    });

    it("should allow chaining of next() calls", () => {
      const fn1 = jest.fn().mockReturnValue(10);
      const fn2 = jest.fn().mockReturnValue(11);
      const result = pipe(5).then(fn1).then(fn2).result();
      expect(fn1).toHaveBeenCalledWith(5);
      expect(fn2).toHaveBeenCalledWith(10);
      expect(result).toBe(11);
    });
  });

  describe("lazyPipe", () => {
    it("should allow chaining of next() calls", () => {
      const fn1 = jest.fn().mockReturnValue(10);
      const fn2 = jest.fn().mockReturnValue(11);
      const result = lazyPipe(5).then(fn1).then(fn2).result();
      expect(fn1).toHaveBeenCalledWith(5);
      expect(fn2).toHaveBeenCalledWith(10);
      expect(result).toBe(11);
    });

    it("should evaluate functions lazily", () => {
      const fn1 = jest.fn().mockReturnValue(10);
      const fn2 = jest.fn().mockReturnValue(11);

      const chained = lazyPipe(5).then(fn1).then(fn2);

      expect(fn1).not.toHaveBeenCalled();
      expect(fn2).not.toHaveBeenCalled();

      const result = chained.result();

      expect(fn1).toHaveBeenCalledWith(5);
      expect(fn2).toHaveBeenCalledWith(10);

      expect(result).toBe(11);
    });
  });

  describe("asyncPipe", () => {
    it("should allow chaining of next() calls", async () => {
      const fn1 = jest.fn().mockReturnValue(Promise.resolve(10));
      const fn2 = jest.fn().mockReturnValue(Promise.resolve(11));
      const result = await asyncPipe(5).then(fn1).then(fn2).result();
      expect(fn1).toHaveBeenCalledWith(5);
      expect(fn2).toHaveBeenCalledWith(10);
      expect(result).toBe(11);
    });

    it("should evaluate functions lazily", async () => {
      const fn1 = jest.fn().mockReturnValue(Promise.resolve(10));
      const fn2 = jest.fn().mockReturnValue(Promise.resolve(11));

      const chained = asyncPipe(5).then(fn1).then(fn2);

      expect(fn1).not.toHaveBeenCalled();
      expect(fn2).not.toHaveBeenCalled();

      const result = await chained.result();

      expect(fn1).toHaveBeenCalledWith(5);
      expect(fn2).toHaveBeenCalledWith(10);

      expect(result).toBe(11);
    });
  });
});
