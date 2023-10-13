import { Effect } from './type';
/**
 * 普通对象转代理对象, 原始值转换
 */
export declare const wrapValue: (this: any, value: any) => any;
/**
 * 清理副作用函数
 * @param effectFn 副作用函数
 */
export declare const cleanup: (effectFn: Effect) => void;
/**
 * 循环建立依赖追踪
 * @param value 待建立对象
 */
export declare const traverse: (value: any, seen?: Set<unknown>) => any;
