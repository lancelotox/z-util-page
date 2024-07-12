import { deepClone } from '../deepClone/index';

/**
 * 函数节流配置
 */
export interface throttleOptions {
  // 首次是否执行
  leading: boolean,
  // 结束是否执行
  trailing: boolean
}

const defaultConfig: throttleOptions = {
  leading: true,
  trailing: false
}

/**
 * 函数节流
 * @category 辅助函数
 * @example
 * ```ts
 * interface throttleOptions {
 *   // 首次是否执行
 *   leading: boolean,
 *   // 结束是否执行
 *   trailing: boolean
 * }
 * let throttle = throttle(function(){
 *   console.log('身体和心灵，总有一个在路上。');
 *   return '身体和心灵，总有一个在路上。';
 * }, 1000, {
 *   leading: true, 
 *   trailing: true
 * });
 * throttle();
 * throttle.cancel();
 * ```
 * @param func 待处理函数
 * @param wait 函数执行最短间隔时间
 * @param option 函数执行配置
 */
export function throttle(func: Function, wait: number, option?: throttleOptions) {
  let options = Object.assign(deepClone(defaultConfig), option || {});
  if (options.leading === false && options.trailing === false) throw ('leading, trailing不能同时为false');
  let timeout: NodeJS.Timeout | null = null, args: any[], content: any, res: any;
  /**
   * 处理好的节流函数
   * @param this 执行上下文继承自传入函数
   * @param argList 参数继承自传入函数
   */
  const throttled = function (this: any, ...argList: any[]) {
    args = argList;
    content = this;
    if (!timeout) {
      timeout = setTimeout(function () {
        timeout = null;
        if (options.trailing) func.apply(content, args);
      }, wait);
      if (options.leading) res = func.apply(content, args);
    }
    return res;
  }
  /**
   * 取消节流函数执行
   */
  throttled.cancel = function () {
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
  }
  return throttled;
}