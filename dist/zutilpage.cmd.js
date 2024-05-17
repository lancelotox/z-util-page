/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
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
/* harmony default export */ __webpack_exports__["default"] = (debounce);

/***/ }),
/* 2 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _deepClone_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);

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
  let options = Object.assign((0,_deepClone_index__WEBPACK_IMPORTED_MODULE_0__.deepClone)(defaultConfig), option || {});
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
/* harmony default export */ __webpack_exports__["default"] = (throttle);

/***/ }),
/* 3 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   deepClone: function() { return /* binding */ deepClone; },
/* harmony export */   getType: function() { return /* binding */ getType; }
/* harmony export */ });
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


/***/ }),
/* 4 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
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
/* harmony default export */ __webpack_exports__["default"] = (parseUrl);

/***/ }),
/* 5 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ generateUUID; }
/* harmony export */ });
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

/***/ }),
/* 6 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   choose: function() { return /* binding */ choose; },
/* harmony export */   read: function() { return /* binding */ read; },
/* harmony export */   save: function() { return /* binding */ save; }
/* harmony export */ });
/* harmony import */ var _helper_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7);

function choose(callback, options = {}) {
  const input = document.createElement('input');
  input.setAttribute('type', 'file');
  input.setAttribute('accept', (options.accept || []).join(','));
  input.setAttribute('capture', options.capture || '');
  if (options.multiple) input.setAttribute('multiple', 'true');
  input.addEventListener('change', function (e) {
    callback(input.files);
  });
  (0,_helper_index__WEBPACK_IMPORTED_MODULE_0__.clickElement)(input);
}
/**
 * H5文件下载方法
 * @param url 资源链接或者blob对象
 * @param saveFileName 保存文件名
 */
function save(file, saveFileName = '') {
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
  (0,_helper_index__WEBPACK_IMPORTED_MODULE_0__.clickElement)(alink);
  document.body.removeChild(alink);
}
class FileReaderDecorate {
  constructor(file) {
    Object.defineProperty(this, "reader", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "file", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    this.reader = new FileReader();
    this.file = file;
  }
  //读取操作发生中断时触发
  abort(fun) {
    this.reader.addEventListener('abort', () => {
      fun(this.reader);
    });
    return this;
  }
  //读取操作发生错误时触发。
  error(fun) {
    this.reader.addEventListener('error', () => {
      fun(this.reader.error);
    });
    return this;
  }
  //读取操作完成时触发。
  load(fun) {
    this.reader.addEventListener('load', () => {
      fun(this.reader);
    });
    return this;
  }
  //读取操作开始时触发。
  loadstart(fun) {
    this.reader.addEventListener('loadstart', () => {
      fun(this.reader);
    });
    return this;
  }
  //读取操作结束时（要么成功，要么失败）触发。
  loadend(fun) {
    this.reader.addEventListener('loadend', () => {
      fun(this.reader.result);
    });
    return this;
  }
  //在读取Blob时触发。
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
function read(file) {
  return new FileReaderDecorate(file);
}

/***/ }),
/* 7 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   clickElement: function() { return /* binding */ clickElement; }
/* harmony export */ });
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

/***/ }),
/* 8 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _deepClone_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var _FileHelper_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6);
/* harmony import */ var _message__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9);



