var Message = /** @class */ (function () {
    function Message(xhr) {
        this.status = xhr.status;
        this.message = xhr.statusText;
        this.data = xhr.response;
    }
    return Message;
}());
export { Message };
var UploadMessage = /** @class */ (function () {
    function UploadMessage(xhr, message, data) {
        this.status = xhr.status;
        this.message = message;
        this.data = data;
    }
    return UploadMessage;
}());
export { UploadMessage };
