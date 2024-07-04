[**z-util-pages说明文档**](../../README.md) • **Docs**

***

[z-util-pages说明文档](../../modules.md) / [IDBHelper](../README.md) / IDBHelper

# Class: IDBHelper

## Constructors

### new IDBHelper()

> **new IDBHelper**(`name`): [`IDBHelper`](IDBHelper.md)

#### Parameters

• **name**: `string`

#### Returns

[`IDBHelper`](IDBHelper.md)

#### Defined in

IDBHelper/index.ts:8

## Methods

### close()

> **close**(): `Promise`\<`void`\>

关闭数据库

#### Returns

`Promise`\<`void`\>

#### Defined in

IDBHelper/index.ts:226

***

### createTable()

> **createTable**(`tableNameList`, `keyPath`?): `Promise`\<`Boolean`\>

创建表

#### Parameters

• **tableNameList**: `string` \| `string`[]

• **keyPath?**: `string`

#### Returns

`Promise`\<`Boolean`\>

#### Defined in

IDBHelper/index.ts:60

***

### deleteAllTable()

> **deleteAllTable**(): `Promise`\<`Boolean`\>

删除所有表

#### Returns

`Promise`\<`Boolean`\>

#### Defined in

IDBHelper/index.ts:115

***

### deleteTable()

> **deleteTable**(`tableNameList`): `Promise`\<`Boolean`\>

删除表

#### Parameters

• **tableNameList**: `string` \| `string`[]

#### Returns

`Promise`\<`Boolean`\>

#### Defined in

IDBHelper/index.ts:87

***

### deleteTableRow()

> **deleteTableRow**(`tableName`, `key`): `Promise`\<`void`\>

删除表中某行数据

#### Parameters

• **tableName**: `string`

• **key**: `string`

#### Returns

`Promise`\<`void`\>

#### Defined in

IDBHelper/index.ts:175

***

### getAllTableName()

> **getAllTableName**(): `Promise`\<`DOMStringList`\>

获取所有表名

#### Returns

`Promise`\<`DOMStringList`\>

#### Defined in

IDBHelper/index.ts:52

***

### getAllTableRow()

> **getAllTableRow**(`tableName`, `range`?): `Promise`\<`unknown`\>

获取表中所有数据

#### Parameters

• **tableName**: `string`

• **range?**: `IDBKeyRange`

#### Returns

`Promise`\<`unknown`\>

#### Defined in

IDBHelper/index.ts:190

***

### getTableRow()

> **getTableRow**(`tableName`, `key`): `Promise`\<`unknown`\>

获取表中某行数据

#### Parameters

• **tableName**: `string`

• **key**: `string`

#### Returns

`Promise`\<`unknown`\>

#### Defined in

IDBHelper/index.ts:157

***

### getTableRowCount()

> **getTableRowCount**(`tableName`, `range`?): `Promise`\<`unknown`\>

获取表数据条数

#### Parameters

• **tableName**: `string`

• **range?**: `IDBKeyRange`

#### Returns

`Promise`\<`unknown`\>

#### Defined in

IDBHelper/index.ts:208

***

### reSet()

> **reSet**(): `Promise`\<`Boolean`\>

重置数据库

#### Returns

`Promise`\<`Boolean`\>

#### Defined in

IDBHelper/index.ts:241

***

### setTableRow()

> **setTableRow**(`tableName`, `data`): `Promise`\<`void`\>

增加/修改表中某行数据

#### Parameters

• **tableName**: `string`

• **data**: `any`

#### Returns

`Promise`\<`void`\>

#### Defined in

IDBHelper/index.ts:142
