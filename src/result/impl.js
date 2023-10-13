"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errImpl = exports.okImpl = void 0;
const __1 = require("..");
const unreachable_1 = require("../types/unreachable");
const makeOkImpl = () => ({
    isOk: () => true,
    isErr: () => false,
    expect() {
        return this.result;
    },
    expectErr(err) {
        throw err;
    },
    unwrap() {
        return this.result;
    },
    unwrapErr() {
        throw new Error('[Result] Called `unwrapErr()` on an `Ok` value');
    },
    unwrapOr() {
        return this.result;
    },
    unwrapOrElse() {
        return this.result;
    },
    err: () => __1.None,
    ok() {
        return (0, __1.Some)(this.result);
    },
    transpose() {
        return this.result.isSome() ? (0, __1.Some)((0, __1.Ok)(this.result.value)) : __1.None;
    },
    map(fn) {
        return (0, __1.Ok)(fn(this.result));
    },
    mapErr() {
        return (0, __1.Ok)(this.result);
    },
    mapOr(_def, fn) {
        return fn(this.result);
    },
    mapOrElse(_def, fn) {
        return fn(this.result);
    },
    and(other) {
        return other;
    },
    or() {
        return this;
    },
    andThen(fn) {
        return fn(this.result);
    },
    orElse() {
        return this;
    },
});
const makeErrImpl = () => ({
    isOk: () => false,
    isErr: () => true,
    expect() {
        throw this.error;
    },
    expectErr() {
        return this.error;
    },
    unwrap() {
        throw new Error('[Result] Called `unwrap()` on an `Err` value');
    },
    unwrapErr() {
        return this.error;
    },
    unwrapOr(def) {
        return def;
    },
    unwrapOrElse(fn) {
        return fn();
    },
    err() {
        return (0, __1.Some)(this.error);
    },
    ok: () => __1.None,
    transpose() {
        var _a;
        return (0, __1.Some)((0, __1.Err)((_a = this.error) !== null && _a !== void 0 ? _a : (0, unreachable_1.unreachable)()));
    },
    map(_fn) {
        return this;
    },
    mapErr(fn) {
        return (0, __1.Err)(fn(this.error));
    },
    mapOr(def, _fn) {
        return def;
    },
    mapOrElse(def, _fn) {
        return def();
    },
    and(_other) {
        return this;
    },
    or(other) {
        return other;
    },
    andThen(_fn) {
        return this;
    },
    orElse(fn) {
        return fn();
    },
});
exports.okImpl = Object.freeze(makeOkImpl());
exports.errImpl = Object.freeze(makeErrImpl());
//# sourceMappingURL=impl.js.map