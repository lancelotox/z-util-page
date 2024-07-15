# z-util-page 说明文档

## 简介

z-util-page 是一个基于JavaScript的工具包，包含了一些常用的工具函数，如防抖、节流、深拷贝等。

## 安装

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

## 说明

### Cookie操作辅助类

#### CookieHelper

##### clear()

```ts
function clear(): void
```

清空cookie

__Example__

```ts
clear();
```

__Returns__

`void`

***

##### exist()

```ts
function exist(key: string): boolean
```

根据key值判断Cookie中是否存在键值对

__Example__

```ts
exist('test');
```

__Parameters__

<table>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
<tr>
<td>

`key`

</td>
<td>

`string`

</td>
<td>

key值

</td>
</tr>
</table>

__Returns__

`boolean`

***

##### getItem()

```ts
function getItem(key: string): string
```

根据key值获取cookie数据

__Example__

```ts
getItem('test');
```

__Parameters__

<table>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
<tr>
<td>

`key`

</td>
<td>

`string`

</td>
<td>

key值

</td>
</tr>
</table>

__Returns__

`string`

Cookie中key值为key的值

***

##### getItemOnce()

```ts
function getItemOnce(key: string): string
```

根据key值获取cookie数据后删除Cookie中该键值对

__Example__

```ts
getItemOnce('test');
```

__Parameters__

<table>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
<tr>
<td>

`key`

</td>
<td>

`string`

</td>
<td>

key值

</td>
</tr>
</table>

__Returns__

`string`

Cookie中键值为key的值

***

##### removeItem()

```ts
function removeItem(key: string): void
```

根据key值删除Cookie中键值对

__Example__

```ts
removeItem('test');
```

__Parameters__

<table>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
<tr>
<td>

`key`

</td>
<td>

`string`

</td>
<td>

key值

</td>
</tr>
</table>

__Returns__

`void`

***

##### setItem()

```ts
function setItem(key: string, val: string): boolean
```

设置cookie的键值对

__Example__

```ts
setItem('test', '你好, 世界!');
```

__Parameters__

<table>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
<tr>
<td>

`key`

</td>
<td>

`string`

</td>
<td>

键

</td>
</tr>
<tr>
<td>

`val`

</td>
<td>

`string`

</td>
<td>

值

</td>
</tr>
</table>

__Returns__

`boolean`

### DOM操作辅助类

#### DomHelper

##### draggable()

```ts
function draggable(dom: HTMLElement): false | {
  close: void;
  open: void;
  wrap: void;
}
```

将一个元素处理为可拖动元素

__Example__

```ts
const handle = draggable(dom: HTMLElement);
// 关闭拖动功能
handle.close();
// 开启拖动功能
handle.open();
// 指定一个子元素，当该鼠标按下该元素时，关闭拖动功能，鼠标抬起后恢复拖动功能
handle.wrap(dom: HTMLElement);
```

__Parameters__

<table>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
<tr>
<td>

`dom`

</td>
<td>

`HTMLElement`

</td>
<td>

要处理的元素

</td>
</tr>
</table>

__Returns__

`false` \| \{
  `close`: `void`;
  `open`: `void`;
  `wrap`: `void`;
 \}

***

##### scrollToBottom()

```ts
function scrollToBottom(scroll: HTMLElement): void
```

将可滚动元素滚动到底部

__Example__

```ts
scrollToBottom(dom: HTMLElement);
```

__Parameters__

<table>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
<tr>
<td>

`scroll`

</td>
<td>

`HTMLElement`

</td>
<td>

要滚动的元素

</td>
</tr>
</table>

__Returns__

`void`

***

##### scrollToLeft()

```ts
function scrollToLeft(scroll: HTMLElement): void
```

将可滚动元素滚动到最左侧

__Example__

```ts
scrollToLeft(dom: HTMLElement);
```

__Parameters__

<table>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
<tr>
<td>

`scroll`

</td>
<td>

`HTMLElement`