class Http {
  constructor(options = {}) {
    Object.defineProperty(this, "options", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: {
        timeout: 10000,
        baseUrl: '',
        contentType: '',
        responseType: ''
      }
    });
    /**
     * 拦截器
     */
    Object.defineProperty(this, "Interceptor", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: {
        requestArr: [],
        responseArr: [],
        request(func) {
          if (typeof func === 'function') this.requestArr.push(func);
        },
        response(func) {
          if (typeof func === 'function') this.responseArr.push(func);
        }
      }
    });
    Object.assign(this.options, options);
  }
  /**
   * //XMLHttpRequest异步请求
   * @param param
   * @returns
   */
  ajax(param) {
    const xhr = new XMLHttpRequest();
    submit.call(this, xhr, petchParam(param));
    return new PromiseHandle(xhr);
  }
  /**
   * XMLHttpRequest同步请求，绝大多数情况下只能在work进程内使用。
   * @param param
   * @returns
   */
  ajaxAsync(param) {
    const xhr = new XMLHttpRequest();
    submit.call(this, xhr, petchParam(param), true);
    return xhr.response;
  }
}
class PromiseHandle {
  constructor(xhr) {
    Object.defineProperty(this, "xhr", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "result", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    this.xhr = xhr;
    this.xhr.addEventListener('load', () => {
      this.result = this.xhr.response;
    });
  }
  then(callback) {
    this.xhr.addEventListener('load', () => {
      callback(new _message__WEBPACK_IMPORTED_MODULE_2__.Message(this.xhr));
    });
    return this;
  }
  catch(callback) {
    this.xhr.addEventListener('error', () => {
      callback(new _message__WEBPACK_IMPORTED_MODULE_2__.Message(this.xhr));
    });
    return this;
  }
  finally(callback) {
    this.xhr.addEventListener('loadend', () => {
      callback(new _message__WEBPACK_IMPORTED_MODULE_2__.Message(this.xhr));
    });
    return this;
  }
  progress(callback) {
    this.xhr.addEventListener('progress', () => {
      callback(new _message__WEBPACK_IMPORTED_MODULE_2__.Message(this.xhr));
    });
    return this;
  }
  downProgress(callback) {
    this.xhr.addEventListener('progress', e => {
      if (e.lengthComputable) {
        var percentComplete = e.loaded / e.total;
        callback(new _message__WEBPACK_IMPORTED_MODULE_2__.UploadMessage(this.xhr, '下载中', percentComplete.toFixed(4)));
      } else {
        callback(new _message__WEBPACK_IMPORTED_MODULE_2__.UploadMessage(this.xhr, '无法计算进度', null));
      }
    });
    return this;
  }
  upProgress(callback) {
    this.xhr.upload.addEventListener('progress', e => {
      if (e.lengthComputable) {
        var percentComplete = e.loaded / e.total;
        callback(new _message__WEBPACK_IMPORTED_MODULE_2__.UploadMessage(this.xhr, '上传中', percentComplete.toFixed(4)));
      } else {
        callback(new _message__WEBPACK_IMPORTED_MODULE_2__.UploadMessage(this.xhr, '无法计算进度', null));
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
  this.Interceptor.requestArr.forEach(func => {
    param = func(param) || param;
  });
  let baseUrl = this.options.baseUrl;
  if (param.baseUrl !== undefined) {
    baseUrl = String(param.baseUrl);
  }
  let url = baseUrl + (param.url || '');
  let paramString = '';
  if (param.param && Object.keys(param.param).length !== 0) {
    let suffix = url.match(/(?:\?.*)$/);
    paramString = suffix === null ? "?" : "&";
    Object.keys(param.param || {}).forEach(key => {
      paramString += encodeURIComponent(key) + "=" + encodeURIComponent(param.param[key].toString()) + "&";
    });
  }
  if (!param.method || param.method && param.method.toUpperCase() === "GET") {
    xhr.open("GET", url + paramString, true);
    warp.call(this, xhr, param, true, isAsync, true);
    xhr.send(null);
  } else {
    xhr.open(param.method, url + paramString, true);
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
function petchParam(param) {
  if (param.data === undefined) param.data = {};
  if (param.header === undefined) param.header = {};
  return param;
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
      if (param.file && (0,_deepClone_index__WEBPACK_IMPORTED_MODULE_0__.getType)(param.file) === "Object") {
        Object.keys(param.file).forEach(key => {
          let file = param.file[key];
          let type = (0,_deepClone_index__WEBPACK_IMPORTED_MODULE_0__.getType)(file);
          if (type === "File" || type === "Blob") {
            index++;
            _FileHelper_index__WEBPACK_IMPORTED_MODULE_1__.read(file).load(function (res) {
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
/* harmony default export */ __webpack_exports__["default"] = (Http);

/***/ }),
/* 9 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Message: function() { return /* binding */ Message; },
/* harmony export */   UploadMessage: function() { return /* binding */ UploadMessage; }
/* harmony export */ });
class Message {
  constructor(xhr) {
    Object.defineProperty(this, "status", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "message", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "data", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    this.status = xhr.status;
    this.message = xhr.statusText;
    this.data = xhr.response;
  }
}
class UploadMessage {
  constructor(xhr, message, data) {
    Object.defineProperty(this, "status", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "message", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "data", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    this.status = xhr.status;
    this.message = message;
    this.data = data;
  }
}


/***/ }),
/* 10 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   computed: function() { return /* binding */ computed; },
/* harmony export */   effect: function() { return /* binding */ effect; },
/* harmony export */   reactive: function() { return /* binding */ reactive; },
/* harmony export */   ref: function() { return /* binding */ ref; },
/* harmony export */   toRaw: function() { return /* binding */ toRaw; },
/* harmony export */   toRef: function() { return /* binding */ toRef; },
/* harmony export */   toRefs: function() { return /* binding */ toRefs; },
/* harmony export */   watch: function() { return /* binding */ watch; }
/* harmony export */ });
/* harmony import */ var _type__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(11);
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12);
/* harmony import */ var _deepClone_index__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3);



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
const wrap = _util__WEBPACK_IMPORTED_MODULE_1__.wrapValue.bind({
  reactive
});
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
      if (res === false || res === -1) res = originMethod.apply(Reflect.get(this, source), args);
      return res;
    });
  });
  //在数组执行删除等涉及length属性修改的原型方法时，关闭依赖追踪
  ['pop', 'shift', 'splice'].forEach(method => {
    const originMethod = Reflect.get(Array.prototype, method);
    Reflect.set(arrayInstrumentations, method, function (...args) {
      if (activeEffect) activeEffect.shouldTrack = false;
      let res = originMethod.apply(this, args);
      if (activeEffect) activeEffect.shouldTrack = true;
      return res;
    });
  });
  //在数组执行增加等涉及length属性修改的原型方法时，关闭依赖追踪
  ['push', 'unshift'].forEach(method => {
    const originMethod = Reflect.get(Array.prototype, method);
    Reflect.set(arrayInstrumentations, method, function (...args) {
      if (activeEffect) activeEffect.shouldTrack = false;
      let res = originMethod.apply(this, args.map(arg => {
        return toRaw(arg);
      }));
      if (activeEffect) activeEffect.shouldTrack = true;
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
    const target = Reflect.get(this, source);
    //是否只读
    const {
      isReadonly
    } = reactiveMap.get(target) || {};
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
    if (!hadkey) trigger(target, orgin, _type__WEBPACK_IMPORTED_MODULE_0__.TriggerType.ADD);
    return res;
  };
  mutableInstrumentations.get = function (key) {
    var _a;
    //获取原始对象
    const target = Reflect.get(this, source);
    //是否浅代理、只读
    const {
      isShadow,
      isReadonly
    } = reactiveMap.get(target) || {};
    //取原始值, 避免数据污染
    const orginKey = toRaw(key);
    //只读对象或者key为symbol时不进行追踪
    if (!isReadonly) track(target, orginKey);
    const res = target.get(orginKey);
    //浅代理模式直接返回原始值
    if (isShadow) return res;
    //非浅代理模式，如果原始值不是基本类型进行响应式包装
    if (typeof res === 'object' && res != null) {
      const existionProxy = (_a = reactiveMap.get(res)) === null || _a === void 0 ? void 0 : _a.value;
      if (existionProxy) return existionProxy;
      return reactive(res, isShadow, isReadonly);
    }
    //否则返回基本类型值
    return res;
  };
  mutableInstrumentations.set = function (key, value) {
    //获取原始对象
    const target = Reflect.get(this, source);
    //是否浅代理、只读
    const {
      isReadonly
    } = reactiveMap.get(target) || {};
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
    if (!hadKey) trigger(target, orginKey, _type__WEBPACK_IMPORTED_MODULE_0__.TriggerType.ADD);else if (oldValue !== orginValue && (oldValue === oldValue || orginValue === orginValue)) {
      trigger(target, orginKey, _type__WEBPACK_IMPORTED_MODULE_0__.TriggerType.SET);
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
    if (hadkey) trigger(target, orgin, _type__WEBPACK_IMPORTED_MODULE_0__.TriggerType.DELETE);
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
    bucket.set(target, depsMap = new Map());
  }
  let deps = depsMap.get(p);
  if (!deps) {
    depsMap.set(p, deps = new Set());
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
    if (effectFn !== activeEffect) effectsToRun.add(effectFn);
  });
  //type为ADD或者DELETE或为Map类型设置值时，取出迭代相关副作用函数执行
  if (type === _type__WEBPACK_IMPORTED_MODULE_0__.TriggerType.ADD || type === _type__WEBPACK_IMPORTED_MODULE_0__.TriggerType.DELETE || type === _type__WEBPACK_IMPORTED_MODULE_0__.TriggerType.SET && (0,_deepClone_index__WEBPACK_IMPORTED_MODULE_2__.getType)(target) === 'Map') {
    let iterateEffects = depsMap.get(ITERATE_KEY);
    iterateEffects && iterateEffects.forEach(effectFn => {
      if (effectFn !== activeEffect) effectsToRun.add(effectFn);
    });
  }
  //type为ADD或者DELETE且target为Map时，取出迭代相关副作用函数执行
  if ((type === _type__WEBPACK_IMPORTED_MODULE_0__.TriggerType.ADD || type === _type__WEBPACK_IMPORTED_MODULE_0__.TriggerType.DELETE) && (0,_deepClone_index__WEBPACK_IMPORTED_MODULE_2__.getType)(target) === 'Map') {
    let iterateEffects = depsMap.get(MAP_KEY_ITERATE_KEY);
    iterateEffects && iterateEffects.forEach(effectFn => {
      if (effectFn !== activeEffect) effectsToRun.add(effectFn);
    });
  }
  //type为ADD且target为数组时，取出数组迭代相关副作用函数执行（使用delete删除数组元素不会改变数组长度，故无需触发）
  if (type === _type__WEBPACK_IMPORTED_MODULE_0__.TriggerType.ADD && Array.isArray(target)) {
    let lengthEffects = depsMap.get('length');
    lengthEffects && lengthEffects.forEach(effectFn => {
      if (effectFn !== activeEffect) effectsToRun.add(effectFn);
    });
  }
  //target为数组且直接操作数组length属性时，取出大于新length值的副作用函数执行
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
        const existionProxy = (_a = reactiveMap.get(res)) === null || _a === void 0 ? void 0 : _a.value;
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
        trigger(target, p, _type__WEBPACK_IMPORTED_MODULE_0__.TriggerType.DELETE);
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
      const type = Array.isArray(target) ? Number(p) < target.length ? _type__WEBPACK_IMPORTED_MODULE_0__.TriggerType.SET : _type__WEBPACK_IMPORTED_MODULE_0__.TriggerType.ADD : Object.prototype.hasOwnProperty.call(target, p) ? _type__WEBPACK_IMPORTED_MODULE_0__.TriggerType.SET : _type__WEBPACK_IMPORTED_MODULE_0__.TriggerType.ADD;
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
  return reactive({
    value
  }, true, isReadonly);
}
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
/**
 * 创建副作用函数
 * @param func 函数
 * @param options 配置
 * @returns effectFunc
 */
function effect(func, options = {}) {
  const effectFn = function () {
    (0,_util__WEBPACK_IMPORTED_MODULE_1__.cleanup)(effectFn);
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
        trigger(obj, 'value', _type__WEBPACK_IMPORTED_MODULE_0__.TriggerType.SET, 0);
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
/**
 * 监听响应式数据
 * @param source 副作用函数或者响应式对象
 * @param cb 数据变化后回调函数
 * @param options 配置
 */
function watch(source, cb, options = {}) {
  let getter;
  if (typeof source === 'function') getter = source;else getter = () => (0,_util__WEBPACK_IMPORTED_MODULE_1__.traverse)(source);
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
/**
 * 获取原始对象
 */
function toRaw(proxy) {
  return Reflect.get(typeof proxy === 'object' && proxy !== null ? proxy : {}, source) || proxy;
}


/***/ }),
/* 11 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TriggerType: function() { return /* binding */ TriggerType; }
/* harmony export */ });
// 数组触发类型枚举
var TriggerType;
(function (TriggerType) {
  TriggerType[TriggerType["SET"] = 0] = "SET";
  TriggerType[TriggerType["ADD"] = 1] = "ADD";
  TriggerType[TriggerType["DELETE"] = 2] = "DELETE";
})(TriggerType || (TriggerType = {}));

