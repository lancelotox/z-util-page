"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.traverse = exports.cleanup = exports.wrapValue = void 0;
/**
 * 普通对象转代理对象, 原始值转换
 */
var wrapValue = function (value) {
    return (typeof value === 'object' && value !== null) ? this.reactive(value) : value;
};
exports.wrapValue = wrapValue;
/**
 * 清理副作用函数
 * @param effectFn 副作用函数
 */
var cleanup = function (effectFn) {
    clean(effectFn);
    cleanupDeep(effectFn);
};
exports.cleanup = cleanup;
/**
 * 清理deps
 * @param effectFn
 */
function clean(effectFn) {
    effectFn.deps.forEach(function (deps) {
        deps.delete(effectFn);
    });
    effectFn.deps.length = 0;
}
/**
 * 清理childs
 * @param effectFn
 */
function cleanupDeep(effectFn) {
    effectFn.childs.forEach(function (effect) {
        clean(effect);
        cleanupDeep(effect);
    });
}
/**
 * 循环建立依赖追踪
 * @param value 待建立对象
 */
var traverse = function (value, seen) {
    if (seen === void 0) { seen = new Set(); }
    if (typeof value !== 'object' || value === null || seen.has(value))
        return;
    seen.add(value);
    for (var k in value) {
        (0, exports.traverse)(value[k], seen);
    }
    return value;
};
exports.traverse = traverse;
