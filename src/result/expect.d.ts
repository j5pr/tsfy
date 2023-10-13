import { Result } from '..';
/**
 * Wrap a function that throws an error in a Result
 * @param fn The function to wrap
 */
export declare function resultify<T extends (...args: any[]) => any, E = unknown>(fn: T): (...args: Parameters<T>) => Result<ReturnType<T>, E>;
/**
 * Wrap an async function that throws an error in a Result
 * @param fn The function to wrap
 */
export declare function resultifyAsync<T extends (...args: any[]) => Promise<any>, E = unknown>(fn: T): (...args: Parameters<T>) => Promise<Result<ReturnType<T>, E>>;
//# sourceMappingURL=expect.d.ts.map