/***/ }),
/* 12 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   cleanup: function() { return /* binding */ cleanup; },
/* harmony export */   traverse: function() { return /* binding */ traverse; },
/* harmony export */   wrapValue: function() { return /* binding */ wrapValue; }
/* harmony export */ });
/**
 * 普通对象转代理对象, 原始值转换
 */
const wrapValue = function (value) {
  return typeof value === 'object' && value !== null ? this.reactive(value) : value;
};
/**
 * 清理副作用函数
 * @param effectFn 副作用函数
 */
const cleanup = function (effectFn) {
  clean(effectFn);
  cleanupDeep(effectFn);
};
/**
 * 清理deps
 * @param effectFn
 */
function clean(effectFn) {
  effectFn.deps.forEach(deps => {
    deps.delete(effectFn);
  });
  effectFn.deps.length = 0;
}
/**
 * 清理childs
 * @param effectFn
 */
function cleanupDeep(effectFn) {
  effectFn.childs.forEach(effect => {
    clean(effect);
    cleanupDeep(effect);
  });
}
/**
 * 循环建立依赖追踪
 * @param value 待建立对象
 */
const traverse = function (value, seen = new Set()) {
  if (typeof value !== 'object' || value === null || seen.has(value)) return;
  seen.add(value);
  for (const k in value) {
    traverse(value[k], seen);
  }
  return value;
};

