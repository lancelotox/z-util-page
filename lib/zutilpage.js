/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  var desc = Object.getOwnPropertyDescriptor(m, k);

  if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
    desc = {
      enumerable: true,
      get: function () {
        return m[k];
      }
    };
  }

  Object.defineProperty(o, k2, desc);
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});

var __setModuleDefault = this && this.__setModuleDefault || (Object.create ? function (o, v) {
  Object.defineProperty(o, "default", {
    enumerable: true,
    value: v
  });
} : function (o, v) {
  o["default"] = v;
});

var __importStar = this && this.__importStar || function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);

  __setModuleDefault(result, mod);

  return result;
};

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.Reactive = exports.FileHelper = exports.Http = exports.generateUUID = exports.getType = exports.parseUrl = exports.deepClone = exports.throttle = exports.debounce = void 0;

const index_1 = __importDefault(__webpack_require__(1));

exports.debounce = index_1.default;

const index_2 = __importDefault(__webpack_require__(2));

exports.throttle = index_2.default;

const index_3 = __webpack_require__(3);

Object.defineProperty(exports, "deepClone", ({
  enumerable: true,
  get: function () {
    return index_3.deepClone;
  }
}));
Object.defineProperty(exports, "getType", ({
  enumerable: true,
  get: function () {
    return index_3.getType;
  }
}));

const index_4 = __importDefault(__webpack_require__(4));

exports.parseUrl = index_4.default;

const index_5 = __importDefault(__webpack_require__(5));

exports.generateUUID = index_5.default;

const FileHelper = __importStar(__webpack_require__(6));

exports.FileHelper = FileHelper;

const index_6 = __importDefault(__webpack_require__(8));

exports.Http = index_6.default;

const Reactive = __importStar(__webpack_require__(10));

exports.Reactive = Reactive;

/***/ }),
/* 1 */
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
/**
 * 函数防抖
 * @param func 待处理函数
 * @param wait 函数执行延迟时间
 * @param immediatel 是否立刻执行
 */

function debounce(func, wait, immediatel) {
  let timeout,
      content,
      args,
      callbacks = [],
      res;

  const debounced = function (...args) {
    content = this;

    if (immediatel && !timeout) {
      res = func.apply(content, args);
      let resolvedRes = res;
      callbacks.forEach(function (callback) {
        if (callback instanceof Function) resolvedRes = callback(resolvedRes);
      });
    }

    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(function () {
      func.apply(content, args);
      timeout = null;
    }, wait);
    return res;
  };

  debounced.cancel = function () {
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
  };

  debounced.then = function (callback) {
    callbacks.push(callback);
    return this;
  };

  return debounced;
}

exports["default"] = debounce;

/***/ }),
/* 2 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));

const index_1 = __webpack_require__(3);

const defaultConfig = {
  leading: true,
  trailing: false
};
/**
 * 函数节流
 * @param func 待处理函数
 * @param wait 函数执行最短间隔时间
 * @param option.leading 首次是否执行
 * @param option.trailing 结束是否执行
 */

function throttle(func, wait, option) {
  let options = Object.assign((0, index_1.deepClone)(defaultConfig), option || {});
  if (options.leading === false && options.trailing === false) throw 'leading, trailing不能同时为false';
  let timeout = null,
      args,
      content,
      res;

  const throttled = function (...argList) {
    args = argList;
    content = this;

    if (!timeout) {
      timeout = setTimeout(function () {
        timeout = null;
        if (options.trailing) func.apply(content, args);
      }, wait);
      if (options.leading) res = func.apply(content, args);
    }

    return res;
  };

  throttled.cancel = function () {
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
  };

  return throttled;
}

exports["default"] = throttle;

/***/ }),
/* 3 */
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.getType = exports.deepClone = void 0;
/**
 * 深拷贝
 * @param value 待克隆值
 */