</td>
<td>

要滚动的元素

</td>
</tr>
</table>

__Returns__

`void`

***

##### scrollToRight()

```ts
function scrollToRight(scroll: HTMLElement): void
```

将可滚动元素滚动到最右侧

__Example__

```ts
scrollToRight(dom: HTMLElement);
```

__Parameters__

<table>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
<tr>
<td>

`scroll`

</td>
<td>

`HTMLElement`

</td>
<td>

要滚动的元素

</td>
</tr>
</table>

__Returns__

`void`

***

##### scrollToTop()

```ts
function scrollToTop(scroll: HTMLElement): void
```

将可滚动元素滚动到顶部

__Example__

```ts
scrollToTop(dom: HTMLElement);
```

__Parameters__

<table>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
<tr>
<td>

`scroll`

</td>
<td>

`HTMLElement`

</td>
<td>

要滚动的元素

</td>
</tr>
</table>

__Returns__

`void`

### HTTTP请求操作辅助类

#### Http

__Constructors__

__new Http()__

```ts
new Http(options: CustomHttpOptions): Http
```

构造函数

__Example__

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

__Parameters__

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

__Returns__

`Http`

__Properties__

| Property | Modifier | Type | Description |
| ------ | ------ | ------ | ------ |
| `Interceptor` | `public` | `Interceptor` | 拦截器 |
| `options` | `public` | `HttpOptions` | 默认参数 |

__Methods__

__ajax()__

```ts
ajax(param: Param): PromiseHandle
```

XMLHttpRequest异步请求

__Example__

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

__Parameters__

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

__Returns__

`PromiseHandle`

__ajaxAsync()__

```ts
ajaxAsync(param: Param): any
```

XMLHttpRequest同步请求，绝大多数情况下只能在work进程内使用。

__Example__

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

__Parameters__

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

__Returns__

`any`

### indexedDB操作辅助类

#### IDBHelper

__Constructors__

__new IDBHelper()__

```ts
new IDBHelper(name: string): IDBHelper
```

构造函数

__Parameters__

<table>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
<tr>
<td>

`name`

</td>
<td>

`string`

</td>
<td>

数据库名称

</td>
</tr>
</table>

__Returns__

`IDBHelper`

IDBHelper实例
***

__Throws__

Error 数据库名称不能为空

__Methods__

__close()__

```ts
close(): Promise<undefined | false>
```

关闭数据库

__Example__

```ts
const db = new IDBHelper('test');
await db.close();
```

__Returns__

`Promise`\<`undefined` \| `false`\>

***

__createTable()__

```ts
createTable(tableNameList: string | string[], keyPath?: string): Promise<boolean>
```

创建表

__Example__

```ts
const db = new IDBHelper('test');
await db.createTable('tn');
```

__Parameters__

<table>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
<tr>
<td>

`tableNameList`

</td>
<td>

`string` \| `string`[]

</td>
<td>

表名列表

</td>
</tr>
<tr>
<td>

`keyPath`?

</td>
<td>

`string`

</td>
<td>

主键

</td>
</tr>
</table>

__Returns__

`Promise`\<`boolean`\>

***

__deleteAllTable()__

```ts
deleteAllTable(): Promise<boolean>
```

删除所有表

__Example__

```ts
const db = new IDBHelper('test');
await db.deleteAllTable();
```

__Returns__

`Promise`\<`boolean`\>

***

__deleteTable()__

```ts
deleteTable(tableNameList: string | string[]): Promise<boolean>
```

删除表

__Example__

```ts
const db = new IDBHelper('test');
await db.deleteTable('tn');
```

__Parameters__

<table>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
<tr>
<td>

`tableNameList`

</td>
<td>

`string` \| `string`[]

</td>
<td>

表名列表

</td>
</tr>
</table>

__Returns__

`Promise`\<`boolean`\>

***

__deleteTableRow()__

```ts
deleteTableRow(tableName: string, key: string): Promise<undefined | false>
```

