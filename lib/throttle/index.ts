

//leading: 开始是否执行
//trailing: 结束是否执行
interface throttleOptions {
    leading: boolean,
    trailing: boolean
}

const defaultConfig: throttleOptions = {
    leading: true,
    trailing: false
}

/**
 * 函数节流
 * @param func 待处理函数
 * @param wait 函数执行最短间隔时间
 */
function throttle(func: Function, wait: number, options: throttleOptions) {
    options = Object.assign(defaultConfig, options);
    if(options.leading === false && options.trailing === false) throw('leading, trailing不能同时为false');
    let timeout: NodeJS.Timeout | null = null, args: IArguments, content: any, res: any;
    const throttled = function (this: any) {
        args = arguments;
        content = this;
        if (!timeout) {
            timeout = setTimeout(function () {
                timeout = null;
                if(options.trailing) func.apply(content, args);
            }, wait);
            if(options.leading) res = func.apply(content, args);
        }
        return res;
    }
    throttled.cancel = function () {
        if (timeout) {
            clearTimeout(timeout);
            timeout = null;
        }
    }
    return throttled;
}

export default throttle;