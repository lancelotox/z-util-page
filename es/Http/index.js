import { getType } from '../deepClone/index';
import * as FileHelper from '../FileHelper/index';
import { Message, UploadMessage } from './message';
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
                    if (typeof func === 'function')
                        this.requestArr.push(func);
                },
                response(func) {
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
            callback(new Message(this.xhr));
        });
        return this;
    }
    catch(callback) {
        this.xhr.addEventListener('error', () => {
            callback(new Message(this.xhr));
        });
        return this;
    }
    finally(callback) {
        this.xhr.addEventListener('loadend', () => {
            callback(new Message(this.xhr));
        });
        return this;
    }
    progress(callback) {
        this.xhr.addEventListener('progress', () => {
            callback(new Message(this.xhr));
        });
        return this;
    }
    downProgress(callback) {
        this.xhr.addEventListener('progress', (e) => {
            if (e.lengthComputable) {
                var percentComplete = e.loaded / e.total;
                callback(new UploadMessage(this.xhr, '下载中', percentComplete.toFixed(4)));
            }
            else {
                callback(new UploadMessage(this.xhr, '无法计算进度', null));
            }
        });
        return this;
    }
    upProgress(callback) {
        this.xhr.upload.addEventListener('progress', (e) => {
            if (e.lengthComputable) {
                var percentComplete = e.loaded / e.total;
                callback(new UploadMessage(this.xhr, '上传中', percentComplete.toFixed(4)));
            }
            else {
                callback(new UploadMessage(this.xhr, '无法计算进度', null));
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
function petchParam(param) {
    if (param.data === undefined)
        param.data = {};
    if (param.header === undefined)
        param.header = {};
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
            if (param.file && getType(param.file) === "Object") {
                Object.keys(param.file).forEach(key => {
                    let file = param.file[key];
                    let type = getType(file);
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
export default Http;
