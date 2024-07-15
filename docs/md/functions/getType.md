[z-util-page v3.2.1](../index.md) / getType

# Function: getType()

> **getType**(`value`): `string`

获取数据类型

## Parameters

• **value**: `any`

任意值

## Returns

`string`

类型字符串, 如'String'、'Map'等

## Example

```ts
const type = getType('你好');
type === 'String';
```
