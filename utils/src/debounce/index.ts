/**
 * 将函数处理为防抖函数
 * @category 辅助函数
 * @example
 * ```ts
 * let debounced = debounce(function () {
 *   console.log('身体和心灵，总有一个在路上。');
 *   return '身体和心灵，总有一个在路上。';
 * }, 1000, true);
 * debounced.then(function (res) {
 *   console.log(res);
 * });
 * debounced();
 * debounced.cancel();
 * ```
 * @param func 待处理函数
 * @param wait 函数执行延迟时间
 * @param immediatel 是否立刻执行
 */
export function debounce(func: Function, wait: number, immediatel?: boolean) {
  let timeout: NodeJS.Timeout | null, content: any, args: IArguments, callbacks: Array<Function> = [], res: any;
  /**
   * 处理好的防抖函数
   * @param this 执行上下文继承自传入函数
   * @param args 参数继承自传入函数
   */
  const debounced = function (this: any, ...args: any[]): any {
    content = this;
    if (immediatel && !timeout) {
      res = func.apply(content, args);
      let resolvedRes: any = res;
      callbacks.forEach(function (callback) {
        if (callback instanceof Function) resolvedRes = callback(resolvedRes);
      });
    }
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(function () {
      func.apply(content, args);
      timeout = null;
    }, wait);
    return res;
  }
  /**
   * 取消防抖函数执行
   */                                
  debounced.cancel = function () {
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
  }
  /**
   * 注册防抖函数执行后的回调
   * @param callback 回调函数
   * @returns 处理好的防抖函数
   */
  debounced.then = function (callback: Function) {
    callbacks.push(callback);
    return this;
  }
  return debounced;
}