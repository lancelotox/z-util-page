[z-util-page v3.2.1](../../../index.md) / [Reactive](../index.md) / ref

# Function: ref()

> **ref**\<`T`\>(`value`, `isReadonly`): `Ref`\<`T`\>

代理基本类型值，返回响应式数据
```ts
const obj = ref(3);
obj.value = 4;
console.log(obj.value); //4
```

## Type Parameters

• **T**

## Parameters

• **value**: `T`

基本类型值

• **isReadonly**: `boolean` = `false`

是否只读

## Returns

`Ref`\<`T`\>
