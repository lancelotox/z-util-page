[z-util-page v3.3.0](../../../index.md) / [FileHelper](../index.md) / saveFileToDir

# Function: saveFileToDir()

> **saveFileToDir**(`dirKey`, `fileName`, `fileContent`, `overwrite`): `Promise`\<`object`\>

将文件写入目标文件夹

## Parameters

• **dirKey**: `string`

文件夹唯一标识，自行定义string，用于后续向同一文件夹写入文件

• **fileName**: `string`

文件名

• **fileContent**: (`FileContent` \| `Promise`\<`FileContent`\>)[]

二进制文件流或字符串数组

• **overwrite**: `boolean` = `true`

是否覆盖同名文件

## Returns

`Promise`\<`object`\>

### message

> **message**: `string`

### success

> **success**: `boolean`

## Example

```ts
//需要先调用pickDir选择文件夹
saveFileToDir('key', 'file.txt', ['string', new Blob(['你好世界'], { type: 'text/plain' })]);
```
