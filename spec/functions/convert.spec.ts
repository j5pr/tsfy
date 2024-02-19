import { set, map, list } from "../../src/functions/index.js";

describe("Constructors", () => {
  it("should construct a list", () => {
    expect(list([1, 2, 3, 4])).toEqual([1, 2, 3, 4]);
  });

  it("should construct a set", () => {
    expect(set([1, 2, 3, 4])).toEqual(new Set([1, 2, 3, 4]));
  });

  it("should construct a map", () => {
    expect(
      map([
        ["a", 1],
        ["b", 2],
      ]),
    ).toEqual(
      new Map([
        ["a", 1],
        ["b", 2],
      ]),
    );
  });
});
