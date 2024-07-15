[z-util-page v3.2.1](../../../index.md) / [Reactive](../index.md) / toRef

# Function: toRef()

> **toRef**(`val`, `key`): `object`

将响应式对象的某键值转为ref

## Parameters

• **val**: `any`

响应式对象

• **key**: `string` \| `symbol`

键值

## Returns

`object`

Ref

### value

> `get` **value**(): `any`

> `set` **value**(`value`): `void`

#### Parameters

• **value**: `any`

#### Returns

`any`

## Example

```ts
const obj = reactive({ a: 1 });
const a = toRef(obj, 'a');
a.value = 2;
console.log(obj.a); //2
```
