var ForkPromise = /** @class */ (function () {
    function ForkPromise(fn) {
        this.value = null;
        this.state = "pending";
        this.nexts = [];
        fn(this._resolve.bind(this), this._reject.bind(this));
    }
    ForkPromise.prototype.then = function (onFulfilled, onRejected) {
        var _this = this;
        return new ForkPromise(function (resolve, reject) {
            var next = {
                onFulfilled: onFulfilled,
                onRejected: onRejected,
                resolve: resolve,
                reject: reject
            };
            if (_this.state === 'pending') {
                _this.nexts.push(next);
            }
            else {
                _this._handle(next);
            }
        });
    };
    ForkPromise.prototype.catch = function (onRejected) {
        return this.then(null, onRejected);
    };
    // public finally(onDone: any) {
    //     if (typeof onDone !== 'function') return this.then(null, null);
    //     let ForkPromise = this.constructor;
    //     return this.then(
    //         value => ForkPromise.resolve(onDone()).then(() => value),
    //         reason => ForkPromise.resolve(onDone()).then(() => { throw reason })
    //     );
    // }
    ForkPromise.prototype._handle = function (next) {
        var cb = this.state === 'fulfilled' ? next.onFulfilled : next.onRejected;
        var rr = this.state === 'fulfilled' ? next.resolve : next.reject;
        if (cb) {
            var result = void 0;
            try {
                result = cb(this.value);
            }
            catch (error) {
                result = error;
                console.error(error);
                rr = next.reject;
            }
            finally {
                rr(result);
            }
        }
        else {
            rr(this.value);
        }
    };
    ForkPromise.prototype._resolve = function (result) {
        var _this = this;
        if (this.state !== 'pending')
            return;
        if (result && (typeof result === 'object' || typeof result === 'function') && typeof result.then === 'function') {
            result.then(this._resolve.bind(this));
            return;
        }
        this.value = result;
        this.state = 'fulfilled';
        this.nexts.forEach(function (next) { return _this._handle(next); });
    };
    ForkPromise.prototype._reject = function (error) {
        var _this = this;
        if (this.state !== 'pending')
            return;
        this.value = error;
        this.state = 'rejected';
        this.nexts.forEach(function (next) { return _this._handle(next); });
    };
    return ForkPromise;
}());
export { ForkPromise };
