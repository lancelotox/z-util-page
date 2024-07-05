[z-util-pages说明文档 v3.2.1](../../../README.md) / [FileHelper](../README.md) / pickDir

# Function: pickDir()

```ts
function pickDir(dirKey: string, force: boolean): Promise<{
  data: dirHandle;
  message: "获取成功";
  success: true;
 } | {
  data: null;
  message: "获取失败";
  success: false;
}>
```

选择文件夹

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

`dirKey`

</td>
<td>

`string`

</td>
<td>

`undefined`

</td>
<td>

文件夹唯一标识，自行定义string，用于后续向同一文件夹写入文件
与saveFileToDir共用缓存

</td>
</tr>
<tr>
<td>

`force`

</td>
<td>

`boolean`

</td>
<td>

`false`

</td>
<td>

&hyphen;

</td>
</tr>
</table>

## Returns

`Promise`\<\{
  `data`: `dirHandle`;
  `message`: `"获取成功"`;
  `success`: `true`;
 \} \| \{
  `data`: `null`;
  `message`: `"获取失败"`;
  `success`: `false`;
 \}\>
