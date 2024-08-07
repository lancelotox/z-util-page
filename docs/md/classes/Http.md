# Class: Http

## Constructors

### new Http()

```ts
new Http(options: CustomHttpOptions): Http
```

构造函数

#### Example

```ts
const http = new Http({
 //超时等待时间(ms)
 timeout: 10000,
 //基地址
 baseUrl: 'http://localhost:3000',
 //请求体数据格式
 contentType: 'application/json',
 //响应数据格式
 responseType: 'json'
});
```

#### Parameters

<table>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
<tr>
<td>

`options`

</td>
<td>

`CustomHttpOptions`

</td>
<td>

默认参数

</td>
</tr>
</table>

#### Returns

[`Http`](Http.md)

## Properties

| Property | Modifier | Type | Description |
| ------ | ------ | ------ | ------ |
| `Interceptor` | `public` | `Interceptor` | 拦截器 |
| `options` | `public` | `HttpOptions` | 默认参数 |

## Methods

### ajax()

```ts
ajax(param: Param): PromiseHandle
```

XMLHttpRequest异步请求

#### Example

```ts
const http = new Http();
// 拦截器
http.Interceptor.request((param) => {
 // 请求参数
 console.log(param);
 param.url = 'http://localhost:3000' + param.url;
})
http.Interceptor.response((res) => {
 // 请求结果
 console.log(res);
 res.data = res.data + '拦截器修改';
 return res;
})

// 请求
const req = http.ajax({
 // 请求地址
 baseUrl: 'http://localhost:3000',
 url: '/api/user',
 // 请求方法
 method: 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE',
 // 响应数据格式
 type: "arraybuffer" | "blob" | "document" | "json" | "text",
 // 请求头
 headers: {
  'Content-Type': 'application/json',
   'Authorization': 'Bearer ' + token
 }
 // 请求体
 data: {
  name: 'jack'
 }
 // 请求参数
 params: {
  name: 'jack'
 }
 // 请求超时时间
 timeout: 10000
 // 请求体数据格式
 contentType: 'application/json',
 // 响应数据类型
 responseType: 'json',
 // 上传文件
 file: {
   file: new Blob([JSON.stringify({a: '身体和心灵，总有一个在路上。'}, null, 2)], {type : 'application/json'})
 }
}).then((res) => {
  // 请求成功
}).catch((err) => {
 // 请求失败
}).finally(() => {
 // 请求完成
}).progress(() => {
 // 请求进度
});

// 取消请求
req.abort();
```

#### Parameters

<table>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
<tr>
<td>

`param`

</td>
<td>

`Param`

</td>
<td>

请求参数

</td>
</tr>
</table>

#### Returns

`PromiseHandle`

***

### ajaxAsync()

```ts
ajaxAsync(param: Param): any
```

XMLHttpRequest同步请求，绝大多数情况下只能在work进程内使用。

#### Example

```ts
const http = new Http();
// 请求
const req = http.ajax({
 // 请求地址
 baseUrl: 'http://localhost:3000',
 url: '/api/user',
 // 请求方法
 method: 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE',
 // 响应数据格式
 type: "arraybuffer" | "blob" | "document" | "json" | "text",
 // 请求头
 headers: {
  'Content-Type': 'application/json',
   'Authorization': 'Bearer ' + token
 }
 // 请求体
 data: {
  name: 'jack'
 }
 // 请求参数
 params: {
  name: 'jack'
 }
 // 请求超时时间
 timeout: 10000
 // 请求体数据格式
 contentType: 'application/json',
 // 响应数据类型
 responseType: 'json',
 // 上传文件
 file: {
   file: new Blob([JSON.stringify({a: '身体和心灵，总有一个在路上。'}, null, 2)], {type : 'application/json'})
 }
})
// 请求成功
console.log(res);
```

#### Parameters

<table>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
<tr>
<td>

`param`

</td>
<td>

`Param`

</td>
<td>

请求参数

</td>
</tr>
</table>

#### Returns

`any`
