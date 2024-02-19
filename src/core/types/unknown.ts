/**
 * Converts a value to unknown, useful for collections operations.
 *
 * @param val
 */
export const unknown = <T>(val: T): unknown => val;

/**
 * A type safe helper to generalize a collections to a collections of unknowns
 *
 * Useful for allowing `.includes` checks for any type without having to cast.
 *
 * @param list The collections to convert
 */
export function unknownList(list: unknown[]): unknown[];
export function unknownList(list: unknown[] | undefined): unknown[] | undefined;
export function unknownList(
  list: unknown[] | undefined,
): unknown[] | undefined {
  return list;
}
