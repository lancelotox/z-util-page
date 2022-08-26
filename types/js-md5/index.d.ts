declare module 'js-md5' {
    export function MD5(val: any): string;
}

interface HttpOptions {
    //通用超时等待时间(ms)
    timeout: number
    //通用根域名
    baseUrl: string
    //通用请求数据格式
    contentType: ContentType
    //通用响应数据格式
    responseType: XMLHttpRequestResponseType
}

interface Param {
    url: string
    method?: 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE'
    type?: XMLHttpRequestResponseType
    timeout?: number
    data?: any
    header?: Head,
    file?: {
        [propName: string]: File | Blob
    }
}

interface httpResponse {

}

interface Head {
    'Content-Type'?: ContentType,
    Accept?: string,
    [propName: string]: string
}

type Callback = (res: httpResponse) => void;

type ContentType = "application/x-www-form-urlencoded" |
    "text/plain" |
    "multipart/form-data" |
    "application/json"

type RequestBody = null | undefined | ArrayBuffer | ArrayBufferView | Blob | Document | FormData | USVString