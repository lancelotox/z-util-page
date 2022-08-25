var http = /** @class */ (function () {
    function http(options) {
        if (options === void 0) { options = {}; }
        this.options = {
            timeout: 10000,
            baseUrl: ""
        };
        Object.assign(this.options, options);
    }
    http.prototype.setOption = function (options) {
        if (options === void 0) { options = {}; }
        try {
            Object.assign(this.options, options);
        }
        catch (err) {
            console.error(err);
        }
    };
    http.prototype.ajax = function (param) {
        var xhr = new XMLHttpRequest();
        xhr.timeout = param.timeout || this.options.timeout;
        xhr.addEventListener("load", function () {
            console.log('1');
        });
        xhr.open(param.method || "GET", 'http://localhost:3000');
        xhr.send();
    };
    return http;
}());
export default http;
