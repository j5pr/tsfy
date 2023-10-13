import { Ok, Err } from '..';
declare const makeOkImpl: <T>() => Omit<Ok<T>, "result">;
declare const makeErrImpl: <E>() => Omit<Err<E>, "error">;
export declare const okImpl: Readonly<Omit<Ok<any>, "result">>;
export declare const errImpl: Readonly<Omit<Err<any>, "error">>;
export type OkImpl<T> = ReturnType<typeof makeOkImpl<T>>;
export type ErrImpl<E> = ReturnType<typeof makeErrImpl<E>>;
export {};
//# sourceMappingURL=impl.d.ts.map