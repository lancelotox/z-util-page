interface Ref<T> {
    value: T
}

type DepsMap = Map<string | symbol, Set<Effect>>

interface Effect {
    (): any
    deps: Array<Set<Effect>>
    options: EffectOptions
}

type EffectOptions = {
    schedule?: Function
    lazy?: boolean
    immediate?: boolean
    flush?: 'post' | ''
}

const bucket = new WeakMap<object, DepsMap>();
const reactiveMap = new Map<object, object>();
const effectStack = new Array<Effect>();
const ITERATE_KEY: symbol = Symbol();
const source: symbol = Symbol();

let activeEffect: Effect | null = null;
let shouldTrack: boolean = true;

enum TriggerType {
    SET,
    ADD,
    DELETE
}

const arrayInstrumentations = {};

['includes', 'indexOf', 'lastIndexOf'].forEach(method => {
    const originMethod = Reflect.get(Array.prototype, method);
    Reflect.set(arrayInstrumentations, method, function(this: any, ...args: [searchElement: any, fromIndex?: number | undefined]): boolean | number {
        let res: boolean | number = originMethod.apply(this, args);
        if(res === false || res === -1) res = originMethod.apply(Reflect.get(this, source), args);
        return res;
    });
});

['push', 'pop', 'shift', 'unshift', 'splice'].forEach(method => {
    const originMethod = Reflect.get(Array.prototype, method);
    Reflect.set(arrayInstrumentations, method, function(this: any, ...args: [searchElement: any, fromIndex?: number | undefined]): boolean | number {
        shouldTrack = false;
        let res: any = originMethod.apply(this, args);
        shouldTrack = true;
        return res;
    });
});

function track(target: object, p: string | symbol): void {
    if (!activeEffect || !shouldTrack){
        return;
    }
    let depsMap: DepsMap | undefined = bucket.get(target);
    if (!depsMap) {
        bucket.set(target, (depsMap = new Map()));
    }
    let deps: Set<Effect> | undefined = depsMap.get(p);
    if (!deps) {
        depsMap.set(p, (deps = new Set()));
    }
    deps.add(activeEffect);
    activeEffect.deps.push(deps);
}

function trigger(target: object, p: string | symbol, type: TriggerType, value: any): boolean {
    let depsMap: DepsMap | undefined = bucket.get(target);
    if (!depsMap){
        return true;
    }
    let effects: Set<Effect> | undefined = depsMap.get(p);
    let effectsToRun = new Set<Effect>();
    effects && effects.forEach(effectFn => {
        if (effectFn !== activeEffect)
            effectsToRun.add(effectFn);
    });
    if (type === TriggerType.ADD || type === TriggerType.DELETE) {
        let iterateEffects = depsMap.get(ITERATE_KEY);
        iterateEffects && iterateEffects.forEach(effectFn => {
            if (effectFn !== activeEffect)
                effectsToRun.add(effectFn);
        });
    }
    if (type === TriggerType.ADD && Array.isArray(target)) {
        let lengthEffects = depsMap.get('length');
        lengthEffects && lengthEffects.forEach(effectFn => {
            if (effectFn !== activeEffect)
                effectsToRun.add(effectFn);
        });
    }
    if (Array.isArray(target) && p === 'length') {
        depsMap.forEach((effects, key) => {
            if (Number(key) >= Number(value)) {
                effects.forEach(effectFn => {
                    if (effectFn !== activeEffect)
                        effectsToRun.add(effectFn);
                });
            }
        })
        let lengthEffects = depsMap.get('length');
        lengthEffects && lengthEffects.forEach(effectFn => {
            if (effectFn !== activeEffect)
                effectsToRun.add(effectFn);
        });
    }
    effectsToRun.forEach(fn => {
        if (typeof fn.options.schedule === 'function') {
            fn.options.schedule(fn);
        } else {
            fn();
        }
    });
    return true;
}

function cleanup(effectFn: Effect): void {
    effectFn.deps.forEach(deps => {
        deps.delete(effectFn);
    });
    effectFn.deps.length = 0;
}

function ref<T>(value: T, isReadonly = false): Ref<T> {
    return reactive<Ref<T>>({ value }, true, isReadonly);
}

