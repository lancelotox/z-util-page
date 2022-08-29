export interface ResponseMessage {
    status: number
    message: string
    data: any
}

export class Message implements ResponseMessage {
    status: number
    message: string
    data: any
    constructor(xhr: XMLHttpRequest){
        this.status = xhr.status;
        this.message = xhr.statusText;
        this.data = xhr.response;
    }
}

export class UploadMessage implements ResponseMessage {
    status: number
    message: string
    data: any
    constructor(xhr: XMLHttpRequest, message: string, data: any){
        this.status = xhr.status;
        this.message = message;
        this.data = data;
    }
}