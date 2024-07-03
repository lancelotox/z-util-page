import { Ref, Effect, EffectOptions } from './type';
/**
 * 代理对象值，返回响应式数据
 * @param value 对象值
 * @param isShadow true为深代理，false为浅代理
 * @param isReadonly 是否只读
 * @returns T
 */
declare function reactive<T extends object>(value: T, isShadow?: boolean, isReadonly?: boolean): T;
/**
 * 代理基本类型值，返回响应式数据
 * @param value 基本类型值
 * @param isReadonly 是否只读
 * @returns { value: T }
 */
declare function ref<T>(value: T, isReadonly?: boolean): Ref<T>;
/**
 * 将响应式对象的某键值转为ref
 * @param val 响应式对象
 * @param key 键值
 * @returns Ref
 */
declare function toRef(val: any, key: string | symbol): {
    value: any;
};
/**
 * 将响应式对象的键值全部转换为Ref, 可解构使用
 * @param obj 响应式对象
 * @returns
 */
declare function toRefs(obj: any): {};
/**
 * 创建副作用函数
 * @param func 函数
 * @param options 配置
 * @returns effectFunc
 */
declare function effect(func: Function, options?: EffectOptions): Effect;
/**
 * 获取计算属性
 * @param getter
 * @returns { value: any }
 */
declare function computed<T>(getter: () => {
    readonly value: T;
}): {
    readonly value: any;
};
/**
 * 监听响应式数据
 * @param source 副作用函数或者响应式对象
 * @param cb 数据变化后回调函数
 * @param options 配置
 */
declare function watch(source: Function | object, cb: Function, options?: EffectOptions): void;
/**
 * 获取原始对象
 */
declare function toRaw<T>(proxy: T): T;
export { reactive, ref, toRef, toRefs, effect, computed, watch, toRaw, };
