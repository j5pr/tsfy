import { Some, None } from '..';
declare const makeSomeImpl: <T>() => Omit<Some<T>, "value">;
export declare const someImpl: Readonly<Omit<Some<any>, "value">>;
export declare const noneImpl: Readonly<None>;
export type SomeImpl<T> = ReturnType<typeof makeSomeImpl<T>>;
export {};
//# sourceMappingURL=impl.d.ts.map