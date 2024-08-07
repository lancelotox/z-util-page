import { getType } from '../deepClone/index';
import * as FileHelper from '../FileHelper/index';
import { Message, UploadMessage } from './message';
import type { ResponseMessage } from './message';

/**
 * @category HTTTP请求操作辅助类
 */
export class Http {
  
  /**
   * 默认参数
   */
  public options: HttpOptions = {
    timeout: 10000,
    baseUrl: '',
    contentType: '',
    responseType: ''
  }

  /**
   * 构造函数
   * @example
   * ```ts
   * const http = new Http({
   *  //超时等待时间(ms)
   *  timeout: 10000,
   *  //基地址
   *  baseUrl: 'http://localhost:3000',
   *  //请求体数据格式
   *  contentType: 'application/json',
   *  //响应数据格式
   *  responseType: 'json'
   * });
   * ```
   * @param options 默认参数
   */
  public constructor(options: CustomHttpOptions = {}) {
    Object.assign(this.options, options);
  }

  /**
   * XMLHttpRequest异步请求
   * @example
   * ```ts
   * const http = new Http();
   * // 拦截器
   * http.Interceptor.request((param) => {
   *  // 请求参数
   *  console.log(param);
   *  param.url = 'http://localhost:3000' + param.url;
   * })
   * http.Interceptor.response((res) => {
   *  // 请求结果
   *  console.log(res);
   *  res.data = res.data + '拦截器修改';
   *  return res;
   * })
   * 
   * // 请求
   * const req = http.ajax({
   *  // 请求地址
   *  baseUrl: 'http://localhost:3000',
   *  url: '/api/user',
   *  // 请求方法
   *  method: 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE',
   *  // 响应数据格式
   *  type: "arraybuffer" | "blob" | "document" | "json" | "text",
   *  // 请求头
   *  headers: {
   *   'Content-Type': 'application/json',
   *    'Authorization': 'Bearer ' + token
   *  }
   *  // 请求体
   *  data: {
   *   name: 'jack'
   *  }
   *  // 请求参数
   *  params: {
   *   name: 'jack'
   *  }
   *  // 请求超时时间
   *  timeout: 10000
   *  // 请求体数据格式
   *  contentType: 'application/json',
   *  // 响应数据类型
   *  responseType: 'json',
   *  // 上传文件
   *  file: {
   *    file: new Blob([JSON.stringify({a: '身体和心灵，总有一个在路上。'}, null, 2)], {type : 'application/json'})
   *  }
   * }).then((res) => {
   *   // 请求成功
   * }).catch((err) => {
   *  // 请求失败
   * }).finally(() => {
   *  // 请求完成
   * }).progress(() => {
   *  // 请求进度
   * });
   * 
   * // 取消请求
   * req.abort();
   * ```
   * @param param 请求参数
   */
  public ajax(param: Param) {
    const xhr = new XMLHttpRequest();
    submit.call(this, xhr, petchParam(param));
    return new PromiseHandle(xhr).then(res => {
      this.Interceptor.responseArr.forEach(func => {
        res = func(res) || res;
      })
      return res;
    });
  }

  /**
   * XMLHttpRequest同步请求，绝大多数情况下只能在work进程内使用。
   * @example
   * ```ts
   * const http = new Http();
   * // 请求
   * const req = http.ajax({
   *  // 请求地址
   *  baseUrl: 'http://localhost:3000',
   *  url: '/api/user',
   *  // 请求方法
   *  method: 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE',
   *  // 响应数据格式
   *  type: "arraybuffer" | "blob" | "document" | "json" | "text",
   *  // 请求头
   *  headers: {
   *   'Content-Type': 'application/json',
   *    'Authorization': 'Bearer ' + token
   *  }
   *  // 请求体
   *  data: {
   *   name: 'jack'
   *  }
   *  // 请求参数
   *  params: {
   *   name: 'jack'
   *  }
   *  // 请求超时时间
   *  timeout: 10000
   *  // 请求体数据格式
   *  contentType: 'application/json',
   *  // 响应数据类型
   *  responseType: 'json',
   *  // 上传文件
   *  file: {
   *    file: new Blob([JSON.stringify({a: '身体和心灵，总有一个在路上。'}, null, 2)], {type : 'application/json'})
   *  }
   * })
   * // 请求成功
   * console.log(res);
   * ```
   * @param param 请求参数
   */
  public ajaxAsync(param: Param) {
    const xhr = new XMLHttpRequest();
    submit.call(this, xhr, petchParam(param), true);
    let res = xhr.response;
    this.Interceptor.responseArr.forEach(func => {
      res = func(res) || res;
    })
    return res;
  }

