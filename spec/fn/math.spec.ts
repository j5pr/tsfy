import { clamp, scale } from "tsfy/fn";

describe("math functions", () => {
  describe("clamp", () => {
    it("should clamp the value to the given range", () => {
      expect(clamp(5, 0, 10)).toEqual(5);
      expect(clamp(-5, 0, 10)).toEqual(0);
      expect(clamp(15, 0, 10)).toEqual(10);
    });
  });

  describe("scale", () => {
    it("should scale the value from one range to another", () => {
      expect(scale(5, 0, 10, 0, 100)).toEqual(50);
      expect(scale(5, 0, 10, 0, 50)).toEqual(25);
    });
  });
});