let cacheMap = new WeakMap();
const typeHandleMap = {
  'Object': function (value) {
    let cloneTarget = new value.constructor();
    forEach(Object.keys(value), function (val, key) {
      cloneTarget[val] = deepClone(value[val]);
    });
    return cloneTarget;
  },
  'Array': function (value) {
    let cloneTarget = [];
    forEach(value, function (val, key) {
      cloneTarget[key] = deepClone(value[key]);
    });
    return cloneTarget;
  },
  'Set': function (value) {
    let cloneTarget = new value.constructor();
    value.forEach(function (val) {
      cloneTarget.add(deepClone(val));
    });
    return cloneTarget;
  },
  'Map': function (value) {
    let cloneTarget = new value.constructor();
    value.forEach(function (val, key) {
      cloneTarget.set(deepClone(key), deepClone(val));
    });
    return cloneTarget;
  },
  'Symbol': function (value) {
    return Object(Symbol.prototype.valueOf.call(value));
  },
  'HTMLElement': function (value) {
    return value.cloneNode(true);
  },
  'Error': function (value) {
    return new value.constructor(value.message);
  }
};
const baseTypeList = ['boolean', 'number', 'string', 'undefined', "function", "symbol", 'Null', "Math", "Json", "Global"];
const simpleTypeList = ["Boolean", "Number", 'String', 'Date', "Regexp"];

function deepClone(value) {
  let type = typeof value;
  if (type === 'object') type = getType(value);
  if (value instanceof HTMLElement) type = 'HTMLElement';
  if (baseTypeList.includes(type)) return value;else if (simpleTypeList.includes(type)) return new value.constructor(value);
  let cloneTarget = cacheMap.get(value);

  if (cloneTarget === undefined) {
    let handle = typeHandleMap[type];
    if (handle) cloneTarget = handle(value);else cloneTarget = value;
    cacheMap.set(value, cloneTarget);
  }

  clear();
  return cloneTarget;
}

exports.deepClone = deepClone;
/**
 * 清理缓存
 */

let isFlush = false;

function clear() {
  if (!isFlush) {
    isFlush = true;
    let promise = Promise.resolve();
    promise.then(function () {
      cacheMap = new WeakMap();
    });
    promise.finally(function () {
      isFlush = false;
    });
  }
}
/**
 * while循环
 * @param list 待循环列表
 * @param handle 循环行为
 */


function forEach(list, handle) {
  let index = -1;
  let length = list.length;

  while (++index < length) {
    handle(list[index], index);
  }
}
/**
 * 获取数据类型
 * @param value
 * @returns 类型字符串, 'String'、'Map'
 */


function getType(value) {
  try {
    return Object.prototype.toString.call(value).match(/\[.+\s(.+)\]/)[1];
  } catch (e) {
    throw e;
  }
}

exports.getType = getType;

/***/ }),
/* 4 */
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
/**
 * 解析统一资源定位符
 * @param url 统一资源定位符
 * @returns URLWithParam
 */

function parseUrl(url) {
  let Url = null;
  const param = {};

  try {
    const temp = new URL(url);
    Url = {
      hash: temp.hash,
      host: temp.host,
      hostname: temp.hostname,
      href: temp.href,
      origin: temp.origin,
      password: temp.password,
      pathname: temp.pathname,
      port: temp.port,
      protocol: temp.protocol,
      search: temp.search,
      username: temp.username,
      searchParams: param
    };
  } catch (error) {
    console.log(error);
  }

  if (Url === null) return null;
  const search = Url.search.slice(1);
  const paramList = search.split('&').map(item => item.split('='));
  paramList.forEach(item => {
    param[item[0]] = item[1];
  });
  return Url;
}

exports["default"] = parseUrl;

/***/ }),
/* 5 */
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
/**
 * 生成UUID4
 * @param length 生成uuid的总长度，不传递则按照rfc4122标准生成uuid
 * @param radix uuid每个字符的基数 1-62
 * @returns uuid字符串
 */

function generateUUID(length, radix) {
  let chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  let uuid = [];
  radix = radix || chars.length;

  if (length) {
    for (let i = 0; i < length; i++) uuid[i] = chars[0 | Math.random() * radix];
  } else {
    let r;
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
    uuid[14] = '4';

    for (let i = 0; i < 36; i++) {
      if (!uuid[i]) {
        r = 0 | Math.random() * 16;
        uuid[i] = chars[i == 19 ? r & 0x3 | 0x8 : r];
      }
    }
  }

  return uuid.join('');
}

exports["default"] = generateUUID;

/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.choose = exports.read = exports.write = void 0;

const index_1 = __webpack_require__(7);
/**
 * H5文件下载方法
 * @param url 资源链接或者blob对象
 * @param saveFileName 保存文件名
 */


