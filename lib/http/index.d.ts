interface Param {
    url: string;
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
    timeout?: number;
    data?: any;
    header?: {};
}
export default class http {
    private options;
    constructor(options?: object);
    setOption(options?: object): void;
    ajax(param: Param): void;
}
export {};
