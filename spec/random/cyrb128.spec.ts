import { cyrb128 } from "../../src/random/index.js";

describe("cyrb128", () => {
  it("should return the correct hash", () => {
    expect(cyrb128("hello")).toEqual([
      1690739734, 1078026890, 1569261940, 551242337,
    ]);
  });
});
