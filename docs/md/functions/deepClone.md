[z-util-page v3.2.1](../index.md) / deepClone

# Function: deepClone()

> **deepClone**(`value`): `any`

深拷贝

## Parameters

• **value**: `any`

待克隆值

## Returns

`any`

克隆值

## Example

```ts
let newValue = deepClone({
  a: '身体和心灵，总有一个在路上。',
  b: {
    c: new Date(),
    d: [1, 3, 4],
    e: Symbol(),
    a: null,
    b: undefined,
    f: {
      a: 1,
      b: true,
    }
  },
  c: document.createElement('div'),
  d: new RegExp(/\d+/ig),
  e: new Error('错误'),
  f: function () {
    console.log('身体和心灵，总有一个在路上。');
  }
```
