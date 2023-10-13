"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var index_1 = require("../deepClone/index");
var FileHelper = tslib_1.__importStar(require("../file/index"));
var message_1 = require("./message");
var Http = /** @class */ (function () {
    function Http(options) {
        if (options === void 0) { options = {}; }
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
                request: function (func) {
                    if (typeof func === 'function')
                        this.requestArr.push(func);
                },
                response: function (func) {
                    if (typeof func === 'function')
                        this.responseArr.push(func);
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
    Object.defineProperty(Http.prototype, "ajax", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (param) {
            var xhr = new XMLHttpRequest();
            submit.call(this, xhr, petchParam(param));
            return new PromiseHandle(xhr);
        }
    });
    /**
     * XMLHttpRequest同步请求，绝大多数情况下只能在work进程内使用。
     * @param param
     * @returns
     */
    Object.defineProperty(Http.prototype, "ajaxAsync", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (param) {
            var xhr = new XMLHttpRequest();
            submit.call(this, xhr, petchParam(param), true);
            return xhr.response;
        }
    });
    return Http;
}());
var PromiseHandle = /** @class */ (function () {
    function PromiseHandle(xhr) {
        var _this = this;
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
        this.xhr.addEventListener('load', function () {
            _this.result = _this.xhr.response;
        });
    }
    Object.defineProperty(PromiseHandle.prototype, "then", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (callback) {
            var _this = this;
            this.xhr.addEventListener('load', function () {
                callback(new message_1.Message(_this.xhr));
            });
            return this;
        }
    });
    Object.defineProperty(PromiseHandle.prototype, "catch", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (callback) {
            var _this = this;
            this.xhr.addEventListener('error', function () {
                callback(new message_1.Message(_this.xhr));
            });
            return this;
        }
    });
    Object.defineProperty(PromiseHandle.prototype, "finally", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (callback) {
            var _this = this;
            this.xhr.addEventListener('loadend', function () {
                callback(new message_1.Message(_this.xhr));
            });
            return this;
        }
    });
    Object.defineProperty(PromiseHandle.prototype, "progress", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (callback) {
            var _this = this;
            this.xhr.addEventListener('progress', function () {
                callback(new message_1.Message(_this.xhr));
            });
            return this;
        }
    });
    Object.defineProperty(PromiseHandle.prototype, "downProgress", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (callback) {
            var _this = this;
            this.xhr.addEventListener('progress', function (e) {
                if (e.lengthComputable) {
                    var percentComplete = e.loaded / e.total;
                    callback(new message_1.UploadMessage(_this.xhr, '下载中', percentComplete.toFixed(4)));
                }
                else {
                    callback(new message_1.UploadMessage(_this.xhr, '无法计算进度', null));
                }
            });
            return this;
        }
    });
    Object.defineProperty(PromiseHandle.prototype, "upProgress", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (callback) {
            var _this = this;
            this.xhr.upload.addEventListener('progress', function (e) {
                if (e.lengthComputable) {
                    var percentComplete = e.loaded / e.total;
                    callback(new message_1.UploadMessage(_this.xhr, '上传中', percentComplete.toFixed(4)));
                }
                else {
                    callback(new message_1.UploadMessage(_this.xhr, '无法计算进度', null));
                }
            });
            return this;
        }
    });
    Object.defineProperty(PromiseHandle.prototype, "abort", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function () {
            this.xhr.abort();
            return this;
        }
    });
    return PromiseHandle;
}());
function warp(xhr, param, isInitHeader, isAsync, isGet) {
    if (isInitHeader === void 0) { isInitHeader = true; }
    if (isAsync === void 0) { isAsync = false; }
    if (isGet === void 0) { isGet = false; }
    if (isInitHeader) {
        var header_1 = param.header || {};
        Object.keys(header_1).forEach(function (key) {
            if (isGet && key === 'ContentType')
                return;
            xhr.setRequestHeader(upperCase(key), header_1[key]);
        });
        if (!isGet && !header_1.ContentType)
            xhr.setRequestHeader("Content-Type", this.options.contentType);
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
    if (isAsync === void 0) { isAsync = false; }
    this.Interceptor.requestArr.forEach(function (func) {
        param = func(param) || param;
    });
    var baseUrl = this.options.baseUrl;
    if (param.baseUrl !== undefined) {
        baseUrl = String(param.baseUrl);
    }
    var url = baseUrl + (param.url || '');
    var paramString = '';
    if (param.param && Object.keys(param.param).length !== 0) {
        var suffix = url.match(/(?:\?.*)$/);
        paramString = suffix === null ? "?" : "&";
        Object.keys(param.param || {}).forEach(function (key) {
            paramString += (encodeURIComponent(key) + "=" + encodeURIComponent(param.param[key].toString()) + "&");
        });
    }
    if (!param.method || (param.method && param.method.toUpperCase() === "GET")) {
        xhr.open("GET", url + paramString, true);
        warp.call(this, xhr, param, true, isAsync, true);
        xhr.send(null);
    }
    else {
        xhr.open(param.method, url + paramString, true);
        var type = this.options.contentType;
        if (param.header && param.header.ContentType)
            type = param.header.ContentType;
        var excute = Reflect.get(HttpHandle, type) || Reflect.get(HttpHandle, 'text/plain');
        warp.call(this, xhr, param, type !== "multipart/form-data", isAsync, false);
        excute.call(this, xhr, param);
    }
}
function upperCase(val) {
    if (val.length < 1)
        return val;
    var charts = val.split('');
    charts[0] = charts[0].toLocaleUpperCase();
    return charts.map(function (c, i) {
        if (c.match(/[A-Z]/) !== null && i !== 0)
            return "-".concat(c);
        return c;
    }).join('');
}
function petchParam(param) {
    if (param.data === undefined)
        param.data = {};
    if (param.header === undefined)
        param.header = {};
    return param;
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
            if (key === "ContentType")
                return;
            xhr.setRequestHeader(upperCase(key), header[key]);
        });
        if (window.FormData) {
            var formData_1 = new FormData();
            Object.keys(param.data || {}).forEach(function (key) {
                formData_1.append(key, param.data[key]);
            });
            if (param.file)
                Object.keys(param.file).forEach(function (key) {
                    formData_1.append(key, param.file[key]);
                });
            Promise.resolve().then(function () {
                xhr.send(formData_1);
            });
        }
        else {
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
                            var name = (window.File && file instanceof File) ? file.name : (key + '.blob');
                            result_1.push("Content-Disposition: form-data; name=\"" +
                                key + "\"; filename=\"" + name +
                                "\"\r\nContent-Type: " + (file.type ? file.type : "octet-stream") + "\r\n\r\n" + res.result + "\r\n");
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
exports.default = Http;
