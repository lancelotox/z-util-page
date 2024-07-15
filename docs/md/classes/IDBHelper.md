[z-util-page v3.3.0](../index.md) / IDBHelper

# Class: IDBHelper

## Constructors

### new IDBHelper()

> **new IDBHelper**(`name`): [`IDBHelper`](IDBHelper.md)

构造函数

#### Parameters

• **name**: `string`

数据库名称

#### Returns

[`IDBHelper`](IDBHelper.md)

IDBHelper实例
***

#### Throws

Error 数据库名称不能为空

## Methods

### close()

> **close**(): `Promise`\<`undefined` \| `false`\>

关闭数据库

#### Returns

`Promise`\<`undefined` \| `false`\>

***

#### Example

```ts
const db = new IDBHelper('test');
await db.close();
```

***

### createTable()

> **createTable**(`tableNameList`, `keyPath`?): `Promise`\<`boolean`\>

创建表

#### Parameters

• **tableNameList**: `string` \| `string`[]

表名列表

• **keyPath?**: `string`

主键

#### Returns

`Promise`\<`boolean`\>

***

#### Example

```ts
const db = new IDBHelper('test');
await db.createTable('tn');
```

***

### deleteAllTable()

> **deleteAllTable**(): `Promise`\<`boolean`\>

删除所有表

#### Returns

`Promise`\<`boolean`\>

***

#### Example

```ts
const db = new IDBHelper('test');
await db.deleteAllTable();
```

***

### deleteTable()

> **deleteTable**(`tableNameList`): `Promise`\<`boolean`\>

删除表

#### Parameters

• **tableNameList**: `string` \| `string`[]

表名列表

#### Returns

`Promise`\<`boolean`\>

***

#### Example

```ts
const db = new IDBHelper('test');
await db.deleteTable('tn');
```

***

### deleteTableRow()

> **deleteTableRow**(`tableName`, `key`): `Promise`\<`undefined` \| `false`\>

删除表中某行数据

#### Parameters

• **tableName**: `string`

表名

• **key**: `string`

键

#### Returns

`Promise`\<`undefined` \| `false`\>

***

#### Example

```ts
const db = new IDBHelper('test');
await db.deleteTableRow('tn', 'key');
```

***

### getAllTableName()

> **getAllTableName**(): `Promise`\<`false` \| `DOMStringList`\>

获取所有表名

#### Returns

`Promise`\<`false` \| `DOMStringList`\>

false 或 string[]
***

#### Example

```ts
const db = new IDBHelper('test');
await db.getAllTableName();
```

***

### getAllTableRow()

> **getAllTableRow**(`tableName`, `range`?): `Promise`\<`unknown`\>

获取表中所有数据

#### Parameters

• **tableName**: `string`

表名

• **range?**: `IDBKeyRange`

[范围](https://developer.mozilla.org/zh-CN/docs/Web/API/IDBKeyRange)

#### Returns

`Promise`\<`unknown`\>

***

#### Example

```ts
const db = new IDBHelper('test');
await db.getAllTableRow('tn');
```

***

### getTableRow()

> **getTableRow**(`tableName`, `key`): `Promise`\<`unknown`\>

获取表中某行数据

#### Parameters

• **tableName**: `string`

表名

• **key**: `string`

键

#### Returns

`Promise`\<`unknown`\>

***

#### Example

```ts
const db = new IDBHelper('test');
await db.getTableRow('tn', 'key');
```

***

### getTableRowCount()

> **getTableRowCount**(`tableName`, `range`?): `Promise`\<`unknown`\>

获取表数据条数

#### Parameters

• **tableName**: `string`

表名

• **range?**: `IDBKeyRange`

[范围](https://developer.mozilla.org/zh-CN/docs/Web/API/IDBKeyRange)

#### Returns

`Promise`\<`unknown`\>

***

#### Example

```ts
const db = new IDBHelper('test');
await db.getTableRowCount('tn');
```

***

### reSet()

> **reSet**(): `Promise`\<`false` \| `Boolean`\>

重置数据库

#### Returns

`Promise`\<`false` \| `Boolean`\>

***

#### Example

```ts
const db = new IDBHelper('test');
await db.reSet();
```

***

### setTableRow()

> **setTableRow**(`tableName`, `data`): `Promise`\<`undefined` \| `false`\>

增加/修改表中某行数据

#### Parameters

• **tableName**: `string`

表名

• **data**: `any`

数据

#### Returns

`Promise`\<`undefined` \| `false`\>

***

#### Example

```ts
const db = new IDBHelper('test');
await db.setTableRow('tn', '你好！');
```
