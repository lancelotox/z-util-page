import { deepClone } from '../deepClone/index';
const defaultConfig = {
    leading: true,
    trailing: false
};
/**
 * 函数节流
 * @param func 待处理函数
 * @param wait 函数执行最短间隔时间
 * @param option.leading 首次是否执行
 * @param option.trailing 结束是否执行
 */
function throttle(func, wait, option) {
    let options = Object.assign(deepClone(defaultConfig), option || {});
    if (options.leading === false && options.trailing === false)
        throw ('leading, trailing不能同时为false');
    let timeout = null, args, content, res;
    const throttled = function (...argList) {
        args = argList;
        content = this;
        if (!timeout) {
            timeout = setTimeout(function () {
                timeout = null;
                if (options.trailing)
                    func.apply(content, args);
            }, wait);
            if (options.leading)
                res = func.apply(content, args);
        }
        return res;
    };
    throttled.cancel = function () {
        if (timeout) {
            clearTimeout(timeout);
            timeout = null;
        }
    };
    return throttled;
}
export default throttle;
