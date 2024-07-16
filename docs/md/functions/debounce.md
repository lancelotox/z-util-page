# Function: debounce()

```ts
function debounce(
   func: Function, 
   wait: number, 
   immediatel?: boolean): (this: any, ...args: any[]) => any
```

将函数处理为防抖函数

## Example

```ts
let debounced = debounce(function () {
  console.log('身体和心灵，总有一个在路上。');
  return '身体和心灵，总有一个在路上。';
}, 1000, true);
debounced.then(function (res) {
  console.log(res);
});
debounced();
debounced.cancel();
```

## Parameters

<table>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
<tr>
<td>

`func`

</td>
<td>

`Function`

</td>
<td>

待处理函数

</td>
</tr>
<tr>
<td>

`wait`

</td>
<td>

`number`

</td>
<td>

函数执行延迟时间

</td>
</tr>
<tr>
<td>

`immediatel`?

</td>
<td>

`boolean`

</td>
<td>

是否立刻执行

</td>
</tr>
</table>

## Returns

`Function`

处理好的防抖函数

### Parameters

<table>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
<tr>
<td>

`this`

</td>
<td>

`any`

</td>
<td>

执行上下文继承自传入函数

</td>
</tr>
<tr>
<td>

...`args`

</td>
<td>

`any`[]

</td>
<td>

参数继承自传入函数

</td>
</tr>
</table>

### Returns

`any`

| Name | Type | Description |
| ------ | ------ | ------ |
| `cancel` | `void` | 取消防抖函数执行 |
| `then` | \{ (this: any, ...args: any\[\]): any; cancel(): void; then(callback: Function): ...; \} | 注册防抖函数执行后的回调 |
