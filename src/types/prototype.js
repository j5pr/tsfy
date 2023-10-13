"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extend = void 0;
/**
 * A well-typed wrapper around `Object.create`. Creates an object
 * given a property descriptor and a parent object to inherit from.
 *
 * @param obj The property descriptor for the new object
 * @param parent The parent object to inherit from
 */
function extend(obj, parent) {
    return Object.create(parent, obj);
}
exports.extend = extend;
//# sourceMappingURL=prototype.js.map