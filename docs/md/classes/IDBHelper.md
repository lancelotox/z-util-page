[**z-util-pages说明文档 v3.2.0**](../README.md) • **Docs**

***

[z-util-pages说明文档 v3.2.0](../globals.md) / IDBHelper

# Class: IDBHelper

## Constructors

### new IDBHelper()

> **new IDBHelper**(`name`): [`IDBHelper`](IDBHelper.md)

#### Parameters

• **name**: `string`

#### Returns

[`IDBHelper`](IDBHelper.md)

## Methods

### close()

> **close**(): `Promise`\<`void`\>

关闭数据库

#### Returns

`Promise`\<`void`\>

***

### createTable()

> **createTable**(`tableNameList`, `keyPath`?): `Promise`\<`Boolean`\>

创建表

#### Parameters

• **tableNameList**: `string` \| `string`[]

• **keyPath?**: `string`

#### Returns

`Promise`\<`Boolean`\>

***

### deleteAllTable()

> **deleteAllTable**(): `Promise`\<`Boolean`\>

删除所有表

#### Returns

`Promise`\<`Boolean`\>

***

### deleteTable()

> **deleteTable**(`tableNameList`): `Promise`\<`Boolean`\>

删除表

#### Parameters

• **tableNameList**: `string` \| `string`[]

#### Returns

`Promise`\<`Boolean`\>

***

### deleteTableRow()

> **deleteTableRow**(`tableName`, `key`): `Promise`\<`void`\>

删除表中某行数据

#### Parameters

• **tableName**: `string`

• **key**: `string`

#### Returns

`Promise`\<`void`\>

***

### getAllTableName()

> **getAllTableName**(): `Promise`\<`DOMStringList`\>

获取所有表名

#### Returns

`Promise`\<`DOMStringList`\>

***

### getAllTableRow()

> **getAllTableRow**(`tableName`, `range`?): `Promise`\<`unknown`\>

获取表中所有数据

#### Parameters

• **tableName**: `string`

• **range?**: `IDBKeyRange`

#### Returns

`Promise`\<`unknown`\>

***

### getTableRow()

> **getTableRow**(`tableName`, `key`): `Promise`\<`unknown`\>

获取表中某行数据

#### Parameters

• **tableName**: `string`

• **key**: `string`

#### Returns

`Promise`\<`unknown`\>

***

### getTableRowCount()

> **getTableRowCount**(`tableName`, `range`?): `Promise`\<`unknown`\>

获取表数据条数

#### Parameters

• **tableName**: `string`

• **range?**: `IDBKeyRange`

#### Returns

`Promise`\<`unknown`\>

***

### reSet()

> **reSet**(): `Promise`\<`Boolean`\>

重置数据库

#### Returns

`Promise`\<`Boolean`\>

***

### setTableRow()

> **setTableRow**(`tableName`, `data`): `Promise`\<`void`\>

增加/修改表中某行数据

#### Parameters

• **tableName**: `string`

• **data**: `any`

#### Returns

`Promise`\<`void`\>
