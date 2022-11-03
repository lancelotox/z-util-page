/**
 * 函数防抖
 * @param func 待处理函数
 * @param wait 函数执行延迟时间
 * @param immediatel 是否立刻执行
 */
function debounce(func: Function, wait: number, immediatel?: boolean) {
    let timeout: NodeJS.Timeout | null, content: any, args: IArguments, callbacks: Array<Function> = [], res: any;
    const debounced = function (this: any) {
        content = this;
        args = arguments;
        if(immediatel && !timeout){
            res = func.apply(content, args);
            let resolvedRes: any = res;
            callbacks.forEach(function(callback){
                if(callback instanceof Function) resolvedRes = callback(resolvedRes);
            });
        }
        if(timeout) clearTimeout(timeout);
        timeout = setTimeout(function () {
            func.apply(content, args);
            timeout = null;
        }, wait);
        return res;
    }
    debounced.cancel = function(){
        if(timeout) {
            clearTimeout(timeout);
            timeout = null;
        }
    }
    debounced.then = function(callback: Function){
        callbacks.push(callback);
        return this;
    }
    return debounced;
}

export default debounce;