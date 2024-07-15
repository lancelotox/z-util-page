[z-util-page v3.2.1](../index.md) / debounce

# Function: debounce()

> **debounce**(`func`, `wait`, `immediatel`?): (`this`, ...`args`) => `any`

将函数处理为防抖函数

## Parameters

• **func**: `Function`

待处理函数

• **wait**: `number`

函数执行延迟时间

• **immediatel?**: `boolean`

是否立刻执行

## Returns

`Function`

处理好的防抖函数

### Parameters

• **this**: `any`

执行上下文继承自传入函数

• ...**args**: `any`[]

参数继承自传入函数

### Returns

`any`

### cancel()

取消防抖函数执行

#### Returns

`void`

### then()

注册防抖函数执行后的回调

#### Parameters

• **callback**: `Function`

回调函数

#### Returns

\{ (this: any, ...args: any\[\]): any; cancel(): void; then(callback: Function): ...; \}

处理好的防抖函数

## Example

```ts
let debounced = debounce(function () {
  console.log('身体和心灵，总有一个在路上。');
  return '身体和心灵，总有一个在路上。';
}, 1000, true);
debounced.then(function (res) {
  console.log(res);
});
debounced();
debounced.cancel();
```
