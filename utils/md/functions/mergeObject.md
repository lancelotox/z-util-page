[z-util-pages说明文档 v3.2.1](../README.md) / mergeObject

# Function: mergeObject()

```ts
function mergeObject<T>(
   origin: T, 
   ob: undefined | StandardObject, ...
   more: StandardObject[]): T
```

深度合并n个对象值

## Type Parameters

<table>
<tr>
<th>Type Parameter</th>
</tr>
<tr>
<td>

`T` *extends* `StandardObject`

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

`origin`

</td>
<td>

`T`

</td>
<td>

将多个对象深度合并到该对象

</td>
</tr>
<tr>
<td>

`ob`

</td>
<td>

`undefined` \| `StandardObject`

</td>
<td>

被合并对象

</td>
</tr>
<tr>
<td>

...`more`

</td>
<td>

`StandardObject`[]

</td>
<td>

其余被合并对象

</td>
</tr>
</table>

## Returns

`T`
