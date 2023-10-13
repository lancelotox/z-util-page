"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Message = exports.UploadMessage = void 0;
var Message = /** @class */ (function () {
    function Message(xhr) {
        Object.defineProperty(this, "status", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "message", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "data", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.status = xhr.status;
        this.message = xhr.statusText;
        this.data = xhr.response;
    }
    return Message;
}());
exports.Message = Message;
var UploadMessage = /** @class */ (function () {
    function UploadMessage(xhr, message, data) {
        Object.defineProperty(this, "status", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "message", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "data", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.status = xhr.status;
        this.message = message;
        this.data = data;
    }
    return UploadMessage;
}());
exports.UploadMessage = UploadMessage;
