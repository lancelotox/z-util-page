[z-util-page v3.3.0](../../../index.md) / [Reactive](../index.md) / effect

# Function: effect()

> **effect**(`func`, `options`): `Effect`

创建副作用函数

## Parameters

• **func**: `Function`

函数

• **options**: `EffectOptions` = `{}`

配置

## Returns

`Effect`

effectFunc

## Example

```ts
const count = ref(0);
effect(() => {
 console.log(count.value);
})
count.value = 1;
// 打印1
```
