# Function: computed()

```ts
function computed<T>(getter: () => {
  value: T;
 }): {
  get value: any;
}
```

获取计算属性

## Example

```ts
const count = ref(0);
const double = computed(() => count.value * 2);
console.log(double.value); //0
count.value = 1;
console.log(double.value); //2
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

`getter`

</td>
<td>

() => \{ `value`: `T`; \}

</td>
<td>

</td>
</tr>
</table>

## Returns

```ts
{
  get value: any;
}
```

computed

| Name | Type |
| ------ | ------ |
| `get value` | `any` |
