[**z-util-pages说明文档 v3.2.0**](README.md) • **Docs**

***

# z-util-pages说明文档 v3.2.0

## HTTTP请求封装类

### Http

#### Constructors

##### new Http()

> **new Http**(`options`): [`Http`](globals.md#http)

###### Parameters

• **options**: `CustomHttpOptions` = `{}`

###### Returns

[`Http`](globals.md#http)

#### Properties

##### Interceptor

> **Interceptor**: `Interceptor`

拦截器

##### options

> **options**: `HttpOptions`

#### Methods

##### ajax()

> **ajax**(`param`): `PromiseHandle`

//XMLHttpRequest异步请求

###### Parameters

• **param**: `Param`

###### Returns

`PromiseHandle`

##### ajaxAsync()

> **ajaxAsync**(`param`): `any`

XMLHttpRequest同步请求，绝大多数情况下只能在work进程内使用。

###### Parameters

• **param**: `Param`

###### Returns

`any`

## indexedDB操作辅助类

### IDBHelper

#### Constructors

##### new IDBHelper()

> **new IDBHelper**(`name`): [`IDBHelper`](globals.md#idbhelper)

###### Parameters

• **name**: `string`

###### Returns

[`IDBHelper`](globals.md#idbhelper)

#### Methods

##### close()

> **close**(): `Promise`\<`undefined` \| `false`\>

关闭数据库

###### Returns

`Promise`\<`undefined` \| `false`\>

##### createTable()

> **createTable**(`tableNameList`, `keyPath`?): `Promise`\<`boolean`\>

创建表

###### Parameters

• **tableNameList**: `string` \| `string`[]

• **keyPath?**: `string`

###### Returns

`Promise`\<`boolean`\>

##### deleteAllTable()

> **deleteAllTable**(): `Promise`\<`boolean`\>

删除所有表

###### Returns

`Promise`\<`boolean`\>

##### deleteTable()

> **deleteTable**(`tableNameList`): `Promise`\<`boolean`\>

删除表

###### Parameters

• **tableNameList**: `string` \| `string`[]

###### Returns

`Promise`\<`boolean`\>

##### deleteTableRow()

> **deleteTableRow**(`tableName`, `key`): `Promise`\<`undefined` \| `false`\>

删除表中某行数据

###### Parameters

• **tableName**: `string`

• **key**: `string`

###### Returns

`Promise`\<`undefined` \| `false`\>

##### getAllTableName()

> **getAllTableName**(): `Promise`\<`false` \| `DOMStringList`\>

获取所有表名

###### Returns

`Promise`\<`false` \| `DOMStringList`\>

##### getAllTableRow()

> **getAllTableRow**(`tableName`, `range`?): `Promise`\<`unknown`\>

获取表中所有数据

###### Parameters

• **tableName**: `string`

• **range?**: `IDBKeyRange`

###### Returns

`Promise`\<`unknown`\>

##### getTableRow()

> **getTableRow**(`tableName`, `key`): `Promise`\<`unknown`\>

获取表中某行数据

###### Parameters

• **tableName**: `string`

• **key**: `string`

###### Returns

`Promise`\<`unknown`\>

##### getTableRowCount()

> **getTableRowCount**(`tableName`, `range`?): `Promise`\<`unknown`\>

获取表数据条数

###### Parameters

• **tableName**: `string`

• **range?**: `IDBKeyRange`

###### Returns

`Promise`\<`unknown`\>

##### reSet()

> **reSet**(): `Promise`\<`false` \| `Boolean`\>

重置数据库

###### Returns

`Promise`\<`false` \| `Boolean`\>

##### setTableRow()

> **setTableRow**(`tableName`, `data`): `Promise`\<`undefined` \| `false`\>

增加/修改表中某行数据

###### Parameters

• **tableName**: `string`

• **data**: `any`

###### Returns

`Promise`\<`undefined` \| `false`\>

## 事件总线

### EventBus

#### Constructors

##### new EventBus()

> **new EventBus**(`config`?): [`EventBus`](globals.md#eventbus)

###### Parameters

• **config?**: `EventBusConfig`

###### Returns

[`EventBus`](globals.md#eventbus)

#### Properties

##### emit()

> **emit**: (`key`, ...`rest`) => `void`

###### Parameters

• **key**: `string`

• ...**rest**: `any`[]

###### Returns

`void`

##### on()

> **on**: (`key`, `func`) => `void`

###### Parameters

• **key**: `string`

• **func**

###### Returns

`void`

#### Methods

##### emit()

> `static` **emit**(`key`, ...`rest`): `void`

###### Parameters

• **key**: `string`

• ...**rest**: `any`[]

###### Returns

`void`

##### on()

> `static` **on**(`key`, `func`): `void`

###### Parameters

• **key**: `string`

• **func**

###### Returns

`void`

## 辅助函数-函数节流

### throttle()

> **throttle**(`func`, `wait`, `option`?): (`this`, ...`argList`) => `any`

#### Parameters

• **func**: `Function`

待处理函数

• **wait**: `number`

函数执行最短间隔时间

• **option?**: `throttleOptions`

#### Returns

`Function`

##### Parameters

• **this**: `any`

• ...**argList**: `any`[]

##### Returns

`any`

##### cancel()

###### Returns

`void`

## 辅助函数-函数防抖

### debounce()

> **debounce**(`func`, `wait`, `immediatel`?): (`this`, ...`args`) => `any`

#### Parameters

• **func**: `Function`

待处理函数

• **wait**: `number`

函数执行延迟时间

• **immediatel?**: `boolean`

是否立刻执行

#### Returns

`Function`

##### Parameters

• **this**: `any`

• ...**args**: `any`[]

##### Returns

`any`

##### cancel()

###### Returns

`void`

##### then()

###### Parameters

• **callback**: `Function`

###### Returns

\{ (this: any, ...args: any\[\]): any; cancel(): void; then(callback: Function): ...; \}

## 辅助函数-深度合并n个对象值

### mergeObject()

> **mergeObject**\<`T`\>(`origin`, `ob`, ...`more`): `T`

#### Type Parameters

• **T** *extends* `StandardObject`

#### Parameters

• **origin**: `T`

将多个对象深度合并到该对象

• **ob**: `undefined` \| `StandardObject`

被合并对象

• ...**more**: `StandardObject`[]

其余被合并对象

#### Returns

`T`

## 辅助函数-深拷贝

### deepClone()

> **deepClone**(`value`): `any`

#### Parameters

• **value**: `any`

待克隆值

#### Returns

`any`

## 辅助函数-生成UUID4

### generateUUID()

> **generateUUID**(`length`?, `radix`?): `string`

#### Parameters

• **length?**: `number`

生成uuid的总长度，不传递则按照rfc4122标准生成uuid

• **radix?**: `number`

uuid每个字符的基数 1-62

#### Returns

`string`

uuid字符串

## 辅助函数-获取数据类型

### getType()

> **getType**(`value`): `string`

#### Parameters

• **value**: `any`

#### Returns

`string`

类型字符串, 'String'、'Map'

## 辅助函数-解析URL

### parseUrl()

> **parseUrl**(`url`): `URLWithParam` \| `null`

#### Parameters

• **url**: `string`

统一资源定位符

#### Returns

`URLWithParam` \| `null`

URLWithParam

## Cookie操作辅助类

- [CookieHelper](namespaces/CookieHelper.md)

## DOM操作辅助类

- [DomHelper](namespaces/DomHelper.md)

## HTTTP请求封装类

- [Http](globals.md#http)

## indexedDB操作辅助类

- [IDBHelper](globals.md#idbhelper)

## 事件总线

- [EventBus](globals.md#eventbus)

## 响应式数据API

- [Reactive](namespaces/Reactive.md)

## 文件操作辅助类

- [FileHelper](namespaces/FileHelper.md)

## 辅助函数-函数节流

- [throttle](globals.md#throttle)

## 辅助函数-函数防抖

- [debounce](globals.md#debounce)

## 辅助函数-深度合并n个对象值

- [mergeObject](globals.md#mergeobject)

## 辅助函数-深拷贝

- [deepClone](globals.md#deepclone)

## 辅助函数-生成UUID4

- [generateUUID](globals.md#generateuuid)

## 辅助函数-获取数据类型

- [getType](globals.md#gettype)

## 辅助函数-解析URL

- [parseUrl](globals.md#parseurl)
