[z-util-page](../README.md) / Http

# Class: Http

HTTTP请求操作辅助类

## Constructors

### new Http()

```ts
new Http(options: CustomHttpOptions): Http
```

#### Parameters

<table>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
<tr>
<td>

`options`

</td>
<td>

`CustomHttpOptions`

</td>
</tr>
</table>

#### Returns

[`Http`](Http.md)

## Properties

| Property | Modifier | Type | Description |
| ------ | ------ | ------ | ------ |
| `Interceptor` | `public` | `Interceptor` | 拦截器 |
| `options` | `public` | `HttpOptions` | - |

## Methods

### ajax()

```ts
ajax(param: Param): PromiseHandle
```

//XMLHttpRequest异步请求

#### Parameters

<table>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
<tr>
<td>

`param`

</td>
<td>

`Param`

</td>
<td>

</td>
</tr>
</table>

#### Returns

`PromiseHandle`

***

### ajaxAsync()

```ts
ajaxAsync(param: Param): any
```

XMLHttpRequest同步请求，绝大多数情况下只能在work进程内使用。

#### Parameters

<table>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
<tr>
<td>

`param`

</td>
<td>

`Param`

</td>
<td>

</td>
</tr>
</table>

#### Returns

`any`
