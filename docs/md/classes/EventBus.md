[**z-util-pages说明文档 v3.2.0**](../README.md) • **Docs**

***

[z-util-pages说明文档 v3.2.0](../globals.md) / EventBus

# Class: EventBus

事件总线
on: 注册事件
emit: 触发事件

## Constructors

### new EventBus()

> **new EventBus**(`config`?): [`EventBus`](EventBus.md)

#### Parameters

• **config?**: `EventBusConfig`

#### Returns

[`EventBus`](EventBus.md)

## Properties

### emit()

> **emit**: (`key`, ...`rest`) => `void`

#### Parameters

• **key**: `string`

• ...**rest**: `any`[]

#### Returns

`void`

***

### on()

> **on**: (`key`, `func`) => `void`

#### Parameters

• **key**: `string`

• **func**

#### Returns

`void`

## Methods

### emit()

> `static` **emit**(`key`, ...`rest`): `void`

#### Parameters

• **key**: `string`

• ...**rest**: `any`[]

#### Returns

`void`

***

### on()

> `static` **on**(`key`, `func`): `void`

#### Parameters

• **key**: `string`

• **func**

#### Returns

`void`
