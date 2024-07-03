import type { ResponseMessage } from './message';
declare class Http {
    options: HttpOptions;
    constructor(options?: CustomHttpOptions);
    /**
     * //XMLHttpRequest异步请求
     * @param param
     * @returns
     */
    ajax(param: Param): PromiseHandle;
    /**
     * XMLHttpRequest同步请求，绝大多数情况下只能在work进程内使用。
     * @param param
     * @returns
     */
    ajaxAsync(param: Param): any;
    /**
     * 拦截器
     */
    Interceptor: Interceptor;
}
declare class PromiseHandle {
    private xhr;
    result: any;
    constructor(xhr: XMLHttpRequest);
    then(callback: Callback): this;
    catch(callback: Callback): this;
    finally(callback: Callback): this;
    progress(callback: Callback): this;
    downProgress(callback: Callback): this;
    upProgress(callback: Callback): this;
    abort(): this;
}
interface HttpOptions {
    timeout: number;
    baseUrl: string;
    contentType: ContentType;
    responseType: XMLHttpRequestResponseType;
}
interface CustomHttpOptions {
    timeout?: number;
    baseUrl?: string;
    contentType?: ContentType;
    responseType?: XMLHttpRequestResponseType;
}
interface Param {
    url: string;
    baseUrl?: string;
    method?: 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE';
    responseType?: XMLHttpRequestResponseType;
    timeout?: number;
    header?: Head;
    param?: any;
    data?: any;
    file?: {
        [propName: string]: File | Blob;
    };
}
interface Head {
    Accept?: string;
    ContentType?: ContentType;
    [propName: string]: any;
}
interface Interceptor {
    requestArr: Array<Function>;
    responseArr: Array<Function>;
    request: (func: Function) => void;
    response: (func: Function) => void;
}
type Callback = (res: ResponseMessage) => void;
type ContentType = "" | "application/x-www-form-urlencoded" | "text/plain" | "multipart/form-data" | "application/json";
export default Http;
