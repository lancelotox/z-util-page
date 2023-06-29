"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Message = exports.UploadMessage = void 0;
class Message {
    constructor(xhr) {
        this.status = xhr.status;
        this.message = xhr.statusText;
        this.data = xhr.response;
    }
}
exports.Message = Message;
class UploadMessage {
    constructor(xhr, message, data) {
        this.status = xhr.status;
        this.message = message;
        this.data = data;
    }
}
exports.UploadMessage = UploadMessage;
