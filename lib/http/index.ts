interface HttpOptions {
    //超时等待时间(ms)
    timeout: number
    //根域名
    baseUrl: string
}

interface Param {
    url: string
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
    timeout?: number
    data?: any
    header?: {}
}

export default class http {
    private options: HttpOptions = {
        timeout: 10000,
        baseUrl: ""
    }
    constructor(options: object = {}) {
        Object.assign(this.options, options);
    }
    setOption(options: object = {}) {
        try {
            Object.assign(this.options, options);
        } catch (err) {
            console.error(err);
        }
    }
    ajax(param: Param) {
        const xhr = new XMLHttpRequest();
        xhr.timeout = param.timeout || this.options.timeout;
        xhr.addEventListener("load", function () {
            console.log('1');
        });
        xhr.open(param.method || "GET", 'http://localhost:3000');
        xhr.send();
    }
}