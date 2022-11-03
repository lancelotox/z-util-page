import { getType } from '../deepClone/index';
import * as FileHelper from '../file/index';
import { Message, UploadMessage } from './message';

import type { ResponseMessage } from './message';

class Http {
    public options: HttpOptions = {
        timeout: 10000,
        baseUrl: "",
        contentType: 'application/json',
        responseType: 'json'
    }
    public constructor(options: object = {}) {
        Object.assign(this.options, options);
    }
    //XMLHttpRequest异步请求
    public ajax(param: Param) {
        const xhr = new XMLHttpRequest();
        submit.call(this, xhr, param);
        return new PromiseHandle(xhr);
    }
    //XMLHttpRequest同步请求，绝大多数情况下只能在work进程内使用。
    public ajaxAsync(param: Param) {
        const xhr = new XMLHttpRequest();
        submit.call(this, xhr, param, true);
        return xhr.response;
    }
    //fetch
    public fetch(param: Param) {

    }
}

class PromiseHandle {
    private xhr: XMLHttpRequest;
    public result: any;
    constructor(xhr: XMLHttpRequest) {
        this.xhr = xhr;
        this.xhr.addEventListener('load', () => {
            this.result = this.xhr.response;
        });
    }
    then(callback: Callback) {
        this.xhr.addEventListener('load', () => {
            callback(new Message(this.xhr));
        });
        return this;
    }
    catch(callback: Callback) {
        this.xhr.addEventListener('error', () => {
            callback(new Message(this.xhr));
        });
        return this;
    }
    finally(callback: Callback) {
        this.xhr.addEventListener('loadend', () => {
            callback(new Message(this.xhr));
        });
        return this;
    }
    downProgress(callback: Callback) {
        this.xhr.addEventListener('progress', (e) => {
            if (e.lengthComputable) {
                var percentComplete = e.loaded / e.total;
                callback(new UploadMessage(this.xhr, '下载中', percentComplete.toFixed(4)));
            } else {
                callback(new UploadMessage(this.xhr, '无法计算进度', null));
            }
        });
        return this;
    }
    upProgress(callback: Callback) {
        this.xhr.upload.addEventListener('progress', (e) => {
            if (e.lengthComputable) {
                var percentComplete = e.loaded / e.total;
                callback(new UploadMessage(this.xhr, '上传中', percentComplete.toFixed(4)));
            } else {
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

function warp(this: Http, xhr: XMLHttpRequest, param: Param, isInitHeader: boolean = true, isAsync: boolean = false) {
    if (isInitHeader) {
        const header = param.header || {};
        Object.keys(header).forEach(key => {
            xhr.setRequestHeader(key, header[key]);
        });
        if (!header['Content-Type']) xhr.setRequestHeader("Content-Type", this.options.contentType);
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

function submit(this: Http, xhr: XMLHttpRequest, param: Param, isAsync: boolean = false) {
    if (!param.method || (param.method && param.method.toUpperCase() === "GET")) {
        let url = this.options.baseUrl + (param.url || '');
        let suffix = url.match(/(?:\?.*)?$/);
        let paramString = suffix === null ? "?" : "&";
        Object.keys(param.data || {}).forEach(key => {
            paramString += (encodeURIComponent(key) + "=" + encodeURIComponent(param.data[key].toString()) + "&");
        });
        xhr.open("GET", url + paramString, true);
        warp.call(this, xhr, param, true, isAsync);
    } else {
        xhr.open(param.method, this.options.baseUrl + (param.url || ''), true);
        let type = this.options.contentType;
        if (param.header && param.header['Content-Type']) type = param.header['Content-Type'];
        const excute = Reflect.get(HttpHandle, type) || Reflect.get(HttpHandle, this.options.contentType);
        warp.call(this, xhr, param, type !== "multipart/form-data", isAsync);
        excute.call(this, xhr, param);
    }
}

const HttpHandle = {
    'application/x-www-form-urlencoded': function (this: Http, xhr: XMLHttpRequest, param: Param) {
        let result: Array<string> = [];
        Object.keys(param.data || {}).forEach(key => {
            let val = param.data[key];
            result.push(encodeURIComponent(key) + "=" + encodeURIComponent(val ? val.toString() : val));
        });
        Promise.resolve().then(() => {
            xhr.send(result.join("&"));
        });
    },
    'text/plain': function (this: Http, xhr: XMLHttpRequest, param: Param) {
        let result: Array<string> = [];
        Object.keys(param.data || {}).forEach(key => {
            let val = param.data[key];
            result.push(key.replace(/[\s\=\\]/g, "\\$&") + "=" + (val ? val.toString().replace(/[\s\=\\]/g, "\\$&") : val));
        });
        Promise.resolve().then(() => {
            xhr.send(result.join("\r\n"));
        });
    },
    'application/json': function (this: Http, xhr: XMLHttpRequest, param: Param) {
        Promise.resolve().then(() => {
            xhr.send(JSON.stringify(param.data || {}));
        });
    },
    'multipart/form-data': function (this: Http, xhr: XMLHttpRequest, param: Param) {
        const header = param.header || {};
        Object.keys(header).forEach(key => {
            if (key === "Content-Type") return;
            xhr.setRequestHeader(key, header[key]);
        });
        if (window.FormData) {
            const formData = new FormData();
            Object.keys(param.data || {}).forEach(key => {
                formData.append(key, param.data[key]);
            });
            if (param.file) Object.keys(param.file).forEach(key => {
                formData.append(key, param.file![key]);
            });
            Promise.resolve().then(() => {
                xhr.send(formData);
            });
        } else {
            let result: Array<string> = [];
            Object.keys(param.data || {}).forEach(key => {
                let val = param.data[key];
                result.push("Content-Disposition: form-data; name=\"" + key + "\"\r\n\r\n" + (val ? val.toString() : val) + "\r\n");
            });
            let index = 0;
            let boundary = "---------------------------" + Date.now().toString(16);
            xhr.setRequestHeader("Content-Type", "multipart\/form-data; boundary=" + boundary);
            if (param.file && getType(param.file) === "Object") {
                Object.keys(param.file).forEach(key => {
                    let file = param.file![key];
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
                })
            }
            if (index === 0) {
                Promise.resolve().then(() => {
                    xhr.send("--" + boundary + "\r\n" + result.join("--" + boundary + "\r\n") + "--" + boundary + "--\r\n");
                });
            }
        }
    }
}

interface HttpOptions {
    //通用超时等待时间(ms)
    timeout: number
    //通用根域名
    baseUrl: string
    //通用请求数据格式
    contentType: ContentType
    //通用响应数据格式
    responseType: XMLHttpRequestResponseType
}

interface Param {
    url: string
    method?: 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE'
    type?: XMLHttpRequestResponseType
    timeout?: number
    data?: any
    header?: Head,
    file?: {
        [propName: string]: File | Blob
    }
}

interface Head {
    Accept?: string
    'Content-Type'?: ContentType
    [propName: string]: any
}

type Callback = (res: ResponseMessage) => void;

type ContentType = "application/x-www-form-urlencoded" |
    "text/plain" |
    "multipart/form-data" |
    "application/json"

type RequestBody = null | undefined | ArrayBuffer | ArrayBufferView | Blob | Document | FormData | String

export default Http;

