# Function: watch()

```ts
function watch(
   source: object | Function, 
   cb: Function, 
   options: EffectOptions): void
```

监听响应式数据

## Example

```ts
const count = ref(0);
watch(count, (newVal, oldVal) => {
 console.log(newVal, oldVal);
})
count.value = 1;
// 打印1 0
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

`source`

</td>
<td>

`object` \| `Function`

</td>
<td>

副作用函数或者响应式对象

</td>
</tr>
<tr>
<td>

`cb`

</td>
<td>

`Function`

</td>
<td>

数据变化后回调函数

</td>
</tr>
<tr>
<td>

`options`

</td>
<td>

`EffectOptions`

</td>
<td>

配置

</td>
</tr>
</table>

## Returns

`void`
