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

__Returns__

`void`

无

__Example__

```ts
clear();
```

***

##### exist()

```ts
function exist(key: string): boolean
```

根据key值判断Cookie中是否存在键值对

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

true or false

__Example__

```ts
exist('test');
```

***

##### getItem()

```ts
function getItem(key: string): string
```

根据key值获取cookie数据

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

Cookie中key值为[key]的值

__Example__

```ts
getItem('test');
```

***

##### getItemOnce()

```ts
function getItemOnce(key: string): string
```

根据key值获取cookie数据后删除Cookie中该键值对

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

__Example__

```ts
getItemOnce('test');
```

***

##### removeItem()

```ts
function removeItem(key: string): void
```

根据key值删除Cookie中键值对

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

无

__Example__

```ts
removeItem('test');
```

***

##### setItem()

```ts
function setItem(key: string, val: string): void
```

设置cookie的键值对

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

`void`

无

__Example__

```ts
setItem('test', '你好, 世界!');
```

### DOM操作辅助类

#### DomHelper

DOM操作辅助类

##### draggable()

```ts
function draggable(dom: HTMLElement): undefined | {
  close: void;
  open: void;
  wrap: void;
}
```

__Parameters__

<table>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
<tr>
<td>

`dom`

</td>
<td>

`HTMLElement`

</td>
</tr>
</table>

__Returns__

`undefined` \| \{
  `close`: `void`;
  `open`: `void`;
  `wrap`: `void`;
 \}

***

##### scrollToBottom()

```ts
function scrollToBottom(scroll: HTMLElement): void
```

__Parameters__

<table>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
<tr>
<td>

`scroll`

</td>
<td>

`HTMLElement`

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

__Parameters__

<table>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
<tr>
<td>

`scroll`

</td>
<td>

`HTMLElement`

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

__Parameters__

<table>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
<tr>
<td>

`scroll`

</td>
<td>

`HTMLElement`

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

__Parameters__

<table>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
<tr>
<td>

`scroll`

</td>
<td>

`HTMLElement`

</td>
</tr>
</table>

__Returns__

`void`

### HTTTP请求操作辅助类

#### Http

HTTTP请求操作辅助类

__Constructors__

__new Http()__

```ts
new Http(options: CustomHttpOptions): Http
```

__Parameters__

<table>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
<tr>
<td>

`options`

</td>
<td>

`CustomHttpOptions`

</td>
</tr>
</table>

__Returns__

`Http`

__Properties__

| Property | Modifier | Type | Description |
| ------ | ------ | ------ | ------ |
| `Interceptor` | `public` | `Interceptor` | 拦截器 |
| `options` | `public` | `HttpOptions` | - |

__Methods__

__ajax()__

```ts
ajax(param: Param): PromiseHandle
```

XMLHttpRequest异步请求

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

</td>
</tr>
</table>

__Returns__

`any`

### indexedDB操作辅助类

#### IDBHelper

indexedDB操作辅助类

__Constructors__

__new IDBHelper()__

```ts
new IDBHelper(name: string): IDBHelper
```

__Parameters__

<table>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
<tr>
<td>

`name`

</td>
<td>

`string`

</td>
</tr>
</table>

__Returns__

`IDBHelper`

__Methods__

__close()__

```ts
close(): Promise<undefined | false>
```

关闭数据库

__Returns__

`Promise`\<`undefined` \| `false`\>

__createTable()__

```ts
createTable(tableNameList: string | string[], keyPath?: string): Promise<boolean>
```

创建表

__Parameters__

<table>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
<tr>
<td>

`tableNameList`

</td>
<td>

`string` \| `string`[]

</td>
</tr>
<tr>
<td>

`keyPath`?

</td>
<td>

`string`

</td>
</tr>
</table>

__Returns__

`Promise`\<`boolean`\>

__deleteAllTable()__

```ts
deleteAllTable(): Promise<boolean>
```

删除所有表

__Returns__

`Promise`\<`boolean`\>

__deleteTable()__

```ts
deleteTable(tableNameList: string | string[]): Promise<boolean>
```

删除表

__Parameters__

<table>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
<tr>
<td>

`tableNameList`

</td>
<td>

`string` \| `string`[]

</td>
</tr>
</table>

__Returns__

`Promise`\<`boolean`\>

__deleteTableRow()__

```ts
deleteTableRow(tableName: string, key: string): Promise<undefined | false>
```

删除表中某行数据

__Parameters__

<table>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
<tr>
<td>

`tableName`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`key`

</td>
<td>

`string`

</td>
</tr>
</table>

__Returns__

`Promise`\<`undefined` \| `false`\>

__getAllTableName()__

```ts
getAllTableName(): Promise<false | DOMStringList>
```

获取所有表名

__Returns__

`Promise`\<`false` \| `DOMStringList`\>

__getAllTableRow()__

```ts
getAllTableRow(tableName: string, range?: IDBKeyRange): Promise<unknown>
```

获取表中所有数据

