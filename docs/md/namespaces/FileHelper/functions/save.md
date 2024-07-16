# Function: save()

```ts
function save(file: string | Blob, saveFileName: string): void
```

H5文件下载方法

## Example

```ts
save(new Blob(['你好世界'], { type: 'text/plain' }), 'test.txt');
save('https://www.baidu.com/img/flexible/logo/pc/result@2.png', 'baidu.png');
```

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

`file`

</td>
<td>

`string` \| `Blob`

</td>
<td>

`undefined`

</td>
<td>

资源链接或者blob对象

</td>
</tr>
<tr>
<td>

`saveFileName`

</td>
<td>

`string`

</td>
<td>

`''`

</td>
<td>

保存文件名

</td>
</tr>
</table>

## Returns

`void`
