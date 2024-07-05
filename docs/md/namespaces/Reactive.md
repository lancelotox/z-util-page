[**z-util-pages说明文档 v3.2.0**](../README.md) • **Docs**

***

[z-util-pages说明文档 v3.2.0](../globals.md) / Reactive

# Reactive

模块配置:

## Functions

### computed()

> **computed**\<`T`\>(`getter`): `object`

获取计算属性

#### Type Parameters

• **T**

#### Parameters

• **getter**

#### Returns

`object`

##### value

> `get` **value**(): `any`

###### Returns

`any`

***

### effect()

> **effect**(`func`, `options`): `Effect`

创建副作用函数

#### Parameters

• **func**: `Function`

函数

• **options**: `EffectOptions` = `{}`

配置

#### Returns

`Effect`

effectFunc

***

### reactive()

> **reactive**\<`T`\>(`value`, `isShadow`, `isReadonly`): `T`

代理对象值，返回响应式数据

#### Type Parameters

• **T** *extends* `object`

#### Parameters

• **value**: `T`

对象值

• **isShadow**: `boolean` = `false`

true为深代理，false为浅代理

• **isReadonly**: `boolean` = `false`

是否只读

#### Returns

`T`

T

***

### ref()

> **ref**\<`T`\>(`value`, `isReadonly`): `Ref`\<`T`\>

代理基本类型值，返回响应式数据

#### Type Parameters

• **T**

#### Parameters

• **value**: `T`

基本类型值

• **isReadonly**: `boolean` = `false`

是否只读

#### Returns

`Ref`\<`T`\>

***

### toRaw()

> **toRaw**\<`T`\>(`proxy`): `T`

获取原始对象

#### Type Parameters

• **T**

#### Parameters

• **proxy**: `T`

#### Returns

`T`

***

### toRef()

> **toRef**(`val`, `key`): `object`

将响应式对象的某键值转为ref

#### Parameters

• **val**: `any`

响应式对象

• **key**: `string` \| `symbol`

键值

#### Returns

`object`

Ref

##### value

> `get` **value**(): `any`

> `set` **value**(`value`): `void`

###### Parameters

• **value**: `any`

###### Returns

`any`

***

### toRefs()

> **toRefs**(`obj`): `object`

将响应式对象的键值全部转换为Ref, 可解构使用

#### Parameters

• **obj**: `any`

响应式对象

#### Returns

`object`

***

### watch()

> **watch**(`source`, `cb`, `options`): `void`

监听响应式数据

#### Parameters

• **source**: `object` \| `Function`

副作用函数或者响应式对象

• **cb**: `Function`

数据变化后回调函数

• **options**: `EffectOptions` = `{}`

配置

#### Returns

`void`