/***/ }),
/* 13 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CookieHelper: function() { return /* binding */ CookieHelper; }
/* harmony export */ });
const CookieHelper = {
  getItem(key) {
    return document.cookie.replace(new RegExp(`(?:(?:^|.*;\\s*)${key}\\s*=\\s*([^;]*).*$)|^.*$`), "$1");
  },
  getItemOnce(key) {
    const val = CookieHelper.getItem(key);
    CookieHelper.removeItem(`${key}`);
    return val;
  },
  setItem(key, val) {
    if (typeof val !== 'string') return;
    document.cookie = `${key}=${val};path=/`;
  },
  removeItem(key) {
    document.cookie = `${key}=;path=/;expires=${new Date(0).toUTCString()}`;
  },
  exist(key) {
    const keys = document.cookie.match(/[^ =;]+(?==)/g) || [];
    return keys.includes(key);
  },
  clear() {
    const keys = document.cookie.match(/[^ =;]+(?==)/g);
    if (keys) {
      for (let i = keys.length; i--;) CookieHelper.removeItem(keys[i]);
    }
  }
};

/***/ }),
/* 14 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   mergeObject: function() { return /* binding */ mergeObject; }
/* harmony export */ });
/* harmony import */ var _deepClone_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);

/**
 * 深度合并n个对象值
 * @param origin 将多个对象深度合并到该对象
 * @param ob 被合并对象
 * @param more 其余被合并对象
 */
