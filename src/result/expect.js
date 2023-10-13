"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resultifyAsync = exports.resultify = void 0;
const __1 = require("..");
/**
 * Wrap a function that throws an error in a Result
 * @param fn The function to wrap
 */
function resultify(fn) {
    return function () {
        try {
            return (0, __1.Ok)(fn(...arguments));
        }
        catch (err) {
            return (0, __1.Err)(err);
        }
    };
}
exports.resultify = resultify;
/**
 * Wrap an async function that throws an error in a Result
 * @param fn The function to wrap
 */
function resultifyAsync(fn) {
    return function () {
        return __awaiter(this, arguments, void 0, function* () {
            try {
                const result = yield fn(...arguments);
                return (0, __1.Ok)(result);
            }
            catch (err) {
                return (0, __1.Err)(err);
            }
        });
    };
}
exports.resultifyAsync = resultifyAsync;
//# sourceMappingURL=expect.js.map