# Function: getType()

```ts
function getType(value: any): string
```

获取数据类型

## Example

```ts
const type = getType('你好');
type === 'String';
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

`value`

</td>
<td>

`any`

</td>
<td>

任意值

</td>
</tr>
</table>

## Returns

`string`

类型字符串, 如'String'、'Map'等
