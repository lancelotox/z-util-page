type ForkPromiseCallback = (result: any) => any;
type ForkPromiseResolveOrReject = (result: any) => void;
type ForkPromiseInvoke = (resolve: ForkPromiseResolveOrReject, reject: ForkPromiseResolveOrReject) => any;
type ForkPromiseNext = {
    onFulfilled: ForkPromiseCallback | null
    onRejected: ForkPromiseCallback | null
    resolve: ForkPromiseResolveOrReject
    reject: ForkPromiseResolveOrReject
}

export class ForkPromise {
    private value: any = null;
    private state: "pending" | "fulfilled" | "rejected" = "pending";
    private nexts: Array<ForkPromiseNext> = [];

    public constructor(fn: ForkPromiseInvoke) {
        fn(this._resolve.bind(this), this._reject.bind(this));
    }

    public then(onFulfilled: ForkPromiseCallback | null, onRejected: ForkPromiseCallback | null): ForkPromise {
        return new ForkPromise((resolve, reject) => {
            let next: ForkPromiseNext = {
                onFulfilled,
                onRejected,
                resolve,
                reject
            }
            if (this.state === 'pending') {
                this.nexts.push(next);
            } else {
                this._handle(next);
            }
        });
    }

    public catch(onRejected: ForkPromiseCallback) {
        return this.then(null, onRejected);
    }

    // public finally(onDone: any) {
    //     if (typeof onDone !== 'function') return this.then(null, null);
    //     let ForkPromise = this.constructor;
    //     return this.then(
    //         value => ForkPromise.resolve(onDone()).then(() => value),
    //         reason => ForkPromise.resolve(onDone()).then(() => { throw reason })
    //     );
    // }

    private _handle(next: ForkPromiseNext) {
        let cb = this.state === 'fulfilled' ? next.onFulfilled : next.onRejected;
        let rr = this.state === 'fulfilled' ? next.resolve : next.reject;
        if (cb) {
            let result;
            try {
                result = cb(this.value);
            } catch (error) {
                result = error;
                console.error(error);
                rr = next.reject;
            } finally {
                rr(result);
            }
        } else {
            rr(this.value);
        }
    }

    private _resolve(result: any): void {
        if(this.state !== 'pending') return;
        if (result && (typeof result === 'object' || typeof result === 'function') && typeof result.then === 'function') {
            result.then(this._resolve.bind(this));
            return;
        }
        this.value = result;
        this.state = 'fulfilled';
        this.nexts.forEach(next => this._handle(next));
    }

    private _reject(error: any): void {
        if(this.state !== 'pending') return;
        this.value = error;
        this.state = 'rejected';
        this.nexts.forEach(next => this._handle(next));
    }
}