  /**
   * 拦截器
   */
  public Interceptor: Interceptor = {
    requestArr: [],
    responseArr: [],
    request(func: Function) {
      if (typeof func === 'function') this.requestArr.push(func)
    },
    response(func: Function) {
      if (typeof func === 'function') this.responseArr.push(func)
    }
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
  progress(callback: Callback) {
    this.xhr.addEventListener('progress', () => {
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

function warp(this: Http, xhr: XMLHttpRequest, param: Param, isInitHeader: boolean = true, isAsync: boolean = false, isGet: boolean = false) {
  if (isInitHeader) {
    const header = param.header || {};
    Object.keys(header).forEach(key => {
      if (isGet && key === 'ContentType') return;
      xhr.setRequestHeader(upperCase(key), header[key]);
    });
    if (!isGet && !header.ContentType) xhr.setRequestHeader("Content-Type", this.options.contentType);
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

function submit(this: Http, xhr: XMLHttpRequest, param: Param, isAsync: boolean = false) {
  this.Interceptor.requestArr.forEach(func => {
    param = func(param) || param
  })
  let baseUrl = this.options.baseUrl;
  if (param.baseUrl !== undefined) {
    baseUrl = String(param.baseUrl)
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
  } else {
    xhr.open(param.method, url + paramString, true);
    let type = this.options.contentType;
    if (param.header && param.header.ContentType) type = param.header.ContentType;
    const excute = Reflect.get(HttpHandle, type) || Reflect.get(HttpHandle, 'text/plain');
    warp.call(this, xhr, param, type !== "multipart/form-data", isAsync, false);
    excute.call(this, xhr, param);
  }
}

function upperCase(val: string) {
  if (val.length < 1) return val;
  let charts = val.split('');
  charts[0] = charts[0].toLocaleUpperCase();
  return charts.map((c, i) => {
    if (c.match(/[A-Z]/) !== null && i !== 0) return `-${c}`;
    return c;
  }).join('');
}

function petchParam(param: Param) {
  if (param.data === undefined) param.data = {};
  if (param.header === undefined) param.header = {};
  return param
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
      if (key === "ContentType") return;
      xhr.setRequestHeader(upperCase(key), header[key]);
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
      xhr.setRequestHeader("Content-Type", `multipart\/form-data; boundary=` + boundary);
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
  //超时等待时间(ms)
  timeout: number
  //根域名
  baseUrl: string
  //请求数据类型
  contentType: ContentType
  //响应数据类型
  responseType: XMLHttpRequestResponseType
}

interface CustomHttpOptions {
  timeout?: number
  baseUrl?: string
  contentType?: ContentType
  responseType?: XMLHttpRequestResponseType
}

interface Param {
  url: string
  baseUrl?: string
  method?: 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE'
  responseType?: XMLHttpRequestResponseType
  timeout?: number
  header?: Head,
  param?: any
  data?: any
  file?: {
    [propName: string]: File | Blob
  }
}

interface Head {
  Accept?: string
  ContentType?: ContentType
  [propName: string]: any
}

interface Interceptor {
  requestArr: Array<Function>,
  responseArr: Array<Function>,
  request: (func: Function) => void
  response: (func: Function) => void
}

type Callback = (res: ResponseMessage) => void;

type ContentType = "" |
  "application/x-www-form-urlencoded" |
  "text/plain" |
  "multipart/form-data" |
  "application/json"

type RequestBody = null | undefined | ArrayBuffer | ArrayBufferView | Blob | Document | FormData | String