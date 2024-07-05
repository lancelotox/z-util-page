[z-util-pages说明文档 v3.2.1](../README.md) / throttle

# Function: throttle()

```ts
function throttle(
   func: Function, 
   wait: number, 
   option?: throttleOptions): (this: any, ...argList: any[]) => any
```

函数节流

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

&hyphen;

</td>
</tr>
</table>

## Returns

`Function`

### Parameters

<table>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
<tr>
<td>

`this`

</td>
<td>

`any`

</td>
</tr>
<tr>
<td>

...`argList`

</td>
<td>

`any`[]

</td>
</tr>
</table>

### Returns

`any`

| Name | Type |
| ------ | ------ |
| `cancel` | `void` |
