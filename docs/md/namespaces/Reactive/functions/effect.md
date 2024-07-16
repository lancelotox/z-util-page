# Function: effect()

```ts
function effect(func: Function, options: EffectOptions): Effect
```

创建副作用函数

## Example

```ts
const count = ref(0);
effect(() => {
 console.log(count.value);
})
count.value = 1;
// 打印1
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

函数

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

`Effect`

effectFunc
