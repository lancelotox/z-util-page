/**
 * 函数防抖
 * @param func 待处理函数
 * @param wait 函数执行延迟时间
 * @param immediatel 是否立刻执行
 */
declare function debounce(func: Function, wait: number, immediatel?: boolean): {
    (this: any, ...args: any[]): any;
    cancel(): void;
    then(callback: Function): any;
};
export default debounce;
