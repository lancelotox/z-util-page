# Class: IDBHelper

## Constructors

### new IDBHelper()

```ts
new IDBHelper(name: string): IDBHelper
```

构造函数

#### Parameters

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

#### Returns

[`IDBHelper`](IDBHelper.md)

IDBHelper实例
***

#### Throws

Error 数据库名称不能为空

## Methods

### close()

```ts
close(): Promise<undefined | false>
```

关闭数据库

#### Example

```ts
const db = new IDBHelper('test');
await db.close();
```

#### Returns

`Promise`\<`undefined` \| `false`\>

***

***

### createTable()

```ts
createTable(tableNameList: string | string[], keyPath?: string): Promise<boolean>
```

创建表

#### Example

```ts
const db = new IDBHelper('test');
await db.createTable('tn');
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

#### Returns

`Promise`\<`boolean`\>

***

***

### deleteAllTable()

```ts
deleteAllTable(): Promise<boolean>
```

删除所有表

#### Example

```ts
const db = new IDBHelper('test');
await db.deleteAllTable();
```

#### Returns

`Promise`\<`boolean`\>

***

***

### deleteTable()

```ts
deleteTable(tableNameList: string | string[]): Promise<boolean>
```

删除表

#### Example

```ts
const db = new IDBHelper('test');
await db.deleteTable('tn');
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

#### Returns

`Promise`\<`boolean`\>

***

***

### deleteTableRow()

```ts
deleteTableRow(tableName: string, key: string): Promise<undefined | false>
```

删除表中某行数据

#### Example

```ts
const db = new IDBHelper('test');
await db.deleteTableRow('tn', 'key');
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

#### Returns

`Promise`\<`undefined` \| `false`\>

***

***

### getAllTableName()

```ts
getAllTableName(): Promise<false | DOMStringList>
```

获取所有表名

#### Example

```ts
const db = new IDBHelper('test');
await db.getAllTableName();
```

#### Returns

`Promise`\<`false` \| `DOMStringList`\>

false 或 string[]
***

***

### getAllTableRow()

```ts
getAllTableRow(tableName: string, range?: IDBKeyRange): Promise<unknown>
```

获取表中所有数据

#### Example

```ts
const db = new IDBHelper('test');
await db.getAllTableRow('tn');
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

#### Returns

`Promise`\<`unknown`\>

***

***

### getTableRow()

```ts
getTableRow(tableName: string, key: string): Promise<unknown>
```

获取表中某行数据

#### Example

```ts
const db = new IDBHelper('test');
await db.getTableRow('tn', 'key');
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

#### Returns

`Promise`\<`unknown`\>

***

***

### getTableRowCount()

```ts
getTableRowCount(tableName: string, range?: IDBKeyRange): Promise<unknown>
```

获取表数据条数

#### Example

```ts
const db = new IDBHelper('test');
await db.getTableRowCount('tn');
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

#### Returns

`Promise`\<`unknown`\>

***

***

### reSet()

```ts
reSet(): Promise<false | Boolean>
```

重置数据库

#### Example

```ts
const db = new IDBHelper('test');
await db.reSet();
```

#### Returns

`Promise`\<`false` \| `Boolean`\>

***

***

### setTableRow()

```ts
setTableRow(tableName: string, data: any): Promise<undefined | false>
```

增加/修改表中某行数据

#### Example

```ts
const db = new IDBHelper('test');
await db.setTableRow('tn', '你好！');
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

#### Returns

`Promise`\<`undefined` \| `false`\>

***
