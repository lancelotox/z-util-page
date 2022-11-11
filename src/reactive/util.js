/**
 * 取原始值
 * @param value
 * @returns
 */
export var getSourceValue = function (value) {
    return Reflect.get((typeof value === 'object' && value !== null) ? value : {}, this.source || Symbol()) || value;
};
export var wrapValue = function (value) {
    return (typeof value === 'object' && value !== null) ? this.reactive(value) : value;
};
