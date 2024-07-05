[z-util-page](../../../README.md) / [Reactive](../README.md) / toRef

# Function: toRef()

```ts
function toRef(val: any, key: string | symbol): {
  get set value: any;
}
```

将响应式对象的某键值转为ref

## Parameters

<table>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
<tr>
<td>

`val`

</td>
<td>

`any`

</td>
<td>

响应式对象

</td>
</tr>
<tr>
<td>

`key`

</td>
<td>

`string` \| `symbol`

</td>
<td>

键值

</td>
</tr>
</table>

## Returns

```ts
{
  get set value: any;
}
```

Ref

### value

```ts
get value(): any
```

```ts
set value(value: any): void
```

#### Parameters

<table>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
<tr>
<td>

`value`

</td>
<td>

`any`

</td>
</tr>
</table>

#### Returns

`any`
