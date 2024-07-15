[z-util-page v3.2.1](../../../index.md) / [FileHelper](../index.md) / save

# Function: save()

> **save**(`file`, `saveFileName`): `void`

H5文件下载方法

## Parameters

• **file**: `string` \| `Blob`

资源链接或者blob对象

• **saveFileName**: `string` = `''`

保存文件名

## Returns

`void`

## Example

```ts
save(new Blob(['你好世界'], { type: 'text/plain' }), 'test.txt');
save('https://www.baidu.com/img/flexible/logo/pc/result@2.png', 'baidu.png');
```
