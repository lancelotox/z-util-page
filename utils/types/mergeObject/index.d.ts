/**
 * 深度合并n个对象值
 * @param origin 将多个对象深度合并到该对象
 * @param ob 被合并对象
 * @param more 其余被合并对象
 */
export declare function mergeObject<T extends StandardObject>(origin: T, ob: StandardObject | undefined, ...more: Array<StandardObject>): T;
interface StandardObject {
    [name: string]: any;
}
export {};
