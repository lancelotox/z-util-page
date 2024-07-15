[z-util-page v3.2.1](../../../index.md) / [Reactive](../index.md) / watch

# Function: watch()

> **watch**(`source`, `cb`, `options`): `void`

监听响应式数据

## Parameters

• **source**: `object` \| `Function`

副作用函数或者响应式对象

• **cb**: `Function`

数据变化后回调函数

• **options**: `EffectOptions` = `{}`

配置

## Returns

`void`

## Example

```ts
const count = ref(0);
watch(count, (newVal, oldVal) => {
 console.log(newVal, oldVal);
})
count.value = 1;
// 打印1 0
```
