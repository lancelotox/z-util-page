import type { Ref, DepsMap, Effect } from './type.d'

const bucket: WeakMap<object, DepsMap> = new WeakMap();
const reactiveMap = new Map();
let activeEffect: Effect | undefined = undefined;
const effecrStack = [];
const ITERATE_KEY = Symbol();
const source = Symbol();
const TriggerType = {
    SET: 'SET',
    ADD: 'ADD',
    DELETE: 'DELETE'
}

function track(target, p) {
    if (!activeEffect)
        return;
    let depsMap = bucket.get(target);
    if (!depsMap) {
        bucket.set(target, (depsMap = new Map()));
    }
    let deps = depsMap.get(p);
    if (!deps) {
        depsMap.set(p, (deps = new Set()));
    }
    deps.add(activeEffect);
    activeEffect.deps.push(deps);
}

function trigger(target, p, type, value) {
    let depsMap = bucket.get(target);
    if (!depsMap)
        return true;
    let effects = depsMap.get(p);
    let effectsToRun = new Set();
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
            if (key >= value) {
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

function cleanup(effectFn) {
    effectFn.deps.forEach(deps => {
        deps.delete(effectFn);
    });
    effectFn.deps.length = 0;
}

function ref(value) {
    let proxy = new Proxy({ value }, {
        get(target, p) {
            track(target, p);
            return Reflect.get(target, p);
        },
        set(target, p, value) {
            Reflect.set(target, p, value);
            return trigger(target, p);
        }
    });
    return proxy;
}

function reactive(value, isShadow = false, isReadonly = false) {
    return new Proxy(value, {
        get(target, p, reciver) {
            if (p === source) return target;
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
            if (!isReadonly) track(target, Array.isArray(target) ? 'length' : ITERATE_KEY

            );
            return Reflect.ownKeys(target);
        },
        deleteProperty(target, p) {
            if (isReadonly) {
                console.log(`属性${p}是只读的`);
                return;
            }
            const hadKey = Object.prototype.hasOwnProperty.call(target, p);
            const res = Reflect.deleteProperty(target, p);
            if (res && hadKey) {
                trigger(target, p, 'DELETE');
            }
            return res;
        },
        set(target, p, value, reciver) {
            if (isReadonly) {
                console.log(`属性${p}是只读的`);
                return;
            }
            const oldValue = target[p];
            const type = Array.isArray(target)
                ? Number(p) < target.length ? 'SET' : 'ADD'
                : Object.prototype.hasOwnProperty.call(target, p) ? 'SET' : 'ADD';
            const res = Reflect.set(target, p, value, reciver);
            if (target === reciver[source]) {
                if (oldValue !== value && (oldValue === oldValue || value === value))
                    trigger(target, p, type, value);
            }
            return res;
        }
    });
}

function effect(func, options = {}) {
    let effectFn = function () {
        cleanup(effectFn);
        activeEffect = effectFn;
        effecrStack.push(effectFn);
        const res = func();
        effecrStack.pop();
        activeEffect = effecrStack[effecrStack.length - 1];
        return res;
    };
    effectFn.deps = [];
    effectFn.options = options;
    if (!options.lazy) effectFn();
    return effectFn;
}

function computed(getter) {
    let value;
    let dirty = true;
    const effectFn = effect(getter, {
        lazy: true,
        schedule() {
            if (!dirty) {
                dirty = true;
                trigger(obj, 'value');
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

function traverse(value, seen = new Set()) {
    if (typeof value !== 'object' || value === null || seen.has(value)) return;
    seen.add(value);
    for (const k in value) {
        traverse(value[k], seen);
    }
    return value;
}

function watch(source, cb, options = {}) {
    let getter;
    if (typeof source === 'function') getter = source;
    else getter = () => traverse(source);
    let oldValue, newValue, cleanup;
    function onInvalidate(fn) {
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
