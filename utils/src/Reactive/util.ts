import { Effect } from './index';

/**
 * 普通对象转代理对象, 原始值转换
 */
export const wrapValue = function (this: any, value: any) {
  return (typeof value === 'object' && value !== null) ? this.reactive(value) : value;
}

/**
 * 清理副作用函数
 * @param effectFn 副作用函数
 */
export const cleanup = function (effectFn: Effect): void {
  clean(effectFn);
  cleanupDeep(effectFn);
}

/**
 * 清理deps
 * @param effectFn 
 */
function clean(effectFn: Effect) {
  effectFn.deps.forEach(deps => {
    deps.delete(effectFn);
  });
  effectFn.deps.length = 0;
}

/**
 * 清理childs
 * @param effectFn 
 */
function cleanupDeep(effectFn: Effect): void {
  effectFn.childs.forEach(effect => {
    clean(effect);
    cleanupDeep(effect);
  })
}

/**
 * 循环建立依赖追踪
 * @param value 待建立对象
 */
export const traverse = function (value: any, seen = new Set()): any {
  if (typeof value !== 'object' || value === null || seen.has(value)) return;
  seen.add(value);
  for (const k in value) {
    traverse(value[k], seen);
  }
  return value;
}