function saveFile(file, saveFileName = '') {
  let url = '';

  if (typeof file === 'string') {
    url = file;
  } else {
    try {
      url = URL.createObjectURL(file);
    } catch (error) {
      console.log(error);
    }
  }

  let alink = document.createElement('a');
  alink.href = url;
  alink.download = saveFileName || '';
  alink.style.display = 'none';
  alink.target = "_blank";
  document.body.appendChild(alink);
  (0, index_1.clickElement)(alink);
  document.body.removeChild(alink);
}

exports.write = saveFile;

class FileReaderDecorate {
  constructor(file) {
    this.reader = new FileReader();
    this.file = file;
  } //读取操作发生中断时触发


  abort(fun) {
    this.reader.addEventListener('abort', () => {
      fun(this.reader);
    });
    return this;
  } //读取操作发生错误时触发。


  error(fun) {
    this.reader.addEventListener('error', () => {
      fun(this.reader.error);
    });
    return this;
  } //读取操作完成时触发。


  load(fun) {
    this.reader.addEventListener('load', () => {
      fun(this.reader);
    });
    return this;
  } //读取操作开始时触发。


  loadstart(fun) {
    this.reader.addEventListener('loadstart', () => {
      fun(this.reader);
    });
    return this;
  } //读取操作结束时（要么成功，要么失败）触发。


  loadend(fun) {
    this.reader.addEventListener('loadend', () => {
      fun(this.reader.result);
    });
    return this;
  } //在读取Blob时触发。


  progress(fun) {
    this.reader.addEventListener('progress', () => {
      fun(this.reader);
    });
    return this;
  }

  getStatus() {
    return this.reader.readyState;
  }

  getResult() {
    return this.reader.result;
  }

  start(type) {
    try {
      Reflect.get(this.reader, "readAs" + type).call(this.reader, this.file);
    } catch (error) {
      console.error(error);
    }

    return this;
  }

  stop() {
    this.reader.abort();
    return this;
  }

}

function readFile(file) {
  return new FileReaderDecorate(file);
}

exports.read = readFile;

function chooseFile(callback, options = {}) {
  const input = document.createElement('input');
  input.setAttribute('type', 'file');
  input.setAttribute('accept', (options.accept || []).join(','));
  input.setAttribute('capture', options.capture || '');
  if (options.multiple) input.setAttribute('multiple', 'true');
  input.addEventListener('change', function (e) {
    callback(input.files);
  });
  (0, index_1.clickElement)(input);
}

exports.choose = chooseFile;

/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.clickElement = void 0;
/**
 * 触发dom对象点击事件
 * @param el dom对象
 */

function clickElement(el) {
  if (el.click && el.click instanceof Function) el.click();else if (window.MouseEvent) {
    el.dispatchEvent(new MouseEvent('click'));
  } else {
    let event = document.createEvent('MouseEvents');
    event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    el.dispatchEvent(event);
  }
}

exports.clickElement = clickElement;

/***/ }),
/* 8 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  var desc = Object.getOwnPropertyDescriptor(m, k);

  if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
    desc = {
      enumerable: true,
      get: function () {
        return m[k];
      }
    };
  }

  Object.defineProperty(o, k2, desc);
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});

var __setModuleDefault = this && this.__setModuleDefault || (Object.create ? function (o, v) {
  Object.defineProperty(o, "default", {
    enumerable: true,
    value: v
  });
} : function (o, v) {
  o["default"] = v;
});

var __importStar = this && this.__importStar || function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);

  __setModuleDefault(result, mod);

  return result;
};

Object.defineProperty(exports, "__esModule", ({
  value: true
}));

const index_1 = __webpack_require__(3);

const FileHelper = __importStar(__webpack_require__(6));

const message_1 = __webpack_require__(9);

class Http {
  constructor(options = {}) {
    this.options = {
      timeout: 10000,
      baseUrl: '',
      contentType: '',
      responseType: ''
    };
    Object.assign(this.options, options);
  }
  /**
   * //XMLHttpRequest异步请求
   * @param param
   * @returns
   */


  ajax(param) {
    const xhr = new XMLHttpRequest();
    submit.call(this, xhr, param);
    return new PromiseHandle(xhr);
  }
  /**
   * XMLHttpRequest同步请求，绝大多数情况下只能在work进程内使用。
   * @param param
   * @returns
   */


  ajaxAsync(param) {
    const xhr = new XMLHttpRequest();
    submit.call(this, xhr, param, true);
    return xhr.response;
  }

}

