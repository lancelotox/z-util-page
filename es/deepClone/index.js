/**
 * 深拷贝
 * @param value 待克隆值
 */
let cacheMap = new WeakMap();
const typeHandleMap = {
    'Object': function (value) {
        let cloneTarget = new value.constructor();
        forEach(Object.keys(value), function (val, key) {
            cloneTarget[val] = deepClone(value[val]);
        });
        return cloneTarget;
    },
    'Array': function (value) {
        let cloneTarget = [];
        forEach(value, function (val, key) {
            cloneTarget[key] = deepClone(value[key]);
        });
        return cloneTarget;
    },
    'Set': function (value) {
        let cloneTarget = new value.constructor();
        value.forEach(function (val) {
            cloneTarget.add(deepClone(val));
        });
        return cloneTarget;
    },
    'Map': function (value) {
        let cloneTarget = new value.constructor();
        value.forEach(function (val, key) {
            cloneTarget.set(deepClone(key), deepClone(val));
        });
        return cloneTarget;
    },
    'Symbol': function (value) {
        return Object(Symbol.prototype.valueOf.call(value));
    },
    'HTMLElement': function (value) {
        return value.cloneNode(true);
    },
    'Error': function (value) {
        return new value.constructor(value.message);
    }
};
const baseTypeList = ['boolean', 'number', 'string', 'undefined', "function", "symbol", 'Null', "Math", "Json", "Global"];
const simpleTypeList = ["Boolean", "Number", 'String', 'Date', "Regexp"];
function deepClone(value) {
    let type = typeof value;
    if (type === 'object')
        type = getType(value);
    if (value instanceof HTMLElement)
        type = 'HTMLElement';
    if (baseTypeList.includes(type))
        return value;
    else if (simpleTypeList.includes(type))
        return new value.constructor(value);
    let cloneTarget = cacheMap.get(value);
    if (cloneTarget === undefined) {
        let handle = typeHandleMap[type];
        if (handle)
            cloneTarget = handle(value);
        else
            cloneTarget = value;
        cacheMap.set(value, cloneTarget);
    }
    clear();
    return cloneTarget;
}
/**
 * 清理缓存
 */
let isFlush = false;
function clear() {
    if (!isFlush) {
        isFlush = true;
        let promise = Promise.resolve();
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
    let index = -1;
    let length = list.length;
    while (++index < length) {
        handle(list[index], index);
    }
}
/**
 * 获取数据类型
 * @param value
 * @returns 类型字符串, 'String'、'Map'
 */
function getType(value) {
    try {
        return Object.prototype.toString.call(value).match(/\[.+\s(.+)\]/)[1];
    }
    catch (e) {
        throw (e);
    }
}
export { deepClone, getType };