function mergeObject(origin, ob, ...more) {
  do {
    origin = merge(origin, ob);
    ob = more.pop();
  } while (ob);
  return origin;
}
function merge(origin, ob) {
  if (ob === undefined) return origin;
  if ((0,_deepClone_index__WEBPACK_IMPORTED_MODULE_0__.getType)(origin) !== 'Object' || (0,_deepClone_index__WEBPACK_IMPORTED_MODULE_0__.getType)(ob) !== 'Object') return origin;
  for (const key in ob) {
    const oldVal = origin[key];
    const newVal = ob[key];
    if (oldVal !== newVal && newVal !== undefined) {
      if ((0,_deepClone_index__WEBPACK_IMPORTED_MODULE_0__.getType)(oldVal) !== 'Object') origin[key] = newVal;else merge(oldVal, newVal);
    }
  }
  return origin;
}

/***/ }),
/* 15 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   draggable: function() { return /* binding */ draggable; },
/* harmony export */   scrollToBottom: function() { return /* binding */ scrollToBottom; },
/* harmony export */   scrollToLeft: function() { return /* binding */ scrollToLeft; },
/* harmony export */   scrollToRight: function() { return /* binding */ scrollToRight; },
/* harmony export */   scrollToTop: function() { return /* binding */ scrollToTop; }
/* harmony export */ });
function scrollToTop(scroll) {
  scroll.scrollTop = 0;
}
function scrollToBottom(scroll) {
  let scrollTop = scroll.scrollHeight - scroll.clientHeight;
  scroll.scrollTop = scrollTop > 0 ? scrollTop : 0;
}
function scrollToLeft(scroll) {
  scroll.scrollLeft = 0;
}
function scrollToRight(scroll) {
  let scrollLeft = scroll.scrollWidth - scroll.clientWidth;
  scroll.scrollLeft = scrollLeft > 0 ? scrollLeft : 0;
}
function draggable(dom) {
  let parent = dom.parentElement;
  if (!parent) {
    console.warn('parentElement not found');
    return;
  }
  let isDraggable = true;
  dom.style.position = 'absolute';
  let rect = dom.getBoundingClientRect();
  let geometry = {
    x: rect.x,
    y: rect.y,
    left: rect.left,
    top: rect.top
  };
  dom.addEventListener("mousedown", function (e) {
    geometry.x = e.clientX;
    geometry.y = e.clientY;
    isDraggable && (parent === null || parent === void 0 ? void 0 : parent.addEventListener("mousemove", mouseMove));
  });
  window.addEventListener("mouseup", function () {
    parent === null || parent === void 0 ? void 0 : parent.removeEventListener("mousemove", mouseMove);
  });
  function mouseMove(e) {
    let skewX = e.clientX - geometry.x;
    let skewY = e.clientY - geometry.y;
    geometry.left += skewX;
    geometry.top += skewY;
    dom.style.left = geometry.left + "px";
    dom.style.top = geometry.top + "px";
    geometry.x = e.clientX;
    geometry.y = e.clientY;
  }
  return {
    close() {
      isDraggable = false;
    },
    open() {
      isDraggable = true;
    },
    wrap(dom) {
      dom.addEventListener('mousedown', function () {
        isDraggable = false;
      });
      window.addEventListener('mouseup', function () {
        isDraggable = true;
      });
    }
  };
}

