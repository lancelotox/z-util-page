# Function: pickDir()

```ts
function pickDir(dirKey: string, force: boolean): Promise<{
  data: FileSystemDirectoryHandle | null;
  message: string;
  success: boolean;
}>
```

选择文件夹(与saveFileToDir共用缓存)

## Example

```ts
//选择文件夹，将其与key绑定
pickDir('key');
//强制重新选择
pickDir('key', true);
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

`force`

</td>
<td>

`boolean`

</td>
<td>

`false`

</td>
<td>

是否强制重新选择

</td>
</tr>
</table>

## Returns

`Promise`\<\{
  `data`: `FileSystemDirectoryHandle` \| `null`;
  `message`: `string`;
  `success`: `boolean`;
 \}\>

| Name | Type |
| ------ | ------ |
| `data` | `FileSystemDirectoryHandle` \| `null` |
| `message` | `string` |
| `success` | `boolean` |
