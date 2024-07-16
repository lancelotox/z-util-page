# Function: draggable()

```ts
function draggable(dom: HTMLElement): false | {
  close: void;
  open: void;
  wrap: void;
}
```

将一个元素处理为可拖动元素

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

## Parameters

<table>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
<tr>
<td>

`dom`

</td>
<td>

`HTMLElement`

</td>
<td>

要处理的元素

</td>
</tr>
</table>

## Returns

`false` \| \{
  `close`: `void`;
  `open`: `void`;
  `wrap`: `void`;
 \}
