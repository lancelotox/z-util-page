# Function: toRefs()

```ts
function toRefs(obj: any): {}
```

将响应式对象的键值全部转换为Ref, 可解构使用

## Example

```ts
const obj = reactive({ a: 1, b: 2 });
const { a, b } = toRefs(obj);
a.value = 2;
console.log(obj.a); //2
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

`obj`

</td>
<td>

`any`

</td>
<td>

响应式对象

</td>
</tr>
</table>

## Returns

```ts
{}
```

Refs
