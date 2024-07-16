# Function: reactive()

```ts
function reactive<T>(
   value: T, 
   isShadow: boolean, 
   isReadonly: boolean): T
```

代理对象值，返回响应式数据

## Example

```ts
const obj = reactive({name:'张三'});
obj.name = '李四';
console.log(obj.name); //李四
```

## Type Parameters

<table>
<tr>
<th>Type Parameter</th>
</tr>
<tr>
<td>

`T` *extends* `object`

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

对象值

</td>
</tr>
<tr>
<td>

`isShadow`

</td>
<td>

`boolean`

</td>
<td>

`false`

</td>
<td>

true为深代理，false为浅代理

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

`T`
