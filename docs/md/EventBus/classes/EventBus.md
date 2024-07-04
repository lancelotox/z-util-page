[**z-util-pages说明文档**](../../README.md) • **Docs**

***

[z-util-pages说明文档](../../modules.md) / [EventBus](../README.md) / EventBus

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

#### Defined in

EventBus/index.ts:37

## Properties

### emit()

> **emit**: (`key`, ...`rest`) => `void`

#### Parameters

• **key**: `string`

• ...**rest**: `any`[]

#### Returns

`void`

#### Defined in

EventBus/index.ts:48

***

### on()

> **on**: (`key`, `func`) => `void`

#### Parameters

• **key**: `string`

• **func**

#### Returns

`void`

#### Defined in

EventBus/index.ts:47

## Methods

### emit()

> `static` **emit**(`key`, ...`rest`): `void`

#### Parameters

• **key**: `string`

• ...**rest**: `any`[]

#### Returns

`void`

#### Defined in

EventBus/index.ts:29

***

### on()

> `static` **on**(`key`, `func`): `void`

#### Parameters

• **key**: `string`

• **func**

#### Returns

`void`

#### Defined in

EventBus/index.ts:21
