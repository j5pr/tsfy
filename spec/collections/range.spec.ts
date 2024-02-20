import { range } from "tsfy/collections";

describe("range", () => {
  it("should work with one parameter", () => {
    expect([...range(0)]).toEqual([]);
    expect([...range(2)]).toEqual([0, 1]);
    expect([...range(5)]).toEqual([0, 1, 2, 3, 4]);
  });

  it("should work with two parameters", () => {
    expect([...range(2, 5)]).toEqual([2, 3, 4]);
  });

  it("should work with three parameters", () => {
    expect([...range(2, 10, 2)]).toEqual([2, 4, 6, 8]);
    expect([...range(2, 11, 2)]).toEqual([2, 4, 6, 8, 10]);
  });

  it("should work with negative step", () => {
    expect([...range(10, 2, -2)]).toEqual([10, 8, 6, 4]);
  });
});
