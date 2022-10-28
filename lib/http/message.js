"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Message = exports.UploadMessage = void 0;

var Message =
/** @class */
function () {
  function Message(xhr) {
    this.status = xhr.status;
    this.message = xhr.statusText;
    this.data = xhr.response;
  }

  return Message;
}();

exports.Message = Message;

var UploadMessage =
/** @class */
function () {
  function UploadMessage(xhr, message, data) {
    this.status = xhr.status;
    this.message = message;
    this.data = data;
  }

  return UploadMessage;
}();

exports.UploadMessage = UploadMessage;