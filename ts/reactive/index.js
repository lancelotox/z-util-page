"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var bucket = new WeakMap();
var reactiveMap = new Map();
var effectStack = new Array();
var ITERATE_KEY = Symbol();
var source = Symbol();
var activeEffect = null;
var shouldTrack = true;
var TriggerType;

(function (TriggerType) {
  TriggerType[TriggerType["SET"] = 0] = "SET";
  TriggerType[TriggerType["ADD"] = 1] = "ADD";
  TriggerType[TriggerType["DELETE"] = 2] = "DELETE";
})(TriggerType || (TriggerType = {}));

var arrayInstrumentations = {};
['includes', 'indexOf', 'lastIndexOf'].forEach(function (method) {
  var originMethod = Reflect.get(Array.prototype, method);
  Reflect.set(arrayInstrumentations, method, function () {
    var args = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }

    var res = originMethod.apply(this, args);
    if (res === false || res === -1) res = originMethod.apply(Reflect.get(this, source), args);
    return res;
  });
});
['push', 'pop', 'shift', 'unshift', 'splice'].forEach(function (method) {
  var originMethod = Reflect.get(Array.prototype, method);
  Reflect.set(arrayInstrumentations, method, function () {
    var args = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }

    shouldTrack = false;
    var res = originMethod.apply(this, args);
    shouldTrack = true;
    return res;
  });
});

function track(target, p) {
  if (!activeEffect || !shouldTrack) {
    return;
  }

  var depsMap = bucket.get(target);

  if (!depsMap) {
    bucket.set(target, depsMap = new Map());
  }

  var deps = depsMap.get(p);

  if (!deps) {
    depsMap.set(p, deps = new Set());
  }

  deps.add(activeEffect);
  activeEffect.deps.push(deps);
}

function trigger(target, p, type, value) {
  var depsMap = bucket.get(target);

  if (!depsMap) {
    return true;
  }

  var effects = depsMap.get(p);
  var effectsToRun = new Set();
  effects && effects.forEach(function (effectFn) {
    if (effectFn !== activeEffect) effectsToRun.add(effectFn);
  });

  if (type === TriggerType.ADD || type === TriggerType.DELETE) {
    var iterateEffects = depsMap.get(ITERATE_KEY);
    iterateEffects && iterateEffects.forEach(function (effectFn) {
      if (effectFn !== activeEffect) effectsToRun.add(effectFn);
    });
  }

  if (type === TriggerType.ADD && Array.isArray(target)) {
    var lengthEffects = depsMap.get('length');
    lengthEffects && lengthEffects.forEach(function (effectFn) {
      if (effectFn !== activeEffect) effectsToRun.add(effectFn);
    });
  }

  if (Array.isArray(target) && p === 'length') {
    depsMap.forEach(function (effects, key) {
      if (Number(key) >= Number(value)) {
        effects.forEach(function (effectFn) {
          if (effectFn !== activeEffect) effectsToRun.add(effectFn);
        });
      }
    });
    var lengthEffects = depsMap.get('length');
    lengthEffects && lengthEffects.forEach(function (effectFn) {
      if (effectFn !== activeEffect) effectsToRun.add(effectFn);
    });
  }

  effectsToRun.forEach(function (fn) {
    if (typeof fn.options.schedule === 'function') {
      fn.options.schedule(fn);
    } else {
      fn();
    }
  });
  return true;
}

function cleanup(effectFn) {
  effectFn.deps.forEach(function (deps) {
    deps.delete(effectFn);
  });
  effectFn.deps.length = 0;
}

function ref(value, isReadonly) {
  if (isReadonly === void 0) {
    isReadonly = false;
  }

  return reactive({
    value: value
  }, true, isReadonly);
}

