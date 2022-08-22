/**
 * 节点类
 */
var Node = /** @class */ (function () {
    function Node(param) {
        this.before = null;
        this.param = '';
        this.index = null;
        this.after = null;
        this.param = param;
    }
    return Node;
}());
export { Node };
/**
 * 链表操作类
 */
var LinkedList = /** @class */ (function () {
    function LinkedList() {
        this.Length = 0;
        this.node = null;
        this.head = null;
    }
    /**
     * 尾部插入节点
     */
    LinkedList.prototype.push = function (node) {
        if (node) {
            if (this.head === null) {
                node.after = node;
                node.before = node;
                this.head = node;
                this.node = node;
            }
            else {
                node.index = this.Length;
                node.after = this.head;
                node.before = this.head.before;
                if (this.head.before)
                    this.head.before.after = node;
                this.head.before = node;
                this.Length++;
            }
        }
        else {
            console.log("添加失败，节点参数错误");
        }
    };
    /**
     * 指定位置插入节点
     */
    LinkedList.prototype.insert = function (param, node, location) {
        var temp = this.find(param);
        if (temp && location === 'before') {
            node.index = this.Length;
            node.before = temp.before;
            node.after = temp;
            if (temp.before)
                temp.before.after = node;
            temp.before = node;
            this.Length++;
        }
        else if (temp) {
            node.index = this.Length;
            node.before = temp;
            node.after = temp.after;
            if (temp.after)
                temp.after.before = node;
            temp.after = node;
            this.Length++;
        }
        else {
            console.log("插入失败，未找到节点");
        }
    };
    /**
     * 查找节点
     */
    LinkedList.prototype.find = function (param) {
        var condition;
        if (param && typeof param === 'number') {
            condition = 'index';
        }
        else {
            condition = 'param';
        }
        if (this.node) {
            var temp = this.head;
            for (var i = 0; i < this.Length; i++) {
                if (temp && (typeof param === typeof Reflect.get(temp, condition)) && Reflect.get(temp, condition) === param) {
                    return temp;
                }
                if (temp)
                    temp = temp.after;
            }
        }
        else {
            console.log("查找失败，节点不存在");
            return null;
        }
    };
    /**
     * 删除节点
     */
    LinkedList.prototype.delete = function (param) {
        var temp = this.find(param);
        if (temp) {
            if (temp.before)
                temp.before.after = temp.after;
            if (temp.after)
                temp.after.before = temp.before;
            this.Length--;
        }
        else {
            console.log("删除失败，节点不存在");
        }
    };
    /**
     * 移动到上一个节点
     */
    LinkedList.prototype.prev = function () {
        if (this.node)
            this.node = this.node.before;
    };
    /**
     * 移动到下一个节点
     */
    LinkedList.prototype.next = function () {
        if (this.node)
            this.node = this.node.after;
    };
    /**
     * 判断链表是否为空
     */
    LinkedList.prototype.isEmpty = function () {
        return this.Length === 0;
    };
    /**
     * 返回链表长度
     */
    LinkedList.prototype.size = function () {
        return this.Length;
    };
    return LinkedList;
}());
export { LinkedList };
