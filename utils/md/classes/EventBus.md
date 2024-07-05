[z-util-pages说明文档 v3.2.1](../README.md) / EventBus

# Class: EventBus

事件总线

## Constructors

### new EventBus()

```ts
new EventBus(config?: EventBusConfig): EventBus
```

#### Parameters

<table>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
<tr>
<td>

`config`?

</td>
<td>

`EventBusConfig`

</td>
</tr>
</table>

#### Returns

[`EventBus`](EventBus.md)

## Properties

| Property | Modifier | Type |
| ------ | ------ | ------ |
| `emit` | `public` | (`key`: `string`, ...`rest`: `any`[]) => `void` |
| `on` | `public` | (`key`: `string`, `func`: (...`rest`: `any`[]) => `void`) => `void` |

## Methods

### emit()

```ts
static emit(key: string, ...rest: any[]): void
```

#### Parameters

<table>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
<tr>
<td>

`key`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

...`rest`

</td>
<td>

`any`[]

</td>
</tr>
</table>

#### Returns

`void`

***

### on()

```ts
static on(key: string, func: (...rest: any[]) => void): void
```

#### Parameters

<table>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
<tr>
<td>

`key`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`func`

</td>
<td>

(...`rest`: `any`[]) => `void`

</td>
</tr>
</table>

#### Returns

`void`
