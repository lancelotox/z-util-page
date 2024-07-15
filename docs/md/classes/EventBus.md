[z-util-page v3.2.1](../index.md) / EventBus

# Class: EventBus

## Example

```ts
// 总线
let count = 0;
EventBus.on('test', function (num, num1) {
  count = num + num1;
})
EventBus.emit('test', 1, 2);
expect(count).toBe(3);

// 分线
let count = 0;
const bus = new EventBus();
bus.on('test', function (num, num1) {
  count = num + num1;
})
bus.emit('test', 3, 4);
expect(count).toBe(7);
```

## Constructors

### new EventBus()

> **new EventBus**(`config`?): [`EventBus`](EventBus.md)

#### Parameters

• **config?**: `EventBusConfig`

#### Returns

[`EventBus`](EventBus.md)

## Properties

### emit()

> **emit**: (`key`, ...`rest`) => `void`

触发事件

#### Parameters

• **key**: `string`

事件名

• ...**rest**: `any`[]

传给回调函数的参数

#### Returns

`void`

***

### on()

> **on**: (`key`, `func`) => `void`

监听事件

#### Parameters

• **key**: `string`

事件名

• **func**

回调函数

#### Returns

`void`

## Methods

### emit()

> `static` **emit**(`key`, ...`rest`): `void`

触发事件

#### Parameters

• **key**: `string`

事件名

• ...**rest**: `any`[]

传给回调函数的参数

#### Returns

`void`

***

### on()

> `static` **on**(`key`, `func`): `void`

监听事件

#### Parameters

• **key**: `string`

事件名

• **func**

回调函数

#### Returns

`void`
