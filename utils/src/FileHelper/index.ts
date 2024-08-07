/**
 * @module FileHelper
 * @category 文件操作辅助类
 */

import { clickElement } from '../helper/index';
import { debounce } from '../debounce/index';

/**
 * 文件选择
 * @example
 * ```ts
 * choose({
 *  accept: [".doc",".docx","application/msword"],
 *  capture: "user",
 *  multiple: true
 * }).then(files => {
 *     console.log(files);
 *   })
 *   .catch(err => {
 *     console.error(err);
 *   });
 * ```
 * @param options 文件选择配置
 * @param options.accept 以逗号为分隔的[唯一文件类型说明符]列表
 * @param options.capture 尝试请求使用设备的媒体捕获设备（如：摄像机），而不是请求一个文件输入。camera–照相机；camcorder–摄像机；microphone–录音
 * @param options.multiple 是否允许多选
 */
export function choose(options: {
    accept?: Array<string>
    capture?: "user" | "environment" | "camera" | "camcorder" | "microphone"
    multiple?: boolean
  } = {}) {
  return new Promise<FileList>((resolve, reject) => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', (options.accept || []).join(','));
    input.setAttribute('capture', options.capture || '');
    if (options.multiple) input.setAttribute('multiple', 'true');
    input.addEventListener('change', function (e) {
      if (input.files) resolve(input.files);
    });
    function focus(e: FocusEvent) {
      window.removeEventListener('focus', focus);
      setTimeout(() => {
        if (!input.files || input.files.length === 0) reject(new Error('用户取消选择'));
      }, 60);
    }
    window.addEventListener('focus', focus);
    clickElement(input);
  })
}

/**
 * H5文件下载方法
 * @example
 * ```ts
 * save(new Blob(['你好世界'], { type: 'text/plain' }), 'test.txt');
 * save('https://www.baidu.com/img/flexible/logo/pc/result@2.png', 'baidu.png');
 * ```
 * @param file 资源链接或者blob对象
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
  //读取操作发生错误时触发
  error(fun: callback) {
    this.reader.addEventListener('error', () => {
      fun(this.reader.error);
    });
    return this;
  }
  //读取操作完成时触发
  load(fun: callback) {
    this.reader.addEventListener('load', () => {
      fun(this.reader);
    });
    return this;
  }
  //读取操作开始时触发
  loadstart(fun: callback) {
    this.reader.addEventListener('loadstart', () => {
      fun(this.reader);
    });
    return this;
  }
  //读取操作结束时（要么成功，要么失败）触发
  loadend(fun: callback) {
    this.reader.addEventListener('loadend', () => {
      fun(this.reader.result);
    });
    return this;
  }
  //读取操作结束时（要么成功，要么失败）触发。
  loadendPromise() {
    return new Promise<ArrayBuffer | string>((resolve, reject) => {
      this.reader.addEventListener('loadend', () => {
        resolve(this.reader.result!);
      });
      this.reader.addEventListener('error', () => {
        reject(this.reader.error);
      });
    });
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
/**
 * 文件读取
 * @example
 * ```ts
 * const reader = read(file)
 *  .loadend((res) => {
 *    console.log(res);
 *  })
 *  //start方法参数类型："ArrayBuffer" | "BinaryString" | "DataURL" | "Text"
 *  .start("ArrayBuffer");
 * 
 * //读取操作发生中断时触发
 * reader.abort((abo) => {
 *   console.log(abo);
 * })
 * 
 * //读取操作发生错误时触发
 * reader.error((err) => {
 *   console.log(err);
 * })
 * 
 * //读取操作完成时触发
 * reader.load((res) => {
 *   console.log(res);
 * })
 * 
 * //读取操作开始时触发
 * reader.loadstart((res) => {
 *   console.log(res);
 * })
 * 
 * //读取操作结束时（要么成功，要么失败）触发
 * reader.loadstart((res) => {
 *   console.log(res);
 * })
 * 
 * //获取读取结果的promise
 * const promise = reader.loadendPromise();
 * 
 * //在读取Blob时触发。
 * reader.progress((res) => {
 *   console.log(res);
 * })
 * 
 * //获取状态
 * const status = reader.getStatus();
 * 
 * //获取结果
 * const result = reader.getResult();
 * 
 * //中断读取
 * reader.stop();
 * ```
 * @param file File对象或Blob对象
 */
