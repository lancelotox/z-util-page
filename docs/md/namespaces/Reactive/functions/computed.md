[z-util-page v3.3.0](../../../index.md) / [Reactive](../index.md) / computed

# Function: computed()

> **computed**\<`T`\>(`getter`): `object`

获取计算属性

## Type Parameters

• **T**

## Parameters

• **getter**

## Returns

`object`

computed

### value

> `get` **value**(): `any`

#### Returns

`any`

## Example

```ts
const count = ref(0);
const double = computed(() => count.value * 2);
console.log(double.value); //0
count.value = 1;
console.log(double.value); //2
```