__Parameters__

<table>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
<tr>
<td>

`tableName`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`range`?

</td>
<td>

`IDBKeyRange`

</td>
</tr>
</table>

__Returns__

`Promise`\<`unknown`\>

__getTableRow()__

```ts
getTableRow(tableName: string, key: string): Promise<unknown>
```

获取表中某行数据

__Parameters__

<table>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
<tr>
<td>

`tableName`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`key`

</td>
<td>

`string`

</td>
</tr>
</table>

__Returns__

`Promise`\<`unknown`\>

__getTableRowCount()__

```ts
getTableRowCount(tableName: string, range?: IDBKeyRange): Promise<unknown>
```

获取表数据条数

__Parameters__

<table>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
<tr>
<td>

`tableName`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`range`?

</td>
<td>

`IDBKeyRange`

</td>
</tr>
</table>

__Returns__

`Promise`\<`unknown`\>

__reSet()__

```ts
reSet(): Promise<false | Boolean>
```

重置数据库

__Returns__

`Promise`\<`false` \| `Boolean`\>

__setTableRow()__

```ts
setTableRow(tableName: string, data: any): Promise<undefined | false>
```

增加/修改表中某行数据

__Parameters__

<table>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
<tr>
<td>

`tableName`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`data`

</td>
<td>

`any`

</td>
</tr>
</table>

__Returns__

`Promise`\<`undefined` \| `false`\>

### 事件总线

#### EventBus

事件总线

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

__Parameters__

<table>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
<tr>
<td>

`key`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

...`rest`

</td>
<td>

`any`[]

</td>
</tr>
</table>

__Returns__

`void`

__on()__

```ts
static on(key: string, func: (...rest: any[]) => void): void
```

__Parameters__

<table>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
<tr>
<td>

`key`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`func`

</td>
<td>

(...`rest`: `any`[]) => `void`

</td>
</tr>
</table>

__Returns__

`void`

### 响应式数据API

#### Reactive

响应式数据API

##### computed()

```ts
function computed<T>(getter: () => {
  value: T;
 }): {
  get value: any;
}
```

获取计算属性

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

T

***

##### ref()

```ts
function ref<T>(value: T, isReadonly: boolean): Ref<T>
```

代理基本类型值，返回响应式数据

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
</tr>
<tr>
<td>

`proxy`

</td>
<td>

`T`

</td>
</tr>
</table>

__Returns__

`T`

***

##### toRef()

```ts
function toRef(val: any, key: string | symbol): {
  get set value: any;
}
```

将响应式对象的某键值转为ref

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

文件操作辅助类

##### choose()

```ts
function choose(callback: (fileList: null | FileList) => void, options: chooseOption): void
```

__Parameters__

<table>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
<tr>
<td>

`callback`

</td>
<td>

(`fileList`: `null` \| `FileList`) => `void`

</td>
</tr>
<tr>
<td>

`options`

</td>
<td>

`chooseOption`

</td>
</tr>
</table>

__Returns__

`void`

***

##### pickDir()

```ts
function pickDir(dirKey: string, force: boolean): Promise<{
  data: FileSystemDirectoryHandle | null;
  message: string;
  success: boolean;
}>
```

选择文件夹

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
与saveFileToDir共用缓存

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

&hyphen;

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

__Parameters__

<table>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
<tr>
<td>

`file`

</td>
<td>

`Blob` \| `File`

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

&hyphen;

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

二进制文件流

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

函数防抖

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

__Parameters__

<table>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
<tr>
<td>

`this`

</td>
<td>

`any`

</td>
</tr>
<tr>
<td>

...`args`

</td>
<td>

`any`[]

</td>
</tr>
</table>

__Returns__

`any`

| Name | Type |
| ------ | ------ |
| `cancel` | `void` |
| `then` | \{ (this: any, ...args: any\[\]): any; cancel(): void; then(callback: Function): ...; \} |

***

#### deepClone()

```ts
function deepClone(value: any): any
```

深拷贝

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

***

#### generateUUID()

```ts
function generateUUID(length?: number, radix?: number): string
```

生成UUID4

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

</td>
</tr>
</table>

__Returns__

`string`

类型字符串, 'String'、'Map'

***

#### mergeObject()

```ts
function mergeObject<T>(
   origin: T, 
   ob: undefined | StandardObject, ...
   more: StandardObject[]): T
```

深度合并n个对象值

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

URLWithParam

***

#### throttle()

```ts
function throttle(
   func: Function, 
   wait: number, 
   option?: throttleOptions): (this: any, ...argList: any[]) => any
```

函数节流

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

&hyphen;

</td>
</tr>
</table>

__Returns__

`Function`

__Parameters__

<table>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
<tr>
<td>

`this`

</td>
<td>

`any`

</td>
</tr>
<tr>
<td>

...`argList`

</td>
<td>

`any`[]

</td>
</tr>
</table>

__Returns__

`any`

| Name | Type |
| ------ | ------ |
| `cancel` | `void` |
