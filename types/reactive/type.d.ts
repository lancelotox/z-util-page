export interface Ref<T> {
    value: T;
}
export interface Effect {
    (): any;
    deps: Array<Set<Effect>>;
    options: EffectOptions;
}
export declare type DepsMap = Map<string | symbol, Set<Effect>>;
export declare type EffectOptions = {
    schedule?: Function;
    lazy?: boolean;
    immediate?: boolean;
    flush?: 'post' | '';
};