删除表中某行数据

__Example__

```ts
const db = new IDBHelper('test');
await db.deleteTableRow('tn', 'key');
```

__Parameters__

<table>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
<tr>
<td>

`tableName`

</td>
<td>

`string`

</td>
<td>

表名

</td>
</tr>
<tr>
<td>

`key`

</td>
<td>

`string`

</td>
<td>

键

</td>
</tr>
</table>

__Returns__

`Promise`\<`undefined` \| `false`\>

***

__getAllTableName()__

```ts
getAllTableName(): Promise<false | DOMStringList>
```

获取所有表名

__Example__

```ts
const db = new IDBHelper('test');
await db.getAllTableName();
```

__Returns__

`Promise`\<`false` \| `DOMStringList`\>

false 或 string[]
***

__getAllTableRow()__

```ts
getAllTableRow(tableName: string, range?: IDBKeyRange): Promise<unknown>
```

获取表中所有数据

__Example__

```ts
const db = new IDBHelper('test');
await db.getAllTableRow('tn');
```

__Parameters__

<table>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
<tr>
<td>

`tableName`

</td>
<td>

`string`

</td>
<td>

表名

</td>
</tr>
<tr>
<td>

`range`?

</td>
<td>

`IDBKeyRange`

</td>
<td>

[范围](https://developer.mozilla.org/zh-CN/docs/Web/API/IDBKeyRange)

</td>
</tr>
</table>

__Returns__

`Promise`\<`unknown`\>

***

__getTableRow()__

```ts
getTableRow(tableName: string, key: string): Promise<unknown>
```

获取表中某行数据

__Example__

```ts
const db = new IDBHelper('test');
await db.getTableRow('tn', 'key');
```

__Parameters__

<table>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
<tr>
<td>

`tableName`

</td>
<td>

`string`

</td>
<td>

表名

</td>
</tr>
<tr>
<td>

`key`

</td>
<td>

`string`

</td>
<td>

键

</td>
</tr>
</table>

__Returns__

`Promise`\<`unknown`\>

***

__getTableRowCount()__

```ts
getTableRowCount(tableName: string, range?: IDBKeyRange): Promise<unknown>
```

获取表数据条数

__Example__

```ts
const db = new IDBHelper('test');
await db.getTableRowCount('tn');
```

__Parameters__

<table>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
<tr>
<td>

`tableName`

</td>
<td>

`string`

</td>
<td>

表名

</td>
</tr>
<tr>
<td>

`range`?

</td>
<td>

`IDBKeyRange`

</td>
<td>

[范围](https://developer.mozilla.org/zh-CN/docs/Web/API/IDBKeyRange)

</td>
</tr>
</table>

__Returns__

`Promise`\<`unknown`\>

***

__reSet()__

```ts
reSet(): Promise<false | Boolean>
```

重置数据库

__Example__

```ts
const db = new IDBHelper('test');
await db.reSet();
```

__Returns__

`Promise`\<`false` \| `Boolean`\>

***

__setTableRow()__

```ts
setTableRow(tableName: string, data: any): Promise<undefined | false>
```

增加/修改表中某行数据

__Example__

```ts
const db = new IDBHelper('test');
await db.setTableRow('tn', '你好！');
```

__Parameters__

<table>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
<tr>
<td>

`tableName`

</td>
<td>

`string`

</td>
<td>

表名

</td>
</tr>
<tr>
<td>

`data`

</td>
<td>

`any`

</td>
<td>

数据

</td>
</tr>
</table>

__Returns__

`Promise`\<`undefined` \| `false`\>

***

### 事件总线

#### EventBus

__Example__

```ts
// 总线
let count = 0;
EventBus.on('test', function (num, num1) {
  count = num + num1;
})
EventBus.emit('test', 1, 2);
expect(count).toBe(3);

// 分线
let count = 0;
const bus = new EventBus();
bus.on('test', function (num, num1) {
  count = num + num1;
})
bus.emit('test', 3, 4);
expect(count).toBe(7);
```

__Constructors__

__new EventBus()__

```ts
new EventBus(config?: EventBusConfig): EventBus
```

__Parameters__

<table>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
<tr>
<td>

`config`?

</td>
<td>

`EventBusConfig`

</td>
</tr>
</table>

__Returns__

`EventBus`

__Properties__

| Property | Modifier | Type |
| ------ | ------ | ------ |
| `emit` | `public` | (`key`: `string`, ...`rest`: `any`[]) => `void` |
| `on` | `public` | (`key`: `string`, `func`: (...`rest`: `any`[]) => `void`) => `void` |

__Methods__

__emit()__

```ts
static emit(key: string, ...rest: any[]): void
```

触发事件

__Parameters__

<table>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
<tr>
<td>

`key`

</td>
<td>

`string`

</td>
<td>

事件名

</td>
</tr>
<tr>
<td>

...`rest`

</td>
<td>

`any`[]

</td>
<td>

传给回调函数的参数

</td>
</tr>
</table>

__Returns__

`void`

__on()__

```ts
static on(key: string, func: (...rest: any[]) => void): void
```

监听事件

__Parameters__

<table>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
<tr>
<td>

`key`

</td>
<td>

`string`

</td>
<td>

事件名

</td>
</tr>
<tr>
<td>

`func`

</td>
<td>

(...`rest`: `any`[]) => `void`

</td>
<td>

回调函数

</td>
</tr>
</table>

__Returns__

`void`

### 响应式数据API

#### Reactive

##### computed()

```ts
function computed<T>(getter: () => {
  value: T;
 }): {
  get value: any;
}
```

获取计算属性

__Example__

```ts
const count = ref(0);
const double = computed(() => count.value * 2);
console.log(double.value); //0
count.value = 1;
console.log(double.value); //2
```

__Type Parameters__

<table>
<tr>
<th>Type Parameter</th>
</tr>
<tr>
<td>

`T`

</td>
</tr>
</table>

__Parameters__

<table>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
<tr>
<td>

`getter`

</td>
<td>

() => \{ `value`: `T`; \}

</td>
<td>

</td>
</tr>
</table>

__Returns__

```ts
{
  get value: any;
}
```

computed

| Name | Type |
| ------ | ------ |
| `get value` | `any` |

***

##### effect()

```ts
function effect(func: Function, options: EffectOptions): Effect
```

创建副作用函数

__Example__

```ts
const count = ref(0);
effect(() => {
 console.log(count.value);
})
count.value = 1;
// 打印1
```

__Parameters__

<table>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
<tr>
<td>

`func`

</td>
<td>

`Function`

</td>
<td>

函数

</td>
</tr>
<tr>
<td>

`options`

</td>
<td>

`EffectOptions`

</td>
<td>

配置

</td>
</tr>
</table>

__Returns__

`Effect`

effectFunc

***

##### reactive()

```ts
function reactive<T>(
   value: T, 
   isShadow: boolean, 
   isReadonly: boolean): T
```

代理对象值，返回响应式数据

__Example__

```ts
const obj = reactive({name:'张三'});
obj.name = '李四';
console.log(obj.name); //李四
```

__Type Parameters__

<table>
<tr>
<th>Type Parameter</th>
</tr>
<tr>
<td>

`T` *extends* `object`

</td>
</tr>
</table>

__Parameters__

<table>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Default value</th>
<th>Description</th>
</tr>
<tr>
<td>

`value`

</td>
<td>

`T`

</td>
<td>

`undefined`

</td>
<td>

对象值

</td>
</tr>
<tr>
<td>

`isShadow`

</td>
<td>

`boolean`

</td>
<td>

`false`

</td>
<td>

true为深代理，false为浅代理

</td>
</tr>
<tr>
<td>

`isReadonly`

</td>
<td>

`boolean`

</td>
<td>

`false`

</td>
<td>

是否只读

</td>
</tr>
</table>

__Returns__

`T`

***

##### ref()

```ts
function ref<T>(value: T, isReadonly: boolean): Ref<T>
```

代理基本类型值，返回响应式数据
```ts
const obj = ref(3);
obj.value = 4;
console.log(obj.value); //4
```

__Type Parameters__

<table>
<tr>
<th>Type Parameter</th>
</tr>
<tr>
<td>

`T`

</td>
</tr>
</table>

__Parameters__

<table>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Default value</th>
<th>Description</th>
</tr>
<tr>
<td>

`value`

</td>
<td>

`T`

</td>
<td>

`undefined`

</td>
<td>

基本类型值

</td>
</tr>
<tr>
<td>

`isReadonly`

</td>
<td>

`boolean`

</td>
<td>

`false`

</td>
<td>

是否只读

</td>
</tr>
</table>

__Returns__

`Ref`\<`T`\>

***

##### toRaw()

```ts
function toRaw<T>(proxy: T): T
```

获取原始对象

__Example__

```ts
const count = reactive({ a: 1 });
console.log(toRaw(count)); //{ a: 1 }
```

__Type Parameters__

<table>
<tr>
<th>Type Parameter</th>
</tr>
<tr>
<td>

`T`

</td>
</tr>
</table>

__Parameters__

<table>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
<tr>
<td>

`proxy`

</td>
<td>

`T`

</td>
<td>

响应式对象

</td>
</tr>
</table>

__Returns__

`T`

原始对象

***

##### toRef()

```ts
function toRef(val: any, key: string | symbol): {
  get set value: any;
}
```

将响应式对象的某键值转为ref

__Example__

```ts
const obj = reactive({ a: 1 });
const a = toRef(obj, 'a');
a.value = 2;
console.log(obj.a); //2
```

__Parameters__

<table>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
<tr>
<td>

`val`

</td>
<td>

`any`

</td>
<td>

响应式对象

</td>
</tr>
<tr>
<td>

`key`

</td>
<td>

`string` \| `symbol`

</td>
<td>

键值

</td>
</tr>
</table>

__Returns__

```ts
{
  get set value: any;
}
```

Ref

| Name | Type |
| ------ | ------ |
| `get value` | `any` |
| `set value` | `void` |

***

##### toRefs()

```ts
function toRefs(obj: any): {}
```

将响应式对象的键值全部转换为Ref, 可解构使用

__Example__

```ts
const obj = reactive({ a: 1, b: 2 });
const { a, b } = toRefs(obj);
a.value = 2;
console.log(obj.a); //2
```

__Parameters__

<table>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
<tr>
<td>

`obj`

</td>
<td>

`any`

</td>
<td>

响应式对象

</td>
</tr>
</table>

__Returns__

```ts
{}
```

Refs

***

##### watch()

```ts
function watch(
   source: object | Function, 
   cb: Function, 
   options: EffectOptions): void
```

监听响应式数据

__Example__

```ts
const count = ref(0);
watch(count, (newVal, oldVal) => {
 console.log(newVal, oldVal);
})
count.value = 1;
// 打印1 0
```

__Parameters__

<table>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
<tr>
<td>

`source`

</td>
<td>

`object` \| `Function`

</td>
<td>

副作用函数或者响应式对象

</td>
</tr>
<tr>
<td>

`cb`

</td>
<td>

`Function`

</td>
<td>

数据变化后回调函数

</td>
</tr>
<tr>
<td>

`options`

</td>
<td>

`EffectOptions`

</td>
<td>

配置

</td>
</tr>
</table>

__Returns__

`void`

### 文件操作辅助类

#### FileHelper

##### choose()

```ts
function choose(options: {
  accept: string[];
  capture:   | "user"
     | "environment"
     | "camera"
     | "camcorder"
     | "microphone";
  multiple: boolean;
}): Promise<FileList>
```

文件选择

__Example__

```ts
choose({
 accept: [".doc",".docx","application/msword"],
 capture: "user",
 multiple: true
}).then(files => {
    console.log(files);
  })
  .catch(err => {
    console.error(err);
  });
```

__Parameters__

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

`object`

</td>
<td>

文件选择配置

</td>
</tr>
<tr>
<td>

`options.accept`?

</td>
<td>

`string`[]

</td>
<td>

以逗号为分隔的[唯一文件类型说明符]列表

</td>
</tr>
<tr>
<td>

`options.capture`?

</td>
<td>

 \| `"user"` \| `"environment"` \| `"camera"` \| `"camcorder"` \| `"microphone"`

</td>
<td>

尝试请求使用设备的媒体捕获设备（如：摄像机），而不是请求一个文件输入。camera–照相机；camcorder–摄像机；microphone–录音

</td>
</tr>
<tr>
<td>

`options.multiple`?

</td>
<td>

`boolean`

</td>
<td>

是否允许多选

</td>
</tr>
</table>

__Returns__

`Promise`\<`FileList`\>

***

##### pickDir()

```ts
function pickDir(dirKey: string, force: boolean): Promise<{
  data: FileSystemDirectoryHandle | null;
  message: string;
  success: boolean;
}>
```

选择文件夹(与saveFileToDir共用缓存)

__Example__

```ts
//选择文件夹，将其与key绑定
pickDir('key');
//强制重新选择
pickDir('key', true);
```

__Parameters__

<table>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Default value</th>
<th>Description</th>
</tr>
<tr>
<td>

`dirKey`

</td>
<td>

`string`

</td>
<td>

`undefined`

</td>
<td>

文件夹唯一标识，自行定义string，用于后续向同一文件夹写入文件

</td>
</tr>
<tr>
<td>

`force`

</td>
<td>

`boolean`

</td>
<td>

`false`

</td>
<td>

是否强制重新选择

</td>
</tr>
</table>

__Returns__

`Promise`\<\{
  `data`: `FileSystemDirectoryHandle` \| `null`;
  `message`: `string`;
  `success`: `boolean`;
 \}\>

| Name | Type |
| ------ | ------ |
| `data` | `FileSystemDirectoryHandle` \| `null` |
| `message` | `string` |
| `success` | `boolean` |

***

##### read()

```ts
function read(file: Blob | File): FileReaderDecorate
```

文件读取

__Example__

```ts
const reader = read(file)
 .loadend((res) => {
   console.log(res);
 })
 //start方法参数类型："ArrayBuffer" | "BinaryString" | "DataURL" | "Text"
 .start("ArrayBuffer");

//读取操作发生中断时触发
reader.abort((abo) => {
  console.log(abo);
})

//读取操作发生错误时触发
reader.error((err) => {
  console.log(err);
})

//读取操作完成时触发
reader.load((res) => {
  console.log(res);
})

//读取操作开始时触发
reader.loadstart((res) => {
  console.log(res);
})

//读取操作结束时（要么成功，要么失败）触发
reader.loadstart((res) => {
  console.log(res);
})

//获取读取结果的promise
const promise = reader.loadendPromise();

//在读取Blob时触发。
reader.progress((res) => {
  console.log(res);
})

//获取状态
const status = reader.getStatus();

//获取结果
const result = reader.getResult();

//中断读取
reader.stop();
```

__Parameters__

<table>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
<tr>
<td>

`file`

</td>
<td>

`Blob` \| `File`

</td>
<td>

File对象或Blob对象

</td>
</tr>
</table>

__Returns__

`FileReaderDecorate`

***

##### save()

```ts
function save(file: string | Blob, saveFileName: string): void
```

H5文件下载方法

__Example__

```ts
save(new Blob(['你好世界'], { type: 'text/plain' }), 'test.txt');
save('https://www.baidu.com/img/flexible/logo/pc/result@2.png', 'baidu.png');
```

__Parameters__

<table>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Default value</th>
<th>Description</th>
</tr>
<tr>
<td>

`file`

</td>
<td>

`string` \| `Blob`

</td>
<td>

`undefined`

</td>
<td>

资源链接或者blob对象

</td>
</tr>
<tr>
<td>

`saveFileName`

</td>
<td>

`string`

</td>
<td>

`''`

</td>
<td>

保存文件名

</td>
</tr>
</table>

__Returns__

`void`

***

##### saveFileToDir()

```ts
function saveFileToDir(
   dirKey: string, 
   fileName: string, 
   fileContent: (FileContent | Promise<FileContent>)[], 
   overwrite: boolean): Promise<{
  message: string;
  success: boolean;
}>
```

将文件写入目标文件夹

__Example__

```ts
//需要先调用pickDir选择文件夹
saveFileToDir('key', 'file.txt', ['string', new Blob(['你好世界'], { type: 'text/plain' })]);
```

__Parameters__

<table>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Default value</th>
<th>Description</th>
</tr>
<tr>
<td>

`dirKey`

</td>
<td>

`string`

</td>
<td>

`undefined`

</td>
<td>

文件夹唯一标识，自行定义string，用于后续向同一文件夹写入文件

</td>
</tr>
<tr>
<td>

`fileName`

</td>
<td>

`string`

</td>
<td>

`undefined`

</td>
<td>

文件名

</td>
</tr>
<tr>
<td>

`fileContent`

</td>
<td>

(`FileContent` \| `Promise`\<`FileContent`\>)[]

</td>
<td>

`undefined`

</td>
<td>

二进制文件流或字符串数组

</td>
</tr>
<tr>
<td>

`overwrite`

</td>
<td>

`boolean`

</td>
<td>

`true`

</td>
<td>

是否覆盖同名文件

</td>
</tr>
</table>

__Returns__

`Promise`\<\{
  `message`: `string`;
  `success`: `boolean`;
 \}\>

| Name | Type |
| ------ | ------ |
| `message` | `string` |
| `success` | `boolean` |

### 辅助函数

#### debounce()

```ts
function debounce(
   func: Function, 
   wait: number, 
   immediatel?: boolean): (this: any, ...args: any[]) => any
```

将函数处理为防抖函数

__Example__

```ts
let debounced = debounce(function () {
  console.log('身体和心灵，总有一个在路上。');
  return '身体和心灵，总有一个在路上。';
}, 1000, true);
debounced.then(function (res) {
  console.log(res);
});
debounced();
debounced.cancel();
```

__Parameters__

<table>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
<tr>
<td>

`func`

</td>
<td>

`Function`

</td>
<td>

待处理函数

</td>
</tr>
<tr>
<td>

`wait`

</td>
<td>

`number`

</td>
<td>

函数执行延迟时间

</td>
</tr>
<tr>
<td>

`immediatel`?

</td>
<td>

`boolean`

</td>
<td>

是否立刻执行

</td>
</tr>
</table>

__Returns__

`Function`

处理好的防抖函数

__Parameters__

<table>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
<tr>
<td>

`this`

</td>
<td>

`any`

</td>
<td>

执行上下文继承自传入函数

</td>
</tr>
<tr>
<td>

...`args`

</td>
<td>

`any`[]

</td>
<td>

参数继承自传入函数

</td>
</tr>
</table>

__Returns__

`any`

| Name | Type | Description |
| ------ | ------ | ------ |
| `cancel` | `void` | 取消防抖函数执行 |
| `then` | \{ (this: any, ...args: any\[\]): any; cancel(): void; then(callback: Function): ...; \} | 注册防抖函数执行后的回调 |

***

#### deepClone()

```ts
function deepClone(value: any): any
```

深拷贝

__Example__

```ts
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
  f: function () {
    console.log('身体和心灵，总有一个在路上。');
  }
```

__Parameters__

<table>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
<tr>
<td>

`value`

</td>
<td>

`any`

</td>
<td>

待克隆值

</td>
</tr>
</table>

__Returns__

`any`

克隆值

***

#### generateUUID()

```ts
function generateUUID(length?: number, radix?: number): string
```

生成UUID4

__Example__

```ts
generateUUID();
generateUUID(12, 32);
```

__Parameters__

<table>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
<tr>
<td>

`length`?

</td>
<td>

`number`

</td>
<td>

生成uuid的总长度，不传递则按照rfc4122标准生成uuid

</td>
</tr>
<tr>
<td>

`radix`?

</td>
<td>

`number`

</td>
<td>

uuid每个字符的基数 1-62

</td>
</tr>
</table>

__Returns__

`string`

uuid字符串

***

#### getType()

```ts
function getType(value: any): string
```

获取数据类型

__Example__

```ts
const type = getType('你好');
type === 'String';
```

__Parameters__

<table>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
<tr>
<td>

`value`

</td>
<td>

`any`

</td>
<td>

任意值

</td>
</tr>
</table>

__Returns__

`string`

类型字符串, 如'String'、'Map'等

***

#### mergeObject()

```ts
function mergeObject<T>(
   origin: T, 
   ob: undefined | StandardObject, ...
   more: StandardObject[]): T
```

深度合并n个对象值

__Example__

```ts
const a = { a: 1, b: { c: 2 } };
const b = { b: { d: 3 } };
const c = { c: 4 };
mergeObject(a, b, c);
```

__Type Parameters__

<table>
<tr>
<th>Type Parameter</th>
</tr>
<tr>
<td>

`T` *extends* `StandardObject`

</td>
</tr>
</table>

__Parameters__

<table>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
<tr>
<td>

`origin`

</td>
<td>

`T`

</td>
<td>

将多个对象深度合并到该对象

</td>
</tr>
<tr>
<td>

`ob`

</td>
<td>

`undefined` \| `StandardObject`

</td>
<td>

被合并对象

</td>
</tr>
<tr>
<td>

...`more`

</td>
<td>

`StandardObject`[]

</td>
<td>

其余被合并对象

</td>
</tr>
</table>

__Returns__

`T`

***

#### parseUrl()

```ts
function parseUrl(url: string): URLWithParam | null
```

解析URL

__Example__

```ts
const url = 'https://www.baidu.com/s?wd=hello#world'
const result = parseUrl(url)
```

__Parameters__

<table>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
<tr>
<td>

`url`

</td>
<td>

`string`

</td>
<td>

统一资源定位符

</td>
</tr>
</table>

__Returns__

`URLWithParam` \| `null`

***

#### throttle()

```ts
function throttle(
   func: Function, 
   wait: number, 
   option?: throttleOptions): (this: any, ...argList: any[]) => any
```

函数节流

__Example__

```ts
interface throttleOptions {
  // 首次是否执行
  leading: boolean,
  // 结束是否执行
  trailing: boolean
}
let throttle = throttle(function(){
  console.log('身体和心灵，总有一个在路上。');
  return '身体和心灵，总有一个在路上。';
}, 1000, {
  leading: true, 
  trailing: true
});
throttle();
throttle.cancel();
```

__Parameters__

<table>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
<tr>
<td>

`func`

</td>
<td>

`Function`

</td>
<td>

待处理函数

</td>
</tr>
<tr>
<td>

`wait`

</td>
<td>

`number`

</td>
<td>

函数执行最短间隔时间

</td>
</tr>
<tr>
<td>

`option`?

</td>
<td>

`throttleOptions`

</td>
<td>

函数执行配置

</td>
</tr>
</table>

__Returns__

`Function`

处理好的节流函数

__Parameters__

<table>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
<tr>
<td>

`this`

</td>
<td>

`any`

</td>
<td>

执行上下文继承自传入函数

</td>
</tr>
<tr>
<td>

...`argList`

</td>
<td>

`any`[]

</td>
<td>

参数继承自传入函数

</td>
</tr>
</table>

__Returns__

`any`

| Name | Type | Description |
| ------ | ------ | ------ |
| `cancel` | `void` | 取消节流函数执行 |
