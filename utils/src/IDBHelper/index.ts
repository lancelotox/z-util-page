/**
 * @category indexedDB操作辅助类
 */
export class IDBHelper {
  private dbRq?: IDBOpenDBRequest;
  private version: number = 0;
  private name: string;
  private upgradePromise: Promise<Boolean> = Promise.resolve(true);
  private resetPromise: Promise<Boolean> = Promise.resolve(true);

  /**
   * 构造函数
   * @param name 数据库名称
   * @throws Error 数据库名称不能为空
   * @returns IDBHelper实例
   * ***
   */
  constructor(name: string) {
    if (name === null || name === undefined) throw new Error("数据库名称不能为空");
    this.name = name;
    this.createTable(['check']);
  }

  /**
   * 获取数据库版本号
   */
  private async getVersion() {
    // 获取数据库版本号
    const databases = await indexedDB.databases();
    const db = databases.find(item => item.name === this.name);
    db && (this.version = db.version || 0);
    return this.version;
  }

  /**
   * 检查连接状态
   */
  private async checkConnect() {
    await this.resetPromise;
    await this.upgradePromise;
    if (this.dbRq) {
      try {
        this.dbRq.result.transaction(['check']).abort();
        return Promise.resolve(true);
      } catch (error) {
        if (this.dbRq.readyState === "done") {
          this.dbRq.result?.close();
          this.dbRq = this.getDb(this.name);
        }
        return new Promise((resolve, reject) => {
          this.dbRq?.addEventListener('success', () => {
            resolve(true);
          })
        })
      }
    } else {
      this.dbRq = this.getDb(this.name);
      return new Promise((resolve, reject) => {
        this.dbRq?.addEventListener('success', () => {
          resolve(true);
        })
      })
    }
  }

  /**
   * 获取更新后的DB
   */
  private async updateDb() {
    await this.resetPromise;
    await this.getVersion();
    const dbRq = this.dbRq = this.getDb(this.name, ++this.version);
    return dbRq;
  }

  /**
   * 获取DB
   */
  private getDb(name: string, version?: number) {
    const dbRq = indexedDB.open(name, version);
    dbRq.addEventListener('success', () => {
      dbRq.result?.addEventListener('versionchange', (e) => {
        dbRq.result?.close();
        if (e.newVersion && e.newVersion !== this.version) this.version = e.newVersion;
      });
    });
    return dbRq;
  }

  /**
   * 创建表
   * @example
   * ```ts
   * const db = new IDBHelper('test');
   * await db.createTable('tn');
   * ```
   * @param tableNameList 表名列表
   * @param keyPath 主键
   * @returns { Promise<boolean> }
   * ***
   */
  public async createTable(tableNameList: string[] | string, keyPath?: string) {
    const { promise, resolve } = Promise.withResolvers<boolean>();
    this.upgradePromise = promise;
    const dbRq = await this.updateDb();
    dbRq.addEventListener('upgradeneeded', () => {
      if (typeof tableNameList === 'string') {
        tableNameList = [tableNameList];
      }
      tableNameList.forEach(tableName => {
        const db = dbRq.result;
        if (db.objectStoreNames.contains(tableName)) return;
        db.createObjectStore(tableName, keyPath ? { keyPath } : { autoIncrement: true });
      });
    });
    dbRq.addEventListener('success', () => {
      resolve(true);
    });
    return promise;
  }

  /**
   * 删除表
   * @example
   * ```ts
   * const db = new IDBHelper('test');
   * await db.deleteTable('tn');
   * ```
   * @param tableNameList 表名列表
   * @returns { Promise<boolean> }
   * ***
   */
  public async deleteTable(tableNameList: string[] | string) {
    const { promise, resolve } = Promise.withResolvers<boolean>();
    this.upgradePromise = promise;
    const dbRq = await this.updateDb();
    dbRq.addEventListener('upgradeneeded', () => {
      if (typeof tableNameList === 'string') {
        tableNameList = [tableNameList];
      }
      tableNameList.forEach(tableName => {
        const db = dbRq.result;
        if (db.objectStoreNames.contains(tableName)) {
          db.deleteObjectStore(tableName);
        }
      });
    });
    dbRq.addEventListener('success', () => {
      resolve(true);
    });
    return promise;
  }

  /**
   * 删除所有表
   * @example
   * ```ts
   * const db = new IDBHelper('test');
   * await db.deleteAllTable();
   * ```
   * @returns { Promise<boolean> }
   * ***
   */
  public async deleteAllTable() {
    const { promise, resolve } = Promise.withResolvers<boolean>();
    this.upgradePromise = promise;
    const dbRq = await this.updateDb();
    dbRq.addEventListener('upgradeneeded', () => {
      const db = dbRq.result;
      let tableNameList: string[] = Array.prototype.slice.call(db.objectStoreNames);
      tableNameList.forEach(tableName => {
        if (tableName === 'check') return;
        if (db.objectStoreNames.contains(tableName)) {
          db.deleteObjectStore(tableName);
        }
      });
    });
    dbRq.addEventListener('success', () => {
      resolve(true);
    });
    return promise;
  }

