"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noneImpl = exports.someImpl = void 0;
const __1 = require("..");
const makeSomeImpl = () => ({
    isSome: () => true,
    isNone: () => false,
    expect() {
        return this.value;
    },
    unwrap() {
        return this.value;
    },
    unwrapOr() {
        return this.value;
    },
    unwrapOrElse() {
        return this.value;
    },
    okOr() {
        return (0, __1.Ok)(this.value);
    },
    okOrElse() {
        return (0, __1.Ok)(this.value);
    },
    transpose() {
        const value = this.value;
        return value.isOk() ? (0, __1.Ok)((0, __1.Some)(value.result)) : (0, __1.Err)(value.error);
    },
    filter(fn) {
        return fn(this.value) ? this : __1.None;
    },
    flatten() {
        return this.value;
    },
    map(fn) {
        return (0, __1.Some)(fn(this.value));
    },
    mapOr(_def, fn) {
        return fn(this.value);
    },
    mapOrElse(_def, fn) {
        return fn(this.value);
    },
    and(other) {
        return other;
    },
    or() {
        return this;
    },
    xor(other) {
        return other.isSome() ? __1.None : this;
    },
    andThen(fn) {
        return fn(this.value);
    },
    orElse() {
        return this;
    },
});
const makeNoneImpl = () => ({
    isSome: () => false,
    isNone: () => true,
    expect(err) {
        throw err;
    },
    unwrap() {
        throw new Error('[Option] Called `unwrap()` on a `None` value');
    },
    unwrapOr: (def) => def,
    unwrapOrElse: (fn) => fn(),
    okOr: (err) => (0, __1.Err)(err),
    okOrElse: (fn) => (0, __1.Err)(fn()),
    transpose: () => (0, __1.Ok)(__1.None),
    filter: () => __1.None,
    flatten: () => __1.None,
    map: () => __1.None,
    mapOr: (def) => def,
    mapOrElse: (def) => def(),
    and: () => __1.None,
    or: (other) => other,
    xor: (other) => other,
    andThen: () => __1.None,
    orElse: (fn) => fn(),
});
exports.someImpl = Object.freeze(makeSomeImpl());
exports.noneImpl = Object.freeze(makeNoneImpl());
//# sourceMappingURL=impl.js.map