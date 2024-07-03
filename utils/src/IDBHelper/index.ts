export class IDBHelper {
  private dbRq: IDBOpenDBRequest;
  private version: number = 1;
  private name: string;
  private initPromise: Promise<Boolean>;
  private upgradePromise: Promise<Boolean> = Promise.resolve(true);

  constructor(name: string) {
    if (name === null || name === undefined) throw new Error("数据库名称不能为空");
    this.name = name;
    this.dbRq = indexedDB.open(this.name); // 创建数据库
    this.initPromise = this.init();
    this.createTable(['check']);
  }

  /**
   * 初始化
   */
  private async init() {
    // 获取数据库版本号
    const databases = await indexedDB.databases();
    const db = databases.find(item => item.name === this.name);
    db && (this.version = db.version || 0);
    return true;
  }

  /**
   * 检查连接状态
   */
  private async checkConnect() {
    await this.initPromise;
    await this.upgradePromise;
    try {
      const tx = this.dbRq.result.transaction(['check']);
      tx.abort();
    } catch (error) {
      if (this.dbRq.readyState === "done") {
        this.dbRq.result.close();
        this.dbRq = indexedDB.open(this.name);
      }
      return new Promise((resolve, reject) => {
        this.dbRq.addEventListener('success', () => {
          resolve(true);
        })
      })
    }
  }

  /**
   * 获取所有表名
   */
  public async getAllTableName() {
    await this.checkConnect();
    return this.dbRq.result.objectStoreNames;
  }

  /**
   * 创建表
   */
  public async createTable(tableNameList: string[] | string, keyPath?: string) {
    await this.initPromise;
    if (this.dbRq.readyState === "done") {
      this.dbRq.result.close();
      this.dbRq = indexedDB.open(this.name, ++this.version);
    }
    this.dbRq.addEventListener('upgradeneeded', () => {
      if (typeof tableNameList === 'string') {
        tableNameList = [tableNameList];
      }
      tableNameList.forEach(tableName => {
        const db = this.dbRq.result;
        if (db.objectStoreNames.contains(tableName)) return;
        db.createObjectStore(tableName, keyPath ? { keyPath } : { autoIncrement: true });
      });
    });
    this.upgradePromise = new Promise(resolve => {
      this.dbRq.addEventListener('success', () => {
        resolve(true);
      });
    });
    return this.upgradePromise;
  }

  /**
   * 删除表
   */
  public async deleteTable(tableNameList: string[] | string) {
    await this.initPromise;
    if (this.dbRq.readyState === "done") {
      this.dbRq.result.close();
      this.dbRq = indexedDB.open(this.name, ++this.version);
    }
    this.dbRq.addEventListener('upgradeneeded', () => {
      if (typeof tableNameList === 'string') {
        tableNameList = [tableNameList];
      }
      tableNameList.forEach(tableName => {
        const db = this.dbRq.result;
        if (db.objectStoreNames.contains(tableName)) {
          db.deleteObjectStore(tableName);
        }
      });
    });
    this.upgradePromise = new Promise(resolve => {
      this.dbRq.addEventListener('success', () => {
        resolve(true);
      });
    });
    return this.upgradePromise;
  }

  /**
   * 删除所有表
   */
  public async deleteAllTable() {
    await this.initPromise;
    if (this.dbRq.readyState === "done") {
      this.dbRq.result.close();
      this.dbRq = indexedDB.open(this.name, ++this.version);
    }
    this.dbRq.addEventListener('upgradeneeded', () => {
      const db = this.dbRq.result;
      let tableNameList: string[] = Array.prototype.slice.call(db.objectStoreNames);
      tableNameList.forEach(tableName => {
        if (tableName === 'check') return;
        if (db.objectStoreNames.contains(tableName)) {
          db.deleteObjectStore(tableName);
        }
      });
    });
    this.upgradePromise = new Promise(resolve => {
      this.dbRq.addEventListener('success', () => {
        resolve(true);
      });
    });
    return this.upgradePromise;
  }

  /**
   * 增加/修改表中某行数据
   */
  public async setTableRow(tableName: string, data: any) {
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
   */
  public async getTableRow(tableName: string, key: string) {
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
   */
  public async deleteTableRow(tableName: string, key: string) {
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
   */
  public async getAllTableRow(tableName: string, range?: IDBKeyRange) {
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
   */
  public async getTableRowCount(tableName: string, range?: IDBKeyRange) {
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
   */
  public async close() {
    await this.initPromise;
    await this.upgradePromise;
    if (this.dbRq.readyState === "done") {
      this.dbRq.result.close();
    } else {
      this.dbRq.addEventListener('success', () => {
        this.dbRq.result.close();
      });
    }
  }

  /**
   * 重置数据库
   */
  public async reSet() {
    try {
      this.dbRq.result.close();
    } catch (error) {
      console.log(error);
    }
    const close = indexedDB.deleteDatabase(this.name);
    this.initPromise = new Promise((resolve, reject) => {
      close.addEventListener("success", () => {
        this.version = 1;
        this.dbRq = indexedDB.open(this.name, this.version); // 创建数据库
        this.createTable(['check']);
        resolve(true);
      });
    })
    return this.initPromise;
  }
}