  /**
   * 获取所有表名
   * @example
   * ```ts
   * const db = new IDBHelper('test');
   * await db.getAllTableName();
   * ```
   * @returns false 或 string[]
   * ***
   */
  public async getAllTableName() {
    if (!this.dbRq) return false;
    await this.checkConnect();
    return this.dbRq?.result?.objectStoreNames;
  }

  /**
   * 增加/修改表中某行数据
   * @example
   * ```ts
   * const db = new IDBHelper('test');
   * await db.setTableRow('tn', '你好！');
   * ```
   * @param tableName 表名
   * @param data 数据
   * @returns { Promise<boolean> }
   * ***
   */
  public async setTableRow(tableName: string, data: any) {
    if (!this.dbRq) return false;
    await this.checkConnect();
    const tx = this.dbRq.result.transaction(tableName, "readwrite");
    const request = tx.objectStore(tableName).put(data);
    request.onsuccess = () => {
      tx.commit();
    };
    request.onerror = () => {
      console.error("setTableRow failed");
    };
  }

  /**
   * 获取表中某行数据
   * @example
   * ```ts
   * const db = new IDBHelper('test');
   * await db.getTableRow('tn', 'key');
   * ```
   * @param tableName 表名
   * @param key 键
   * @returns { Promise<boolean> }
   * ***
   */
  public async getTableRow(tableName: string, key: string) {
    if (!this.dbRq) return false;
    await this.checkConnect();
    const tx = this.dbRq.result.transaction(tableName, "readwrite");
    const request = tx.objectStore(tableName).get(key);
    return new Promise(resolve => {
      request.onsuccess = () => {
        resolve(request.result);
        tx.commit();
      };
      request.onerror = () => {
        console.error("getTableRow failed");
      };
    });
  }

  /**
   * 删除表中某行数据
   * @example
   * ```ts
   * const db = new IDBHelper('test');
   * await db.deleteTableRow('tn', 'key');
   * ```
   * @param tableName 表名
   * @param key 键
   * @returns { Promise<boolean> }
   * ***
   */
  public async deleteTableRow(tableName: string, key: string) {
    if (!this.dbRq) return false;
    await this.checkConnect();
    const tx = this.dbRq.result.transaction(tableName, "readwrite");
    const request = tx.objectStore(tableName).delete(key);
    request.onsuccess = () => {
      tx.commit();
    };
    request.onerror = () => {
      console.error("deleteTableRow failed");
    };
  }

  /**
   * 获取表中所有数据
   * @example
   * ```ts
   * const db = new IDBHelper('test');
   * await db.getAllTableRow('tn');
   * ```
   * @param tableName 表名
   * @param range [范围](https://developer.mozilla.org/zh-CN/docs/Web/API/IDBKeyRange)
   * @returns { Promise<any[]> }
   * ***
   */
  public async getAllTableRow(tableName: string, range?: IDBKeyRange) {
    if (!this.dbRq) return false;
    await this.checkConnect();
    const tx = this.dbRq.result.transaction(tableName, "readwrite");
    const request = tx.objectStore(tableName).getAll(range);
    return new Promise(resolve => {
      request.onsuccess = () => {
        resolve(request.result);
        tx.commit();
      };
      request.onerror = () => {
        console.error("getAllTableRow failed");
      };
    });
  }

  /**
   * 获取表数据条数
   * @example
   * ```ts
   * const db = new IDBHelper('test');
   * await db.getTableRowCount('tn');
   * ```
   * @param tableName 表名
   * @param range [范围](https://developer.mozilla.org/zh-CN/docs/Web/API/IDBKeyRange)
   * @returns { Promise<number> }
   * ***
   */
  public async getTableRowCount(tableName: string, range?: IDBKeyRange) {
    if (!this.dbRq) return false;
    await this.checkConnect();
    const tx = this.dbRq.result.transaction(tableName, "readwrite");
    const request = tx.objectStore(tableName).count(range);
    return new Promise(resolve => {
      request.onsuccess = () => {
        resolve(request.result);
        tx.commit();
      };
      request.onerror = () => {
        console.error("getTableRowCount failed");
      };
    });
  }

  /**
   * 关闭数据库
   * @example
   * ```ts
   * const db = new IDBHelper('test');
   * await db.close();
   * ```
   * @returns { Promise<boolean> }
   * ***
   */
  public async close() {
    if (!this.dbRq) return false;
    await this.upgradePromise;
    await this.resetPromise;
    const dbRq = this.dbRq;
    this.dbRq = undefined;
    if (dbRq.readyState === "done") {
      dbRq.result.close();
    } else {
      dbRq.addEventListener('success', () => {
        dbRq.result.close();
      });
    }
  }

  /**
   * 重置数据库
   * @example
   * ```ts
   * const db = new IDBHelper('test');
   * await db.reSet();
   * ```
   * @returns { Promise<boolean> }
   * ***
   */
  public async reSet() {
    if (!this.dbRq) return false;
    try {
      this.dbRq.result?.close();
    } catch (error) {
      console.log(error);
    }
    const close = indexedDB.deleteDatabase(this.name);
    this.resetPromise = new Promise((resolve, reject) => {
      close.addEventListener("success", () => {
        this.version = 1;
        this.dbRq = this.getDb(this.name, this.version); // 创建数据库
        this.createTable(['check']);
        resolve(true);
      });
    })
    return this.resetPromise;
  }
}