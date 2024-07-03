import { FileHelper } from "@/index";

const app = document.querySelector('#app');

const View = document.createElement('div');
const h1 = document.createElement('h1');
h1.innerText = 'FileHelper';
View.appendChild(h1);
app?.appendChild(View);

function addTestBtn(text: string, func: any) {
  const btn = document.createElement('button');
  btn.innerText = text;
  View.appendChild(btn);
  btn.addEventListener('click', func);
}

addTestBtn('批量下载文件到文件夹', () => {
  FileHelper.saveFileToDir('test', 'test.txt', ['你好世界']);
  FileHelper.saveFileToDir('test', 'test1.txt', ['你好世界1']);
  FileHelper.saveFileToDir('test', 'test2.txt', ['你好世界2']);
  FileHelper.saveFileToDir('test', 'test3.txt', ['你好世界3']);
});

addTestBtn('下载blob文件', () => {
  FileHelper.save(new Blob(['你好世界'], { type: 'text/plain' }), 'test.txt');
});
