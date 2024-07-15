[z-util-page v3.3.0](../../../index.md) / [DomHelper](../index.md) / draggable

# Function: draggable()

> **draggable**(`dom`): `false` \| `object`

将一个元素处理为可拖动元素

## Parameters

• **dom**: `HTMLElement`

要处理的元素

## Returns

`false` \| `object`

## Example

```ts
const handle = draggable(dom: HTMLElement);
// 关闭拖动功能
handle.close();
// 开启拖动功能
handle.open();
// 指定一个子元素，当该鼠标按下该元素时，关闭拖动功能，鼠标抬起后恢复拖动功能
handle.wrap(dom: HTMLElement);
```