class PromiseHandle {
  constructor(xhr) {
    this.xhr = xhr;
    this.xhr.addEventListener('load', () => {
      this.result = this.xhr.response;
    });
  }

  then(callback) {
    this.xhr.addEventListener('load', () => {
      callback(new message_1.Message(this.xhr));
    });
    return this;
  }

  catch(callback) {
    this.xhr.addEventListener('error', () => {
      callback(new message_1.Message(this.xhr));
    });
    return this;
  }

  finally(callback) {
    this.xhr.addEventListener('loadend', () => {
      callback(new message_1.Message(this.xhr));
    });
    return this;
  }

  progress(callback) {
    this.xhr.addEventListener('progress', () => {
      callback(new message_1.Message(this.xhr));
    });
    return this;
  }

  downProgress(callback) {
    this.xhr.addEventListener('progress', e => {
      if (e.lengthComputable) {
        var percentComplete = e.loaded / e.total;
        callback(new message_1.UploadMessage(this.xhr, '下载中', percentComplete.toFixed(4)));
      } else {
        callback(new message_1.UploadMessage(this.xhr, '无法计算进度', null));
      }
    });
    return this;
  }

  upProgress(callback) {
    this.xhr.upload.addEventListener('progress', e => {
      if (e.lengthComputable) {
        var percentComplete = e.loaded / e.total;
        callback(new message_1.UploadMessage(this.xhr, '上传中', percentComplete.toFixed(4)));
      } else {
        callback(new message_1.UploadMessage(this.xhr, '无法计算进度', null));
      }
    });
    return this;
  }

  abort() {
    this.xhr.abort();
    return this;
  }

}

function warp(xhr, param, isInitHeader = true, isAsync = false, isGet = false) {
  if (isInitHeader) {
    const header = param.header || {};
    Object.keys(header).forEach(key => {
      if (isGet && key === 'ContentType') return;
      xhr.setRequestHeader(upperCase(key), header[key]);
    });
    if (!isGet && !header.ContentType) xhr.setRequestHeader("Content-Type", this.options.contentType);
  }

  if (!isAsync) {
    xhr.timeout = param.timeout || this.options.timeout;
    xhr.responseType = param.responseType || this.options.responseType;
    xhr.addEventListener('abort', function () {
      console.warn('HTTP请求被中止');
    });
    xhr.addEventListener('error', function () {
      console.warn(xhr.statusText);
    });
    xhr.addEventListener('timeout', function () {
      console.warn('HTTP请求超时');
    });
  }
}

function submit(xhr, param, isAsync = false) {
  if (!param.method || param.method && param.method.toUpperCase() === "GET") {
    let url = this.options.baseUrl + (param.url || '');
    let paramString = '';

    if (param.data && Object.keys(param.data).length !== 0) {
      let suffix = url.match(/(?:\?.*)$/);
      paramString = suffix === null ? "?" : "&";
      Object.keys(param.data || {}).forEach(key => {
        paramString += encodeURIComponent(key) + "=" + encodeURIComponent(param.data[key].toString()) + "&";
      });
    }

    xhr.open("GET", url + paramString, true);
    warp.call(this, xhr, param, true, isAsync, true);
    xhr.send(null);
  } else {
    xhr.open(param.method, this.options.baseUrl + (param.url || ''), true);
    let type = this.options.contentType;
    if (param.header && param.header.ContentType) type = param.header.ContentType;
    const excute = Reflect.get(HttpHandle, type) || Reflect.get(HttpHandle, 'text/plain');
    warp.call(this, xhr, param, type !== "multipart/form-data", isAsync, false);
    excute.call(this, xhr, param);
  }
}

function upperCase(val) {
  if (val.length < 1) return val;
  let charts = val.split('');
  charts[0] = charts[0].toLocaleUpperCase();
  return charts.map((c, i) => {
    if (c.match(/[A-Z]/) !== null && i !== 0) return `-${c}`;
    return c;
  }).join('');
}

