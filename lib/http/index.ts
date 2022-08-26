import { getType } from '../deepClone/index';
import { readFile } from '../file/index';

export default class Http {
    public options: HttpOptions = {
        timeout: 10000,
        baseUrl: "",
        contentType: 'application/x-www-form-urlencoded',
        responseType: 'json'
    }
    constructor(options: object = {}) {
        Object.assign(this.options, options);
    }
    public ajax(param: Param) {
        const xhr = new XMLHttpRequest();
        submit.call(this, xhr, param);
        return new PromiseHandle(xhr);
    }
    public ajaxAsync(param: Param) {
        const xhr = new XMLHttpRequest();
        xhr.open(param.method || "GET", this.options.baseUrl + param.url, false);
        xhr.send(null);
        return xhr.responseText;
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
            callback(this.xhr.response);
        });
        return this;
    }
    catch(callback: Callback) {
        this.xhr.addEventListener('error', () => {
            callback(this.xhr.statusText);
        });
        return this;
    }
    finally(callback: Callback) {
        this.xhr.addEventListener('loadend', () => {
            callback(this.xhr);
        });
        return this;
    }
    progress(callback: Callback) {
        this.xhr.addEventListener('progress', (e) => {
            callback(e);
        });
        return this;
    }
    abort() {
        this.xhr.abort();
        return this;
    }
}

function warp(this: Http, xhr: XMLHttpRequest, param: Param, isInitHeader: boolean = true) {
    xhr.timeout = param.timeout || this.options.timeout;
    xhr.responseType = param.type || this.options.responseType;
    if (isInitHeader) {
        const header = param.header || {};
        Object.keys(header).forEach(key => {
            xhr.setRequestHeader(key, header[key]);
        });
        if (!header['Content-Type']) xhr.setRequestHeader("Content-Type", this.options.contentType);
    }
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

function submit(this: Http, xhr: XMLHttpRequest, param: Param) {
    if (!param.method || (param.method && param.method.toUpperCase() === "GET")) {
        let url = this.options.baseUrl + (param.url || '');
        let suffix = url.match(/(?:\?.*)?$/);
        let paramString = suffix === null ? "?" : "&";
        Object.keys(param.data || {}).forEach(key => {
            paramString += (encodeURIComponent(key) + "=" + encodeURIComponent(param.data[key].toString()) + "&");
        });
        xhr.open("GET", url + paramString, true);
        warp.call(this, xhr, param);
    } else {
        xhr.open(param.method, this.options.baseUrl + (param.url || ''), true);
        let type = this.options.contentType;
        if (param.header && param.header['Content-Type']) type = param.header['Content-Type'];
        const excute = Reflect.get(HttpHandle, type) || Reflect.get(HttpHandle, this.options.contentType);
        warp.call(this, xhr, param, type !== "multipart/form-data");
        excute.call(this, xhr, param);
    }
}

const HttpHandle = {
    'application/x-www-form-urlencoded': function (this: Http, xhr: XMLHttpRequest, param: Param) {
        let result: Array<string> = [];
        Object.keys(param.data || {}).forEach(key => {
            result.push(encodeURIComponent(key) + "=" + encodeURIComponent(param.data[key].toString()));
        });
        Promise.resolve().then(() => {
            xhr.send(result.join("&"));
        });
    },
    'text/plain': function (this: Http, xhr: XMLHttpRequest, param: Param) {
        let result: Array<string> = [];
        Object.keys(param.data || {}).forEach(key => {
            result.push(key.replace(/[\s\=\\]/g, "\\$&") + "=" + param.data[key].toString().replace(/[\s\=\\]/g, "\\$&"));
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
            xhr.setRequestHeader("Content-Type", header['Content-Type'] || this.options.contentType);
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
                result.push("Content-Disposition: form-data; name=\"" + key + "\"\r\n\r\n" + param.data[key].toString() + "\r\n");
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
                        readFile(file).load(function (res) {
                            let name = (window.File && file instanceof File) ? file.name : (key + '.blob');
                            result.push("Content-Disposition: form-data; name=\"" +
                                key + "\"; filename=\"" + name +
                                "\"\r\nContent-Type: " + file.type + "\r\n\r\n" + res.result + "\r\n");
                        }).loadend(function () {
                            index--;
                            if (index === 0) {
                                let combineResult = "--" + boundary + "\r\n" + result.join("--" + boundary + "\r\n") + "--" + boundary + "--\r\n";
                                Promise.resolve().then(() => {
                                    xhr.send(string2Uint8Array(combineResult));
                                });
                            }
                        }).start("BinaryString");
                    }
                })
            }
            if (index === 0) {
                Promise.resolve().then(() => {
                    xhr.send(string2Uint8Array("--" + boundary + "\r\n" + result.join("--" + boundary + "\r\n") + "--" + boundary + "--\r\n"));
                });
            }
        }
    }
}

function string2Uint8Array(value: string) {
    let nBytes = value.length, ui8Data = new Uint8Array(nBytes);
    for (let i = 0; i < nBytes; i++) {
        ui8Data[i] = value.charCodeAt(i) & 0xff;
    }
    return ui8Data;
}

