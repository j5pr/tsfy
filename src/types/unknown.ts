/**
 * Converts a value to unknown, useful for list operations.
 *
 * @param val
 */
export const toUnknown = <T>(val: T): unknown => val;

/**
 * A type safe helper to generalize a list to a list of unknowns
 *
 * Useful for allowing `.includes` checks for any type without having to cast.
 *
 * @param list The list to convert
 */
export function unknownList(list: unknown[]): unknown;
export function unknownList(list: unknown[] | undefined): unknown | undefined;
export function unknownList(list: unknown[] | undefined): unknown | undefined {
  return list;
}
