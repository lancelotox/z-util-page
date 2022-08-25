# __z-utils__

## 引入

### 1. 全局引入

拷贝包目录下dist文件夹内 [ zUtilPages.umd.js ] 文件到自己的项目里，在HTML里添加如下引用：

``` html
<script src="zUtilPages.umd.js"></script>
```

这会添加一个全局变量 [ ZUtilPages ] 到你的项目

``` javascript
ZUtilPages.MD5('身体和心灵，总有一个在路上。');
```

### 2. 按需引入

运行以下命令将工具包安装到本地

``` javascript
npm i z-util-page --save
```

根据需要自行引入

``` javascript
import { fileSave, MD5 } from 'z-util-page'
```

## 说明:

### 1. 文件下载保存

``` javascript
import { saveFile } from 'z-util-page'
saveFile(new Blob([JSON.stringify({a: '身体和心灵，总有一个在路上。'}, null, 2)], {type : 'application/json'}), 'test.json');
```

### 2. MD5加密

``` javascript
import { MD5 } from 'z-util-page'
MD5('身体和心灵，总有一个在路上。');
```

### 3.  将XLSX生成的sheet转化为Blob对象

``` javascript
import { sheet2blob } from 'z-util-page'
sheet2blob(sheets, names, option);
```

### 4.  生成UUID  或  GUID

``` javascript
import { uuidFactory } from 'z-util-page'
uuidFactory.uuid();
uuidFactory.guid();
```

### 5. 函数防抖

``` javascript
import { debounce } from 'z-util-page'
let debounced = debounce(function(){
    console.log('身体和心灵，总有一个在路上。');
    return '身体和心灵，总有一个在路上。';
}, 1000, true).then(function(res){
    console.log(res);
});
```

### 6. 函数节流

``` javascript
import { throttle } from 'z-util-page'
let throttle = throttle(function(){
    console.log('身体和心灵，总有一个在路上。');
    return '身体和心灵，总有一个在路上。';
}, 1000, {
    leading: true,
    trailing: true
});
```

### 7. 深拷贝

``` javascript
import { deepClone } from 'z-util-page'
let newValue = deepClone({
    a: '身体和心灵，总有一个在路上。',
    b: {
        c: new Date(),
        d: [1, 3, 4],
        e: Symbol(),
        a: null,
        b: undefined,
        f: {
            a: 1,
            b: true,
            
        }
    },
    c: document.createElement('div'),
    d: new RegExp(/\d+/ig),
    e: new Error('错误'),
    f: function(){
        console.log('身体和心灵，总有一个在路上。');
    }
});
```

### 7. 获取类型名

``` javascript
import { getType } from 'z-util-page'
getType(value);
```

### 8. 文件选择

~~~ javascript
import { chooseFile } from 'z-util-page'
chooseFile({
    accept: ".doc,.docx,application/msword",
    capture: "user",
    multiple: true
},function(files){
    console.log(files);
});
~~~

### 9. 文件读取

~~~ javascript
import { readFile } from 'z-util-page'

//start方法参数类型："ArrayBuffer" | "BinaryString" | "DataURL" | "Text"
const file = ZUtilPages.readFile(file).loadend(function (res) {
    console.log(res);
}).error(function(err){
    console.log(err);
}).start('Text');

file.stop();
file.getStatus();
file.getResult();

~~~





---
