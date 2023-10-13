"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mergeObject = void 0;
var index_1 = require("../deepClone/index");
/**
 * 深度合并n个对象值
 * @param origin 将多个对象深度合并到该对象
 * @param ob 被合并对象
 * @param more 其余被合并对象
 */
function mergeObject(origin, ob) {
    var more = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        more[_i - 2] = arguments[_i];
    }
    do {
        origin = merge(origin, ob);
        ob = more.pop();
    } while (ob);
    return origin;
}
exports.mergeObject = mergeObject;
function merge(origin, ob) {
    if (ob === undefined)
        return origin;
    if ((0, index_1.getType)(origin) !== 'Object' || (0, index_1.getType)(ob) !== 'Object')
        return origin;
    for (var key in ob) {
        var oldVal = origin[key];
        var newVal = ob[key];
        if (oldVal !== newVal && newVal !== undefined) {
            if ((0, index_1.getType)(oldVal) !== 'Object')
                origin[key] = newVal;
            else
                merge(oldVal, newVal);
        }
    }
    return origin;
}