const HttpHandle = {
  'application/x-www-form-urlencoded': function (xhr, param) {
    let result = [];
    Object.keys(param.data || {}).forEach(key => {
      let val = param.data[key];
      result.push(encodeURIComponent(key) + "=" + encodeURIComponent(val ? val.toString() : val));
    });
    Promise.resolve().then(() => {
      xhr.send(result.join("&"));
    });
  },
  'text/plain': function (xhr, param) {
    let result = [];
    Object.keys(param.data || {}).forEach(key => {
      let val = param.data[key];
      result.push(key.replace(/[\s\=\\]/g, "\\$&") + "=" + (val ? val.toString().replace(/[\s\=\\]/g, "\\$&") : val));
    });
    Promise.resolve().then(() => {
      xhr.send(result.join("\r\n"));
    });
  },
  'application/json': function (xhr, param) {
    Promise.resolve().then(() => {
      xhr.send(JSON.stringify(param.data || {}));
    });
  },
  'multipart/form-data': function (xhr, param) {
    const header = param.header || {};
    Object.keys(header).forEach(key => {
      if (key === "ContentType") return;
      xhr.setRequestHeader(upperCase(key), header[key]);
    });

    if (window.FormData) {
      const formData = new FormData();
      Object.keys(param.data || {}).forEach(key => {
        formData.append(key, param.data[key]);
      });
      if (param.file) Object.keys(param.file).forEach(key => {
        formData.append(key, param.file[key]);
      });
      Promise.resolve().then(() => {
        xhr.send(formData);
      });
    } else {
      let result = [];
      Object.keys(param.data || {}).forEach(key => {
        let val = param.data[key];
        result.push("Content-Disposition: form-data; name=\"" + key + "\"\r\n\r\n" + (val ? val.toString() : val) + "\r\n");
      });
      let index = 0;
      let boundary = "---------------------------" + Date.now().toString(16);
      xhr.setRequestHeader("Content-Type", `multipart\/form-data; boundary=` + boundary);

      if (param.file && (0, index_1.getType)(param.file) === "Object") {
        Object.keys(param.file).forEach(key => {
          let file = param.file[key];
          let type = (0, index_1.getType)(file);

          if (type === "File" || type === "Blob") {
            index++;
            FileHelper.read(file).load(function (res) {
              let name = window.File && file instanceof File ? file.name : key + '.blob';
              result.push("Content-Disposition: form-data; name=\"" + key + "\"; filename=\"" + name + "\"\r\nContent-Type: " + (file.type ? file.type : "octet-stream") + "\r\n\r\n" + res.result + "\r\n");
            }).loadend(function () {
              index--;

              if (index === 0) {
                let combineResult = "--" + boundary + "\r\n" + result.join("--" + boundary + "\r\n") + "--" + boundary + "--\r\n";
                Promise.resolve().then(() => {
                  xhr.send(combineResult);
                });
              }
            }).start("BinaryString");
          }
        });
      }

      if (index === 0) {
        Promise.resolve().then(() => {
          xhr.send("--" + boundary + "\r\n" + result.join("--" + boundary + "\r\n") + "--" + boundary + "--\r\n");
        });
      }
    }
  }
};
exports["default"] = Http;

/***/ }),
/* 9 */
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.Message = exports.UploadMessage = void 0;

class Message {
  constructor(xhr) {
    this.status = xhr.status;
    this.message = xhr.statusText;
    this.data = xhr.response;
  }

}

exports.Message = Message;

class UploadMessage {
  constructor(xhr, message, data) {
    this.status = xhr.status;
    this.message = message;
    this.data = data;
  }

}

exports.UploadMessage = UploadMessage;

