export declare class IDBHelper {
    private dbRq;
    private version;
    private name;
    private initPromise;
    private upgradePromise;
    constructor(name: string);
    /**
     * 初始化
     */
    private init;
    /**
     * 检查连接状态
     */
    private checkConnect;
    /**
     * 获取所有表名
     */
    getAllTableName(): Promise<DOMStringList>;
    /**
     * 创建表
     */
    createTable(tableNameList: string[] | string, keyPath?: string): Promise<Boolean>;
    /**
     * 删除表
     */
    deleteTable(tableNameList: string[] | string): Promise<Boolean>;
    /**
     * 删除所有表
     */
    deleteAllTable(): Promise<Boolean>;
    /**
     * 增加/修改表中某行数据
     */
    setTableRow(tableName: string, data: any): Promise<void>;
    /**
     * 获取表中某行数据
     */
    getTableRow(tableName: string, key: string): Promise<unknown>;
    /**
     * 删除表中某行数据
     */
    deleteTableRow(tableName: string, key: string): Promise<void>;
    /**
     * 获取表中所有数据
     */
    getAllTableRow(tableName: string, range?: IDBKeyRange): Promise<unknown>;
    /**
     * 获取表数据条数
     */
    getTableRowCount(tableName: string, range?: IDBKeyRange): Promise<unknown>;
    /**
     * 关闭数据库
     */
    close(): Promise<void>;
    /**
     * 重置数据库
     */
    reSet(): Promise<Boolean>;
}
