[**z-util-pages说明文档 v3.2.0**](../README.md) • **Docs**

***

[z-util-pages说明文档 v3.2.0](../globals.md) / Http

# Class: Http

## Constructors

### new Http()

> **new Http**(`options`): [`Http`](Http.md)

#### Parameters

• **options**: `CustomHttpOptions` = `{}`

#### Returns

[`Http`](Http.md)

## Properties

### Interceptor

> **Interceptor**: `Interceptor`

拦截器

***

### options

> **options**: `HttpOptions`

## Methods

### ajax()

> **ajax**(`param`): `PromiseHandle`

//XMLHttpRequest异步请求

#### Parameters

• **param**: `Param`

#### Returns

`PromiseHandle`

***

### ajaxAsync()

> **ajaxAsync**(`param`): `any`

XMLHttpRequest同步请求，绝大多数情况下只能在work进程内使用。

#### Parameters

• **param**: `Param`

#### Returns

`any`
