"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.choose = exports.read = exports.write = void 0;
var index_1 = require("../helper/index");
/**
 * H5文件下载方法
 * @param url 资源链接或者blob对象
 * @param saveFileName 保存文件名
 */
function saveFile(file, saveFileName) {
    if (saveFileName === void 0) { saveFileName = ''; }
    var url = '';
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
    var alink = document.createElement('a');
    alink.href = url;
    alink.download = saveFileName || '';
    alink.style.display = 'none';
    alink.target = "_blank";
    document.body.appendChild(alink);
    (0, index_1.clickElement)(alink);
    document.body.removeChild(alink);
}
exports.write = saveFile;
var FileReaderDecorate = /** @class */ (function () {
    function FileReaderDecorate(file) {
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
    Object.defineProperty(FileReaderDecorate.prototype, "abort", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (fun) {
            var _this = this;
            this.reader.addEventListener('abort', function () {
                fun(_this.reader);
            });
            return this;
        }
    });
    //读取操作发生错误时触发。
    Object.defineProperty(FileReaderDecorate.prototype, "error", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (fun) {
            var _this = this;
            this.reader.addEventListener('error', function () {
                fun(_this.reader.error);
            });
            return this;
        }
    });
    //读取操作完成时触发。
    Object.defineProperty(FileReaderDecorate.prototype, "load", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (fun) {
            var _this = this;
            this.reader.addEventListener('load', function () {
                fun(_this.reader);
            });
            return this;
        }
    });
    //读取操作开始时触发。
    Object.defineProperty(FileReaderDecorate.prototype, "loadstart", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (fun) {
            var _this = this;
            this.reader.addEventListener('loadstart', function () {
                fun(_this.reader);
            });
            return this;
        }
    });
    //读取操作结束时（要么成功，要么失败）触发。
    Object.defineProperty(FileReaderDecorate.prototype, "loadend", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (fun) {
            var _this = this;
            this.reader.addEventListener('loadend', function () {
                fun(_this.reader.result);
            });
            return this;
        }
    });
    //在读取Blob时触发。
    Object.defineProperty(FileReaderDecorate.prototype, "progress", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (fun) {
            var _this = this;
            this.reader.addEventListener('progress', function () {
                fun(_this.reader);
            });
            return this;
        }
    });
    Object.defineProperty(FileReaderDecorate.prototype, "getStatus", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function () {
            return this.reader.readyState;
        }
    });
    Object.defineProperty(FileReaderDecorate.prototype, "getResult", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function () {
            return this.reader.result;
        }
    });
    Object.defineProperty(FileReaderDecorate.prototype, "start", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (type) {
            try {
                Reflect.get(this.reader, "readAs" + type).call(this.reader, this.file);
            }
            catch (error) {
                console.error(error);
            }
            return this;
        }
    });
    Object.defineProperty(FileReaderDecorate.prototype, "stop", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function () {
            this.reader.abort();
            return this;
        }
    });
    return FileReaderDecorate;
}());
function readFile(file) {
    return new FileReaderDecorate(file);
}
exports.read = readFile;
function chooseFile(callback, options) {
    if (options === void 0) { options = {}; }
    var input = document.createElement('input');
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
