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
    childs: Array<Effect>;
    options: EffectOptions;
    shouldTrack: boolean;
}
export type DepsMap = Map<string | symbol, Set<Effect>>;
export type EffectOptions = {
    schedule?: Function;
    lazy?: boolean;
    immediate?: boolean;
    flush?: 'post' | '';
};
export type Instrumentations = {
    [propName: string | symbol]: Function;
};
export type ReactiveOptions = {
    value: any;
    isShadow: boolean;
    isReadonly: boolean;
};
