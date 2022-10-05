export interface Ref<T> {
    value: T
}

export type DepsMap = Map<string | symbol, Set<Effect>>

export interface Effect {
    (): any
    deps: Array<Set<Effect>>
    options: EffectOptions
}

export type EffectOptions = {
    schedule?: Function
    lazy?: boolean
    immediate?: boolean
    flush?: 'post' | ''
}

export enum TriggerType {
    SET,
    ADD,
    DELETE
}