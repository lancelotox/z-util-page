/**
 * 节点类
 */
class LinkNode {
    before: LinkNode | null = null;
    param: any = '';
    index: number | null = null;
    after: LinkNode | null = null;
    constructor(param: any) {
        this.param = param;
    }
}

/**
 * 链表操作类
 */
class LinkedList {
    Length: number = 0;
    node: LinkNode | null = null;
    head: LinkNode | null = null;
    constructor() { }
    /**
     * 尾部插入节点
     */
    push(node: LinkNode) {
        if (node) {
            if (this.head === null) {
                node.after = node;
                node.before = node;
                this.head = node;
                this.node = node;
            } else {
                node.index = this.Length;
                node.after = this.head;
                node.before = this.head.before;
                if(this.head.before) this.head.before.after = node;
                this.head.before = node;
                this.Length++;
            }
        } else {
            console.log("添加失败，节点参数错误")
        }
    }
    /**
     * 指定位置插入节点
     */
    insert(param: any, node: LinkNode, location: 'before' | 'after') {
        let temp = this.find(param);
        if (temp && location === 'before') {
            node.index = this.Length;
            node.before = temp.before;
            node.after = temp;
            if(temp.before) temp.before.after = node;
            temp.before = node;
            this.Length++;
        } else if (temp) {
            node.index = this.Length;
            node.before = temp;
            node.after = temp.after;
            if(temp.after) temp.after.before = node;
            temp.after = node;
            this.Length++;
        } else {
            console.log("插入失败，未找到节点");
        }
    }
    /**
     * 查找节点
     */
    find(param: any) {
        let condition: string;
        if (param && typeof param === 'number') {
            condition = 'index';
        } else {
            condition = 'param';
        }
        if (this.node) {
            let temp = this.head;
            for (let i = 0; i < this.Length; i++) {
                if (temp && (typeof param === typeof Reflect.get(temp, condition)) && Reflect.get(temp, condition) === param) {
                    return temp;
                }
                if(temp) temp = temp.after;
            }
        } else {
            console.log("查找失败，节点不存在");
            return null;
        }
    }
    /**
     * 删除节点
     */
    delete(param: any) {
        let temp = this.find(param);
        if (temp) {
            if(temp.before) temp.before.after = temp.after;
            if(temp.after) temp.after.before = temp.before;
            this.Length--;
        } else {
            console.log("删除失败，节点不存在");
        }
    }
    /**
     * 移动到上一个节点
     */
    prev() {
        if(this.node) this.node = this.node.before;
    }
    /**
     * 移动到下一个节点
     */
    next() {
        if(this.node) this.node = this.node.after;
    }
    /**
     * 判断链表是否为空
     */
    isEmpty() {
        return this.Length === 0;
    }
    /**
     * 返回链表长度
     */
    size() {
        return this.Length;
    }
}

export default {
    LinkNode,
    LinkedList
}