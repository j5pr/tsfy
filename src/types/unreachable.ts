/**
 * Indicates that a code path is unreachable. At runtime, this will throw an error.
 * @param msg An optional message to include in the error.
 */
export const unreachable = (msg?: string): never => {
  throw new Error('[Unreachable] Reached an unreachable code path!' + (msg ? ` ${msg}` : ''));
};
