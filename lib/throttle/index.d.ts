interface throttleOptions {
    leading: boolean;
    trailing: boolean;
}
/**
 * 函数节流
 * @param func 待处理函数
 * @param wait 函数执行最短间隔时间
 */
declare function throttle(func: Function, wait: number, options: throttleOptions): {
    (this: any): any;
    cancel(): void;
};
export default throttle;
