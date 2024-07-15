[z-util-page v3.2.1](../../../index.md) / [FileHelper](../index.md) / pickDir

# Function: pickDir()

> **pickDir**(`dirKey`, `force`): `Promise`\<`object`\>

选择文件夹(与saveFileToDir共用缓存)

## Parameters

• **dirKey**: `string`

文件夹唯一标识，自行定义string，用于后续向同一文件夹写入文件

• **force**: `boolean` = `false`

是否强制重新选择

## Returns

`Promise`\<`object`\>

### data

> **data**: `FileSystemDirectoryHandle` \| `null`

### message

> **message**: `string`

### success

> **success**: `boolean`

## Example

```ts
//选择文件夹，将其与key绑定
pickDir('key');
//强制重新选择
pickDir('key', true);
```
