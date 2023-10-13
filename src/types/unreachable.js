"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unreachable = void 0;
/**
 * Indicates that a code path is unreachable. At runtime, this will throw an error.
 * @param msg An optional message to include in the error.
 */
const unreachable = (msg) => {
    throw new Error('[Unreachable] Reached an unreachable code path!' + msg ? ` ${msg}` : '');
};
exports.unreachable = unreachable;
//# sourceMappingURL=unreachable.js.map