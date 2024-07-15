[z-util-page v3.3.0](../../../index.md) / [FileHelper](../index.md) / read

# Function: read()

> **read**(`file`): `FileReaderDecorate`

文件读取

## Parameters

• **file**: `Blob` \| `File`

File对象或Blob对象

## Returns

`FileReaderDecorate`

## Example

```ts
const reader = read(file)
 .loadend((res) => {
   console.log(res);
 })
 //start方法参数类型："ArrayBuffer" | "BinaryString" | "DataURL" | "Text"
 .start("ArrayBuffer");

//读取操作发生中断时触发
reader.abort((abo) => {
  console.log(abo);
})

//读取操作发生错误时触发
reader.error((err) => {
  console.log(err);
})

//读取操作完成时触发
reader.load((res) => {
  console.log(res);
})

//读取操作开始时触发
reader.loadstart((res) => {
  console.log(res);
})

//读取操作结束时（要么成功，要么失败）触发
reader.loadstart((res) => {
  console.log(res);
})

//获取读取结果的promise
const promise = reader.loadendPromise();

//在读取Blob时触发。
reader.progress((res) => {
  console.log(res);
})

//获取状态
const status = reader.getStatus();

//获取结果
const result = reader.getResult();

//中断读取
reader.stop();
```
