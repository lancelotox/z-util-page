# Function: throttle()

```ts
function throttle(
   func: Function, 
   wait: number, 
   option?: throttleOptions): (this: any, ...argList: any[]) => any
```

函数节流

## Example

```ts
interface throttleOptions {
  // 首次是否执行
  leading: boolean,
  // 结束是否执行
  trailing: boolean
}
let throttle = throttle(function(){
  console.log('身体和心灵，总有一个在路上。');
  return '身体和心灵，总有一个在路上。';
}, 1000, {
  leading: true, 
  trailing: true
});
throttle();
throttle.cancel();
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

函数执行最短间隔时间

</td>
</tr>
<tr>
<td>

`option`?

</td>
<td>

`throttleOptions`

</td>
<td>

函数执行配置

</td>
</tr>
</table>

## Returns

`Function`

处理好的节流函数

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

...`argList`

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
| `cancel` | `void` | 取消节流函数执行 |