function reactive(value, isShadow, isReadonly) {
  if (isShadow === void 0) {
    isShadow = false;
  }

  if (isReadonly === void 0) {
    isReadonly = false;
  }

  return new Proxy(value, {
    get: function (target, p, reciver) {
      if (p === source) return target;

      if (Array.isArray(target) && arrayInstrumentations.hasOwnProperty(p)) {
        return Reflect.get(arrayInstrumentations, p, reciver);
      }

      if (!isReadonly && typeof p !== 'symbol') track(target, p);
      var res = Reflect.get(target, p, reciver);
      if (isShadow) return res;

      if (typeof res === 'object' && res != null) {
        var existionProxy = reactiveMap.get(res);
        if (existionProxy) return existionProxy;
        var proxy = reactive(res, isShadow, isReadonly);
        reactiveMap.set(res, proxy);
        return proxy;
      }

      return res;
    },
    has: function (target, p) {
      if (!isReadonly) track(target, p);
      return Reflect.has(target, p);
    },
    ownKeys: function (target) {
      if (!isReadonly) track(target, Array.isArray(target) ? 'length' : ITERATE_KEY);
      return Reflect.ownKeys(target);
    },
    deleteProperty: function (target, p) {
      if (isReadonly) {
        console.log(target, "\u5BF9\u8C61\u662F\u53EA\u8BFB\u7684");
        return false;
      }

      var hadKey = Object.prototype.hasOwnProperty.call(target, p);
      var res = Reflect.deleteProperty(target, p);

      if (res && hadKey) {
        trigger(target, p, TriggerType.DELETE, 0);
      }

      return true;
    },
    set: function (target, p, value, reciver) {
      if (isReadonly) {
        console.log(target, "\u5BF9\u8C61\u662F\u53EA\u8BFB\u7684");
        return false;
      }

      var oldValue = Reflect.get(target, p);
      var type = Array.isArray(target) ? Number(p) < target.length ? TriggerType.SET : TriggerType.ADD : Object.prototype.hasOwnProperty.call(target, p) ? TriggerType.SET : TriggerType.ADD;
      var res = Reflect.set(target, p, value, reciver);

      if (target === reciver[source]) {
        if (oldValue !== value && (oldValue === oldValue || value === value)) {
          trigger(target, p, type, value);
        }
      }

      return true;
    }
  });
}

function effect(func, options) {
  if (options === void 0) {
    options = {};
  }

  var effectFn = function () {
    cleanup(effectFn);
    activeEffect = effectFn;
    effectStack.push(effectFn);
    var res = func();
    effectStack.pop();
    activeEffect = effectStack[effectStack.length - 1];
    return res;
  };

  effectFn.deps = [];
  effectFn.options = options;
  if (!options.lazy) effectFn();
  return effectFn;
}

function computed(getter) {
  var value;
  var dirty = true;
  var effectFn = effect(getter, {
    lazy: true,
    schedule: function () {
      if (!dirty) {
        dirty = true;
        trigger(obj, 'value', TriggerType.SET, 0);
      }
    }
  });
  var obj = {
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

function traverse(value, seen) {
  if (seen === void 0) {
    seen = new Set();
  }

  if (typeof value !== 'object' || value === null || seen.has(value)) return;
  seen.add(value);

  for (var k in value) {
    traverse(value[k], seen);
  }

  return value;
}

function watch(source, cb, options) {
  if (options === void 0) {
    options = {};
  }

  var getter;
  if (typeof source === 'function') getter = source;else getter = function () {
    return traverse(source);
  };
  var oldValue, newValue, cleanup;

  function onInvalidate(fn) {
    cleanup = fn;
  }

  var job = function () {
    newValue = effectFn();
    if (cleanup) cleanup();
    cb(oldValue, newValue, onInvalidate);
    oldValue = newValue;
  };

  var effectFn = effect(function () {
    return getter();
  }, {
    lazy: true,
    schedule: function () {
      if (options.flush === 'post') {
        var p = Promise.resolve();
        p.then(job);
      } else {
        job();
      }
    }
  });
  if (options.immediate) job();else oldValue = effectFn();
}

exports.default = {
  ref: ref,
  reactive: reactive,
  effect: effect,
  computed: computed,
  watch: watch
};