/***/ }),
/* 10 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.watch = exports.computed = exports.effect = exports.reactive = exports.toRefs = exports.toRef = exports.ref = void 0;

const type_1 = __webpack_require__(11);

const util_1 = __webpack_require__(12);

const index_1 = __webpack_require__(3); //对象-副作用函数映射关系字典


const bucket = new WeakMap(); //对象-响应式对象字典

const reactiveMap = new Map(); //副作用函数执行栈

const effectStack = new Array(); //对象迭代标识

const ITERATE_KEY = Symbol(); //MapKey迭代标识

const MAP_KEY_ITERATE_KEY = Symbol(); //取原始对象key

const source = Symbol();
const getSource = util_1.getSourceValue.bind({
  source
});
const wrap = util_1.wrapValue.bind({
  reactive
}); //活动副作用函数

let activeEffect = null; //是否进行依赖追踪

let shouldTrack = true; //数组原型方法代理

const arrayInstrumentations = {};

(function () {
  //在数组执行查找的原型方法时，在原始对象中进行查找，解决原始值与代理值不一致问题
  ['includes', 'indexOf', 'lastIndexOf'].forEach(method => {
    const originMethod = Reflect.get(Array.prototype, method);
    Reflect.set(arrayInstrumentations, method, function (...args) {
      let res = originMethod.apply(this, args);
      if (res === false || res === -1) res = originMethod.apply(Reflect.get(this, source), args);
      return res;
    });
  }); //在数组执行删除等涉及length属性修改的原型方法时，关闭依赖追踪

  ['pop', 'shift', 'splice'].forEach(method => {
    const originMethod = Reflect.get(Array.prototype, method);
    Reflect.set(arrayInstrumentations, method, function (...args) {
      shouldTrack = false;
      let res = originMethod.apply(this, args);
      shouldTrack = true;
      return res;
    });
  }); //在数组执行增加等涉及length属性修改的原型方法时，关闭依赖追踪

  ['push', 'unshift'].forEach(method => {
    const originMethod = Reflect.get(Array.prototype, method);
    Reflect.set(arrayInstrumentations, method, function (...args) {
      shouldTrack = false;
      let res = originMethod.apply(this, args.map(arg => {
        return getSource(arg);
      }));
      shouldTrack = true;
      return res;
    });
  });
})(); //Set-Map原型方法代理


const mutableInstrumentations = {};

(function () {
  function iterationMethod() {
    //获取原始对象
    const target = Reflect.get(this, source); //获取迭代器对象

    const itr = target[Symbol.iterator](); //建立响应

    track(target, ITERATE_KEY); //返回自定义迭代器

    return {
      //迭代器协议
      next() {
        //获取原始数据
        const {
          value,
          done
        } = itr.next();
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
    const target = Reflect.get(this, source); //获取迭代器对象

    const itr = target.values(); //建立响应

    track(target, ITERATE_KEY); //返回自定义迭代器

    return {
      //迭代器协议
      next() {
        //获取原始数据
        const {
          value,
          done
        } = itr.next();
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
    const target = Reflect.get(this, source); //获取迭代器对象

    const itr = target.keys(); //建立响应

    track(target, MAP_KEY_ITERATE_KEY); //返回自定义迭代器

    return {
      //迭代器协议
      next() {
        //获取原始数据
        const {
          value,
          done
        } = itr.next();
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
    const target = Reflect.get(this, source); //是否只读

    const {
      isReadonly
    } = reactiveMap.get(target) || {};

    if (isReadonly) {
      console.log(target, `对象是只读的`);
      return false;
    } //取原始值


    const orgin = getSource(key); //判断值是否已存在

    const hadkey = target.has(orgin);
    const res = target.add(orgin); //当值不存在时触发副作用函数

    if (!hadkey) trigger(target, orgin, type_1.TriggerType.ADD);
    return res;
  };

  mutableInstrumentations.get = function (key) {
    var _a; //获取原始对象


    const target = Reflect.get(this, source); //是否浅代理、只读

    const {
      isShadow,
      isReadonly
    } = reactiveMap.get(target) || {}; //取原始值, 避免数据污染

    const orginKey = getSource(key); //只读对象或者key为symbol时不进行追踪

    if (!isReadonly) track(target, orginKey);
    const res = target.get(orginKey); //浅代理模式直接返回原始值

    if (isShadow) return res; //非浅代理模式，如果原始值不是基本类型进行响应式包装

    if (typeof res === 'object' && res != null) {
      const existionProxy = (_a = reactiveMap.get(res)) === null || _a === void 0 ? void 0 : _a.value;
      if (existionProxy) return existionProxy;
      return reactive(res, isShadow, isReadonly);
    } //否则返回基本类型值


    return res;
  };

  mutableInstrumentations.set = function (key, value) {
    //获取原始对象
    const target = Reflect.get(this, source); //是否浅代理、只读

    const {
      isReadonly
    } = reactiveMap.get(target) || {};

    if (isReadonly) {
      console.log(target, `对象是只读的`);
      return false;
    } //取原始值, 避免数据污染


    const orginKey = getSource(key);
    const orginValue = getSource(value); //判断是否已存在

    const hadKey = target.has(orginKey); //取出旧值

    const oldValue = target.get(orginKey); //非浅代理时设置原始对象而非响应对象

    const res = target.set(orginKey, orginValue);
    if (!hadKey) trigger(target, orginKey, type_1.TriggerType.ADD);else if (oldValue !== orginValue && (oldValue === oldValue || orginValue === orginValue)) {
      trigger(target, orginKey, type_1.TriggerType.SET);
    }
    return res;
  };

  mutableInstrumentations.delete = function (key) {
    //获取原始对象
    const target = Reflect.get(this, source); //取原始值

    const orgin = getSource(key); //判断值是否已存在

    const hadkey = target.has(orgin);
    const res = target.delete(orgin); //当值存在时触发副作用函数

    if (hadkey) trigger(target, orgin, type_1.TriggerType.DELETE);
    return res;
  };

  mutableInstrumentations.forEach = function (cb, thisArg) {
    //获取原始对象
    const target = Reflect.get(this, source); //与迭代key建立响应

    track(target, ITERATE_KEY); //调用原函数

    target.forEach((value, key) => {
      cb.call(thisArg, wrap(value), wrap(key), this);
    });
  };

  mutableInstrumentations.entries = iterationMethod;
  mutableInstrumentations.values = valuesIterationMethod;
  mutableInstrumentations.keys = keysIterationMethod;
  mutableInstrumentations[Symbol.iterator] = iterationMethod;
})();

function track(target, p) {
  if (!activeEffect || !shouldTrack) {
    return;
  }

  let depsMap = bucket.get(target);

  if (!depsMap) {
    bucket.set(target, depsMap = new Map());
  }

  let deps = depsMap.get(p);

  if (!deps) {
    depsMap.set(p, deps = new Set());
  }

  deps.add(activeEffect);
  activeEffect.deps.push(deps);
}

function trigger(target, p, type, value) {
  let depsMap = bucket.get(target);

  if (!depsMap) {
    return true;
  } //取出所有与key直接相关的副作用函数


  let effects = depsMap.get(p); //待执行副作用函数队列

  let effectsToRun = new Set(); //排除正在运行的副作用函数

  effects && effects.forEach(effectFn => {
    if (effectFn !== activeEffect) effectsToRun.add(effectFn);
  }); //type为ADD或者DELETE或为Map类型设置值时，取出迭代相关副作用函数执行

  if (type === type_1.TriggerType.ADD || type === type_1.TriggerType.DELETE || type === type_1.TriggerType.SET && (0, index_1.getType)(target) === 'Map') {
    let iterateEffects = depsMap.get(ITERATE_KEY);
    iterateEffects && iterateEffects.forEach(effectFn => {
      if (effectFn !== activeEffect) effectsToRun.add(effectFn);
    });
  } //type为ADD或者DELETE且target为Map时，取出迭代相关副作用函数执行


  if ((type === type_1.TriggerType.ADD || type === type_1.TriggerType.DELETE) && (0, index_1.getType)(target) === 'Map') {
    let iterateEffects = depsMap.get(MAP_KEY_ITERATE_KEY);
    iterateEffects && iterateEffects.forEach(effectFn => {
      if (effectFn !== activeEffect) effectsToRun.add(effectFn);
    });
  } //type为ADD且target为数组时，取出数组迭代相关副作用函数执行（使用delete删除数组元素不会改变数组长度，故无需触发）


  if (type === type_1.TriggerType.ADD && Array.isArray(target)) {
    let lengthEffects = depsMap.get('length');
    lengthEffects && lengthEffects.forEach(effectFn => {
      if (effectFn !== activeEffect) effectsToRun.add(effectFn);
    });
  } //target为数组且直接操作数组length属性时，取出大于新length值的副作用函数执行


  if (Array.isArray(target) && p === 'length') {
    depsMap.forEach((effects, key) => {
      if (Number(key) >= Number(value)) {
        effects.forEach(effectFn => {
          if (effectFn !== activeEffect) effectsToRun.add(effectFn);
        });
      }
    });
    let lengthEffects = depsMap.get('length');
    lengthEffects && lengthEffects.forEach(effectFn => {
      if (effectFn !== activeEffect) effectsToRun.add(effectFn);
    });
  } //执行副作用函数


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
/**
 * 代理基本类型值，返回响应式数据
 * @param value 基本类型值
 * @param isReadonly 是否只读
 * @returns { value: T }
 */


