[z-util-pages说明文档 v3.2.1](../../../README.md) / [FileHelper](../README.md) / saveFileToDir

# Function: saveFileToDir()

```ts
function saveFileToDir(
   dirKey: string, 
   fileName: string, 
   fileContent: (FileContent | Promise<FileContent>)[], 
   overwrite: boolean): Promise<{
  message: "保存成功";
  success: true;
}>
```

## Parameters

<table>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Default value</th>
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
</tr>
</table>

## Returns

`Promise`\<\{
  `message`: `"保存成功"`;
  `success`: `true`;
 \}\>

| Name | Type | Default value |
| ------ | ------ | ------ |
| `message` | `string` | "保存成功" |
| `success` | `boolean` | true |
