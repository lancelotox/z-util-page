"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.choose = exports.read = exports.write = void 0;
const index_1 = require("../helper/index");
/**
 * H5文件下载方法
 * @param url 资源链接或者blob对象
 * @param saveFileName 保存文件名
 */
function saveFile(file, saveFileName = '') {
    let url = '';
    if (typeof file === 'string') {
        url = file;
    }
    else {
        try {
            url = URL.createObjectURL(file);
        }
        catch (error) {
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
        }
        catch (error) {
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
    if (options.multiple)
        input.setAttribute('multiple', 'true');
    input.addEventListener('change', function (e) {
        callback(input.files);
    });
    (0, index_1.clickElement)(input);
}
exports.choose = chooseFile;
