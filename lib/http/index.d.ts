import type { ResponseMessage } from './message';
declare class Http {
    options: HttpOptions;
    constructor(options?: object);
    ajax(param: Param): PromiseHandle;
    ajaxAsync(param: Param): any;
    fetch(param: Param): void;
}
declare class PromiseHandle {
    private xhr;
    result: any;
    constructor(xhr: XMLHttpRequest);
    then(callback: Callback): this;
    catch(callback: Callback): this;
    finally(callback: Callback): this;
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
interface Param {
    url: string;
    method?: 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE';
    type?: XMLHttpRequestResponseType;
    timeout?: number;
    data?: any;
    header?: Head;
    file?: {
        [propName: string]: File | Blob;
    };
}
interface Head {
    Accept?: string;
    'Content-Type'?: ContentType;
    [propName: string]: any;
}
declare type Callback = (res: ResponseMessage) => void;
declare type ContentType = "application/x-www-form-urlencoded" | "text/plain" | "multipart/form-data" | "application/json";
export default Http;