function reactive<T extends object>(value: T, isShadow = false, isReadonly = false): T {
    return new Proxy<T>(value, {
        get(target, p, reciver) {
            if (p === source) return target;
            if (Array.isArray(target) && arrayInstrumentations.hasOwnProperty(p)){
                return Reflect.get(arrayInstrumentations, p, reciver);
            }
            if (!isReadonly && typeof p !== 'symbol') track(target, p);
            const res = Reflect.get(target, p, reciver);
            if (isShadow) return res;
            if (typeof res === 'object' && res != null) {
                const existionProxy = reactiveMap.get(res);
                if (existionProxy) return existionProxy;
                const proxy = reactive(res, isShadow, isReadonly);
                reactiveMap.set(res, proxy);
                return proxy;
            }
            return res;
        },
        has(target, p) {
            if (!isReadonly) track(target, p);
            return Reflect.has(target, p);
        },
        ownKeys(target) {
            if (!isReadonly) track(target, Array.isArray(target) ? 'length' : ITERATE_KEY);
            return Reflect.ownKeys(target);
        },
        deleteProperty(target, p) {
            if (isReadonly) {
                console.log(target, `对象是只读的`);
                return false;
            }
            const hadKey = Object.prototype.hasOwnProperty.call(target, p);
            const res = Reflect.deleteProperty(target, p);
            if (res && hadKey) {
                trigger(target, p, TriggerType.DELETE, 0);
            }
            return true;
        },
        set(target, p, value, reciver) {
            if (isReadonly) {
                console.log(target, `对象是只读的`);
                return false;
            }
            const oldValue = Reflect.get(target, p);
            const type = Array.isArray(target)
                ? Number(p) < target.length ? TriggerType.SET : TriggerType.ADD
                : Object.prototype.hasOwnProperty.call(target, p) ? TriggerType.SET : TriggerType.ADD;
            const res = Reflect.set(target, p, value, reciver);
            if (target === reciver[source]) {
                if (oldValue !== value && (oldValue === oldValue || value === value)){
                    trigger(target, p, type, value);
                }   
            }
            return true;
        }
    });
}

function effect(func: Function, options: EffectOptions = {}) {
    let effectFn = <Effect>function () {
        cleanup(effectFn);
        activeEffect = effectFn;
        effectStack.push(effectFn);
        const res = func();
        effectStack.pop();
        activeEffect = effectStack[effectStack.length - 1];
        return res;
    };
    effectFn.deps = [];
    effectFn.options = options;
    if (!options.lazy) effectFn();
    return effectFn;
}

function computed(getter: Function) {
    let value: any;
    let dirty = true;
    const effectFn = effect(getter, {
        lazy: true,
        schedule() {
            if (!dirty) {
                dirty = true;
                trigger(obj, 'value', TriggerType.SET, 0);
            }
        }
    });
    const obj = {
        get value() {
            if (dirty) {
                value = effectFn();
                dirty = false;
            }
            track(obj, 'value');
            return value;
        }
    }
    return obj;
}

function traverse(value: any, seen = new Set()): any {
    if (typeof value !== 'object' || value === null || seen.has(value)) return;
    seen.add(value);
    for (const k in value) {
        traverse(value[k], seen);
    }
    return value;
}

function watch(source: Function | object, cb: Function, options: EffectOptions = {}) {
    let getter: Function;
    if (typeof source === 'function') getter = source;
    else getter = () => traverse(source);
    let oldValue: any, newValue, cleanup: Function;
    function onInvalidate(fn: Function) {
        cleanup = fn;
    }
    const job = () => {
        newValue = effectFn();
        if (cleanup) cleanup();
        cb(oldValue, newValue, onInvalidate);
        oldValue = newValue;
    }
    const effectFn = effect(() => getter(), {
        lazy: true,
        schedule() {
            if (options.flush === 'post') {
                const p = Promise.resolve();
                p.then(job);
            } else {
                job();
            }
        }
    });
    if (options.immediate) job();
    else oldValue = effectFn();
}

export default {
    ref,
    reactive,
    effect,
    computed,
    watch,
}
