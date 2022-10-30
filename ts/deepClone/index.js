"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getType = exports.deepClone = void 0;
/**
 * 深拷贝
 * @param value 待克隆值
 */

var cacheMap = new WeakMap();
var typeHandleMap = {
  'Object': function (value) {
    var cloneTarget = new value.constructor();
    forEach(Object.keys(value), function (val, key) {
      cloneTarget[val] = deepClone(value[val]);
    });
    return cloneTarget;
  },
  'Array': function (value) {
    var cloneTarget = [];
    forEach(value, function (val, key) {
      cloneTarget[key] = deepClone(value[key]);
    });
    return cloneTarget;
  },
  'Set': function (value) {
    var cloneTarget = new value.constructor();
    value.forEach(function (val) {
      cloneTarget.add(deepClone(val));
    });
    return cloneTarget;
  },
  'Map': function (value) {
    var cloneTarget = new value.constructor();
    value.forEach(function (val, key) {
      cloneTarget.set(deepClone(key), deepClone(val));
    });
    return cloneTarget;
  },
  'Symbol': function (value) {
    return Object(Symbol.prototype.valueOf.call(value));
  },
  'HTMLElement': function (value) {
    return value.cloneNode();
  }
};
var baseTypeList = ['boolean', 'number', 'string', 'undefined', "function", "symbol", 'Null', "Math", "Json", "Global"];
var simpleTypeList = ["Boolean", "Number", 'String', 'Date', 'Error', "Regexp"];

function deepClone(value) {
  var type = typeof value;
  if (type === 'object') type = getType(value);
  if (value instanceof HTMLElement) type = 'HTMLElement';
  if (baseTypeList.includes(type)) return value;else if (simpleTypeList.includes(type)) return new value.constructor(value);
  var cloneTarget = cacheMap.get(value);

  if (cloneTarget === undefined) {
    var handle = typeHandleMap[type];
    if (handle) cloneTarget = handle(value);else cloneTarget = value;
    cacheMap.set(value, cloneTarget);
  }

  clear();
  return cloneTarget;
}

exports.deepClone = deepClone;
/**
 * 清理缓存
 */

var isFlush = false;

function clear() {
  if (!isFlush) {
    isFlush = true;
    var promise = Promise.resolve();
    promise.then(function () {
      cacheMap = new WeakMap();
    });
    promise.finally(function () {
      isFlush = false;
    });
  }
}
/**
 * while循环
 * @param list 待循环列表
 * @param handle 循环行为
 */


function forEach(list, handle) {
  var index = -1;
  var length = list.length;

  while (++index < length) {
    handle(list[index], index);
  }
}
/**
 * 获取数据类型
 * @param value
 */


function getType(value) {
  try {
    return Object.prototype.toString.call(value).match(/\[.+\s(.+)\]/)[1];
  } catch (e) {
    throw e;
  }
}

exports.getType = getType;