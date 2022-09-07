declare type ForkPromiseCallback = (result: any) => any;
declare type ForkPromiseResolve = (result: any) => void;
declare type ForkPromiseInvoke = (resolve: ForkPromiseResolve) => any;
export declare class ForkPromise {
    private value;
    private state;
    private nexts;
    constructor(fn: ForkPromiseInvoke);
    then(onFulfilled: ForkPromiseCallback): ForkPromise;
    private _handle;
    private _resolve;
}
export {};
