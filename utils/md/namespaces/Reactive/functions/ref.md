[z-util-pages说明文档 v3.2.1](../../../README.md) / [Reactive](../README.md) / ref

# Function: ref()

```ts
function ref<T>(value: T, isReadonly: boolean): Ref<T>
```

代理基本类型值，返回响应式数据

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
<th>Default value</th>
<th>Description</th>
</tr>
<tr>
<td>

`value`

</td>
<td>

`T`

</td>
<td>

`undefined`

</td>
<td>

基本类型值

</td>
</tr>
<tr>
<td>

`isReadonly`

</td>
<td>

`boolean`

</td>
<td>

`false`

</td>
<td>

是否只读

</td>
</tr>
</table>

## Returns

`Ref`\<`T`\>
