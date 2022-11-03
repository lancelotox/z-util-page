import { clickElement } from '../helper/index';

/**
 * H5文件下载方法
 * @param url 资源链接或者blob对象
 * @param saveFileName 保存文件名
 */
function saveFile(url: string | Blob, saveFileName: string) {
    if (typeof url === 'object' && url instanceof Blob) {
        url = URL.createObjectURL(url);
    }
    let alink = document.createElement('a');
    alink.href = url;
    alink.download = saveFileName || '';
    clickElement(alink);
}

/**
 * 文件读取
 * @param file File对象或Blob对象
 */
type callback = (res: any) => void;
class FileReaderDecorate {
    reader: FileReader
    file: File | Blob
    constructor(file: File | Blob) {
        this.reader = new FileReader();
        this.file = file;
    }
    //读取操作发生中断时触发
    abort(fun: callback) {
        this.reader.addEventListener('abort', () => {
            fun(this.reader);
        });
        return this;
    }
    //读取操作发生错误时触发。
    error(fun: callback) {
        this.reader.addEventListener('error', () => {
            fun(this.reader.error);
        });
        return this;
    }
    //读取操作完成时触发。
    load(fun: callback) {
        this.reader.addEventListener('load', () => {
            fun(this.reader);
        });
        return this;
    }
    //读取操作开始时触发。
    loadstart(fun: callback) {
        this.reader.addEventListener('loadstart', () => {
            fun(this.reader);
        });
        return this;
    }
    //读取操作结束时（要么成功，要么失败）触发。
    loadend(fun: callback) {
        this.reader.addEventListener('loadend', () => {
            fun(this.reader.result);
        });
        return this;
    }
    //在读取Blob时触发。
    progress(fun: callback) {
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
    start(type: "ArrayBuffer" | "BinaryString" | "DataURL" | "Text") {
        try {
            Reflect.get(this.reader, "readAs" + type).call(this.reader, this.file);
        } catch (error) {
            console.error(error);
        }
        return this;
    }
    stop() {
        this.reader.abort();
        return this;
    }
}
function readFile(file: File | Blob) {
    return new FileReaderDecorate(file);
}


/**
 * 文件选择
 * @param options 文件选择配置
 * @param callback 回调函数, 参数为选择文件列表
 */
interface chooseOption {
    //以逗号为分隔的[唯一文件类型说明符]列表
    accept?: Array<string>,
    //尝试请求使用设备的媒体捕获设备（如：摄像机），而不是请求一个文件输入。
    capture?: "user" | "environment",
    //是否允许多选
    multiple?: boolean
}
function chooseFile(options: chooseOption = {}, callback: Function) {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', (options.accept || []).join(','));
    input.setAttribute('capture', options.capture || '');
    input.setAttribute('multiple', (options.multiple || false).toString());
    input.addEventListener('change', function (e) {
        callback(input.files);
    });
    clickElement(input);
}

export {
    saveFile as write,
    readFile as read,
    chooseFile as choose
}