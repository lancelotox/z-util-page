[z-util-pages说明文档 v3.2.1](../README.md) / generateUUID

# Function: generateUUID()

```ts
function generateUUID(length?: number, radix?: number): string
```

生成UUID4

## Parameters

<table>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
<tr>
<td>

`length`?

</td>
<td>

`number`

</td>
<td>

生成uuid的总长度，不传递则按照rfc4122标准生成uuid

</td>
</tr>
<tr>
<td>

`radix`?

</td>
<td>

`number`

</td>
<td>

uuid每个字符的基数 1-62

</td>
</tr>
</table>

## Returns

`string`

uuid字符串
