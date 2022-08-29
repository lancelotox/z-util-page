export interface ResponseMessage {
    status: number;
    message: string;
    data: any;
}
export declare class Message implements ResponseMessage {
    status: number;
    message: string;
    data: any;
    constructor(xhr: XMLHttpRequest);
}
export declare class UploadMessage implements ResponseMessage {
    status: number;
    message: string;
    data: any;
    constructor(xhr: XMLHttpRequest, message: string, data: any);
}
