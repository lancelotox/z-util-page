[z-util-page](../README.md) / debounce

# Function: debounce()

```ts
function debounce(
   func: Function, 
   wait: number, 
   immediatel?: boolean): (this: any, ...args: any[]) => any
```

函数防抖

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

...`args`

</td>
<td>

`any`[]

</td>
</tr>
</table>

### Returns

`any`

### cancel()

#### Returns

`void`

### then()

#### Parameters

<table>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
<tr>
<td>

`callback`

</td>
<td>

`Function`

</td>
</tr>
</table>

#### Returns

\{ (this: any, ...args: any\[\]): any; cancel(): void; then(callback: Function): ...; \}