function ref(value, isReadonly = false) {
  const wrapper = {
    value
  }; //定义变量标识对象为Ref对象

  Object.defineProperty(wrapper, '__isRef', {
    value: true
  });
  return reactive({
    value
  }, true, isReadonly);
}

exports.ref = ref;

function toRef(val, key) {
  const wrapper = {
    get value() {
      return val[key];
    },

    set value(value) {
      val[key] = value;
    }

  }; //定义变量标识对象为Ref对象

  Object.defineProperty(wrapper, '__isRef', {
    value: true
  });
  return wrapper;
}

exports.toRef = toRef;

function toRefs(obj) {
  const ret = {};

  for (const key in obj) {
    Reflect.set(ret, key, toRef(obj, key));
  }

  return ret;
}

exports.toRefs = toRefs;
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

      if (p === source) return target; //数组原型方法代理

      if (Array.isArray(target) && arrayInstrumentations.hasOwnProperty(p)) {
        return Reflect.get(arrayInstrumentations, p, reciver);
      } //Set.Map 访问器属性size代理


      if (target instanceof Map || target instanceof Set) {
        if (mutableInstrumentations.hasOwnProperty(p)) return Reflect.get(mutableInstrumentations, p, reciver);
        if (p === 'size') track(target, ITERATE_KEY);
        return Reflect.get(target, p, target);
      } //只读对象或者key为symbol时不进行追踪


      if (!isReadonly && typeof p !== 'symbol') track(target, p);
      const res = Reflect.get(target, p, reciver); //浅代理模式直接返回原始值

      if (isShadow) return res; //非浅代理模式，如果原始值不是基本类型进行响应式包装

      if (typeof res === 'object' && res != null) {
        const existionProxy = (_a = reactiveMap.get(res)) === null || _a === void 0 ? void 0 : _a.value;
        if (existionProxy) return existionProxy;
        return reactive(res, isShadow, isReadonly);
      } //否则返回基本类型值


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
      } //判断变量是否不处于对象原型上


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
      } //取出旧值


      const oldValue = Reflect.get(target, p); //判断操作类型

      const type = Array.isArray(target) ? Number(p) < target.length ? type_1.TriggerType.SET : type_1.TriggerType.ADD : Object.prototype.hasOwnProperty.call(target, p) ? type_1.TriggerType.SET : type_1.TriggerType.ADD; //取原始值

      const orgin = getSource(value); //非浅代理时设置原始对象而非响应对象

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

