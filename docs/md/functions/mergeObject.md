[z-util-page v3.2.1](../index.md) / mergeObject

# Function: mergeObject()

> **mergeObject**\<`T`\>(`origin`, `ob`, ...`more`): `T`

深度合并n个对象值

## Type Parameters

• **T** *extends* `StandardObject`

## Parameters

• **origin**: `T`

将多个对象深度合并到该对象

• **ob**: `undefined` \| `StandardObject`

被合并对象

• ...**more**: `StandardObject`[]

其余被合并对象

## Returns

`T`

## Example

```ts
const a = { a: 1, b: { c: 2 } };
const b = { b: { d: 3 } };
const c = { c: 4 };
mergeObject(a, b, c);
```
