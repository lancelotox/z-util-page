"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CookieHelper = void 0;
exports.CookieHelper = {
    getItem: function (key) {
        return document.cookie.replace(new RegExp("(?:(?:^|.*;\\s*)".concat(key, "\\s*=\\s*([^;]*).*$)|^.*$")), "$1");
    },
    getItemOnce: function (key) {
        var val = exports.CookieHelper.getItem(key);
        exports.CookieHelper.removeItem("".concat(key));
        return val;
    },
    setItem: function (key, val) {
        if (typeof val !== 'string')
            return;
        document.cookie = "".concat(key, "=").concat(val, ";path=/");
    },
    removeItem: function (key) {
        document.cookie = "".concat(key, "=;path=/;expires=").concat(new Date(0).toUTCString());
    },
    exist: function (key) {
        var keys = document.cookie.match(/[^ =;]+(?==)/g) || [];
        return keys.includes(key);
    },
    clear: function () {
        var keys = document.cookie.match(/[^ =;]+(?==)/g);
        if (keys) {
            for (var i = keys.length; i--;)
                exports.CookieHelper.removeItem(keys[i]);
        }
    }
};
