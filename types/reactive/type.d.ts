export declare enum TriggerType {
    SET = 0,
    ADD = 1,
    DELETE = 2
}
export interface Ref<T> {
    value: T;
}
export interface Effect {
    (): any;
    deps: Array<Set<Effect>>;
    options: EffectOptions;
    shouldTrack: boolean;
}
export declare type DepsMap = Map<string | symbol, Set<Effect>>;
export declare type EffectOptions = {
    schedule?: Function;
    lazy?: boolean;
    immediate?: boolean;
    flush?: 'post' | '';
};
export declare type Instrumentations = {
    [propName: string | symbol]: Function;
};
export declare type ReactiveOptions = {
    value: any;
    isShadow: boolean;
    isReadonly: boolean;
};
