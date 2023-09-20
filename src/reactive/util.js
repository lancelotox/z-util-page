"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wrapValue = void 0;
const wrapValue = function (value) {
    return (typeof value === 'object' && value !== null) ? this.reactive(value) : value;
};
exports.wrapValue = wrapValue;
