declare type ForkPromiseCallback = (result: any) => any;
declare type ForkPromiseResolveOrReject = (result: any) => void;
declare type ForkPromiseInvoke = (resolve: ForkPromiseResolveOrReject, reject: ForkPromiseResolveOrReject) => any;
export declare class ForkPromise {
    private value;
    private state;
    private nexts;
    constructor(fn: ForkPromiseInvoke);
    then(onFulfilled: ForkPromiseCallback | null, onRejected: ForkPromiseCallback | null): ForkPromise;
    catch(onRejected: ForkPromiseCallback): ForkPromise;
    private _handle;
    private _resolve;
    private _reject;
}
export {};
