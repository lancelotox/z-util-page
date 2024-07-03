interface throttleOptions {
    leading: boolean;
    trailing: boolean;
}
/**
 * 函数节流
 * @param func 待处理函数
 * @param wait 函数执行最短间隔时间
 * @param option.leading 首次是否执行
 * @param option.trailing 结束是否执行
 */
declare function throttle(func: Function, wait: number, option?: throttleOptions): {
    (this: any, ...argList: any[]): any;
    cancel(): void;
};
export default throttle;
