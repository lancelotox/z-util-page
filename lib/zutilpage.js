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
exports.Reactive = exports.FileHelper = exports.Http = exports.generateUUID = exports.getType = exports.deepClone = exports.throttle = exports.debounce = void 0;

var index_1 = __importDefault(__webpack_require__(1));

exports.debounce = index_1.default;

var index_2 = __importDefault(__webpack_require__(2));

exports.throttle = index_2.default;

var index_3 = __webpack_require__(3);

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

var index_4 = __importDefault(__webpack_require__(4));

exports.generateUUID = index_4.default;

var FileHelper = __importStar(__webpack_require__(5));

exports.FileHelper = FileHelper;

var index_5 = __importDefault(__webpack_require__(7));

exports.Http = index_5.default;

var Reactive = __importStar(__webpack_require__(9));

exports.Reactive = Reactive;

/***/ }),
/* 1 */
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
/**
 * ????????????
 * @param func ???????????????
 * @param wait ????????????????????????
 * @param immediatel ??????????????????
 */

function debounce(func, wait, immediatel) {
  var timeout,
      content,
      args,
      callbacks = [],
      res;

  var debounced = function () {
    var args = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }

    content = this;

    if (immediatel && !timeout) {
      res = func.apply(content, args);
      var resolvedRes_1 = res;
      callbacks.forEach(function (callback) {
        if (callback instanceof Function) resolvedRes_1 = callback(resolvedRes_1);
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

var index_1 = __webpack_require__(3);

var defaultConfig = {
  leading: true,
  trailing: false
};
/**
 * ????????????
 * @param func ???????????????
 * @param wait ??????????????????????????????
 */

function throttle(func, wait, option) {
  var options = Object.assign((0, index_1.deepClone)(defaultConfig), option || {});
  if (options.leading === false && options.trailing === false) throw 'leading, trailing???????????????false';
  var timeout = null,
      args,
      content,
      res;

  var throttled = function () {
    var argList = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      argList[_i] = arguments[_i];
    }

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
 * ?????????
 * @param value ????????????
 */

var cacheMap = new WeakMap();
var typeHandleMap = {
  'Object': function (value) {
    var cloneTarget = new value.constructor();
    forEach(Object.keys(value), function (val, key) {
      cloneTarget[val] = deepClone(value[val]);
    });
    return cloneTarget;
  },
  'Array': function (value) {
    var cloneTarget = [];
    forEach(value, function (val, key) {
      cloneTarget[key] = deepClone(value[key]);
    });
    return cloneTarget;
  },
  'Set': function (value) {
    var cloneTarget = new value.constructor();
    value.forEach(function (val) {
      cloneTarget.add(deepClone(val));
    });
    return cloneTarget;
  },
  'Map': function (value) {
    var cloneTarget = new value.constructor();
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
var baseTypeList = ['boolean', 'number', 'string', 'undefined', "function", "symbol", 'Null', "Math", "Json", "Global"];
var simpleTypeList = ["Boolean", "Number", 'String', 'Date', "Regexp"];

function deepClone(value) {
  var type = typeof value;
  if (type === 'object') type = getType(value);
  if (value instanceof HTMLElement) type = 'HTMLElement';
  if (baseTypeList.includes(type)) return value;else if (simpleTypeList.includes(type)) return new value.constructor(value);
  var cloneTarget = cacheMap.get(value);

  if (cloneTarget === undefined) {
    var handle = typeHandleMap[type];
    if (handle) cloneTarget = handle(value);else cloneTarget = value;
    cacheMap.set(value, cloneTarget);
  }

  clear();
  return cloneTarget;
}

exports.deepClone = deepClone;
/**
 * ????????????
 */

var isFlush = false;

function clear() {
  if (!isFlush) {
    isFlush = true;
    var promise = Promise.resolve();
    promise.then(function () {
      cacheMap = new WeakMap();
    });
    promise.finally(function () {
      isFlush = false;
    });
  }
}
/**
 * while??????
 * @param list ???????????????
 * @param handle ????????????
 */


function forEach(list, handle) {
  var index = -1;
  var length = list.length;

  while (++index < length) {
    handle(list[index], index);
  }
}
/**
 * ??????????????????
 * @param value
 * @returns ???????????????, 'String'???'Map'
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
 * ??????UUID4
 * @param length ??????uuid?????????????????????????????????rfc4122????????????uuid
 * @param radix uuid????????????????????? 1-62
 * @returns uuid?????????
 */

function generateUUID(length, radix) {
  var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  var uuid = [];
  radix = radix || chars.length;

  if (length) {
    for (var i = 0; i < length; i++) uuid[i] = chars[0 | Math.random() * radix];
  } else {
    var r = void 0;
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
    uuid[14] = '4';

    for (var i = 0; i < 36; i++) {
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
/* 5 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.choose = exports.read = exports.write = void 0;

var index_1 = __webpack_require__(6);
/**
 * H5??????????????????
 * @param url ??????????????????blob??????
 * @param saveFileName ???????????????
 */


function saveFile(url, saveFileName) {
  if (typeof url === 'object' && url instanceof Blob) {
    url = URL.createObjectURL(url);
  }

  var alink = document.createElement('a');
  alink.href = url;
  alink.download = saveFileName || '';
  (0, index_1.clickElement)(alink);
}

exports.write = saveFile;

var FileReaderDecorate =
/** @class */
function () {
  function FileReaderDecorate(file) {
    this.reader = new FileReader();
    this.file = file;
  } //?????????????????????????????????


  FileReaderDecorate.prototype.abort = function (fun) {
    var _this = this;

    this.reader.addEventListener('abort', function () {
      fun(_this.reader);
    });
    return this;
  }; //????????????????????????????????????


  FileReaderDecorate.prototype.error = function (fun) {
    var _this = this;

    this.reader.addEventListener('error', function () {
      fun(_this.reader.error);
    });
    return this;
  }; //??????????????????????????????


  FileReaderDecorate.prototype.load = function (fun) {
    var _this = this;

    this.reader.addEventListener('load', function () {
      fun(_this.reader);
    });
    return this;
  }; //??????????????????????????????


  FileReaderDecorate.prototype.loadstart = function (fun) {
    var _this = this;

    this.reader.addEventListener('loadstart', function () {
      fun(_this.reader);
    });
    return this;
  }; //???????????????????????????????????????????????????????????????


  FileReaderDecorate.prototype.loadend = function (fun) {
    var _this = this;

    this.reader.addEventListener('loadend', function () {
      fun(_this.reader.result);
    });
    return this;
  }; //?????????Blob????????????


  FileReaderDecorate.prototype.progress = function (fun) {
    var _this = this;

    this.reader.addEventListener('progress', function () {
      fun(_this.reader);
    });
    return this;
  };

  FileReaderDecorate.prototype.getStatus = function () {
    return this.reader.readyState;
  };

  FileReaderDecorate.prototype.getResult = function () {
    return this.reader.result;
  };

  FileReaderDecorate.prototype.start = function (type) {
    try {
      Reflect.get(this.reader, "readAs" + type).call(this.reader, this.file);
    } catch (error) {
      console.error(error);
    }

    return this;
  };

  FileReaderDecorate.prototype.stop = function () {
    this.reader.abort();
    return this;
  };

  return FileReaderDecorate;
}();

function readFile(file) {
  return new FileReaderDecorate(file);
}

exports.read = readFile;

function chooseFile(callback, options) {
  if (options === void 0) {
    options = {};
  }

  var input = document.createElement('input');
  input.setAttribute('type', 'file');
  input.setAttribute('accept', (options.accept || []).join(','));
  input.setAttribute('capture', options.capture || '');
  input.setAttribute('multiple', (options.multiple || false).toString());
  input.addEventListener('change', function (e) {
    callback(input.files);
  });
  (0, index_1.clickElement)(input);
}

exports.choose = chooseFile;

/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.clickElement = void 0;
/**
 * ??????dom??????????????????
 * @param el dom??????
 */

function clickElement(el) {
  if (el.click && el.click instanceof Function) el.click();else if (window.MouseEvent) {
    el.dispatchEvent(new MouseEvent('click'));
  } else {
    var event_1 = document.createEvent('MouseEvents');
    event_1.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    el.dispatchEvent(event_1);
  }
}

exports.clickElement = clickElement;

/***/ }),
/* 7 */
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

var index_1 = __webpack_require__(3);

var FileHelper = __importStar(__webpack_require__(5));

var message_1 = __webpack_require__(8);

var Http =
/** @class */
function () {
  function Http(options) {
    if (options === void 0) {
      options = {};
    }

    this.options = {
      timeout: 10000,
      baseUrl: "",
      contentType: 'application/json',
      responseType: 'json'
    };
    Object.assign(this.options, options);
  }
  /**
   * //XMLHttpRequest????????????
   * @param param
   * @returns
   */


  Http.prototype.ajax = function (param) {
    var xhr = new XMLHttpRequest();
    submit.call(this, xhr, param);
    return new PromiseHandle(xhr);
  };
  /**
   * XMLHttpRequest?????????????????????????????????????????????work??????????????????
   * @param param
   * @returns
   */


  Http.prototype.ajaxAsync = function (param) {
    var xhr = new XMLHttpRequest();
    submit.call(this, xhr, param, true);
    return xhr.response;
  };

  return Http;
}();

var PromiseHandle =
/** @class */
function () {
  function PromiseHandle(xhr) {
    var _this = this;

    this.xhr = xhr;
    this.xhr.addEventListener('load', function () {
      _this.result = _this.xhr.response;
    });
  }

  PromiseHandle.prototype.then = function (callback) {
    var _this = this;

    this.xhr.addEventListener('load', function () {
      callback(new message_1.Message(_this.xhr));
    });
    return this;
  };

  PromiseHandle.prototype.catch = function (callback) {
    var _this = this;

    this.xhr.addEventListener('error', function () {
      callback(new message_1.Message(_this.xhr));
    });
    return this;
  };

  PromiseHandle.prototype.finally = function (callback) {
    var _this = this;

    this.xhr.addEventListener('loadend', function () {
      callback(new message_1.Message(_this.xhr));
    });
    return this;
  };

  PromiseHandle.prototype.downProgress = function (callback) {
    var _this = this;

    this.xhr.addEventListener('progress', function (e) {
      if (e.lengthComputable) {
        var percentComplete = e.loaded / e.total;
        callback(new message_1.UploadMessage(_this.xhr, '?????????', percentComplete.toFixed(4)));
      } else {
        callback(new message_1.UploadMessage(_this.xhr, '??????????????????', null));
      }
    });
    return this;
  };

  PromiseHandle.prototype.upProgress = function (callback) {
    var _this = this;

    this.xhr.upload.addEventListener('progress', function (e) {
      if (e.lengthComputable) {
        var percentComplete = e.loaded / e.total;
        callback(new message_1.UploadMessage(_this.xhr, '?????????', percentComplete.toFixed(4)));
      } else {
        callback(new message_1.UploadMessage(_this.xhr, '??????????????????', null));
      }
    });
    return this;
  };

  PromiseHandle.prototype.abort = function () {
    this.xhr.abort();
    return this;
  };

  return PromiseHandle;
}();

function warp(xhr, param, isInitHeader, isAsync) {
  if (isInitHeader === void 0) {
    isInitHeader = true;
  }

  if (isAsync === void 0) {
    isAsync = false;
  }

  if (isInitHeader) {
    var header_1 = param.header || {};
    Object.keys(header_1).forEach(function (key) {
      xhr.setRequestHeader(key, header_1[key]);
    });
    if (!header_1['Content-Type']) xhr.setRequestHeader("Content-Type", this.options.contentType);
  }

  if (!isAsync) {
    xhr.timeout = param.timeout || this.options.timeout;
    xhr.responseType = param.type || this.options.responseType;
    xhr.addEventListener('abort', function () {
      console.warn('HTTP???????????????');
    });
    xhr.addEventListener('error', function () {
      console.warn(xhr.statusText);
    });
    xhr.addEventListener('timeout', function () {
      console.warn('HTTP????????????');
    });
  }
}

function submit(xhr, param, isAsync) {
  if (isAsync === void 0) {
    isAsync = false;
  }

  if (!param.method || param.method && param.method.toUpperCase() === "GET") {
    var url = this.options.baseUrl + (param.url || '');
    var suffix = url.match(/(?:\?.*)?$/);
    var paramString_1 = suffix === null ? "?" : "&";
    Object.keys(param.data || {}).forEach(function (key) {
      paramString_1 += encodeURIComponent(key) + "=" + encodeURIComponent(param.data[key].toString()) + "&";
    });
    xhr.open("GET", url + paramString_1, true);
    warp.call(this, xhr, param, true, isAsync);
  } else {
    xhr.open(param.method, this.options.baseUrl + (param.url || ''), true);
    var type = this.options.contentType;
    if (param.header && param.header['Content-Type']) type = param.header['Content-Type'];
    var excute = Reflect.get(HttpHandle, type) || Reflect.get(HttpHandle, this.options.contentType);
    warp.call(this, xhr, param, type !== "multipart/form-data", isAsync);
    excute.call(this, xhr, param);
  }
}

var HttpHandle = {
  'application/x-www-form-urlencoded': function (xhr, param) {
    var result = [];
    Object.keys(param.data || {}).forEach(function (key) {
      var val = param.data[key];
      result.push(encodeURIComponent(key) + "=" + encodeURIComponent(val ? val.toString() : val));
    });
    Promise.resolve().then(function () {
      xhr.send(result.join("&"));
    });
  },
  'text/plain': function (xhr, param) {
    var result = [];
    Object.keys(param.data || {}).forEach(function (key) {
      var val = param.data[key];
      result.push(key.replace(/[\s\=\\]/g, "\\$&") + "=" + (val ? val.toString().replace(/[\s\=\\]/g, "\\$&") : val));
    });
    Promise.resolve().then(function () {
      xhr.send(result.join("\r\n"));
    });
  },
  'application/json': function (xhr, param) {
    Promise.resolve().then(function () {
      xhr.send(JSON.stringify(param.data || {}));
    });
  },
  'multipart/form-data': function (xhr, param) {
    var header = param.header || {};
    Object.keys(header).forEach(function (key) {
      if (key === "Content-Type") return;
      xhr.setRequestHeader(key, header[key]);
    });

    if (window.FormData) {
      var formData_1 = new FormData();
      Object.keys(param.data || {}).forEach(function (key) {
        formData_1.append(key, param.data[key]);
      });
      if (param.file) Object.keys(param.file).forEach(function (key) {
        formData_1.append(key, param.file[key]);
      });
      Promise.resolve().then(function () {
        xhr.send(formData_1);
      });
    } else {
      var result_1 = [];
      Object.keys(param.data || {}).forEach(function (key) {
        var val = param.data[key];
        result_1.push("Content-Disposition: form-data; name=\"" + key + "\"\r\n\r\n" + (val ? val.toString() : val) + "\r\n");
      });
      var index_2 = 0;
      var boundary_1 = "---------------------------" + Date.now().toString(16);
      xhr.setRequestHeader("Content-Type", "multipart\/form-data; boundary=" + boundary_1);

      if (param.file && (0, index_1.getType)(param.file) === "Object") {
        Object.keys(param.file).forEach(function (key) {
          var file = param.file[key];
          var type = (0, index_1.getType)(file);

          if (type === "File" || type === "Blob") {
            index_2++;
            FileHelper.read(file).load(function (res) {
              var name = window.File && file instanceof File ? file.name : key + '.blob';
              result_1.push("Content-Disposition: form-data; name=\"" + key + "\"; filename=\"" + name + "\"\r\nContent-Type: " + (file.type ? file.type : "octet-stream") + "\r\n\r\n" + res.result + "\r\n");
            }).loadend(function () {
              index_2--;

              if (index_2 === 0) {
                var combineResult_1 = "--" + boundary_1 + "\r\n" + result_1.join("--" + boundary_1 + "\r\n") + "--" + boundary_1 + "--\r\n";
                Promise.resolve().then(function () {
                  xhr.send(combineResult_1);
                });
              }
            }).start("BinaryString");
          }
        });
      }

      if (index_2 === 0) {
        Promise.resolve().then(function () {
          xhr.send("--" + boundary_1 + "\r\n" + result_1.join("--" + boundary_1 + "\r\n") + "--" + boundary_1 + "--\r\n");
        });
      }
    }
  }
};
exports["default"] = Http;

/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.Message = exports.UploadMessage = void 0;

var Message =
/** @class */
function () {
  function Message(xhr) {
    this.status = xhr.status;
    this.message = xhr.statusText;
    this.data = xhr.response;
  }

  return Message;
}();

exports.Message = Message;

var UploadMessage =
/** @class */
function () {
  function UploadMessage(xhr, message, data) {
    this.status = xhr.status;
    this.message = message;
    this.data = data;
  }

  return UploadMessage;
}();

exports.UploadMessage = UploadMessage;

/***/ }),
/* 9 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.watch = exports.computed = exports.effect = exports.reactive = exports.toRefs = exports.toRef = exports.ref = void 0;

var type_1 = __webpack_require__(10);

var util_1 = __webpack_require__(11);

var index_1 = __webpack_require__(3); //??????-?????????????????????????????????


var bucket = new WeakMap(); //??????-?????????????????????

var reactiveMap = new Map(); //????????????????????????

var effectStack = new Array(); //??????????????????

var ITERATE_KEY = Symbol(); //MapKey????????????

var MAP_KEY_ITERATE_KEY = Symbol(); //???????????????key

var source = Symbol();
var getSource = util_1.getSourceValue.bind({
  source: source
});
var wrap = util_1.wrapValue.bind({
  reactive: reactive
}); //?????????????????????

var activeEffect = null; //????????????????????????

var shouldTrack = true; //????????????????????????

var arrayInstrumentations = {};

(function () {
  //?????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
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
  }); //??????????????????????????????length???????????????????????????????????????????????????

  ['pop', 'shift', 'splice'].forEach(function (method) {
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
  }); //??????????????????????????????length???????????????????????????????????????????????????

  ['push', 'unshift'].forEach(function (method) {
    var originMethod = Reflect.get(Array.prototype, method);
    Reflect.set(arrayInstrumentations, method, function () {
      var args = [];

      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }

      shouldTrack = false;
      var res = originMethod.apply(this, args.map(function (arg) {
        return getSource(arg);
      }));
      shouldTrack = true;
      return res;
    });
  });
})(); //Set-Map??????????????????


var mutableInstrumentations = {};

(function () {
  function iterationMethod() {
    var _a; //??????????????????


    var target = Reflect.get(this, source); //?????????????????????

    var itr = target[Symbol.iterator](); //????????????

    track(target, ITERATE_KEY); //????????????????????????

    return _a = {
      //???????????????
      next: function () {
        //??????????????????
        var _a = itr.next(),
            value = _a.value,
            done = _a.done;

        return {
          value: value ? [wrap(value[0]), wrap(value[1])] : value,
          done: done
        };
      }
    }, //???????????????
    _a[Symbol.iterator] = function () {
      return this;
    }, _a;
  }

  function valuesIterationMethod() {
    var _a; //??????????????????


    var target = Reflect.get(this, source); //?????????????????????

    var itr = target.values(); //????????????

    track(target, ITERATE_KEY); //????????????????????????

    return _a = {
      //???????????????
      next: function () {
        //??????????????????
        var _a = itr.next(),
            value = _a.value,
            done = _a.done;

        return {
          value: wrap(value),
          done: done
        };
      }
    }, //???????????????
    _a[Symbol.iterator] = function () {
      return this;
    }, _a;
  }

  function keysIterationMethod() {
    var _a; //??????????????????


    var target = Reflect.get(this, source); //?????????????????????

    var itr = target.keys(); //????????????

    track(target, MAP_KEY_ITERATE_KEY); //????????????????????????

    return _a = {
      //???????????????
      next: function () {
        //??????????????????
        var _a = itr.next(),
            value = _a.value,
            done = _a.done;

        return {
          value: wrap(value),
          done: done
        };
      }
    }, //???????????????
    _a[Symbol.iterator] = function () {
      return this;
    }, _a;
  }

  mutableInstrumentations.add = function (key) {
    //??????????????????
    var target = Reflect.get(this, source); //????????????

    var isReadonly = (reactiveMap.get(target) || {}).isReadonly;

    if (isReadonly) {
      console.log(target, "\u5BF9\u8C61\u662F\u53EA\u8BFB\u7684");
      return false;
    } //????????????


    var orgin = getSource(key); //????????????????????????

    var hadkey = target.has(orgin);
    var res = target.add(orgin); //???????????????????????????????????????

    if (!hadkey) trigger(target, orgin, type_1.TriggerType.ADD);
    return res;
  };

  mutableInstrumentations.get = function (key) {
    var _a; //??????????????????


    var target = Reflect.get(this, source); //????????????????????????

    var _b = reactiveMap.get(target) || {},
        isShadow = _b.isShadow,
        isReadonly = _b.isReadonly; //????????????, ??????????????????


    var orginKey = getSource(key); //??????????????????key???symbol??????????????????

    if (!isReadonly) track(target, orginKey);
    var res = target.get(orginKey); //????????????????????????????????????

    if (isShadow) return res; //???????????????????????????????????????????????????????????????????????????

    if (typeof res === 'object' && res != null) {
      var existionProxy = (_a = reactiveMap.get(res)) === null || _a === void 0 ? void 0 : _a.value;
      if (existionProxy) return existionProxy;
      return reactive(res, isShadow, isReadonly);
    } //???????????????????????????


    return res;
  };

  mutableInstrumentations.set = function (key, value) {
    //??????????????????
    var target = Reflect.get(this, source); //????????????????????????

    var isReadonly = (reactiveMap.get(target) || {}).isReadonly;

    if (isReadonly) {
      console.log(target, "\u5BF9\u8C61\u662F\u53EA\u8BFB\u7684");
      return false;
    } //????????????, ??????????????????


    var orginKey = getSource(key);
    var orginValue = getSource(value); //?????????????????????

    var hadKey = target.has(orginKey); //????????????

    var oldValue = target.get(orginKey); //???????????????????????????????????????????????????

    var res = target.set(orginKey, orginValue);
    if (!hadKey) trigger(target, orginKey, type_1.TriggerType.ADD);else if (oldValue !== orginValue && (oldValue === oldValue || orginValue === orginValue)) {
      trigger(target, orginKey, type_1.TriggerType.SET);
    }
    return res;
  };

  mutableInstrumentations.delete = function (key) {
    //??????????????????
    var target = Reflect.get(this, source); //????????????

    var orgin = getSource(key); //????????????????????????

    var hadkey = target.has(orgin);
    var res = target.delete(orgin); //????????????????????????????????????

    if (hadkey) trigger(target, orgin, type_1.TriggerType.DELETE);
    return res;
  };

  mutableInstrumentations.forEach = function (cb, thisArg) {
    var _this = this; //??????????????????


    var target = Reflect.get(this, source); //?????????key????????????

    track(target, ITERATE_KEY); //???????????????

    target.forEach(function (value, key) {
      cb.call(thisArg, wrap(value), wrap(key), _this);
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
  } //???????????????key??????????????????????????????


  var effects = depsMap.get(p); //??????????????????????????????

  var effectsToRun = new Set(); //????????????????????????????????????

  effects && effects.forEach(function (effectFn) {
    if (effectFn !== activeEffect) effectsToRun.add(effectFn);
  }); //type???ADD??????DELETE??????Map????????????????????????????????????????????????????????????

  if (type === type_1.TriggerType.ADD || type === type_1.TriggerType.DELETE || type === type_1.TriggerType.SET && (0, index_1.getType)(target) === 'Map') {
    var iterateEffects = depsMap.get(ITERATE_KEY);
    iterateEffects && iterateEffects.forEach(function (effectFn) {
      if (effectFn !== activeEffect) effectsToRun.add(effectFn);
    });
  } //type???ADD??????DELETE???target???Map?????????????????????????????????????????????


  if ((type === type_1.TriggerType.ADD || type === type_1.TriggerType.DELETE) && (0, index_1.getType)(target) === 'Map') {
    var iterateEffects = depsMap.get(MAP_KEY_ITERATE_KEY);
    iterateEffects && iterateEffects.forEach(function (effectFn) {
      if (effectFn !== activeEffect) effectsToRun.add(effectFn);
    });
  } //type???ADD???target?????????????????????????????????????????????????????????????????????delete???????????????????????????????????????????????????????????????


  if (type === type_1.TriggerType.ADD && Array.isArray(target)) {
    var lengthEffects = depsMap.get('length');
    lengthEffects && lengthEffects.forEach(function (effectFn) {
      if (effectFn !== activeEffect) effectsToRun.add(effectFn);
    });
  } //target??????????????????????????????length???????????????????????????length???????????????????????????


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
  } //?????????????????????


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
/**
 * ?????????????????????????????????????????????
 * @param value ???????????????
 * @param isReadonly ????????????
 * @returns { value: T }
 */


function ref(value, isReadonly) {
  if (isReadonly === void 0) {
    isReadonly = false;
  }

  var wrapper = {
    value: value
  }; //???????????????????????????Ref??????

  Object.defineProperty(wrapper, '__isRef', {
    value: true
  });
  return reactive({
    value: value
  }, true, isReadonly);
}

exports.ref = ref;

function toRef(val, key) {
  var wrapper = {
    get value() {
      return val[key];
    },

    set value(value) {
      val[key] = value;
    }

  }; //???????????????????????????Ref??????

  Object.defineProperty(wrapper, '__isRef', {
    value: true
  });
  return wrapper;
}

exports.toRef = toRef;

function toRefs(obj) {
  var ret = {};

  for (var key in obj) {
    Reflect.set(ret, key, toRef(obj, key));
  }

  return ret;
}

exports.toRefs = toRefs;
/**
 * ???????????????????????????????????????
 * @param value ?????????
 * @param isShadow true???????????????false????????????
 * @param isReadonly ????????????
 * @returns T
 */

function reactive(value, isShadow, isReadonly) {
  if (isShadow === void 0) {
    isShadow = false;
  }

  if (isReadonly === void 0) {
    isReadonly = false;
  }

  var proxy = new Proxy(value, {
    get: function (target, p, reciver) {
      var _a;

      if (p === source) return target; //????????????????????????

      if (Array.isArray(target) && arrayInstrumentations.hasOwnProperty(p)) {
        return Reflect.get(arrayInstrumentations, p, reciver);
      } //Set.Map ???????????????size??????


      if (target instanceof Map || target instanceof Set) {
        if (mutableInstrumentations.hasOwnProperty(p)) return Reflect.get(mutableInstrumentations, p, reciver);
        if (p === 'size') track(target, ITERATE_KEY);
        return Reflect.get(target, p, target);
      } //??????????????????key???symbol??????????????????


      if (!isReadonly && typeof p !== 'symbol') track(target, p);
      var res = Reflect.get(target, p, reciver); //????????????????????????????????????

      if (isShadow) return res; //???????????????????????????????????????????????????????????????????????????

      if (typeof res === 'object' && res != null) {
        var existionProxy = (_a = reactiveMap.get(res)) === null || _a === void 0 ? void 0 : _a.value;
        if (existionProxy) return existionProxy;
        return reactive(res, isShadow, isReadonly);
      } //???????????????????????????


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
      } //??????????????????????????????????????????


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
      } //????????????


      var oldValue = Reflect.get(target, p); //??????????????????

      var type = Array.isArray(target) ? Number(p) < target.length ? type_1.TriggerType.SET : type_1.TriggerType.ADD : Object.prototype.hasOwnProperty.call(target, p) ? type_1.TriggerType.SET : type_1.TriggerType.ADD; //????????????

      var orgin = getSource(value); //???????????????????????????????????????????????????

      var res = Reflect.set(target, p, orgin, reciver);

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
    isShadow: isShadow,
    isReadonly: isReadonly
  });
  return proxy;
}

exports.reactive = reactive;
/**
 * ?????????????????????
 * @param func ??????
 * @param options ??????
 * @returns effectFunc
 */

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

exports.effect = effect;
/**
 * ??????????????????
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
    //???????????????
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
/**
 * ?????????????????????
 * @param source ????????????????????????????????????
 * @param cb ???????????????????????????
 * @param options ??????
 */


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

exports.watch = watch;

/***/ }),
/* 10 */
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
/* 11 */
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.wrapValue = exports.getSourceValue = void 0;
/**
 * ????????????
 * @param value
 * @returns
 */

var getSourceValue = function (value) {
  return Reflect.get(typeof value === 'object' && value !== null ? value : {}, this.source || Symbol()) || value;
};

exports.getSourceValue = getSourceValue;

var wrapValue = function (value) {
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