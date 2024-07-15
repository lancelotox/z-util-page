[z-util-page v3.2.1](../index.md) / throttle

# Function: throttle()

> **throttle**(`func`, `wait`, `option`?): (`this`, ...`argList`) => `any`

函数节流

## Parameters

• **func**: `Function`

待处理函数

• **wait**: `number`

函数执行最短间隔时间

• **option?**: `throttleOptions`

函数执行配置

## Returns

`Function`

处理好的节流函数

### Parameters

• **this**: `any`

执行上下文继承自传入函数

• ...**argList**: `any`[]

参数继承自传入函数

### Returns

`any`

### cancel()

取消节流函数执行

#### Returns

`void`

## Example

```ts
interface throttleOptions {
  // 首次是否执行
  leading: boolean,
  // 结束是否执行
  trailing: boolean
}
let throttle = throttle(function(){
  console.log('身体和心灵，总有一个在路上。');
  return '身体和心灵，总有一个在路上。';
}, 1000, {
  leading: true, 
  trailing: true
});
throttle();
throttle.cancel();
```
