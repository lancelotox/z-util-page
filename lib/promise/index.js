var ForkPromise = /** @class */ (function () {
    function ForkPromise(fn) {
        this.value = null;
        this.state = "pending";
        this.nexts = [];
        fn(this._resolve.bind(this));
    }
    ForkPromise.prototype.then = function (onFulfilled) {
        var _this = this;
        return new ForkPromise(function (resolve) {
            var next = { onFulfilled: onFulfilled, resolve: resolve };
            if (_this.state === 'pending') {
                _this.nexts.push(next);
            }
            else {
                _this._handle(next);
            }
        });
    };
    ForkPromise.prototype._handle = function (next) {
        if (next.onFulfilled) {
            var result = next.onFulfilled(this.value);
            next.resolve(result);
        }
        else {
            next.resolve(this.value);
        }
    };
    ForkPromise.prototype._resolve = function (result) {
        var _this = this;
        if (result && (typeof result === 'object' || typeof result === 'function') && typeof result.then === 'function') {
            result.then(this._resolve.bind(this));
            return;
        }
        this.value = result;
        this.state = 'fulfilled';
        this.nexts.forEach(function (next) { return _this._handle(next); });
    };
    return ForkPromise;
}());
export { ForkPromise };