exports.reactive = reactive;
/**
 * 创建副作用函数
 * @param func 函数
 * @param options 配置
 * @returns effectFunc
 */

function effect(func, options = {}) {
  let effectFn = function () {
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

function traverse(value, seen = new Set()) {
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


function watch(source, cb, options = {}) {
  let getter;
  if (typeof source === 'function') getter = source;else getter = () => traverse(source);
  let oldValue, newValue, cleanup;

  function onInvalidate(fn) {
    cleanup = fn;
  }

  const job = () => {
    newValue = effectFn();
    if (cleanup) cleanup();
    cb(oldValue, newValue, onInvalidate);
    oldValue = newValue;
  };

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
  if (options.immediate) job();else oldValue = effectFn();
}

exports.watch = watch;

/***/ }),
/* 11 */
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.TriggerType = void 0;
var TriggerType;

(function (TriggerType) {
  TriggerType[TriggerType["SET"] = 0] = "SET";
  TriggerType[TriggerType["ADD"] = 1] = "ADD";
  TriggerType[TriggerType["DELETE"] = 2] = "DELETE";
})(TriggerType = exports.TriggerType || (exports.TriggerType = {}));

/***/ }),
/* 12 */
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.wrapValue = exports.getSourceValue = void 0;
/**
 * 取原始值
 * @param value
 * @returns
 */

const getSourceValue = function (value) {
  return Reflect.get(typeof value === 'object' && value !== null ? value : {}, this.source || Symbol()) || value;
};

exports.getSourceValue = getSourceValue;

const wrapValue = function (value) {
  return typeof value === 'object' && value !== null ? this.reactive(value) : value;
};

exports.wrapValue = wrapValue;

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__(0);
/******/ 	var __webpack_export_target__ = exports;
/******/ 	for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
/******/ 	if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ 	
/******/ })()
;