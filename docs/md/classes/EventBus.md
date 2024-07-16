# Class: EventBus

## Example

```ts
// 总线
let count = 0;
EventBus.on('test', function (num, num1) {
  count = num + num1;
})
EventBus.emit('test', 1, 2);
expect(count).toBe(3);

// 分线
let count = 0;
const bus = new EventBus();
bus.on('test', function (num, num1) {
  count = num + num1;
})
bus.emit('test', 3, 4);
expect(count).toBe(7);
```

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

触发事件

#### Parameters

<table>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
<tr>
<td>

`key`

</td>
<td>

`string`

</td>
<td>

事件名

</td>
</tr>
<tr>
<td>

...`rest`

</td>
<td>

`any`[]

</td>
<td>

传给回调函数的参数

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

监听事件

#### Parameters

<table>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
<tr>
<td>

`key`

</td>
<td>

`string`

</td>
<td>

事件名

</td>
</tr>
<tr>
<td>

`func`

</td>
<td>

(...`rest`: `any`[]) => `void`

</td>
<td>

回调函数

</td>
</tr>
</table>

#### Returns

`void`
