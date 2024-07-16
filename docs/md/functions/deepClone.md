# Function: deepClone()

```ts
function deepClone(value: any): any
```

深拷贝

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

## Parameters

<table>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
<tr>
<td>

`value`

</td>
<td>

`any`

</td>
<td>

待克隆值

</td>
</tr>
</table>

## Returns

`any`

克隆值
