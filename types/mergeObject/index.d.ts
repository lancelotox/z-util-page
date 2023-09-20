/**
 * 深度合并n个对象值
 * @param origin 将多个对象深度合并到该对象
 * @param ob 被合并对象
 * @param more 其余被合并对象
 */
export declare function mergeObject(origin: StandardObject, ob: StandardObject | undefined, ...more: Array<StandardObject>): StandardObject;
interface StandardObject {
    [name: string]: any;
}
export {};
