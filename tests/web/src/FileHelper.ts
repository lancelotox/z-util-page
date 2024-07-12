import { FileHelper } from "z-util-page";
import { createView } from "@/utils/view";

const View = createView('FileHelper');

// View.addTestBtn('选择文件夹', () => {
//   FileHelper.pickDir('test');
// });

// View.addTestBtn('批量下载文件到文件夹', () => {
//   FileHelper.saveFileToDir('test', 'test.txt', ['你好世界']);
//   FileHelper.saveFileToDir('test', 'test.txt', ['你好世界1']);
//   FileHelper.saveFileToDir('test', 'test.txt', ['你好世界2']);
//   FileHelper.saveFileToDir('test', 'test.txt', ['你好世界3']);
// });

View.addTestBtn('下载blob文件', () => {
  FileHelper.save(new Blob(['你好世界'], { type: 'text/plain' }), 'test.txt');
});

View.addTestBtn('文件选择', () => {
  FileHelper.choose()
    .then(files => {
      console.log(files);
    })
    .catch(err => {
      console.error(err);
    });
});
