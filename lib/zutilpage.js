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

exports.parseUrl = index_4.default;

var index_5 = __importDefault(__webpack_require__(5));

exports.generateUUID = index_5.default;

var FileHelper = __importStar(__webpack_require__(6));

exports.FileHelper = FileHelper;

var index_6 = __importDefault(__webpack_require__(8));

exports.Http = index_6.default;

var Reactive = __importStar(__webpack_require__(10));

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
 * 函数节流
 * @param func 待处理函数
 * @param wait 函数执行最短间隔时间
 * @param option.leading 首次是否执行
 * @param option.trailing 结束是否执行
 */

function throttle(func, wait, option) {
  var options = Object.assign((0, index_1.deepClone)(defaultConfig), option || {});
  if (options.leading === false && options.trailing === false) throw 'leading, trailing不能同时为false';
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
 * 深拷贝
 * @param value 待克隆值
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
 * 清理缓存
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
 * while循环
 * @param list 待循环列表
 * @param handle 循环行为
 */


function forEach(list, handle) {
  var index = -1;
  var length = list.length;

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
  var Url = null;
  var param = {};

  try {
    var temp = new URL(url);
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
  var search = Url.search.slice(1);
  var paramList = search.split('&').map(function (item) {
    return item.split('=');
  });
  paramList.forEach(function (item) {
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
/* 6 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.choose = exports.read = exports.write = void 0;

var index_1 = __webpack_require__(7);
/**
 * H5文件下载方法
 * @param url 资源链接或者blob对象
 * @param saveFileName 保存文件名
 */


function saveFile(file, saveFileName) {
  var url = '';

  if (typeof file === 'string') {
    url = file;
  } else {
    try {
      url = URL.createObjectURL(file);
    } catch (error) {
      console.log(error);
    }
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
  } //读取操作发生中断时触发


  FileReaderDecorate.prototype.abort = function (fun) {
    var _this = this;

    this.reader.addEventListener('abort', function () {
      fun(_this.reader);
    });
    return this;
  }; //读取操作发生错误时触发。


  FileReaderDecorate.prototype.error = function (fun) {
    var _this = this;

    this.reader.addEventListener('error', function () {
      fun(_this.reader.error);
    });
    return this;
  }; //读取操作完成时触发。


  FileReaderDecorate.prototype.load = function (fun) {
    var _this = this;

    this.reader.addEventListener('load', function () {
      fun(_this.reader);
    });
    return this;
  }; //读取操作开始时触发。


  FileReaderDecorate.prototype.loadstart = function (fun) {
    var _this = this;

    this.reader.addEventListener('loadstart', function () {
      fun(_this.reader);
    });
    return this;
  }; //读取操作结束时（要么成功，要么失败）触发。


  FileReaderDecorate.prototype.loadend = function (fun) {
    var _this = this;

    this.reader.addEventListener('loadend', function () {
      fun(_this.reader.result);
    });
    return this;
  }; //在读取Blob时触发。


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
    var event_1 = document.createEvent('MouseEvents');
    event_1.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    el.dispatchEvent(event_1);
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

var index_1 = __webpack_require__(3);

var FileHelper = __importStar(__webpack_require__(6));

var message_1 = __webpack_require__(9);

var Http =
/** @class */
function () {
  function Http(options) {
    if (options === void 0) {
      options = {};
    }

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


  Http.prototype.ajax = function (param) {
    var xhr = new XMLHttpRequest();
    submit.call(this, xhr, param);
    return new PromiseHandle(xhr);
  };
  /**
   * XMLHttpRequest同步请求，绝大多数情况下只能在work进程内使用。
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
        callback(new message_1.UploadMessage(_this.xhr, '下载中', percentComplete.toFixed(4)));
      } else {
        callback(new message_1.UploadMessage(_this.xhr, '无法计算进度', null));
      }
    });
    return this;
  };

  PromiseHandle.prototype.upProgress = function (callback) {
    var _this = this;

    this.xhr.upload.addEventListener('progress', function (e) {
      if (e.lengthComputable) {
        var percentComplete = e.loaded / e.total;
        callback(new message_1.UploadMessage(_this.xhr, '上传中', percentComplete.toFixed(4)));
      } else {
        callback(new message_1.UploadMessage(_this.xhr, '无法计算进度', null));
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

function warp(xhr, param, isInitHeader, isAsync, isGet) {
  if (isInitHeader === void 0) {
    isInitHeader = true;
  }

  if (isAsync === void 0) {
    isAsync = false;
  }

  if (isGet === void 0) {
    isGet = false;
  }

  if (isInitHeader) {
    var header_1 = param.header || {};
    Object.keys(header_1).forEach(function (key) {
      if (isGet && key === 'ContentType') return;
      xhr.setRequestHeader(upperCase(key), header_1[key]);
    });
    if (!isGet && !header_1.ContentType) xhr.setRequestHeader("Content-Type", this.options.contentType);
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

function submit(xhr, param, isAsync) {
  if (isAsync === void 0) {
    isAsync = false;
  }

  if (!param.method || param.method && param.method.toUpperCase() === "GET") {
    var url = this.options.baseUrl + (param.url || '');
    var paramString_1 = '';

    if (param.data && Object.keys(param.data).length !== 0) {
      var suffix = url.match(/(?:\?.*)$/);
      paramString_1 = suffix === null ? "?" : "&";
      Object.keys(param.data || {}).forEach(function (key) {
        paramString_1 += encodeURIComponent(key) + "=" + encodeURIComponent(param.data[key].toString()) + "&";
      });
    }

    xhr.open("GET", url + paramString_1, true);
    warp.call(this, xhr, param, true, isAsync, true);
    xhr.send(null);
  } else {
    xhr.open(param.method, this.options.baseUrl + (param.url || ''), true);
    var type = this.options.contentType;
    if (param.header && param.header.ContentType) type = param.header.ContentType;
    var excute = Reflect.get(HttpHandle, type) || Reflect.get(HttpHandle, 'text/plain');
    warp.call(this, xhr, param, type !== "multipart/form-data", isAsync, false);
    excute.call(this, xhr, param);
  }
}

function upperCase(val) {
  if (val.length < 1) return val;
  var charts = val.split('');
  charts[0] = charts[0].toLocaleUpperCase();
  return charts.map(function (c, i) {
    if (c.match(/[A-Z]/) !== null && i !== 0) return "-".concat(c);
    return c;
  }).join('');
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
      if (key === "ContentType") return;
      xhr.setRequestHeader(upperCase(key), header[key]);
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
      xhr.setRequestHeader("Content-Type", "multipart/form-data; boundary=" + boundary_1);

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
/* 9 */
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
/* 10 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.watch = exports.computed = exports.effect = exports.reactive = exports.toRefs = exports.toRef = exports.ref = void 0;

var type_1 = __webpack_require__(11);

var util_1 = __webpack_require__(12);

var index_1 = __webpack_require__(3); //对象-副作用函数映射关系字典


var bucket = new WeakMap(); //对象-响应式对象字典

var reactiveMap = new Map(); //副作用函数执行栈

var effectStack = new Array(); //对象迭代标识

var ITERATE_KEY = Symbol(); //MapKey迭代标识

var MAP_KEY_ITERATE_KEY = Symbol(); //取原始对象key

var source = Symbol();
var getSource = util_1.getSourceValue.bind({
  source: source
});
var wrap = util_1.wrapValue.bind({
  reactive: reactive
}); //活动副作用函数

var activeEffect = null; //是否进行依赖追踪

var shouldTrack = true; //数组原型方法代理

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
      if (res === false || res === -1) res = originMethod.apply(Reflect.get(this, source), args);
      return res;
    });
  }); //在数组执行删除等涉及length属性修改的原型方法时，关闭依赖追踪

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
  }); //在数组执行增加等涉及length属性修改的原型方法时，关闭依赖追踪

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
})(); //Set-Map原型方法代理


var mutableInstrumentations = {};

(function () {
  function iterationMethod() {
    var _a; //获取原始对象


    var target = Reflect.get(this, source); //获取迭代器对象

    var itr = target[Symbol.iterator](); //建立响应

    track(target, ITERATE_KEY); //返回自定义迭代器

    return _a = {
      //迭代器协议
      next: function () {
        //获取原始数据
        var _a = itr.next(),
            value = _a.value,
            done = _a.done;

        return {
          value: value ? [wrap(value[0]), wrap(value[1])] : value,
          done: done
        };
      }
    }, //可迭代协议
    _a[Symbol.iterator] = function () {
      return this;
    }, _a;
  }

  function valuesIterationMethod() {
    var _a; //获取原始对象


    var target = Reflect.get(this, source); //获取迭代器对象

    var itr = target.values(); //建立响应

    track(target, ITERATE_KEY); //返回自定义迭代器

    return _a = {
      //迭代器协议
      next: function () {
        //获取原始数据
        var _a = itr.next(),
            value = _a.value,
            done = _a.done;

        return {
          value: wrap(value),
          done: done
        };
      }
    }, //可迭代协议
    _a[Symbol.iterator] = function () {
      return this;
    }, _a;
  }

  function keysIterationMethod() {
    var _a; //获取原始对象


    var target = Reflect.get(this, source); //获取迭代器对象

    var itr = target.keys(); //建立响应

    track(target, MAP_KEY_ITERATE_KEY); //返回自定义迭代器

    return _a = {
      //迭代器协议
      next: function () {
        //获取原始数据
        var _a = itr.next(),
            value = _a.value,
            done = _a.done;

        return {
          value: wrap(value),
          done: done
        };
      }
    }, //可迭代协议
    _a[Symbol.iterator] = function () {
      return this;
    }, _a;
  }

  mutableInstrumentations.add = function (key) {
    //获取原始对象
    var target = Reflect.get(this, source); //是否只读

    var isReadonly = (reactiveMap.get(target) || {}).isReadonly;

    if (isReadonly) {
      console.log(target, "\u5BF9\u8C61\u662F\u53EA\u8BFB\u7684");
      return false;
    } //取原始值


    var orgin = getSource(key); //判断值是否已存在

    var hadkey = target.has(orgin);
    var res = target.add(orgin); //当值不存在时触发副作用函数

    if (!hadkey) trigger(target, orgin, type_1.TriggerType.ADD);
    return res;
  };

  mutableInstrumentations.get = function (key) {
    var _a; //获取原始对象


    var target = Reflect.get(this, source); //是否浅代理、只读

    var _b = reactiveMap.get(target) || {},
        isShadow = _b.isShadow,
        isReadonly = _b.isReadonly; //取原始值, 避免数据污染


    var orginKey = getSource(key); //只读对象或者key为symbol时不进行追踪

    if (!isReadonly) track(target, orginKey);
    var res = target.get(orginKey); //浅代理模式直接返回原始值

    if (isShadow) return res; //非浅代理模式，如果原始值不是基本类型进行响应式包装

    if (typeof res === 'object' && res != null) {
      var existionProxy = (_a = reactiveMap.get(res)) === null || _a === void 0 ? void 0 : _a.value;
      if (existionProxy) return existionProxy;
      return reactive(res, isShadow, isReadonly);
    } //否则返回基本类型值


    return res;
  };

  mutableInstrumentations.set = function (key, value) {
    //获取原始对象
    var target = Reflect.get(this, source); //是否浅代理、只读

    var isReadonly = (reactiveMap.get(target) || {}).isReadonly;

    if (isReadonly) {
      console.log(target, "\u5BF9\u8C61\u662F\u53EA\u8BFB\u7684");
      return false;
    } //取原始值, 避免数据污染


    var orginKey = getSource(key);
    var orginValue = getSource(value); //判断是否已存在

    var hadKey = target.has(orginKey); //取出旧值

    var oldValue = target.get(orginKey); //非浅代理时设置原始对象而非响应对象

    var res = target.set(orginKey, orginValue);
    if (!hadKey) trigger(target, orginKey, type_1.TriggerType.ADD);else if (oldValue !== orginValue && (oldValue === oldValue || orginValue === orginValue)) {
      trigger(target, orginKey, type_1.TriggerType.SET);
    }
    return res;
  };

  mutableInstrumentations.delete = function (key) {
    //获取原始对象
    var target = Reflect.get(this, source); //取原始值

    var orgin = getSource(key); //判断值是否已存在

    var hadkey = target.has(orgin);
    var res = target.delete(orgin); //当值存在时触发副作用函数

    if (hadkey) trigger(target, orgin, type_1.TriggerType.DELETE);
    return res;
  };

  mutableInstrumentations.forEach = function (cb, thisArg) {
    var _this = this; //获取原始对象


    var target = Reflect.get(this, source); //与迭代key建立响应

    track(target, ITERATE_KEY); //调用原函数

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
  } //取出所有与key直接相关的副作用函数


  var effects = depsMap.get(p); //待执行副作用函数队列

  var effectsToRun = new Set(); //排除正在运行的副作用函数

  effects && effects.forEach(function (effectFn) {
    if (effectFn !== activeEffect) effectsToRun.add(effectFn);
  }); //type为ADD或者DELETE或为Map类型设置值时，取出迭代相关副作用函数执行

  if (type === type_1.TriggerType.ADD || type === type_1.TriggerType.DELETE || type === type_1.TriggerType.SET && (0, index_1.getType)(target) === 'Map') {
    var iterateEffects = depsMap.get(ITERATE_KEY);
    iterateEffects && iterateEffects.forEach(function (effectFn) {
      if (effectFn !== activeEffect) effectsToRun.add(effectFn);
    });
  } //type为ADD或者DELETE且target为Map时，取出迭代相关副作用函数执行


  if ((type === type_1.TriggerType.ADD || type === type_1.TriggerType.DELETE) && (0, index_1.getType)(target) === 'Map') {
    var iterateEffects = depsMap.get(MAP_KEY_ITERATE_KEY);
    iterateEffects && iterateEffects.forEach(function (effectFn) {
      if (effectFn !== activeEffect) effectsToRun.add(effectFn);
    });
  } //type为ADD且target为数组时，取出数组迭代相关副作用函数执行（使用delete删除数组元素不会改变数组长度，故无需触发）


  if (type === type_1.TriggerType.ADD && Array.isArray(target)) {
    var lengthEffects = depsMap.get('length');
    lengthEffects && lengthEffects.forEach(function (effectFn) {
      if (effectFn !== activeEffect) effectsToRun.add(effectFn);
    });
  } //target为数组且直接操作数组length属性时，取出大于新length值的副作用函数执行


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
  } //执行副作用函数


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
 * 代理基本类型值，返回响应式数据
 * @param value 基本类型值
 * @param isReadonly 是否只读
 * @returns { value: T }
 */


function ref(value, isReadonly) {
  if (isReadonly === void 0) {
    isReadonly = false;
  }

  var wrapper = {
    value: value
  }; //定义变量标识对象为Ref对象

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

  }; //定义变量标识对象为Ref对象

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
 * 代理对象值，返回响应式数据
 * @param value 对象值
 * @param isShadow true为深代理，false为浅代理
 * @param isReadonly 是否只读
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
      var res = Reflect.get(target, p, reciver); //浅代理模式直接返回原始值

      if (isShadow) return res; //非浅代理模式，如果原始值不是基本类型进行响应式包装

      if (typeof res === 'object' && res != null) {
        var existionProxy = (_a = reactiveMap.get(res)) === null || _a === void 0 ? void 0 : _a.value;
        if (existionProxy) return existionProxy;
        return reactive(res, isShadow, isReadonly);
      } //否则返回基本类型值


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
      } //判断变量是否不处于对象原型上


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
      } //取出旧值


      var oldValue = Reflect.get(target, p); //判断操作类型

      var type = Array.isArray(target) ? Number(p) < target.length ? type_1.TriggerType.SET : type_1.TriggerType.ADD : Object.prototype.hasOwnProperty.call(target, p) ? type_1.TriggerType.SET : type_1.TriggerType.ADD; //取原始值

      var orgin = getSource(value); //非浅代理时设置原始对象而非响应对象

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
 * 创建副作用函数
 * @param func 函数
 * @param options 配置
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
 * 监听响应式数据
 * @param source 副作用函数或者响应式对象
 * @param cb 数据变化后回调函数
 * @param options 配置
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