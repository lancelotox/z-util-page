"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toRaw = exports.watch = exports.computed = exports.effect = exports.toRefs = exports.toRef = exports.ref = exports.reactive = void 0;
const type_1 = require("./type");
const util_1 = require("./util");
const index_1 = require("../deepClone/index");
//对象-副作用函数映射关系字典
const bucket = new WeakMap();
//对象-响应式对象字典
const reactiveMap = new Map();
//副作用函数执行栈
const effectStack = new Array();
//对象迭代标识
const ITERATE_KEY = Symbol();
//MapKey迭代标识
const MAP_KEY_ITERATE_KEY = Symbol();
//取原始对象key
const source = Symbol();
const wrap = util_1.wrapValue.bind({ reactive });
//活动副作用函数
let activeEffect = null;
//数组原型方法代理
const arrayInstrumentations = {};
(function () {
    //在数组执行查找的原型方法时，在原始对象中进行查找，解决原始值与代理值不一致问题
    ['includes', 'indexOf', 'lastIndexOf'].forEach(method => {
        const originMethod = Reflect.get(Array.prototype, method);
        Reflect.set(arrayInstrumentations, method, function (...args) {
            let res = originMethod.apply(this, args);
            if (res === false || res === -1)
                res = originMethod.apply(Reflect.get(this, source), args);
            return res;
        });
    });
    //在数组执行删除等涉及length属性修改的原型方法时，关闭依赖追踪
    ['pop', 'shift', 'splice'].forEach(method => {
        const originMethod = Reflect.get(Array.prototype, method);
        Reflect.set(arrayInstrumentations, method, function (...args) {
            if (activeEffect)
                activeEffect.shouldTrack = false;
            let res = originMethod.apply(this, args);
            if (activeEffect)
                activeEffect.shouldTrack = true;
            return res;
        });
    });
    //在数组执行增加等涉及length属性修改的原型方法时，关闭依赖追踪
    ['push', 'unshift'].forEach(method => {
        const originMethod = Reflect.get(Array.prototype, method);
        Reflect.set(arrayInstrumentations, method, function (...args) {
            if (activeEffect)
                activeEffect.shouldTrack = false;
            let res = originMethod.apply(this, args.map((arg) => {
                return toRaw(arg);
            }));
            if (activeEffect)
                activeEffect.shouldTrack = true;
            return res;
        });
    });
})();
//Set-Map原型方法代理
const mutableInstrumentations = {};
(function () {
    function iterationMethod() {
        //获取原始对象
        const target = Reflect.get(this, source);
        //获取迭代器对象
        const itr = target[Symbol.iterator]();
        //建立响应
        track(target, ITERATE_KEY);
        //返回自定义迭代器
        return {
            //迭代器协议
            next() {
                //获取原始数据
                const { value, done } = itr.next();
                return {
                    value: value ? [wrap(value[0]), wrap(value[1])] : value,
                    done
                };
            },
            //可迭代协议
            [Symbol.iterator]() {
                return this;
            }
        };
    }
    function valuesIterationMethod() {
        //获取原始对象
        const target = Reflect.get(this, source);
        //获取迭代器对象
        const itr = target.values();
        //建立响应
        track(target, ITERATE_KEY);
        //返回自定义迭代器
        return {
            //迭代器协议
            next() {
                //获取原始数据
                const { value, done } = itr.next();
                return {
                    value: wrap(value),
                    done
                };
            },
            //可迭代协议
            [Symbol.iterator]() {
                return this;
            }
        };
    }
    function keysIterationMethod() {
        //获取原始对象
        const target = Reflect.get(this, source);
        //获取迭代器对象
        const itr = target.keys();
        //建立响应
        track(target, MAP_KEY_ITERATE_KEY);
        //返回自定义迭代器
        return {
            //迭代器协议
            next() {
                //获取原始数据
                const { value, done } = itr.next();
                return {
                    value: wrap(value),
                    done
                };
            },
            //可迭代协议
            [Symbol.iterator]() {
                return this;
            }
        };
    }
    mutableInstrumentations.add = function (key) {
        //获取原始对象
        const target = Reflect.get(this, source);
        //是否只读
        const { isReadonly } = reactiveMap.get(target) || {};
        if (isReadonly) {
            console.log(target, `对象是只读的`);
            return false;
        }
        //取原始值
        const orgin = toRaw(key);
        //判断值是否已存在
        const hadkey = target.has(orgin);
        const res = target.add(orgin);
        //当值不存在时触发副作用函数
        if (!hadkey)
            trigger(target, orgin, type_1.TriggerType.ADD);
        return res;
    };
    mutableInstrumentations.get = function (key) {
        var _a;
        //获取原始对象
        const target = Reflect.get(this, source);
        //是否浅代理、只读
        const { isShadow, isReadonly } = reactiveMap.get(target) || {};
        //取原始值, 避免数据污染
        const orginKey = toRaw(key);
        //只读对象或者key为symbol时不进行追踪
        if (!isReadonly)
            track(target, orginKey);
        const res = target.get(orginKey);
        //浅代理模式直接返回原始值
        if (isShadow)
            return res;
        //非浅代理模式，如果原始值不是基本类型进行响应式包装
        if (typeof res === 'object' && res != null) {
            const existionProxy = (_a = reactiveMap.get(res)) === null || _a === void 0 ? void 0 : _a.value;
            if (existionProxy)
                return existionProxy;
            return reactive(res, isShadow, isReadonly);
        }
        //否则返回基本类型值
        return res;
    };
    mutableInstrumentations.set = function (key, value) {
        //获取原始对象
        const target = Reflect.get(this, source);
        //是否浅代理、只读
        const { isReadonly } = reactiveMap.get(target) || {};
        if (isReadonly) {
            console.log(target, `对象是只读的`);
            return false;
        }
        //取原始值, 避免数据污染
        const orginKey = toRaw(key);
        const orginValue = toRaw(value);
        //判断是否已存在
        const hadKey = target.has(orginKey);
        //取出旧值
        const oldValue = target.get(orginKey);
        //非浅代理时设置原始对象而非响应对象
        const res = target.set(orginKey, orginValue);
        if (!hadKey)
            trigger(target, orginKey, type_1.TriggerType.ADD);
        else if (oldValue !== orginValue && (oldValue === oldValue || orginValue === orginValue)) {
            trigger(target, orginKey, type_1.TriggerType.SET);
        }
        return res;
    };
    mutableInstrumentations.delete = function (key) {
        //获取原始对象
        const target = Reflect.get(this, source);
        //取原始值
        const orgin = toRaw(key);
        //判断值是否已存在
        const hadkey = target.has(orgin);
        const res = target.delete(orgin);
        //当值存在时触发副作用函数
        if (hadkey)
            trigger(target, orgin, type_1.TriggerType.DELETE);
        return res;
    };
    mutableInstrumentations.forEach = function (cb, thisArg) {
        //获取原始对象
        const target = Reflect.get(this, source);
        //与迭代key建立响应
        track(target, ITERATE_KEY);
        //调用原函数
        target.forEach((value, key) => {
            cb.call(thisArg, wrap(value), wrap(key), this);
        });
    };
    mutableInstrumentations.entries = iterationMethod;
    mutableInstrumentations.values = valuesIterationMethod;
    mutableInstrumentations.keys = keysIterationMethod;
    mutableInstrumentations[Symbol.iterator] = iterationMethod;
})();
/**
 * 依赖追踪
 * @param target 目标对象
 * @param p 键值
 */
