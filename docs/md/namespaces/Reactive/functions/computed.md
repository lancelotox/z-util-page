[z-util-page](../../../README.md) / [Reactive](../README.md) / computed

# Function: computed()

```ts
function computed<T>(getter: () => {
  value: T;
 }): {
  get value: any;
}
```

获取计算属性

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

### value

```ts
get value(): any
```

#### Returns

`any`
