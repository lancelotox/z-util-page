/**
 * 节点类
 */
export class Node{
    before = null;
    param = '';
    index = null;
    after = null;
    constructor(param){
        this.param = param;
    }
}

/**
 * 链表操作类
 */
export class Index {
    Length = 0;
    node = null;
    head = null;
    constructor(){}
    /**
     * 尾部插入节点
     */
    push(node){
        if(node){
            if(this.Length === 0){
                node.after = node;
                node.before = node;
                this.head = node;
                this.node = node;
            }
            node.index = this.Length;
            node.after = this.head;
            node.before = this.head.before;
            this.head.before.after = node;
            this.head.before = node;
            this.Length++;
        }else{
            console.log("添加失败，节点参数错误")
        }
    }
    /**
     * 指定位置插入节点
     */
    insert(param,node,location){
        let temp = this.find(param);
        if(temp && location === 'before'){
            node.index = this.Length;
            node.before = temp.before;
            node.after = temp;
            temp.before.after = node;
            temp.before = node;
            this.Length++;
        }else if(temp){
            node.index = this.Length;
            node.before = temp;
            node.after = temp.after;
            temp.after.before = node;
            temp.after = node;
            this.Length++;
        }else {
            console.log("插入失败，未找到节点");
        }
    }
    /**
     * 查找节点
     */
    find(param){
        let condition;
        if(param && typeof param === 'number'){
            condition = 'index';
        }else{
            condition = 'param';
        }
        if(this.node){
            let temp = this.head;
            for(let i=0;i < this.Length;i++){
                if((typeof param === typeof temp[condition]) && temp[condition] === param){
                    return temp;
                }
                temp = temp.after;
            }
        }else{
            console.log("查找失败，节点不存在");
            return null;
        }
    }
    /**
     * 删除节点
     */
    delete(param){
        let temp = this.find(param);
        if(temp){
            temp.before.after = temp.after;
            temp.after.before = temp.before;
            this.Length--;
        }else {
            console.log("删除失败，节点不存在");
        }
    }
    /**
     * 移动到上一个节点
     */
    prev(){
        this.node = this.node.before;
    }
    /**
     * 移动到下一个节点
     */
    next(){
        this.node = this.node.after;
    }
    /**
     * 判断链表是否为空
     */
    isEmpty(){
        return this.Length === 0;
    }
    /**
     * 返回链表长度
     */
    size(){
        return this.Length;
    }
}