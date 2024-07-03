import { IDBHelper } from "z-util-page";
import { createView } from "@/utils/view";

const View = createView('IDBHelper');

let DBHelper: IDBHelper;

View.addTestBtn('创建数据库', () => {
  DBHelper = new IDBHelper('FileLiberary');
  console.log(DBHelper);
});

View.addTestBtn('关闭数据库', () => {
  DBHelper.close();
  console.log(DBHelper);
});

View.addTestBtn('监听', () => {
  window.addEventListener('storage', (e) => {
    DBHelper.close();
    console.log(DBHelper);
  });
});

View.addTestBtn('触发', () => {
  window.localStorage.setItem('test', new Date().getTime().toString());
});

View.addTestBtn('检查数据库是否被链接', () => {
  let d1 = new IDBHelper('FileLiberary');
  let d2 = new IDBHelper('FileLiberary');
  console.log(d1, d2);
});

let a, index = 1;
View.addTestBtn('数据库多链接1', () => {
  a = indexedDB.open('test', index++);
  a.addEventListener('success', () => {
    console.log('success');
  })
  a.addEventListener("blocked", () => {
    console.log('blocked');
  })
  a.addEventListener("error", () => {
    console.log('error');
  })
  console.log(a);
});

View.addTestBtn('数据库链接时间', () => {
  let start = new Date().getTime();
  const a = indexedDB.open('test');
  a.addEventListener('success', () => {
    let end = new Date().getTime();
    console.log(end - start);
  })
});

View.addTestBtn('一次创建多个表', () => {
  DBHelper.createTable(['1', '2', '3', '4', '5'], 'onekey')
});

View.addTestBtn('多次创建多个表', async () => {
  DBHelper.createTable(['1', '2', '3'])
  DBHelper.createTable(['4', '5', '6'])
  DBHelper.createTable(['7', '8', '9'])
});

View.addTestBtn('删除表', async () => {
  DBHelper.deleteTable(['1', '2', '3'])
});

View.addTestBtn('删除所有表', async () => {
  DBHelper.deleteAllTable()
});

View.addTestBtn('重置数据库', async () => {
  DBHelper.reSet()
});

let i = 0;
function setData() {
  DBHelper.setTableRow('1', { onekey: String(i++), age: 2, id: 2 })
  setTimeout(() => {
    setData();
  }, 20 * Math.random());
}

View.addTestBtn('向表中写入数据', async () => {
  DBHelper.createTable('1');
  setData();
});

View.addTestBtn('获取表总数', async () => {
  const count = await DBHelper.getTableRowCount('1');
  console.log(count);
});

