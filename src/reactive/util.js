"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wrapValue = exports.getSourceValue = void 0;
/**
 * 取原始值
 * @param value
 * @returns
 */
const getSourceValue = function (value) {
    return Reflect.get((typeof value === 'object' && value !== null) ? value : {}, this.source || Symbol()) || value;
};
exports.getSourceValue = getSourceValue;
const wrapValue = function (value) {
    return (typeof value === 'object' && value !== null) ? this.reactive(value) : value;
};
exports.wrapValue = wrapValue;
