"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.None = exports.Some = exports.Option = void 0;
const __1 = require("..");
const impl_1 = require("./impl");
var Option;
(function (Option) {
    function from(value) {
        return value == null ? exports.None : Some(value);
    }
    Option.from = from;
})(Option || (exports.Option = Option = {}));
function Some(value) {
    return (0, __1.extend)({ value: { value } }, impl_1.someImpl);
}
exports.Some = Some;
exports.None = impl_1.noneImpl;
//# sourceMappingURL=option.js.map