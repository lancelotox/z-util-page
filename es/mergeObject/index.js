import { getType } from "../deepClone/index";
/**
 * 深度合并n个对象值
 * @param origin 将多个对象深度合并到该对象
 * @param ob 被合并对象
 * @param more 其余被合并对象
 */
export function mergeObject(origin, ob, ...more) {
    do {
        origin = merge(origin, ob);
        ob = more.pop();
    } while (ob);
    return origin;
}
function merge(origin, ob) {
    if (ob === undefined)
        return origin;
    if (getType(origin) !== 'Object' || getType(ob) !== 'Object')
        return origin;
    for (const key in ob) {
        const oldVal = origin[key];
        const newVal = ob[key];
        if (oldVal !== newVal && newVal !== undefined) {
            if (getType(oldVal) !== 'Object')
                origin[key] = newVal;
            else
                merge(oldVal, newVal);
        }
    }
    return origin;
}
