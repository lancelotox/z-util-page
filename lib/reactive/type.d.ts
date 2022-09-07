export interface Ref<T> {
    value: T
}

export type DepsMap = Map<string | symbol, Set<Effect>>

export interface Effect {
    (): any
    deps: Array<Set<() => any>>
}