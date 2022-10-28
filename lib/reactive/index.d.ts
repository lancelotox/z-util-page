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
declare function ref<T>(value: T, isReadonly?: boolean): Ref<T>;
declare function reactive<T extends object>(value: T, isShadow?: boolean, isReadonly?: boolean): T;
declare function effect(func: Function, options?: EffectOptions): Effect;
declare function computed(getter: Function): {
    readonly value: any;
};
declare function watch(source: Function | object, cb: Function, options?: EffectOptions): void;
declare const _default: {
    ref: typeof ref;
    reactive: typeof reactive;
    effect: typeof effect;
    computed: typeof computed;
    watch: typeof watch;
};
export default _default;
