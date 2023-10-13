"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Err = exports.Ok = void 0;
const __1 = require("..");
const impl_1 = require("./impl");
/**
 * Create a new Ok value with the given result
 * @param result The result value
 * @constructor
 */
function Ok(result) {
    return (0, __1.extend)({ result: { value: result } }, impl_1.okImpl);
}
exports.Ok = Ok;
/**
 * Create a new Err value with the given error
 * @param error The error value
 * @constructor
 */
function Err(error) {
    return (0, __1.extend)({ error: { value: error } }, impl_1.errImpl);
}
exports.Err = Err;
//# sourceMappingURL=result.js.map