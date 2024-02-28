# __z-util-page__

## 引入

### 1. 全局引入

拷贝包目录下dist文件夹内 [ zutilpage.min.js ] 文件到自己的项目里，在HTML里添加如下引用：

``` html
<script src="zutilpage.min.js"></script>
```

这会添加一个全局变量 [ Utils ] 到window对象;

``` javascript
Utils.debounce(function(){
    console.log('身体和心灵，总有一个在路上。');
}, 200);
```

### 2. 按需引入

运行以下命令将工具包安装到本地

``` javascript
npm i z-util-page --save
```

根据需要自行引入

``` javascript
import { debounce, throttle, deepClone } from 'z-util-page';
```

## 说明:

### 1. 函数防抖

``` javascript
import { debounce } from 'z-util-page'
let debounced = debounce(function(){
    console.log('身体和心灵，总有一个在路上。');
    return '身体和心灵，总有一个在路上。';
}, 1000, true);
//then方法为函数执行注册回调；
debounced.then(function(res){
    console.log(res);
});
debounced();
```

### 2. 函数节流

``` javascript
import { throttle } from 'z-util-page'
let throttle = throttle(function(){
    console.log('身体和心灵，总有一个在路上。');
    return '身体和心灵，总有一个在路上。';
}, 1000, {
    //leading: 开始是否执行
	//trailing: 结束是否执行
    //不能同时设置为false
    leading: true, 
    trailing: true
});
```

### 3.  深拷贝

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

### 4.  生成UUID

``` javascript
import { generateUUID } from 'z-util-page'
generateUUID();
```

### 5. Web端文件操作

``` javascript
import { FileHelper } from 'z-util-page';

//文件选择
FileHelper.choose(function(files){
    console.log(files);
},{
    accept: [".doc",".docx","application/msword"],
    capture: "user",
    multiple: true
});

//文件读取
//read方法参数类型："File" | "Blob"
const fileReader = FileHelper.read(file)
	.loadend(function (res) {
    	console.log(res);
	})
	.error(function(err){
    	console.log(err);
	})
	//start方法参数类型："ArrayBuffer" | "BinaryString" | "DataURL" | "Text"
	.start('Text');

fileReader.stop();//停止读取
fileReader.getStatus();//获取状态
fileReader.getResult();//获取结果

//文件下载
FileHelper.save(new Blob([JSON.stringify({a: '身体和心灵，总有一个在路上。'}, null, 2)], {type : 'application/json'}), 'test.json');
```

### 6. Http

``` javascript
import { Http } from 'z-util-page';

const http = new Http({
    //超时等待时间(ms)
    timeout: 10000,
    //根域名
    baseUrl: "https://developer.mozilla.org",
    //请求数据格式
    contentType: 'application/json',
    //响应数据格式
    responseType: 'json'
});

http.ajax({
    //API
    url: '/test',
    //请求方法
    method: 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE',
    //响应数据格式
    type: "arraybuffer" | "blob" | "document" | "json" | "text",
    //超时等待时间(ms)
    timeout: 100,
    //请求参数
    data: {
        name: 'jack'
    },
    //请求头
    header: {
        'Content-Type': 'multipart/form-data'
    },
    //文件
    file: {
        'file': new Blob([JSON.stringify({a: '身体和心灵，总有一个在路上。'}, null, 2)], {type : 'application/json'})
    }
}).then((res)=>{
    console.log(res);
});

```

### 7. Reactive

``` javascript
import { Reactive } from 'z-util-page';

const a = {
    text: ""
};
//生成响应式对象
const b = Reactive.reactive({
    text: ""
});
//创建副作用函数
Reactive.effect(function () {
    a.text = b.text;
});
//修改响应式对象属性
b.text = "jack";

//副作用函数执行改变了a对象属性值，输出值为'jack'
console.log(a.text);
```
### 8. CookieHelper

```javascript
import { CookieHelper } from 'z-util-page';

// 根据Key获取值
CookieHelper.getItem('TEST');

// 根据Key获取值后从cookie中删除该值
CookieHelper.getItemOnce('TEST');

// 修改或创建cookie键值对
CookieHelper.setItem('TEST', '身体和心灵，总有一个在路上。');

// 根据key删除指定键值对
CookieHelper.removeItem('TEST');

// 判断key是否存在cookie中
CookieHelper.exist('TEST');

// 清空cookie
CookieHelper.clear('TEST');
```