/***/ }),
/* 16 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EventBus: function() { return /* binding */ EventBus; }
/* harmony export */ });
/* harmony import */ var _mergeObject__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(14);

/**
 * 事件总线
 * on: 注册事件
 * emit: 触发事件
 */
class EventBus {
  static on(key, func) {
    let funcSet = this.bucket[key];
    if (!funcSet) funcSet = this.bucket[key] = [];
    const re = funcSet.find(item => item === func);
    if (re || typeof func !== 'function') return;
    funcSet.push(func);
  }
  static emit(key, ...rest) {
    const funcSet = this.bucket[key];
    if (!funcSet) return;
    funcSet.forEach(function (func) {
      func(...rest);
    });
  }
  constructor(config) {
    Object.defineProperty(this, "config", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "bucket", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "on", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "emit", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    this.config = (0,_mergeObject__WEBPACK_IMPORTED_MODULE_0__.mergeObject)({
      maxEventCount: 10000
    }, EventBus.config, config || {});
    this.bucket = {};
    this.on = EventBus.on;
    this.emit = EventBus.emit;
  }
}
Object.defineProperty(EventBus, "config", {
  enumerable: true,
  configurable: true,
  writable: true,
  value: {}
});
Object.defineProperty(EventBus, "bucket", {
  enumerable: true,
  configurable: true,
  writable: true,
  value: {}
});

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
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CookieHelper: function() { return /* reexport safe */ _CookieHelper_index__WEBPACK_IMPORTED_MODULE_8__.CookieHelper; },
/* harmony export */   DomHelper: function() { return /* reexport module object */ _DomHelper_index__WEBPACK_IMPORTED_MODULE_10__; },
/* harmony export */   EventBus: function() { return /* reexport safe */ _EventBus_index__WEBPACK_IMPORTED_MODULE_11__.EventBus; },
/* harmony export */   FileHelper: function() { return /* reexport module object */ _FileHelper_index__WEBPACK_IMPORTED_MODULE_5__; },
/* harmony export */   Http: function() { return /* reexport safe */ _Http_index__WEBPACK_IMPORTED_MODULE_6__["default"]; },
/* harmony export */   Reactive: function() { return /* reexport module object */ _Reactive_index__WEBPACK_IMPORTED_MODULE_7__; },
/* harmony export */   debounce: function() { return /* reexport safe */ _debounce_index__WEBPACK_IMPORTED_MODULE_0__["default"]; },
/* harmony export */   deepClone: function() { return /* reexport safe */ _deepClone_index__WEBPACK_IMPORTED_MODULE_2__.deepClone; },
/* harmony export */   generateUUID: function() { return /* reexport safe */ _uuidFactory_index__WEBPACK_IMPORTED_MODULE_4__["default"]; },
/* harmony export */   getType: function() { return /* reexport safe */ _deepClone_index__WEBPACK_IMPORTED_MODULE_2__.getType; },
/* harmony export */   mergeObject: function() { return /* reexport safe */ _mergeObject_index__WEBPACK_IMPORTED_MODULE_9__.mergeObject; },
/* harmony export */   parseUrl: function() { return /* reexport safe */ _parseUrl_index__WEBPACK_IMPORTED_MODULE_3__["default"]; },
/* harmony export */   throttle: function() { return /* reexport safe */ _throttle_index__WEBPACK_IMPORTED_MODULE_1__["default"]; }
/* harmony export */ });
/* harmony import */ var _debounce_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _throttle_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var _deepClone_index__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3);
/* harmony import */ var _parseUrl_index__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4);
/* harmony import */ var _uuidFactory_index__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(5);
/* harmony import */ var _FileHelper_index__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(6);
/* harmony import */ var _Http_index__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(8);
/* harmony import */ var _Reactive_index__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(10);
/* harmony import */ var _CookieHelper_index__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(13);
/* harmony import */ var _mergeObject_index__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(14);
/* harmony import */ var _DomHelper_index__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(15);
/* harmony import */ var _EventBus_index__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(16);













}();
var __webpack_export_target__ = exports;
for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;