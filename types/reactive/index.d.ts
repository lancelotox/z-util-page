import { Ref, Effect, EffectOptions } from './type';
declare function ref<T>(value: T, isReadonly?: boolean): Ref<T>;
declare function reactive<T extends object>(value: T, isShadow?: boolean, isReadonly?: boolean): T;
declare function effect(func: Function, options?: EffectOptions): Effect;
declare function computed(getter: Function): {
    readonly value: any;
};
declare function watch(source: Function | object, cb: Function, options?: EffectOptions): void;
export { ref, reactive, effect, computed, watch, };
