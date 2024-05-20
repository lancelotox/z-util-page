"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveFileToDir = exports.read = exports.save = exports.choose = void 0;
const tslib_1 = require("tslib");
const index_1 = require("../helper/index");
function choose(callback, options = {}) {
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
exports.choose = choose;
/**
 * H5文件下载方法
 * @param url 资源链接或者blob对象
 * @param saveFileName 保存文件名
 */
function save(file, saveFileName = '') {
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
exports.save = save;
class FileReaderDecorate {
    constructor(file) {
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
function read(file) {
    return new FileReaderDecorate(file);
}
exports.read = read;
/**
 * 将文件写入目标文件夹
 * @param dirKey 文件夹唯一标识，自行定义string或symbol，用于后续向同一文件夹写入文件
 * @param fileName 文件名
 * @param fileContent 二进制文件流
 */
const DirMap = new Map();
function saveFileToDir(dirKey, fileName, fileContent) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        var _a, fileContent_1, fileContent_1_1;
        var _b, e_1, _c, _d;
        try {
            if (!self.showDirectoryPicker)
                throw new Error("该浏览器不支持showDirectoryPicker");
            let dirHandle = DirMap.get(dirKey);
            if (!dirHandle) {
                dirHandle = yield self.showDirectoryPicker({
                    mode: 'readwrite',
                    startIn: 'documents'
                });
                DirMap.set(dirKey, dirHandle);
            }
            const fileHandle = yield dirHandle.getFileHandle(fileName, {
                create: true
            });
            const writable = yield fileHandle.createWritable();
            try {
                for (_a = true, fileContent_1 = tslib_1.__asyncValues(fileContent); fileContent_1_1 = yield fileContent_1.next(), _b = fileContent_1_1.done, !_b; _a = true) {
                    _d = fileContent_1_1.value;
                    _a = false;
                    const item = _d;
                    yield writable.write(item);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (!_a && !_b && (_c = fileContent_1.return)) yield _c.call(fileContent_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return writable;
        }
        catch (error) {
            console.error(error);
        }
    });
}
exports.saveFileToDir = saveFileToDir;
