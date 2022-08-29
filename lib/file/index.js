import { clickElement } from '../helper/index';
/**
 * H5文件下载方法
 * @param url 资源链接或者blob对象
 * @param saveFileName 保存文件名
 */
export function saveFile(url, saveFileName) {
    if (typeof url === 'object' && url instanceof Blob) {
        url = URL.createObjectURL(url);
    }
    var alink = document.createElement('a');
    alink.href = url;
    alink.download = saveFileName || '';
    clickElement(alink);
}
var FileReaderDecorate = /** @class */ (function () {
    function FileReaderDecorate(file) {
        this.reader = new FileReader();
        this.file = file;
    }
    //读取操作发生中断时触发
    FileReaderDecorate.prototype.abort = function (fun) {
        var _this = this;
        this.reader.addEventListener('abort', function () {
            fun(_this.reader);
        });
        return this;
    };
    //读取操作发生错误时触发。
    FileReaderDecorate.prototype.error = function (fun) {
        var _this = this;
        this.reader.addEventListener('error', function () {
            fun(_this.reader.error);
        });
        return this;
    };
    //读取操作完成时触发。
    FileReaderDecorate.prototype.load = function (fun) {
        var _this = this;
        this.reader.addEventListener('load', function () {
            fun(_this.reader);
        });
        return this;
    };
    //读取操作开始时触发。
    FileReaderDecorate.prototype.loadstart = function (fun) {
        var _this = this;
        this.reader.addEventListener('loadstart', function () {
            fun(_this.reader);
        });
        return this;
    };
    //读取操作结束时（要么成功，要么失败）触发。
    FileReaderDecorate.prototype.loadend = function (fun) {
        var _this = this;
        this.reader.addEventListener('loadend', function () {
            fun(_this.reader.result);
        });
        return this;
    };
    //在读取Blob时触发。
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
        }
        catch (error) {
            console.error(error);
        }
        return this;
    };
    FileReaderDecorate.prototype.stop = function () {
        this.reader.abort();
        return this;
    };
    return FileReaderDecorate;
}());
export function readFile(file) {
    return new FileReaderDecorate(file);
}
export function chooseFile(options, callback) {
    if (options === void 0) { options = {}; }
    var input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', (options.accept || []).join(','));
    input.setAttribute('capture', options.capture || '');
    input.setAttribute('multiple', (options.multiple || false).toString());
    input.addEventListener('change', function (e) {
        callback(input.files);
    });
    clickElement(input);
}
