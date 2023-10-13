/**
 * A well-typed wrapper around `Object.create`. Creates an object
 * given a property descriptor and a parent object to inherit from.
 *
 * @param obj The property descriptor for the new object
 * @param parent The parent object to inherit from
 */
export declare function extend<T extends PropertyDescriptorMap, U extends {}>(obj: T, parent: U): {
    [K in keyof T]: T[K]["get"] extends (...args: any) => any ? ReturnType<T[K]["get"]> : T[K]["value"];
} & U;
//# sourceMappingURL=prototype.d.ts.map