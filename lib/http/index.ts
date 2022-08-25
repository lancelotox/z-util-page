interface httpOptions {

}

interface RequestParam {

}

export default class http {
    options: httpOptions
    constructor(options: object) {
        Object.assign(this.options, options);
    }
    ajax(param: RequestParam) {
        
    }
}