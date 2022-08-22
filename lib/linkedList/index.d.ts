/**
 * 节点类
 */
export declare class Node {
    before: Node | null;
    param: any;
    index: number | null;
    after: Node | null;
    constructor(param: any);
}
/**
 * 链表操作类
 */
export declare class LinkedList {
    Length: number;
    node: Node | null;
    head: Node | null;
    constructor();
    /**
     * 尾部插入节点
     */
    push(node: Node): void;
    /**
     * 指定位置插入节点
     */
    insert(param: any, node: Node, location: 'before' | 'after'): void;
    /**
     * 查找节点
     */
    find(param: any): Node | null | undefined;
    /**
     * 删除节点
     */
    delete(param: any): void;
    /**
     * 移动到上一个节点
     */
    prev(): void;
    /**
     * 移动到下一个节点
     */
    next(): void;
    /**
     * 判断链表是否为空
     */
    isEmpty(): boolean;
    /**
     * 返回链表长度
     */
    size(): number;
}
