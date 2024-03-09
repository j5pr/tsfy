import { MutRef, mutRef, Ref, ref } from "tsfy";

describe("ref", () => {
  it("should return a read-only reference", () => {
    const wrap = 42;
    const value = ref(wrap);

    expect(value.get()).toBe(42);
  });

  it("should pass the value through a function", () => {
    const wrap = { data: "hello" };
    const value = ref(wrap);

    function map(ref: Ref<{ data: string }>): string {
      return ref.get().data + " world";
    }

    expect(map(value)).toBe("hello world");
  });
});

describe("mutRef", () => {
  it("should create a mutable reference", async () => {
    const wrap = 42;
    const value = mutRef(wrap);

    expect(value.get()).toBe(42);

    value.set(100);

    expect(value.get()).toBe(100);
  });

  it("should pass the value through a function", async () => {
    const wrap = { data: "hello" };
    const value = mutRef(wrap);

    expect(value.get().data).toBe("hello");

    function change(ref: MutRef<{ data: string }>): void {
      ref.set({ data: "world" });
    }

    change(value);

    expect(value.get().data).toBe("world");
  });
});