export function read(file: File | Blob) {
  return new FileReaderDecorate(file);
}

const DirMap = new Map<string | symbol, Promise<FileSystemDirectoryHandle>>();
type FileContent = ArrayBuffer | string | Uint8Array | Blob;
const warnMessage = debounce((err: Error) => {
  console.warn(err);
}, 100);
/**
 * 将文件写入目标文件夹
 * @example
 * ```ts
 * //需要先调用pickDir选择文件夹
 * saveFileToDir('key', 'file.txt', ['string', new Blob(['你好世界'], { type: 'text/plain' })]);
 * ```
 * @param dirKey 文件夹唯一标识，自行定义string，用于后续向同一文件夹写入文件
 * @param fileName 文件名
 * @param fileContent 二进制文件流或字符串数组
 * @param overwrite 是否覆盖同名文件
 * @returns { success: boolean, message: string }
 */
export async function saveFileToDir(dirKey: string, fileName: string, fileContent: Array<FileContent | Promise<FileContent>>, overwrite: boolean = true): Promise<{ success: boolean, message: string }> {
  try {
    let dirHandlePromise = DirMap.get(dirKey);
    if (!dirHandlePromise) throw new Error("请先选择文件夹");
    const dirHandle = await dirHandlePromise;

    // const list = [];
    // for await (const key of dirHandle.keys()) {
    //   list.push(key);
    // }

    // fileName = getName(list, fileName);

    const fileHandle = await dirHandle.getFileHandle(fileName, {
      create: true
    });

    const writable = await fileHandle.createWritable();
    if (!overwrite) {
      const file = await fileHandle.getFile();
      const fileContent = await read(file).start("ArrayBuffer").loadendPromise();
      writable.write(fileContent);
    }
    for await (const item of fileContent) {
      await writable.write(item);
    }
    await writable.close();
    return {
      success: true,
      message: "保存成功"
    };
  } catch (error: any) {
    if (error.code === 20) {
      DirMap.delete(dirKey);
      warnMessage(new Error("用户取消选择"));
    } else {
      console.error(error);
    }
    return {
      success: false,
      message: "保存失败"
    };
  }
}

function getName(list: string[], name: string, index: number = 1) {
  console.log(name)
  const res = list.find(item => item === name);
  if (res) {
    const paths = name.split(".");
    const newName = (<string[]>[]).concat(paths, [`(${index})`], [paths.pop()!]).join('.');
    return getName(list, newName, ++index);
  } else {
    return name;
  }
}

/**
 * 选择文件夹(与saveFileToDir共用缓存)
 * @example
 * ```ts
 * //选择文件夹，将其与key绑定
 * pickDir('key');
 * //强制重新选择
 * pickDir('key', true);
 * ```
 * @param dirKey 文件夹唯一标识，自行定义string，用于后续向同一文件夹写入文件
 * @param force 是否强制重新选择
 * @returns { success: boolean, message: string, data: FileSystemDirectoryHandle | null }
 */
export async function pickDir(dirKey: string, force: boolean = false): Promise<{ success: boolean, message: string, data: FileSystemDirectoryHandle | null }> {
  try {
    if (!self.showDirectoryPicker) throw new Error("该浏览器不支持showDirectoryPicker");
    let dirHandlePromise = DirMap.get(dirKey);
    if (!dirHandlePromise || force) {
      dirHandlePromise = self.showDirectoryPicker({
        id: dirKey,
        mode: 'readwrite'
      });
      DirMap.set(dirKey, dirHandlePromise);
    }
    const dirHandle = await dirHandlePromise;
    return {
      success: true,
      data: dirHandle,
      message: "获取成功"
    };
  } catch (error: any) {
    if (error.code === 20) {
      DirMap.delete(dirKey);
      warnMessage(new Error("用户取消选择"));
    } else {
      console.error(error);
    }
    return {
      success: false,
      data: null,
      message: "获取失败"
    };
  }
}