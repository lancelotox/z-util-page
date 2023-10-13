"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toRaw = exports.watch = exports.computed = exports.effect = exports.toRefs = exports.toRef = exports.ref = exports.reactive = void 0;
var type_1 = require("./type");
var util_1 = require("./util");
var index_1 = require("../deepClone/index");
//对象-副作用函数映射关系字典
var bucket = new WeakMap();
//对象-响应式对象字典
var reactiveMap = new Map();
//副作用函数执行栈
var effectStack = new Array();
//对象迭代标识
var ITERATE_KEY = Symbol();
//MapKey迭代标识
var MAP_KEY_ITERATE_KEY = Symbol();
//取原始对象key
var source = Symbol();
var wrap = util_1.wrapValue.bind({ reactive: reactive });
//活动副作用函数
var activeEffect = null;
//数组原型方法代理
var arrayInstrumentations = {};
(function () {
    //在数组执行查找的原型方法时，在原始对象中进行查找，解决原始值与代理值不一致问题
    ['includes', 'indexOf', 'lastIndexOf'].forEach(function (method) {
        var originMethod = Reflect.get(Array.prototype, method);
        Reflect.set(arrayInstrumentations, method, function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var res = originMethod.apply(this, args);
            if (res === false || res === -1)
                res = originMethod.apply(Reflect.get(this, source), args);
            return res;
        });
    });
    //在数组执行删除等涉及length属性修改的原型方法时，关闭依赖追踪
    ['pop', 'shift', 'splice'].forEach(function (method) {
        var originMethod = Reflect.get(Array.prototype, method);
        Reflect.set(arrayInstrumentations, method, function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            if (activeEffect)
                activeEffect.shouldTrack = false;
            var res = originMethod.apply(this, args);
            if (activeEffect)
                activeEffect.shouldTrack = true;
            return res;
        });
    });
    //在数组执行增加等涉及length属性修改的原型方法时，关闭依赖追踪
    ['push', 'unshift'].forEach(function (method) {
        var originMethod = Reflect.get(Array.prototype, method);
        Reflect.set(arrayInstrumentations, method, function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            if (activeEffect)
                activeEffect.shouldTrack = false;
            var res = originMethod.apply(this, args.map(function (arg) {
                return toRaw(arg);
            }));
            if (activeEffect)
                activeEffect.shouldTrack = true;
            return res;
        });
    });
})();
//Set-Map原型方法代理
var mutableInstrumentations = {};
(function () {
    function iterationMethod() {
        var _a;
        //获取原始对象
        var target = Reflect.get(this, source);
        //获取迭代器对象
        var itr = target[Symbol.iterator]();
        //建立响应
        track(target, ITERATE_KEY);
        //返回自定义迭代器
        return _a = {
                //迭代器协议
                next: function () {
                    //获取原始数据
                    var _a = itr.next(), value = _a.value, done = _a.done;
                    return {
                        value: value ? [wrap(value[0]), wrap(value[1])] : value,
                        done: done
                    };
                }
            },
            //可迭代协议
            _a[Symbol.iterator] = function () {
                return this;
            },
            _a;
    }
    function valuesIterationMethod() {
        var _a;
        //获取原始对象
        var target = Reflect.get(this, source);
        //获取迭代器对象
        var itr = target.values();
        //建立响应
        track(target, ITERATE_KEY);
        //返回自定义迭代器
        return _a = {
                //迭代器协议
                next: function () {
                    //获取原始数据
                    var _a = itr.next(), value = _a.value, done = _a.done;
                    return {
                        value: wrap(value),
                        done: done
                    };
                }
            },
            //可迭代协议
            _a[Symbol.iterator] = function () {
                return this;
            },
            _a;
    }
    function keysIterationMethod() {
        var _a;
        //获取原始对象
        var target = Reflect.get(this, source);
        //获取迭代器对象
        var itr = target.keys();
        //建立响应
        track(target, MAP_KEY_ITERATE_KEY);
        //返回自定义迭代器
        return _a = {
                //迭代器协议
                next: function () {
                    //获取原始数据
                    var _a = itr.next(), value = _a.value, done = _a.done;
                    return {
                        value: wrap(value),
                        done: done
                    };
                }
            },
            //可迭代协议
            _a[Symbol.iterator] = function () {
                return this;
            },
            _a;
    }
    mutableInstrumentations.add = function (key) {
        //获取原始对象
        var target = Reflect.get(this, source);
        //是否只读
        var isReadonly = (reactiveMap.get(target) || {}).isReadonly;
        if (isReadonly) {
            console.log(target, "\u5BF9\u8C61\u662F\u53EA\u8BFB\u7684");
            return false;
        }
        //取原始值
        var orgin = toRaw(key);
        //判断值是否已存在
        var hadkey = target.has(orgin);
        var res = target.add(orgin);
        //当值不存在时触发副作用函数
        if (!hadkey)
            trigger(target, orgin, type_1.TriggerType.ADD);
        return res;
    };
    mutableInstrumentations.get = function (key) {
        var _a;
        //获取原始对象
        var target = Reflect.get(this, source);
        //是否浅代理、只读
        var _b = reactiveMap.get(target) || {}, isShadow = _b.isShadow, isReadonly = _b.isReadonly;
        //取原始值, 避免数据污染
        var orginKey = toRaw(key);
        //只读对象或者key为symbol时不进行追踪
        if (!isReadonly)
            track(target, orginKey);
        var res = target.get(orginKey);
        //浅代理模式直接返回原始值
        if (isShadow)
            return res;
        //非浅代理模式，如果原始值不是基本类型进行响应式包装
        if (typeof res === 'object' && res != null) {
            var existionProxy = (_a = reactiveMap.get(res)) === null || _a === void 0 ? void 0 : _a.value;
            if (existionProxy)
                return existionProxy;
            return reactive(res, isShadow, isReadonly);
        }
        //否则返回基本类型值
        return res;
    };
    mutableInstrumentations.set = function (key, value) {
        //获取原始对象
        var target = Reflect.get(this, source);
        //是否浅代理、只读
        var isReadonly = (reactiveMap.get(target) || {}).isReadonly;
        if (isReadonly) {
            console.log(target, "\u5BF9\u8C61\u662F\u53EA\u8BFB\u7684");
            return false;
        }
        //取原始值, 避免数据污染
        var orginKey = toRaw(key);
        var orginValue = toRaw(value);
        //判断是否已存在
        var hadKey = target.has(orginKey);
        //取出旧值
        var oldValue = target.get(orginKey);
        //非浅代理时设置原始对象而非响应对象
        var res = target.set(orginKey, orginValue);
        if (!hadKey)
            trigger(target, orginKey, type_1.TriggerType.ADD);
        else if (oldValue !== orginValue && (oldValue === oldValue || orginValue === orginValue)) {
            trigger(target, orginKey, type_1.TriggerType.SET);
        }
        return res;
    };
    mutableInstrumentations.delete = function (key) {
        //获取原始对象
        var target = Reflect.get(this, source);
        //取原始值
        var orgin = toRaw(key);
        //判断值是否已存在
        var hadkey = target.has(orgin);
        var res = target.delete(orgin);
        //当值存在时触发副作用函数
        if (hadkey)
            trigger(target, orgin, type_1.TriggerType.DELETE);
        return res;
    };
    mutableInstrumentations.forEach = function (cb, thisArg) {
        var _this = this;
        //获取原始对象
        var target = Reflect.get(this, source);
        //与迭代key建立响应
        track(target, ITERATE_KEY);
        //调用原函数
        target.forEach(function (value, key) {
            cb.call(thisArg, wrap(value), wrap(key), _this);
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
    var depsMap = bucket.get(target);
    if (!depsMap) {
        bucket.set(target, (depsMap = new Map()));
    }
    var deps = depsMap.get(p);
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
    var depsMap = bucket.get(target);
    if (!depsMap) {
        return true;
    }
    //取出所有与key直接相关的副作用函数
    var effects = depsMap.get(p);
    //待执行副作用函数队列
    var effectsToRun = new Set();
    //排除正在运行的副作用函数
    effects && effects.forEach(function (effectFn) {
        if (effectFn !== activeEffect)
            effectsToRun.add(effectFn);
    });
    //type为ADD或者DELETE或为Map类型设置值时，取出迭代相关副作用函数执行
    if (type === type_1.TriggerType.ADD || type === type_1.TriggerType.DELETE || (type === type_1.TriggerType.SET && (0, index_1.getType)(target) === 'Map')) {
        var iterateEffects = depsMap.get(ITERATE_KEY);
        iterateEffects && iterateEffects.forEach(function (effectFn) {
            if (effectFn !== activeEffect)
                effectsToRun.add(effectFn);
        });
    }
    //type为ADD或者DELETE且target为Map时，取出迭代相关副作用函数执行
    if ((type === type_1.TriggerType.ADD || type === type_1.TriggerType.DELETE) && (0, index_1.getType)(target) === 'Map') {
        var iterateEffects = depsMap.get(MAP_KEY_ITERATE_KEY);
        iterateEffects && iterateEffects.forEach(function (effectFn) {
            if (effectFn !== activeEffect)
                effectsToRun.add(effectFn);
        });
    }
    //type为ADD且target为数组时，取出数组迭代相关副作用函数执行（使用delete删除数组元素不会改变数组长度，故无需触发）
    if (type === type_1.TriggerType.ADD && Array.isArray(target)) {
        var lengthEffects = depsMap.get('length');
        lengthEffects && lengthEffects.forEach(function (effectFn) {
            if (effectFn !== activeEffect)
                effectsToRun.add(effectFn);
        });
    }
    //target为数组且直接操作数组length属性时，取出大于新length值的副作用函数执行
    if (Array.isArray(target) && p === 'length') {
        depsMap.forEach(function (effects, key) {
            if (Number(key) >= Number(value)) {
                effects.forEach(function (effectFn) {
                    if (effectFn !== activeEffect)
                        effectsToRun.add(effectFn);
                });
            }
        });
        var lengthEffects = depsMap.get('length');
        lengthEffects && lengthEffects.forEach(function (effectFn) {
            if (effectFn !== activeEffect)
                effectsToRun.add(effectFn);
        });
    }
    //执行副作用函数
    effectsToRun.forEach(function (fn) {
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
function reactive(value, isShadow, isReadonly) {
    if (isShadow === void 0) { isShadow = false; }
    if (isReadonly === void 0) { isReadonly = false; }
    var proxy = new Proxy(value, {
        get: function (target, p, reciver) {
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
            var res = Reflect.get(target, p, reciver);
            //浅代理模式直接返回原始值
            if (isShadow)
                return res;
            //非浅代理模式，如果原始值不是基本类型进行响应式包装
            if (typeof res === 'object' && res != null) {
                var existionProxy = (_a = reactiveMap.get(res)) === null || _a === void 0 ? void 0 : _a.value;
                if (existionProxy)
                    return existionProxy;
                return reactive(res, isShadow, isReadonly);
            }
            //否则返回基本类型值
            return res;
        },
        has: function (target, p) {
            if (!isReadonly)
                track(target, p);
            return Reflect.has(target, p);
        },
        ownKeys: function (target) {
            if (!isReadonly)
                track(target, Array.isArray(target) ? 'length' : ITERATE_KEY);
            return Reflect.ownKeys(target);
        },
        deleteProperty: function (target, p) {
            if (isReadonly) {
                console.log(target, "\u5BF9\u8C61\u662F\u53EA\u8BFB\u7684");
                return false;
            }
            //判断变量是否不处于对象原型上
            var hadKey = Object.prototype.hasOwnProperty.call(target, p);
            var res = Reflect.deleteProperty(target, p);
            if (res && hadKey) {
                trigger(target, p, type_1.TriggerType.DELETE);
            }
            return res;
        },
        set: function (target, p, value, reciver) {
            if (isReadonly) {
                console.log(target, "\u5BF9\u8C61\u662F\u53EA\u8BFB\u7684");
                return false;
            }
            //取出旧值
            var oldValue = Reflect.get(target, p);
            //判断操作类型
            var type = Array.isArray(target)
                ? Number(p) < target.length ? type_1.TriggerType.SET : type_1.TriggerType.ADD
                : Object.prototype.hasOwnProperty.call(target, p) ? type_1.TriggerType.SET : type_1.TriggerType.ADD;
            //取原始值
            var orgin = toRaw(value);
            //非浅代理时设置原始对象而非响应对象
            var res = Reflect.set(target, p, orgin, reciver);
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
            isShadow: isShadow,
            isReadonly: isReadonly
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
function ref(value, isReadonly) {
    if (isReadonly === void 0) { isReadonly = false; }
    var wrapper = {
        value: value
    };
    //定义变量标识对象为Ref对象
    Object.defineProperty(wrapper, '__isRef', {
        value: true
    });
    return reactive({ value: value }, true, isReadonly);
}
exports.ref = ref;
/**
 * 将响应式对象的某键值转为ref
 * @param val 响应式对象
 * @param key 键值
 * @returns Ref
 */
function toRef(val, key) {
    var wrapper = {
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
    var ret = {};
    for (var key in obj) {
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
function effect(func, options) {
    if (options === void 0) { options = {}; }
    var effectFn = function () {
        (0, util_1.cleanup)(effectFn);
        activeEffect = effectFn;
        effectStack.push(effectFn);
        var res = func();
        effectStack.pop();
        activeEffect = effectStack[effectStack.length - 1];
        return res;
    };
    effectFn.childs = [];
    effectFn.deps = [];
    effectFn.options = options;
    effectFn.shouldTrack = true;
    if (effectStack.length) {
        var parent_1 = effectStack[effectStack.length - 1];
        parent_1.childs.push(effectFn);
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
    var value;
    var dirty = true;
    var effectFn = effect(getter, {
        lazy: true,
        schedule: function () {
            if (!dirty) {
                dirty = true;
                trigger(obj, 'value', type_1.TriggerType.SET, 0);
            }
        }
    });
    var obj = {
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
function watch(source, cb, options) {
    if (options === void 0) { options = {}; }
    var getter;
    if (typeof source === 'function')
        getter = source;
    else
        getter = function () { return (0, util_1.traverse)(source); };
    var oldValue, newValue, cleanup;
    function onInvalidate(fn) {
        cleanup = fn;
    }
    var job = function () {
        newValue = effectFn();
        if (cleanup)
            cleanup();
        cb(oldValue, newValue, onInvalidate);
        oldValue = newValue;
    };
    var effectFn = effect(function () { return getter(); }, {
        lazy: true,
        schedule: function () {
            if (options.flush === 'post') {
                var p = Promise.resolve();
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
