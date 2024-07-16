# Function: choose()

```ts
function choose(options: {
  accept: string[];
  capture:   | "user"
     | "environment"
     | "camera"
     | "camcorder"
     | "microphone";
  multiple: boolean;
}): Promise<FileList>
```

文件选择

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

## Parameters

<table>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
<tr>
<td>

`options`

</td>
<td>

`object`

</td>
<td>

文件选择配置

</td>
</tr>
<tr>
<td>

`options.accept`?

</td>
<td>

`string`[]

</td>
<td>

以逗号为分隔的[唯一文件类型说明符]列表

</td>
</tr>
<tr>
<td>

`options.capture`?

</td>
<td>

 \| `"user"` \| `"environment"` \| `"camera"` \| `"camcorder"` \| `"microphone"`

</td>
<td>

尝试请求使用设备的媒体捕获设备（如：摄像机），而不是请求一个文件输入。camera–照相机；camcorder–摄像机；microphone–录音

</td>
</tr>
<tr>
<td>

`options.multiple`?

</td>
<td>

`boolean`

</td>
<td>

是否允许多选

</td>
</tr>
</table>

## Returns

`Promise`\<`FileList`\>
