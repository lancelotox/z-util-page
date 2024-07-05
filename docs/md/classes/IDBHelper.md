[z-util-page](../README.md) / IDBHelper

# Class: IDBHelper

indexedDB操作辅助类

## Constructors

### new IDBHelper()

```ts
new IDBHelper(name: string): IDBHelper
```

#### Parameters

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

#### Returns

[`IDBHelper`](IDBHelper.md)

## Methods

### close()

```ts
close(): Promise<undefined | false>
```

关闭数据库

#### Returns

`Promise`\<`undefined` \| `false`\>

***

### createTable()

```ts
createTable(tableNameList: string | string[], keyPath?: string): Promise<boolean>
```

创建表

#### Parameters

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

#### Returns

`Promise`\<`boolean`\>

***

### deleteAllTable()

```ts
deleteAllTable(): Promise<boolean>
```

删除所有表

#### Returns

`Promise`\<`boolean`\>

***

### deleteTable()

```ts
deleteTable(tableNameList: string | string[]): Promise<boolean>
```

删除表

#### Parameters

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

#### Returns

`Promise`\<`boolean`\>

***

### deleteTableRow()

```ts
deleteTableRow(tableName: string, key: string): Promise<undefined | false>
```

删除表中某行数据

#### Parameters

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

#### Returns

`Promise`\<`undefined` \| `false`\>

***

### getAllTableName()

```ts
getAllTableName(): Promise<false | DOMStringList>
```

获取所有表名

#### Returns

`Promise`\<`false` \| `DOMStringList`\>

***

### getAllTableRow()

```ts
getAllTableRow(tableName: string, range?: IDBKeyRange): Promise<unknown>
```

获取表中所有数据

#### Parameters

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

#### Returns

`Promise`\<`unknown`\>

***

### getTableRow()

```ts
getTableRow(tableName: string, key: string): Promise<unknown>
```

获取表中某行数据

#### Parameters

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

#### Returns

`Promise`\<`unknown`\>

***

### getTableRowCount()

```ts
getTableRowCount(tableName: string, range?: IDBKeyRange): Promise<unknown>
```

获取表数据条数

#### Parameters

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

#### Returns

`Promise`\<`unknown`\>

***

### reSet()

```ts
reSet(): Promise<false | Boolean>
```

重置数据库

#### Returns

`Promise`\<`false` \| `Boolean`\>

***

### setTableRow()

```ts
setTableRow(tableName: string, data: any): Promise<undefined | false>
```

增加/修改表中某行数据

#### Parameters

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

#### Returns

`Promise`\<`undefined` \| `false`\>
