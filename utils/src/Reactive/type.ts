// 数组触发类型枚举
export enum TriggerType {
    SET,
    ADD,
    DELETE
}

// 原始值代理
export interface Ref<T> {
    value: T
}

export interface Effect {
    (): any
    deps: Array<Set<Effect>>
    childs: Array<Effect>
    options: EffectOptions
    shouldTrack: boolean
}

export type DepsMap = Map<string | symbol, Set<Effect>>

export type EffectOptions = {
    schedule?: Function
    lazy?: boolean
    immediate?: boolean
    flush?: 'post' | ''
}

export type Instrumentations = {
    [propName: string | symbol]: Function
}

export type ReactiveOptions = {
    value: any
    isShadow: boolean
    isReadonly: boolean
}