# __z-util-page__

## 引入

### 1. 全局引入

拷贝包目录下dist文件夹内 [ zutilpage.min.js ] 文件到自己的项目里，在HTML里添加如下引用：

``` html
<script src="zutilpage.min.js"></script>
```

这会添加一个全局变量 [ Utils ] 到Windowd对象;

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

### 4.  生成UUID  或  GUID

``` javascript
import { UuidFactory } from 'z-util-page'
UuidFactory.uuid();
UuidFactory.guid();
```

### 5. Web端文件操作

``` javascript
import { FileHelper } from 'z-util-page';

//文件选择
FileHelper.choose({
    accept: [".doc",".docx","application/msword"],
    capture: "user",
    multiple: true
},function(files){
    console.log(files);
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

//文件写入数据并下载
FileHelper.write(new Blob([JSON.stringify({a: '身体和心灵，总有一个在路上。'}, null, 2)], {type : 'application/json'}), 'test.json');
```

### 6. Http

``` javascript
import { Http } from 'z-util-page';

```

### 7. Reactive

``` javascript
import { Reactive } from 'z-util-page';
```
