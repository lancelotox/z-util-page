import { IDBHelper } from "@/index";

const app = document.querySelector('#app');

const View = document.createElement('div');
const h1 = document.createElement('h1');
h1.innerText = 'IDBHelper';
View.appendChild(h1);
app?.appendChild(View);

function addTestBtn(text: string, func: any) {
  const btn = document.createElement('button');
  btn.innerText = text;
  View.appendChild(btn);
  btn.addEventListener('click', func);
}

let DBHelper: IDBHelper;

addTestBtn('创建数据库', () => {
  const blob = new Blob(['你好世界'], { type: 'text/plain' });
  DBHelper = new IDBHelper('FileLiberary');
  console.log(DBHelper);
});

addTestBtn('一次创建多个表', () => {
  DBHelper.createTable(['1', '2', '3', '4', '5'], 'onekey')
});

addTestBtn('多次创建多个表', async () => {
  DBHelper.createTable(['1', '2', '3'])
  DBHelper.createTable(['4', '5', '6'])
  DBHelper.createTable(['7', '8', '9'])
});

addTestBtn('删除表', async () => {
  DBHelper.deleteTable(['1', '2', '3'])
});

addTestBtn('删除所有表', async () => {
  DBHelper.deleteAllTable()
});

addTestBtn('重置数据库', async () => {
  DBHelper.reSet()
});

let i = 0;
function setData() {
  DBHelper.setTableRow('1', { onekey: String(i++), age: 2, id: 2 })
  setTimeout(() => {
    setData();
  }, 20 * Math.random());
}

addTestBtn('向表中写入数据', async () => {
  DBHelper.createTable('1');
  setData();
});

addTestBtn('获取表总数', async () => {
  const count = await DBHelper.getTableRowCount('1');
  console.log(count);
});

