import { Ok, Err, resultify, resultifyAsync } from "tsfy";

describe("resultify", () => {
  it("should return Ok if the function does not throw an error", () => {
    const fn = () => 42;
    const wrappedFn = resultify(fn);
    const result = wrappedFn();
    expect(result).toEqual(Ok(42));
  });

  it("should return Err if the function throws an error", () => {
    const fn = () => {
      throw new Error("Something went wrong");
    };
    const wrappedFn = resultify(fn);
    const result = wrappedFn();
    expect(result).toEqual(Err(new Error("Something went wrong")));
  });
});

describe("resultifyAsync", () => {
  it("should return Ok if the async function does not throw an error", async () => {
    const fn = async () => 42;
    const wrappedFn = resultifyAsync(fn);
    const result = await wrappedFn();
    expect(result).toEqual(Ok(42));
  });

  it("should return Err if the async function throws an error", async () => {
    const fn = async () => {
      throw new Error("Something went wrong");
    };
    const wrappedFn = resultifyAsync(fn);
    const result = await wrappedFn();
    expect(result).toEqual(Err(new Error("Something went wrong")));
  });
});
