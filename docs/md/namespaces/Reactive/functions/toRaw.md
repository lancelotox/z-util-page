[z-util-page v3.3.0](../../../index.md) / [Reactive](../index.md) / toRaw

# Function: toRaw()

> **toRaw**\<`T`\>(`proxy`): `T`

获取原始对象

## Type Parameters

• **T**

## Parameters

• **proxy**: `T`

响应式对象

## Returns

`T`

原始对象

## Example

```ts
const count = reactive({ a: 1 });
console.log(toRaw(count)); //{ a: 1 }
```
