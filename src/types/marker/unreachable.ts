/**
 * An error indicating that a code path is unreachable.
 */
export class UnreachableError extends Error {
  constructor(public readonly data?: string) {
    super(
      "[Unreachable] Reached an unreachable code path!" +
        (data ? ` ${data}` : ""),
    );
  }
}

/**
 * Indicates that a code path is unreachable.
 * At runtime, this will throw an error.
 *
 * @param msg An optional message to include in the error.
 */
export const unreachable = (msg?: string): never => {
  throw new UnreachableError(msg);
};
