# Function: parseUrl()

```ts
function parseUrl(url: string): URLWithParam | null
```

解析URL

## Example

```ts
const url = 'https://www.baidu.com/s?wd=hello#world'
const result = parseUrl(url)
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

`url`

</td>
<td>

`string`

</td>
<td>

统一资源定位符

</td>
</tr>
</table>

## Returns

`URLWithParam` \| `null`
