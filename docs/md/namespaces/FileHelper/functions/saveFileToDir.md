# Function: saveFileToDir()

```ts
function saveFileToDir(
   dirKey: string, 
   fileName: string, 
   fileContent: (FileContent | Promise<FileContent>)[], 
   overwrite: boolean): Promise<{
  message: string;
  success: boolean;
}>
```

将文件写入目标文件夹

## Example

```ts
//需要先调用pickDir选择文件夹
saveFileToDir('key', 'file.txt', ['string', new Blob(['你好世界'], { type: 'text/plain' })]);
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

</td>
</tr>
<tr>
<td>

`fileName`

</td>
<td>

`string`

</td>
<td>

`undefined`

</td>
<td>

文件名

</td>
</tr>
<tr>
<td>

`fileContent`

</td>
<td>

(`FileContent` \| `Promise`\<`FileContent`\>)[]

</td>
<td>

`undefined`

</td>
<td>

二进制文件流或字符串数组

</td>
</tr>
<tr>
<td>

`overwrite`

</td>
<td>

`boolean`

</td>
<td>

`true`

</td>
<td>

是否覆盖同名文件

</td>
</tr>
</table>

## Returns

`Promise`\<\{
  `message`: `string`;
  `success`: `boolean`;
 \}\>

| Name | Type |
| ------ | ------ |
| `message` | `string` |
| `success` | `boolean` |
