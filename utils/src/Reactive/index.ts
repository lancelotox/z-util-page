/**
 * @category 响应式数据API
 * @module Reactive
 */

import { TriggerType, Instrumentations } from './type';
import { wrapValue, cleanup, traverse } from './util';
import { getType } from '../deepClone/index';

//对象-副作用函数映射关系字典
const bucket = new WeakMap<object, DepsMap>();
//对象-响应式对象字典
const reactiveMap = new Map<object, ReactiveOptions>();
//副作用函数执行栈
const effectStack = new Array<Effect>();
//对象迭代标识
const ITERATE_KEY: symbol = Symbol();
//MapKey迭代标识
const MAP_KEY_ITERATE_KEY: symbol = Symbol();
//取原始对象key
const source: symbol = Symbol();
const wrap = wrapValue.bind({ reactive });

//活动副作用函数
let activeEffect: Effect | null = null;

//数组原型方法代理
const arrayInstrumentations: Instrumentations = {};
(function () {
  //在数组执行查找的原型方法时，在原始对象中进行查找，解决原始值与代理值不一致问题
  ['includes', 'indexOf', 'lastIndexOf'].forEach(method => {
    const originMethod = Reflect.get(Array.prototype, method);
    Reflect.set(arrayInstrumentations, method, function (this: any, ...args: [searchElement: any, fromIndex?: number | undefined]): boolean | number {
      let res: boolean | number = originMethod.apply(this, args);
      if (res === false || res === -1) res = originMethod.apply(Reflect.get(this, source), args);
      return res;
    });
  });

  //在数组执行删除等涉及length属性修改的原型方法时，关闭依赖追踪
  ['pop', 'shift', 'splice'].forEach(method => {
    const originMethod = Reflect.get(Array.prototype, method);
    Reflect.set(arrayInstrumentations, method, function (this: any, ...args: [searchElement: any, fromIndex?: number | undefined]): boolean | number {
      if(activeEffect) activeEffect.shouldTrack = false;
      let res: any = originMethod.apply(this, args);
      if(activeEffect) activeEffect.shouldTrack = true;
      return res;
    });
  });

  //在数组执行增加等涉及length属性修改的原型方法时，关闭依赖追踪
  ['push', 'unshift'].forEach(method => {
    const originMethod = Reflect.get(Array.prototype, method);
    Reflect.set(arrayInstrumentations, method, function (this: any, ...args: Array<any>): boolean | number {
      if(activeEffect) activeEffect.shouldTrack = false;
      let res: any = originMethod.apply(this, args.map((arg) => {
        return toRaw(arg);
      }));
      if(activeEffect) activeEffect.shouldTrack = true;
      return res;
    });
  });
})();

