export enum TriggerType {
    SET,
    ADD,
    DELETE
}

export interface Ref<T> {
    value: T;
}

export interface Effect {
    (): any;
    deps: Array<Set<Effect>>;
    options: EffectOptions;
}

export type DepsMap = Map<string | symbol, Set<Effect>>;

export type EffectOptions = {
    schedule?: Function;
    lazy?: boolean;
    immediate?: boolean;
    flush?: 'post' | '';
}

export type Instrumentations = {
    [propName: string | symbol]: Function;
}

export type ReactiveOptions = {
    value: any;
    isShadow: boolean;
    isReadonly: boolean;
}