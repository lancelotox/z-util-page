# Function: toRaw()

```ts
function toRaw<T>(proxy: T): T
```

获取原始对象

## Example

```ts
const count = reactive({ a: 1 });
console.log(toRaw(count)); //{ a: 1 }
```

## Type Parameters

<table>
<tr>
<th>Type Parameter</th>
</tr>
<tr>
<td>

`T`

</td>
</tr>
</table>

## Parameters

<table>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
<tr>
<td>

`proxy`

</td>
<td>

`T`

</td>
<td>

响应式对象

</td>
</tr>
</table>

## Returns

`T`

原始对象
