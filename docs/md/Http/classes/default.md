[**z-util-pages说明文档**](../../README.md) • **Docs**

***

[z-util-pages说明文档](../../modules.md) / [Http](../README.md) / default

# Class: default

## Constructors

### new default()

> **new default**(`options`): [`default`](default.md)

#### Parameters

• **options**: `CustomHttpOptions` = `{}`

#### Returns

[`default`](default.md)

#### Defined in

Http/index.ts:14

## Properties

### Interceptor

> **Interceptor**: `Interceptor`

拦截器

#### Defined in

Http/index.ts:40

***

### options

> **options**: `HttpOptions`

#### Defined in

Http/index.ts:8

## Methods

### ajax()

> **ajax**(`param`): `PromiseHandle`

//XMLHttpRequest异步请求

#### Parameters

• **param**: `Param`

#### Returns

`PromiseHandle`

#### Defined in

Http/index.ts:22

***

### ajaxAsync()

> **ajaxAsync**(`param`): `any`

XMLHttpRequest同步请求，绝大多数情况下只能在work进程内使用。

#### Parameters

• **param**: `Param`

#### Returns

`any`

#### Defined in

Http/index.ts:32
