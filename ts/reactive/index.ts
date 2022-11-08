import { Ref, Effect, DepsMap, EffectOptions, TriggerType, Instrumentations, ReactiveOptions } from './type';
import { getSourceValue } from './util';

//对象-副作用函数映射关系字典
const bucket = new WeakMap<object, DepsMap>();
//对象-响应式对象字典
const reactiveMap = new Map<object, ReactiveOptions>();
//副作用函数执行栈
const effectStack = new Array<Effect>();
//对象迭代统一key
const ITERATE_KEY: symbol = Symbol();
//取原始对象key
const source: symbol = Symbol();
const getSource = getSourceValue.bind({ source });

//活动副作用函数
let activeEffect: Effect | null = null;
//是否进行依赖追踪
let shouldTrack: boolean = true;

//数组原型方法代理
const arrayInstrumentations: Instrumentations = {};
(function(){
    //在数组执行查找的原型方法时，在原始对象中进行查找，解决原始值与代理值不一致问题
    ['includes', 'indexOf', 'lastIndexOf'].forEach(method => {
        const originMethod = Reflect.get(Array.prototype, method);
        Reflect.set(arrayInstrumentations, method, function(this: any, ...args: [searchElement: any, fromIndex?: number | undefined]): boolean | number {
            let res: boolean | number = originMethod.apply(this, args);
            if(res === false || res === -1) res = originMethod.apply(Reflect.get(this, source), args);
            return res;
        });
    });
    
    //在数组执行删除等涉及length属性修改的原型方法时，关闭依赖追踪
    ['pop', 'shift', 'splice'].forEach(method => {
        const originMethod = Reflect.get(Array.prototype, method);
        Reflect.set(arrayInstrumentations, method, function(this: any, ...args: [searchElement: any, fromIndex?: number | undefined]): boolean | number {
            shouldTrack = false;
            let res: any = originMethod.apply(this, args);
            shouldTrack = true;
            return res;
        });
    });

    //在数组执行增加等涉及length属性修改的原型方法时，关闭依赖追踪
    ['push', 'unshift'].forEach(method => {
        const originMethod = Reflect.get(Array.prototype, method);
        Reflect.set(arrayInstrumentations, method, function(this: any, ...args: Array<any>): boolean | number {
            shouldTrack = false;
            let res: any = originMethod.apply(this, args.map((arg)=>{
                return getSource(arg);
            }));
            shouldTrack = true;
            return res;
        });
    });
})();

//Set-Map原型方法代理
const mutableInstrumentations: Instrumentations = {};
(function(){
    mutableInstrumentations.add = function(key: any){
        //获取原始对象
        const target = Reflect.get(this, source);
        //是否只读
        const { isReadonly } = reactiveMap.get(target) || {};
        if (isReadonly) {
            console.log(target, `对象是只读的`);
            return false;
        }
        //取原始值
        const orgin = getSource(key);
        //判断值是否已存在
        const hadkey = target.has(orgin);
        const res = target.add(orgin);
        //当值不存在时触发副作用函数
        if(!hadkey) trigger(target, orgin, TriggerType.ADD);
        return res;
    }
    mutableInstrumentations.get = function(key: any){
        //获取原始对象
        const target = Reflect.get(this, source);
        //是否浅代理、只读
        const { isShadow, isReadonly } = reactiveMap.get(target) || {};
        //取原始值, 避免数据污染
        const orginKey = getSource(key);
        //只读对象或者key为symbol时不进行追踪
        if (!isReadonly) track(target, orginKey);
        const res = target.get(orginKey);
        //浅代理模式直接返回原始值
        if (isShadow) return res;
        //非浅代理模式，如果原始值不是基本类型进行响应式包装
        if (typeof res === 'object' && res != null) {
            const existionProxy = reactiveMap.get(res)?.value;
            if (existionProxy) return existionProxy;
            return reactive(res, isShadow, isReadonly);
        }
        //否则返回基本类型值
        return res;
    }
    mutableInstrumentations.set = function(key: any, value: any){
        //获取原始对象
        const target = Reflect.get(this, source);
        //是否浅代理、只读
        const { isReadonly } = reactiveMap.get(target) || {};
        if (isReadonly) {
            console.log(target, `对象是只读的`);
            return false;
        }
        //取原始值, 避免数据污染
        const orginKey = getSource(key);
        const orginValue = getSource(value);
        //判断是否已存在
        const hadKey = target.has(orginKey);
        //取出旧值
        const oldValue = target.get(orginKey);
        //非浅代理时设置原始对象而非响应对象
        const res = target.set(orginKey, orginValue);
        if(!hadKey) trigger(target, orginKey, TriggerType.ADD);
        else if (oldValue !== orginValue && (oldValue === oldValue || orginValue === orginValue)){
            trigger(target, orginKey, TriggerType.SET);
        } 
        return res;
    }
    mutableInstrumentations.delete = function(key: any){
        //获取原始对象
        const target = Reflect.get(this, source);
        //取原始值
        const orgin = getSource(key);
        //判断值是否已存在
        const hadkey = target.has(orgin);
        const res = target.delete(orgin);
        //当值存在时触发副作用函数
        if(hadkey) trigger(target, orgin, TriggerType.DELETE);
        return res;
    }
})();

