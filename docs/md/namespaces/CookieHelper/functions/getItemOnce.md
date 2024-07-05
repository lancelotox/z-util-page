[z-util-page](../../../README.md) / [CookieHelper](../README.md) / getItemOnce

# Function: getItemOnce()

```ts
function getItemOnce(key: string): string
```

根据key值获取cookie数据后删除Cookie中该键值对

## Parameters

<table>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
<tr>
<td>

`key`

</td>
<td>

`string`

</td>
<td>

key值

</td>
</tr>
</table>

## Returns

`string`

Cookie中键值为key的值

## Example

```ts
getItemOnce('test');
```
