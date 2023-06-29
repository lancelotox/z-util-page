"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../deepClone/index");
const FileHelper = __importStar(require("../file/index"));
const message_1 = require("./message");
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
        this.xhr.addEventListener('progress', (e) => {
            if (e.lengthComputable) {
                var percentComplete = e.loaded / e.total;
                callback(new message_1.UploadMessage(this.xhr, '下载中', percentComplete.toFixed(4)));
            }
            else {
                callback(new message_1.UploadMessage(this.xhr, '无法计算进度', null));
            }
        });
        return this;
    }
    upProgress(callback) {
        this.xhr.upload.addEventListener('progress', (e) => {
            if (e.lengthComputable) {
                var percentComplete = e.loaded / e.total;
                callback(new message_1.UploadMessage(this.xhr, '上传中', percentComplete.toFixed(4)));
            }
            else {
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
            if (isGet && key === 'ContentType')
                return;
            xhr.setRequestHeader(upperCase(key), header[key]);
        });
        if (!isGet && !header.ContentType)
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
function submit(xhr, param, isAsync = false) {
    if (!param.method || (param.method && param.method.toUpperCase() === "GET")) {
        let url = this.options.baseUrl + (param.url || '');
        let paramString = '';
        if (param.data && Object.keys(param.data).length !== 0) {
            let suffix = url.match(/(?:\?.*)$/);
            paramString = suffix === null ? "?" : "&";
            Object.keys(param.data || {}).forEach(key => {
                paramString += (encodeURIComponent(key) + "=" + encodeURIComponent(param.data[key].toString()) + "&");
            });
        }
        xhr.open("GET", url + paramString, true);
        warp.call(this, xhr, param, true, isAsync, true);
        xhr.send(null);
    }
    else {
        xhr.open(param.method, this.options.baseUrl + (param.url || ''), true);
        let type = this.options.contentType;
        if (param.header && param.header.ContentType)
            type = param.header.ContentType;
        const excute = Reflect.get(HttpHandle, type) || Reflect.get(HttpHandle, 'text/plain');
        warp.call(this, xhr, param, type !== "multipart/form-data", isAsync, false);
        excute.call(this, xhr, param);
    }
}
function upperCase(val) {
    if (val.length < 1)
        return val;
    let charts = val.split('');
    charts[0] = charts[0].toLocaleUpperCase();
    return charts.map((c, i) => {
        if (c.match(/[A-Z]/) !== null && i !== 0)
            return `-${c}`;
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
            if (key === "ContentType")
                return;
            xhr.setRequestHeader(upperCase(key), header[key]);
        });
        if (window.FormData) {
            const formData = new FormData();
            Object.keys(param.data || {}).forEach(key => {
                formData.append(key, param.data[key]);
            });
            if (param.file)
                Object.keys(param.file).forEach(key => {
                    formData.append(key, param.file[key]);
                });
            Promise.resolve().then(() => {
                xhr.send(formData);
            });
        }
        else {
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
                            let name = (window.File && file instanceof File) ? file.name : (key + '.blob');
                            result.push("Content-Disposition: form-data; name=\"" +
                                key + "\"; filename=\"" + name +
                                "\"\r\nContent-Type: " + (file.type ? file.type : "octet-stream") + "\r\n\r\n" + res.result + "\r\n");
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
exports.default = Http;
