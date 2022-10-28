interface ResponseMessage {
    status: number;
    message: string;
    data: any;
}
declare class Message implements ResponseMessage {
    status: number;
    message: string;
    data: any;
    constructor(xhr: XMLHttpRequest);
}
declare class UploadMessage implements ResponseMessage {
    status: number;
    message: string;
    data: any;
    constructor(xhr: XMLHttpRequest, message: string, data: any);
}
export { UploadMessage, Message, ResponseMessage };
