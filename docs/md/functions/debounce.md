[**z-util-pages说明文档 v3.2.0**](../README.md) • **Docs**

***

[z-util-pages说明文档 v3.2.0](../globals.md) / debounce

# Function: debounce()

> **debounce**(`func`, `wait`, `immediatel`?): (`this`, ...`args`) => `any`

函数防抖

## Parameters

• **func**: `Function`

待处理函数

• **wait**: `number`

函数执行延迟时间

• **immediatel?**: `boolean`

是否立刻执行

## Returns

`Function`

### Parameters

• **this**: `any`

• ...**args**: `any`[]

### Returns

`any`

### cancel()

#### Returns

`void`

### then()

#### Parameters

• **callback**: `Function`

#### Returns

\{ (this: any, ...args: any\[\]): any; cancel(): void; then(callback: Function): ...; \}
