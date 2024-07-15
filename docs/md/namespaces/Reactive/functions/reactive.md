[z-util-page v3.3.0](../../../index.md) / [Reactive](../index.md) / reactive

# Function: reactive()

> **reactive**\<`T`\>(`value`, `isShadow`, `isReadonly`): `T`

代理对象值，返回响应式数据

## Type Parameters

• **T** *extends* `object`

## Parameters

• **value**: `T`

对象值

• **isShadow**: `boolean` = `false`

true为深代理，false为浅代理

• **isReadonly**: `boolean` = `false`

是否只读

## Returns

`T`

## Example

```ts
const obj = reactive({name:'张三'});
obj.name = '李四';
console.log(obj.name); //李四
```
