export default class Http {
    options: HttpOptions;
    constructor(options?: object);
    ajax(param: Param): PromiseHandle;
    ajaxAsync(param: Param): string;
}
declare class PromiseHandle {
    private xhr;
    result: any;
    constructor(xhr: XMLHttpRequest);
    then(callback: Callback): this;
    catch(callback: Callback): this;
    finally(callback: Callback): this;
    progress(callback: Callback): this;
    abort(): this;
}
export {};
