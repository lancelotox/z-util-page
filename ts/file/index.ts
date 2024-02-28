import { clickElement } from '../helper/index';

/**
 * 文件选择
 * @param options 文件选择配置
 * @param callback 回调函数, 参数为选择文件列表
 */
interface chooseOption {
  //以逗号为分隔的[唯一文件类型说明符]列表
  accept?: Array<string>,
  //尝试请求使用设备的媒体捕获设备（如：摄像机），而不是请求一个文件输入。
  //camera–照相机；camcorder–摄像机；microphone–录音
  capture?: "user" | "environment" | "camera" | "camcorder" | "microphone",
  //是否允许多选
  multiple?: boolean
}
export function choose(callback: (fileList: FileList | null) => void, options: chooseOption = {}) {
  const input = document.createElement('input');
  input.setAttribute('type', 'file');
  input.setAttribute('accept', (options.accept || []).join(','));
  input.setAttribute('capture', options.capture || '');
  if (options.multiple) input.setAttribute('multiple', 'true');
  input.addEventListener('change', function (e) {
    callback(input.files);
  });
  clickElement(input);
}

/**
 * H5文件下载方法
 * @param url 资源链接或者blob对象
 * @param saveFileName 保存文件名
 */
export function save(file: string | Blob, saveFileName: string = '') {
  let url: string = ''
  if (typeof file === 'string') {
    url = file;
  } else {
    try {
      url = URL.createObjectURL(file);
    } catch (error) {
      console.log(error)
    }
  }
  let alink = document.createElement('a');
  alink.href = url;
  alink.download = saveFileName || '';
  alink.style.display = 'none';
  alink.target = "_blank";
  document.body.appendChild(alink);
  clickElement(alink);
  document.body.removeChild(alink);
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
export function read(file: File | Blob) {
  return new FileReaderDecorate(file);
}