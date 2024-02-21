import { noop, identity, cast } from "tsfy/fn";

describe("basic functions", () => {
  it("should return undefined", () => {
    expect(noop()).toBeUndefined();
  });

  it("should return the given value", () => {
    expect(identity(1)).toEqual(1);
    expect(identity("a")).toEqual("a");
  });

  it("should return the given value", () => {
    expect(cast<string>(1)).toEqual(1);
    expect(cast<number>("a")).toEqual("a");
  });
});
