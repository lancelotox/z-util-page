interface Ref<T> {
    value: T;
}
interface Effect {
    (): any;
    deps: Array<Set<Effect>>;
    options: EffectOptions;
}
declare type EffectOptions = {
    schedule?: Function;
    lazy?: boolean;
    immediate?: boolean;
    flush?: 'post' | '';
};
export declare function ref<T>(value: T, isReadonly?: boolean): Ref<T>;
export declare function reactive<T extends object>(value: T, isShadow?: boolean, isReadonly?: boolean): T;
export declare function effect(func: Function, options?: EffectOptions): Effect;
export declare function computed(getter: Function): {
    readonly value: any;
};
export declare function watch(source: Function | object, cb: Function, options?: EffectOptions): void;
export {};
