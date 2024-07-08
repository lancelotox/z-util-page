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

### 3. 深拷贝

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

### 4. 生成UUID

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
import { reactive, effect } from 'z-util-page/Reactive';

const a = {
    text: ""
};
//生成响应式对象
const b = reactive({
    text: ""
});
//创建副作用函数
effect(function () {
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

### 9. IDBHelper

```javascript
import { IDBHelper } from 'z-util-page';

// 获取数据库
const PersonDB = new IDBHelper('Person');

// 创建表
PersonDB.createTable(['Chinese', 'American'], 'id');
PersonDB.createTable('Indian', 'caste');

// 删除表
PersonDB.deleteTable(['Chinese', 'American']);
PersonDB.deleteTable('Indian');
// 删除所有表
PersonDB.deleteAllTable();

// 获取所有表名
PersonDB.getAllTableName();

// 向表中写入数据
PersonDB.setTableRow('Chinese', { id: 1, age: 22, name: '' })

// 从表中通过主键查询数据
PersonDB.getTableRow('Chinese', 1);

// 删除表中某行数据
PersonDB.deleteTableRow('Chinese', 1);

// 获取表中所有数据
PersonDB.getAllTableRow('Chinese');

// 获取表数据条数
PersonDB.getTableRowCount('Chinese');

// 重置数据库到初始版本（会清空数据库）
PersonDB.reSet();

// 断开数据库连接
PersonDB.close();
```