//Set-Map原型方法代理
const mutableInstrumentations: Instrumentations = {};
(function () {
  function iterationMethod(this: any) {
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
        }
      },
      //可迭代协议
      [Symbol.iterator]() {
        return this;
      }
    }
  }
  function valuesIterationMethod(this: any) {
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
        }
      },
      //可迭代协议
      [Symbol.iterator]() {
        return this;
      }
    }
  }
  function keysIterationMethod(this: any) {
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
        }
      },
      //可迭代协议
      [Symbol.iterator]() {
        return this;
      }
    }
  }
  mutableInstrumentations.add = function (this: any, key: any) {
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
    if (!hadkey) trigger(target, orgin, TriggerType.ADD);
    return res;
  }
  mutableInstrumentations.get = function (this: any, key: any) {
    //获取原始对象
    const target = Reflect.get(this, source);
    //是否浅代理、只读
    const { isShadow, isReadonly } = reactiveMap.get(target) || {};
    //取原始值, 避免数据污染
    const orginKey = toRaw(key);
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
  mutableInstrumentations.set = function (this: any, key: any, value: any) {
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
    if (!hadKey) trigger(target, orginKey, TriggerType.ADD);
    else if (oldValue !== orginValue && (oldValue === oldValue || orginValue === orginValue)) {
      trigger(target, orginKey, TriggerType.SET);
    }
    return res;
  }
  mutableInstrumentations.delete = function (this: any, key: any) {
    //获取原始对象
    const target = Reflect.get(this, source);
    //取原始值
    const orgin = toRaw(key);
    //判断值是否已存在
    const hadkey = target.has(orgin);
    const res = target.delete(orgin);
    //当值存在时触发副作用函数
    if (hadkey) trigger(target, orgin, TriggerType.DELETE);
    return res;
  }
  mutableInstrumentations.forEach = function (this: any, cb: Function, thisArg: any) {
    //获取原始对象
    const target = Reflect.get(this, source);
    //与迭代key建立响应
    track(target, ITERATE_KEY);
    //调用原函数
    target.forEach((value: any, key: any) => {
      cb.call(thisArg, wrap(value), wrap(key), this);
    });
  }
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
function track(target: object, p: any): void {
  if (!activeEffect || !activeEffect.shouldTrack) {
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

/**
 * 触发副作用
 * @param target 目标对象
 * @param p 键值
 * @param type 类型
 * @param value 新值
 * @returns 是否成功
 */
function trigger(target: object, p: any, type: TriggerType, value?: any): boolean {
  let depsMap: DepsMap | undefined = bucket.get(target);
  if (!depsMap) {
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
  //type为ADD或者DELETE或为Map类型设置值时，取出迭代相关副作用函数执行
  if (type === TriggerType.ADD || type === TriggerType.DELETE || (type === TriggerType.SET && getType(target) === 'Map')) {
    let iterateEffects = depsMap.get(ITERATE_KEY);
    iterateEffects && iterateEffects.forEach(effectFn => {
      if (effectFn !== activeEffect)
        effectsToRun.add(effectFn);
    });
  }
  //type为ADD或者DELETE且target为Map时，取出迭代相关副作用函数执行
  if ((type === TriggerType.ADD || type === TriggerType.DELETE) && getType(target) === 'Map') {
    let iterateEffects = depsMap.get(MAP_KEY_ITERATE_KEY);
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

export type ReactiveOptions = {
  value: any
  isShadow: boolean
  isReadonly: boolean
}

/**
 * 代理对象值，返回响应式数据
 * @example
 * ```ts
 * const obj = reactive({name:'张三'});
 * obj.name = '李四';
 * console.log(obj.name); //李四
 * ```
 * @param value 对象值
 * @param isShadow true为浅代理，false为深代理
 * @param isReadonly 是否只读
 * @returns { Proxy<T> }
 */
export function reactive<T extends object>(value: T, isShadow = false, isReadonly = false): T {
  const proxy = new Proxy<T>(value, {
    get(target, p, reciver) {
      if (p === source) return target;
      //数组原型方法代理
      if (Array.isArray(target) && arrayInstrumentations.hasOwnProperty(p)) {
        return Reflect.get(arrayInstrumentations, p, reciver);
      }
      //Set.Map 访问器属性size代理
      if (target instanceof Map || target instanceof Set) {
        if (mutableInstrumentations.hasOwnProperty(p)) return Reflect.get(mutableInstrumentations, p, reciver);
        if (p === 'size') track(target, ITERATE_KEY);
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
  if (typeof value === 'object' && value != null) reactiveMap.set(value, {
    value: proxy,
    isShadow,
    isReadonly
  });
  return proxy;
}

// 原始值代理
export interface Ref<T> {
  value: T
}

/**
 * 代理基本类型值，返回响应式数据
 * ```ts
 * const obj = ref(3);
 * obj.value = 4;
 * console.log(obj.value); //4
 * ```
 * @param value 基本类型值
 * @param isReadonly 是否只读
 * @returns { value: T }
 */
export function ref<T>(value: T, isReadonly = false): Ref<T> {
  const wrapper = {
    value
  }
  //定义变量标识对象为Ref对象
  Object.defineProperty(wrapper, '__isRef', {
    value: true
  });
  return reactive<Ref<T>>(wrapper, false, isReadonly);
}

/**
 * 将响应式对象的某键值转为ref
 * @example
 * ```ts
 * const obj = reactive({ a: 1 });
 * const a = toRef(obj, 'a');
 * a.value = 2;
 * console.log(obj.a); //2
 * ```
 * @param val 响应式对象
 * @param key 键值
 * @returns Ref
 */
export function toRef(val: any, key: string | symbol) {
  const wrapper = {
    get value() {
      return val[key];
    },
    set value(value) {
      val[key] = value;
    }
  }
  //定义变量标识对象为Ref对象
  Object.defineProperty(wrapper, '__isRef', {
    value: true
  });
  return wrapper;
}

/**
 * 将响应式对象的键值全部转换为Ref, 可解构使用
 * @example
 * ```ts
 * const obj = reactive({ a: 1, b: 2 });
 * const { a, b } = toRefs(obj);
 * a.value = 2;
 * console.log(obj.a); //2
 * ```
 * @param obj 响应式对象
 * @returns Refs
 */
export function toRefs(obj: any) {
  const ret = {};
  for (const key in obj) {
    Reflect.set(ret, key, toRef(obj, key));
  }
  return ret;
}

export type EffectOptions = {
  schedule?: Function
  lazy?: boolean
  immediate?: boolean
  flush?: 'post' | ''
}
export type DepsMap = Map<string | symbol, Set<Effect>>
export interface Effect {
  (): any
  deps: Array<Set<Effect>>
  childs: Array<Effect>
  options: EffectOptions
  shouldTrack: boolean
}

/**
 * 创建副作用函数
 * @example
 * ```ts
 * const count = ref(0);
 * effect(() => {
 *  console.log(count.value);
 * })
 * count.value = 1;
 * // 打印1
 * ```
 * @param func 函数
 * @param options 配置
 * @returns effectFunc
 */
export function effect(func: Function, options: EffectOptions = {}) {
  const effectFn = <Effect>function () {
    cleanup(effectFn);
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
  if (!options.lazy) effectFn();
  return effectFn;
}

/**
 * 获取计算属性
 * @example
 * ```ts
 * const count = ref(0);
 * const double = computed(() => count.value * 2);
 * console.log(double.value); //0
 * count.value = 1;
 * console.log(double.value); //2
 * ```
 * @param getter 
 * @returns computed
 */
export function computed<T>(getter: () => {
  readonly value: T
}) {
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

export interface watchCallback {
  (oldVal: any, newVal: any, onInvalidate: Function): void
}

/**
 * 监听响应式数据
 * @example
 * ```ts
 * const count = ref(0);
 * watch(count, (newVal, oldVal) => {
 *  console.log(newVal, oldVal);
 * })
 * count.value = 1;
 * // 打印1 0
 * ```
 * @param source 副作用函数或者响应式对象
 * @param cb 数据变化后回调函数
 * @param options 配置
 */
export function watch(source: Function | object, cb: watchCallback, options: EffectOptions = {}) {
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

/**
 * 获取原始对象
 * @example
 * ```ts
 * const count = reactive({ a: 1 });
 * console.log(toRaw(count)); //{ a: 1 }
 * ```
 * @param proxy 响应式对象
 * @returns 原始对象
 */
export function toRaw<T>(proxy: T): T{
  return Reflect.get((typeof proxy === 'object' && proxy !== null) ? proxy : {}, source) || proxy;
}