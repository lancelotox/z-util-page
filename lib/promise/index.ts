type ForkPromiseCallback = (result: any) => any;
type ForkPromiseResolve = (result: any) => void;
type ForkPromiseInvoke = (resolve: ForkPromiseResolve) => any;
type ForkPromiseNext = {
    onFulfilled?: ForkPromiseCallback
    resolve: ForkPromiseResolve
}

export class ForkPromise {
    private value: any = null;
    private state: "pending" | "fulfilled" | "rejected" = "pending";
    private nexts: Array<ForkPromiseNext> = [];

    public constructor(fn: ForkPromiseInvoke) {
        fn(this._resolve.bind(this));
    }

    public then(onFulfilled: ForkPromiseCallback): ForkPromise {
        return new ForkPromise((resolve) => {
            let next: ForkPromiseNext = { onFulfilled, resolve };
            if (this.state === 'pending') {
                this.nexts.push(next);
            }else{
                this._handle(next);
            }
        });
    }

    private _handle(next: ForkPromiseNext) {
        if (next.onFulfilled) {
            let result = next.onFulfilled(this.value);
            next.resolve(result);
        } else {
            next.resolve(this.value);
        }
    }

    private _resolve(result: any): void {
        if(result && (typeof result === 'object' || typeof result === 'function') && typeof result.then === 'function'){
            result.then(this._resolve.bind(this));
            return;
        }
        this.value = result;
        this.state = 'fulfilled';
        this.nexts.forEach(next => this._handle(next));
    }
}