function track(target, p) {
    if (!activeEffect || !activeEffect.shouldTrack) {
        return;
    }
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
/**
 * 触发副作用
 * @param target 目标对象
 * @param p 键值
 * @param type 类型
 * @param value 新值
 * @returns 是否成功
 */
function trigger(target, p, type, value) {
    let depsMap = bucket.get(target);
    if (!depsMap) {
        return true;
    }
    //取出所有与key直接相关的副作用函数
    let effects = depsMap.get(p);
    //待执行副作用函数队列
    let effectsToRun = new Set();
    //排除正在运行的副作用函数
    effects && effects.forEach(effectFn => {
        if (effectFn !== activeEffect)
            effectsToRun.add(effectFn);
    });
    //type为ADD或者DELETE或为Map类型设置值时，取出迭代相关副作用函数执行
    if (type === type_1.TriggerType.ADD || type === type_1.TriggerType.DELETE || (type === type_1.TriggerType.SET && (0, index_1.getType)(target) === 'Map')) {
        let iterateEffects = depsMap.get(ITERATE_KEY);
        iterateEffects && iterateEffects.forEach(effectFn => {
            if (effectFn !== activeEffect)
                effectsToRun.add(effectFn);
        });
    }
    //type为ADD或者DELETE且target为Map时，取出迭代相关副作用函数执行
    if ((type === type_1.TriggerType.ADD || type === type_1.TriggerType.DELETE) && (0, index_1.getType)(target) === 'Map') {
        let iterateEffects = depsMap.get(MAP_KEY_ITERATE_KEY);
        iterateEffects && iterateEffects.forEach(effectFn => {
            if (effectFn !== activeEffect)
                effectsToRun.add(effectFn);
        });
    }
    //type为ADD且target为数组时，取出数组迭代相关副作用函数执行（使用delete删除数组元素不会改变数组长度，故无需触发）
    if (type === type_1.TriggerType.ADD && Array.isArray(target)) {
        let lengthEffects = depsMap.get('length');
        lengthEffects && lengthEffects.forEach(effectFn => {
            if (effectFn !== activeEffect)
                effectsToRun.add(effectFn);
        });
    }
    //target为数组且直接操作数组length属性时，取出大于新length值的副作用函数执行
    if (Array.isArray(target) && p === 'length') {
        depsMap.forEach((effects, key) => {
            if (Number(key) >= Number(value)) {
                effects.forEach(effectFn => {
                    if (effectFn !== activeEffect)
                        effectsToRun.add(effectFn);
                });
            }
        });
        let lengthEffects = depsMap.get('length');
        lengthEffects && lengthEffects.forEach(effectFn => {
            if (effectFn !== activeEffect)
                effectsToRun.add(effectFn);
        });
    }
    //执行副作用函数
    effectsToRun.forEach(fn => {
        if (typeof fn.options.schedule === 'function') {
            fn.options.schedule(fn);
        }
        else {
            fn();
        }
    });
    return true;
}
/**
 * 代理对象值，返回响应式数据
 * @param value 对象值
 * @param isShadow true为深代理，false为浅代理
 * @param isReadonly 是否只读
 * @returns T
 */
function reactive(value, isShadow = false, isReadonly = false) {
    const proxy = new Proxy(value, {
        get(target, p, reciver) {
            var _a;
            if (p === source)
                return target;
            //数组原型方法代理
            if (Array.isArray(target) && arrayInstrumentations.hasOwnProperty(p)) {
                return Reflect.get(arrayInstrumentations, p, reciver);
            }
            //Set.Map 访问器属性size代理
            if (target instanceof Map || target instanceof Set) {
                if (mutableInstrumentations.hasOwnProperty(p))
                    return Reflect.get(mutableInstrumentations, p, reciver);
                if (p === 'size')
                    track(target, ITERATE_KEY);
                return Reflect.get(target, p, target);
            }
            //只读对象或者key为symbol时不进行追踪
            if (!isReadonly && typeof p !== 'symbol')
                track(target, p);
            const res = Reflect.get(target, p, reciver);
            //浅代理模式直接返回原始值
            if (isShadow)
                return res;
            //非浅代理模式，如果原始值不是基本类型进行响应式包装
            if (typeof res === 'object' && res != null) {
                const existionProxy = (_a = reactiveMap.get(res)) === null || _a === void 0 ? void 0 : _a.value;
                if (existionProxy)
                    return existionProxy;
                return reactive(res, isShadow, isReadonly);
            }
            //否则返回基本类型值
            return res;
        },
        has(target, p) {
            if (!isReadonly)
                track(target, p);
            return Reflect.has(target, p);
        },
        ownKeys(target) {
            if (!isReadonly)
                track(target, Array.isArray(target) ? 'length' : ITERATE_KEY);
            return Reflect.ownKeys(target);
        },
        deleteProperty(target, p) {
            if (isReadonly) {
                console.log(target, `对象是只读的`);
                return false;
            }
            //判断变量是否不处于对象原型上
            const hadKey = Object.prototype.hasOwnProperty.call(target, p);
            const res = Reflect.deleteProperty(target, p);
            if (res && hadKey) {
                trigger(target, p, type_1.TriggerType.DELETE);
            }
            return res;
        },
        set(target, p, value, reciver) {
            if (isReadonly) {
                console.log(target, `对象是只读的`);
                return false;
            }
            //取出旧值
            const oldValue = Reflect.get(target, p);
            //判断操作类型
            const type = Array.isArray(target)
                ? Number(p) < target.length ? type_1.TriggerType.SET : type_1.TriggerType.ADD
                : Object.prototype.hasOwnProperty.call(target, p) ? type_1.TriggerType.SET : type_1.TriggerType.ADD;
            //取原始值
            const orgin = toRaw(value);
            //非浅代理时设置原始对象而非响应对象
            const res = Reflect.set(target, p, orgin, reciver);
            if (target === Reflect.get(reciver, source)) {
                if (oldValue !== value && (oldValue === oldValue || value === value)) {
                    trigger(target, p, type, value);
                }
            }
            return res;
        }
    });
    if (typeof value === 'object' && value != null)
        reactiveMap.set(value, {
            value: proxy,
            isShadow,
            isReadonly
        });
    return proxy;
}
exports.reactive = reactive;
/**
 * 代理基本类型值，返回响应式数据
 * @param value 基本类型值
 * @param isReadonly 是否只读
 * @returns { value: T }
 */
function ref(value, isReadonly = false) {
    const wrapper = {
        value
    };
    //定义变量标识对象为Ref对象
    Object.defineProperty(wrapper, '__isRef', {
        value: true
    });
    return reactive({ value }, true, isReadonly);
}
exports.ref = ref;
/**
 * 将响应式对象的某键值转为ref
 * @param val 响应式对象
 * @param key 键值
 * @returns Ref
 */
function toRef(val, key) {
    const wrapper = {
        get value() {
            return val[key];
        },
        set value(value) {
            val[key] = value;
        }
    };
    //定义变量标识对象为Ref对象
    Object.defineProperty(wrapper, '__isRef', {
        value: true
    });
    return wrapper;
}
exports.toRef = toRef;
/**
 * 将响应式对象的键值全部转换为Ref, 可解构使用
 * @param obj 响应式对象
 * @returns
 */
function toRefs(obj) {
    const ret = {};
    for (const key in obj) {
        Reflect.set(ret, key, toRef(obj, key));
    }
    return ret;
}
exports.toRefs = toRefs;
/**
 * 创建副作用函数
 * @param func 函数
 * @param options 配置
 * @returns effectFunc
 */
function effect(func, options = {}) {
    const effectFn = function () {
        (0, util_1.cleanup)(effectFn);
        activeEffect = effectFn;
        effectStack.push(effectFn);
        const res = func();
        effectStack.pop();
        activeEffect = effectStack[effectStack.length - 1];
        return res;
    };
    effectFn.childs = [];
    effectFn.deps = [];
    effectFn.options = options;
    effectFn.shouldTrack = true;
    if (effectStack.length) {
        const parent = effectStack[effectStack.length - 1];
        parent.childs.push(effectFn);
    }
    if (!options.lazy)
        effectFn();
    return effectFn;
}
exports.effect = effect;
/**
 * 获取计算属性
 * @param getter
 * @returns { value: any }
 */
function computed(getter) {
    let value;
    let dirty = true;
    const effectFn = effect(getter, {
        lazy: true,
        schedule() {
            if (!dirty) {
                dirty = true;
                trigger(obj, 'value', type_1.TriggerType.SET, 0);
            }
        }
    });
    const obj = {
        //访问器属性
        get value() {
            if (dirty) {
                value = effectFn();
                dirty = false;
            }
            track(obj, 'value');
            return value;
        }
    };
    return obj;
}
exports.computed = computed;
/**
 * 监听响应式数据
 * @param source 副作用函数或者响应式对象
 * @param cb 数据变化后回调函数
 * @param options 配置
 */
function watch(source, cb, options = {}) {
    let getter;
    if (typeof source === 'function')
        getter = source;
    else
        getter = () => (0, util_1.traverse)(source);
    let oldValue, newValue, cleanup;
    function onInvalidate(fn) {
        cleanup = fn;
    }
    const job = () => {
        newValue = effectFn();
        if (cleanup)
            cleanup();
        cb(oldValue, newValue, onInvalidate);
        oldValue = newValue;
    };
    const effectFn = effect(() => getter(), {
        lazy: true,
        schedule() {
            if (options.flush === 'post') {
                const p = Promise.resolve();
                p.then(job);
            }
            else {
                job();
            }
        }
    });
    if (options.immediate)
        job();
    else
        oldValue = effectFn();
}
exports.watch = watch;
/**
 * 获取原始对象
 */
function toRaw(proxy) {
    return Reflect.get((typeof proxy === 'object' && proxy !== null) ? proxy : {}, source) || proxy;
}
exports.toRaw = toRaw;