function track(target: object, p: any): void {
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

function trigger(target: object, p: any, type: TriggerType, value?: any): boolean {
    let depsMap: DepsMap | undefined = bucket.get(target);
    if (!depsMap){
        return true;
    }
    //取出所有与key直接相关的副作用函数
    let effects: Set<Effect> | undefined = depsMap.get(p);
    //待执行副作用函数队列
    let effectsToRun = new Set<Effect>();
    //排除正在运行的副作用函数
    effects && effects.forEach(effectFn => {
        if (effectFn !== activeEffect)
            effectsToRun.add(effectFn);
    });
    //type为ADD或者DELETE时，取出迭代相关副作用函数执行
    if (type === TriggerType.ADD || type === TriggerType.DELETE) {
        let iterateEffects = depsMap.get(ITERATE_KEY);
        iterateEffects && iterateEffects.forEach(effectFn => {
            if (effectFn !== activeEffect)
                effectsToRun.add(effectFn);
        });
    }
    //type为ADD且target为数组时，取出数组迭代相关副作用函数执行（使用delete删除数组元素不会改变数组长度，故无需触发）
    if (type === TriggerType.ADD && Array.isArray(target)) {
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
        })
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

/**
 * 代理基本类型值，返回响应式数据
 * @param value 基本类型值
 * @param isReadonly 是否只读
 * @returns { value: T }
 */
function ref<T>(value: T, isReadonly = false): Ref<T> {
    return reactive<Ref<T>>({ value }, true, isReadonly);
}

/**
 * 代理对象值，返回响应式数据
 * @param value 对象值
 * @param isShadow true为深代理，false为浅代理
 * @param isReadonly 是否只读
 * @returns T
 */
function reactive<T extends object>(value: T, isShadow = false, isReadonly = false): T {
    const proxy = new Proxy<T>(value, {
        get(target, p, reciver) {
            if (p === source) return target;
            //数组原型方法代理
            if (Array.isArray(target) && arrayInstrumentations.hasOwnProperty(p)){
                return Reflect.get(arrayInstrumentations, p, reciver);
            }
            //Set.Map 访问器属性size代理
            if (target instanceof Map || target instanceof Set) {
                if(mutableInstrumentations.hasOwnProperty(p)) return Reflect.get(mutableInstrumentations, p, reciver);
                if(p === 'size') track(target, ITERATE_KEY);
                return Reflect.get(target, p, target);
            }
            //只读对象或者key为symbol时不进行追踪
            if (!isReadonly && typeof p !== 'symbol') track(target, p);
            const res = Reflect.get(target, p, reciver);
            //浅代理模式直接返回原始值
            if (isShadow) return res;
            //非浅代理模式，如果原始值不是基本类型进行响应式包装
            if (typeof res === 'object' && res != null) {
                const existionProxy = reactiveMap.get(res)?.value;
                if (existionProxy) return existionProxy;
                return reactive(res, isShadow, isReadonly);
            }
            //否则返回基本类型值
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
            //判断变量是否不处于对象原型上
            const hadKey = Object.prototype.hasOwnProperty.call(target, p);
            const res = Reflect.deleteProperty(target, p);
            if (res && hadKey) {
                trigger(target, p, TriggerType.DELETE);
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
                ? Number(p) < target.length ? TriggerType.SET : TriggerType.ADD
                : Object.prototype.hasOwnProperty.call(target, p) ? TriggerType.SET : TriggerType.ADD;
            //取原始值
            const orgin = getSource(value);
            //非浅代理时设置原始对象而非响应对象
            const res = Reflect.set(target, p, orgin, reciver);
            if (target === Reflect.get(reciver, source)) {
                if (oldValue !== value && (oldValue === oldValue || value === value)){
                    trigger(target, p, type, value);
                }   
            }
            return res;
        }
    });
    if (typeof value === 'object' && value != null) reactiveMap.set(value, {
        value: proxy,
        isShadow,
        isReadonly
    });
    return proxy;
}

/**
 * 创建副作用函数
 * @param func 函数
 * @param options 配置
 * @returns effectFunc
 */
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

/**
 * 获取计算属性
 * @param getter 
 * @returns { value: any }
 */
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
        //访问器属性
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

/**
 * 监听响应式数据
 * @param source 副作用函数或者响应式对象
 * @param cb 数据变化后回调函数
 * @param options 配置
 */
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

export {
    ref,
    reactive,
    effect,
    computed,
    watch,
}
