[z-util-page v3.3.0](../../../index.md) / [Reactive](../index.md) / toRefs

# Function: toRefs()

> **toRefs**(`obj`): `object`

将响应式对象的键值全部转换为Ref, 可解构使用

## Parameters

• **obj**: `any`

响应式对象

## Returns

`object`

Refs

## Example

```ts
const obj = reactive({ a: 1, b: 2 });
const { a, b } = toRefs(obj);
a.value = 2;
console.log(obj.a); //2
```
