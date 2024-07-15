[z-util-page v3.3.0](../index.md) / parseUrl

# Function: parseUrl()

> **parseUrl**(`url`): `URLWithParam` \| `null`

解析URL

## Parameters

• **url**: `string`

统一资源定位符

## Returns

`URLWithParam` \| `null`

## Example

```ts
const url = 'https://www.baidu.com/s?wd=hello#world'
const result = parseUrl(url)
```
