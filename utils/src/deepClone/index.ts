let cacheMap = new WeakMap<object, any>();
interface HandleMap {
  [propName: string]: Function
}
const typeHandleMap: HandleMap = {
  'Object': function (value: any) {
    let cloneTarget = new value.constructor();
    forEach(Object.keys(value), function (val: any, key: number) {
      cloneTarget[val] = deepClone(value[val]);
    });
    return cloneTarget;
  },
  'Array': function (value: any) {
    let cloneTarget: Array<any> = [];
    forEach(value, function (val: any, key: number) {
      cloneTarget[key] = deepClone(value[key]);
    });
    return cloneTarget;
  },
  'Set': function (value: any) {
    let cloneTarget = new value.constructor();
    value.forEach(function (val: any) {
      cloneTarget.add(deepClone(val));
    });
    return cloneTarget;
  },
  'Map': function (value: any) {
    let cloneTarget = new value.constructor();
    value.forEach(function (val: any, key: any) {
      cloneTarget.set(deepClone(key), deepClone(val));
    });
    return cloneTarget;
  },
  'Symbol': function (value: Symbol) {
    return Object(Symbol.prototype.valueOf.call(value));
  },
  'HTMLElement': function (value: HTMLElement) {
    return value.cloneNode(true);
  },
  'Error': function (value: any) {
    return new value.constructor(value.message);
  }
}
const baseTypeList = ['boolean', 'number', 'string', 'undefined', "function", "symbol", 'Null', "Math", "Json", "Global"];
const simpleTypeList = ["Boolean", "Number", 'String', 'Date', "Regexp"];

let isFlush = false;
/**
 * 清理缓存
 */
function clear() {
  if (!isFlush) {
    isFlush = true;
    let promise = Promise.resolve();
    promise.then(function () {
      cacheMap = new WeakMap<object, any>();
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
function forEach(list: Array<any>, handle: Function) {
  let index: number = -1;
  let length = list.length;
  while (++index < length) {
    handle(list[index], index);
  }
}

/**
 * @category 辅助函数-获取数据类型
 * @param value 
 * @returns 类型字符串, 'String'、'Map'
 */
export function getType(value: any): string {
  try {
    return Object.prototype.toString.call(value).match(/\[.+\s(.+)\]/)![1];
  } catch (e) {
    throw (e);
  }
}

/**
 * @category 辅助函数-深拷贝
 * @param value 待克隆值
 */
export function deepClone(value: any) {
  let type: string = typeof value;
  if (type === 'object') type = getType(value);
  if (value instanceof HTMLElement) type = 'HTMLElement';
  if (baseTypeList.includes(type)) return value;
  else if (simpleTypeList.includes(type)) return new value.constructor(value);
  let cloneTarget = cacheMap.get(value);
  if (cloneTarget === undefined) {
    let handle = typeHandleMap[type];
    if (handle) cloneTarget = handle(value);
    else cloneTarget = value;
    cacheMap.set(value, cloneTarget);
  }
  clear();
  return cloneTarget;
}