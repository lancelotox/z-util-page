export const wrapValue = function (this: any, value: any){
    return (typeof value === 'object' && value !== null) ? this.reactive(value) : value;
}