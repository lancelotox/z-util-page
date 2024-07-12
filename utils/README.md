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