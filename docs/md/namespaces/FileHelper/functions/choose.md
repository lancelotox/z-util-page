[z-util-page v3.2.1](../../../index.md) / [FileHelper](../index.md) / choose

# Function: choose()

> **choose**(`options`): `Promise`\<`FileList`\>

文件选择

## Parameters

• **options** = `{}`

文件选择配置

• **options.accept?**: `string`[]

以逗号为分隔的[唯一文件类型说明符]列表

• **options.capture?**: `"user"` \| `"environment"` \| `"camera"` \| `"camcorder"` \| `"microphone"`

尝试请求使用设备的媒体捕获设备（如：摄像机），而不是请求一个文件输入。camera–照相机；camcorder–摄像机；microphone–录音

• **options.multiple?**: `boolean`

是否允许多选

## Returns

`Promise`\<`FileList`\>

## Example

```ts
choose({
 accept: [".doc",".docx","application/msword"],
 capture: "user",
 multiple: true
}).then(files => {
    console.log(files);
  })
  .catch(err => {
    console.error(err);
  });
```
