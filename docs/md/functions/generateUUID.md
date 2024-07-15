[z-util-page v3.2.1](../index.md) / generateUUID

# Function: generateUUID()

> **generateUUID**(`length`?, `radix`?): `string`

生成UUID4

## Parameters

• **length?**: `number`

生成uuid的总长度，不传递则按照rfc4122标准生成uuid

• **radix?**: `number`

uuid每个字符的基数 1-62

## Returns

`string`

uuid字符串

## Example

```ts
generateUUID();
generateUUID(12, 32);
```
