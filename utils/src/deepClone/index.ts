let cacheMap = new WeakMap<object, any>();
interface HandleMap {
  [propName: string]: Function
}
const typeHandleMap: HandleMap = {
  'Object': function (value: any) {
    let cloneTarget = new value.constructor();
    forEach(Object.keys(value), function (val: any, key: number) {
      cloneTarget[val] = realDeepClone(value[val]);
    });
    return cloneTarget;
  },
  'Array': function (value: any) {
    let cloneTarget: Array<any> = [];
    forEach(value, function (val: any, key: number) {
      cloneTarget[key] = realDeepClone(value[key]);
    });
    return cloneTarget;
  },
  'Set': function (value: any) {
    let cloneTarget = new value.constructor();
    value.forEach(function (val: any) {
      cloneTarget.add(realDeepClone(val));
    });
    return cloneTarget;
  },
  'Map': function (value: any) {
    let cloneTarget = new value.constructor();
    value.forEach(function (val: any, key: any) {
      cloneTarget.set(realDeepClone(key), realDeepClone(val));
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
 * 循环深拷贝
 * @param value 待克隆值
 * @returns 克隆值
 */
function realDeepClone(value: any) {
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
  return cloneTarget;
}

/**
 * 获取数据类型
 * @category 辅助函数
 * @example
 * ```ts
 * const type = getType('你好');
 * type === 'String';
 * ```
 * @param value 任意值
 * @returns 类型字符串, 如'String'、'Map'等
 */
export function getType(value: any): string {
  try {
    return Object.prototype.toString.call(value).match(/\[.+\s(.+)\]/)![1];
  } catch (e) {
    throw (e);
  }
}

/**
 * 深拷贝
 * @category 辅助函数
 * @example
 * ```ts
 * let newValue = deepClone({
 *   a: '身体和心灵，总有一个在路上。',
 *   b: {
 *     c: new Date(),
 *     d: [1, 3, 4],
 *     e: Symbol(),
 *     a: null,
 *     b: undefined,
 *     f: {
 *       a: 1,
 *       b: true,
 *     }
 *   },
 *   c: document.createElement('div'),
 *   d: new RegExp(/\d+/ig),
 *   e: new Error('错误'),
 *   f: function () {
 *     console.log('身体和心灵，总有一个在路上。');
 *   }
 * ```
 * @param value 待克隆值
 * @returns 克隆值
 */
export function deepClone(value: any) {
  const result = realDeepClone(value);
  cacheMap = new WeakMap<object, any>();
  return result;
}