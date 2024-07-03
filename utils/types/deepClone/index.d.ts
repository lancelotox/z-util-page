declare function deepClone(value: any): any;
/**
 * 获取数据类型
 * @param value
 * @returns 类型字符串, 'String'、'Map'
 */
declare function getType(value: any): string;
export { deepClone, getType };
