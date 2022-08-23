/**
 * 函数防抖
 * @param func 待处理函数
 * @param wait 函数执行延迟时间
 * @param immediatel 是否立刻执行
 */
function debounce(func, wait, immediatel) {
    var timeout, content, args, callbacks = [], res;
    var debounced = function () {
        content = this;
        args = arguments;
        if (immediatel && !timeout) {
            res = func.apply(content, args);
            var resolvedRes_1 = res;
            callbacks.forEach(function (callback) {
                if (callback instanceof Function)
                    resolvedRes_1 = callback(resolvedRes_1);
            });
        }
        if (timeout)
            clearTimeout(timeout);
        timeout = setTimeout(function () {
            func.apply(content, args);
            timeout = null;
        }, wait);
        return res;
    };
    debounced.cancel = function () {
        if (timeout) {
            clearTimeout(timeout);
            timeout = null;
        }
    };
    debounced.then = function (callback) {
        callbacks.push(callback);
        return this;
    };
    return debounced;
}
export default debounce;
