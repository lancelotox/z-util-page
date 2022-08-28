import { getType } from '../deepClone/index';
import { readFile } from '../file/index';
var Http = /** @class */ (function () {
    function Http(options) {
        if (options === void 0) { options = {}; }
        this.options = {
            timeout: 10000,
            baseUrl: "",
            contentType: 'application/json',
            responseType: 'json'
        };
        Object.assign(this.options, options);
    }
    Http.prototype.ajax = function (param) {
        var xhr = new XMLHttpRequest();
        submit.call(this, xhr, param);
        return new PromiseHandle(xhr);
    };
    Http.prototype.ajaxAsync = function (param) {
        var xhr = new XMLHttpRequest();
        submit.call(this, xhr, param, true);
        return xhr.response;
    };
    return Http;
}());
export default Http;
var PromiseHandle = /** @class */ (function () {
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
            callback(_this.xhr.response);
        });
        return this;
    };
    PromiseHandle.prototype.catch = function (callback) {
        var _this = this;
        this.xhr.addEventListener('error', function () {
            callback(_this.xhr.statusText);
        });
        return this;
    };
    PromiseHandle.prototype.finally = function (callback) {
        var _this = this;
        this.xhr.addEventListener('loadend', function () {
            callback(_this.xhr);
        });
        return this;
    };
    PromiseHandle.prototype.progress = function (callback) {
        this.xhr.addEventListener('progress', function (e) {
            callback(e);
        });
        return this;
    };
    PromiseHandle.prototype.abort = function () {
        this.xhr.abort();
        return this;
    };
    return PromiseHandle;
}());
function warp(xhr, param, isInitHeader, isAsync) {
    if (isInitHeader === void 0) { isInitHeader = true; }
    if (isAsync === void 0) { isAsync = false; }
    if (isInitHeader) {
        var header_1 = param.header || {};
        Object.keys(header_1).forEach(function (key) {
            xhr.setRequestHeader(key, header_1[key]);
        });
        if (!header_1['Content-Type'])
            xhr.setRequestHeader("Content-Type", this.options.contentType);
    }
    if (!isAsync) {
        xhr.timeout = param.timeout || this.options.timeout;
        xhr.responseType = param.type || this.options.responseType;
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
    if (!param.method || (param.method && param.method.toUpperCase() === "GET")) {
        var url = this.options.baseUrl + (param.url || '');
        var suffix = url.match(/(?:\?.*)?$/);
        var paramString_1 = suffix === null ? "?" : "&";
        Object.keys(param.data || {}).forEach(function (key) {
            paramString_1 += (encodeURIComponent(key) + "=" + encodeURIComponent(param.data[key].toString()) + "&");
        });
        xhr.open("GET", url + paramString_1, true);
        warp.call(this, xhr, param, true, isAsync);
    }
    else {
        xhr.open(param.method, this.options.baseUrl + (param.url || ''), true);
        var type = this.options.contentType;
        if (param.header && param.header['Content-Type'])
            type = param.header['Content-Type'];
        var excute = Reflect.get(HttpHandle, type) || Reflect.get(HttpHandle, this.options.contentType);
        warp.call(this, xhr, param, type !== "multipart/form-data", isAsync);
        excute.call(this, xhr, param);
    }
}
var HttpHandle = {
    'application/x-www-form-urlencoded': function (xhr, param) {
        var result = [];
        Object.keys(param.data || {}).forEach(function (key) {
            result.push(encodeURIComponent(key) + "=" + encodeURIComponent(param.data[key].toString()));
        });
        Promise.resolve().then(function () {
            xhr.send(result.join("&"));
        });
    },
    'text/plain': function (xhr, param) {
        var result = [];
        Object.keys(param.data || {}).forEach(function (key) {
            result.push(key.replace(/[\s\=\\]/g, "\\$&") + "=" + param.data[key].toString().replace(/[\s\=\\]/g, "\\$&"));
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
            if (key === "Content-Type")
                return;
            xhr.setRequestHeader(key, header[key]);
        });
        if (!window.FormData) {
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
                result_1.push("Content-Disposition: form-data; name=\"" + key + "\"\r\n\r\n" + param.data[key].toString() + "\r\n");
            });
            var index_1 = 0;
            var boundary_1 = "---------------------------" + Date.now().toString(16);
            xhr.setRequestHeader("Content-Type", "multipart\/form-data; boundary=" + boundary_1);
            if (param.file && getType(param.file) === "Object") {
                Object.keys(param.file).forEach(function (key) {
                    var file = param.file[key];
                    var type = getType(file);
                    if (type === "File" || type === "Blob") {
                        index_1++;
                        readFile(file).load(function (res) {
                            var name = (window.File && file instanceof File) ? file.name : (key + '.blob');
                            result_1.push("Content-Disposition: form-data; name=\"" +
                                key + "\"; filename=\"" + name +
                                "\"\r\nContent-Type: " + (file.type ? file.type : "octet-stream") + "\r\n\r\n" + res.result + "\r\n");
                        }).loadend(function () {
                            index_1--;
                            if (index_1 === 0) {
                                var combineResult_1 = "--" + boundary_1 + "\r\n" + result_1.join("--" + boundary_1 + "\r\n") + "--" + boundary_1 + "--\r\n";
                                Promise.resolve().then(function () {
                                    xhr.send(combineResult_1);
                                });
                            }
                        }).start("BinaryString");
                    }
                });
            }
            if (index_1 === 0) {
                Promise.resolve().then(function () {
                    xhr.send("--" + boundary_1 + "\r\n" + result_1.join("--" + boundary_1 + "\r\n") + "--" + boundary_1 + "--\r\n");
                });
            }
        }
    }
};
