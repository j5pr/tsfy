import { unknown, unknownList } from "tsfy";

describe("toUnknown", () => {
  it("should return the value as unknown", () => {
    const value = "hello";
    const result = unknown(value);
    expect(result).toBe(value);
  });
});

describe("unknownList", () => {
  describe("when given a collections of unknowns", () => {
    it("should return the collections as unknown", () => {
      const list = [1, "hello", true];
      const result = unknownList(list);
      expect(result).toBe(list);
    });
  });

  describe("when given an undefined collections", () => {
    it("should return undefined", () => {
      const result = unknownList(undefined);
      expect(result).toBeUndefined();
    });
  });
});
