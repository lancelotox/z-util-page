/**
 * 取原始值
 * @param value 
 * @returns 
 */
export const getSourceValue = function (this: any, value: any){
    return Reflect.get((typeof value === 'object' && value !== null) ? value : {}, this.source || Symbol()) || value;
} 