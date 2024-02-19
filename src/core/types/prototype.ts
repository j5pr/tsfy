/**
 * A well-typed wrapper around `Object.create`. Creates an object
 * given a property descriptor and a parent object to inherit from.
 *
 * @param obj The property descriptor for the new object
 * @param parent The parent object to inherit from
 */
export function extend<T extends PropertyDescriptorMap, U extends object>(
  obj: T,
  parent: U,
): {
  [K in keyof T]: T[K]["get"] extends (...args: unknown[]) => unknown
    ? ReturnType<T[K]["get"]>
    : T[K]["value"];
} & U {
  return Object.create(parent, obj);
}
