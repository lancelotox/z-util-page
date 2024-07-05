# __z-util-page__

# 引入:

## 1. 全局引入

拷贝包目录下dist文件夹内 [ zutilpage.min.js ] 文件到自己的项目里，在HTML里添加如下引用：

``` html
<script src="zutilpage.min.js"></script>
```

这会添加一个全局变量 [ Utils ] 到window对象;

``` javascript
Utils.debounce(function(){
    console.log('身体和心灵，总有一个在路上。');
}, 200);
```

## 2. 按需引入

运行以下命令将工具包安装到本地

``` javascript
npm i z-util-page --save
```

根据需要自行引入

``` javascript
import { debounce, throttle, deepClone } from 'z-util-page';
```

# 说明:

## Cookie操作辅助类

| Namespace | Description |
| ------ | ------ |
| [CookieHelper](namespaces/CookieHelper/README.md) | Cookie操作辅助类 |

## DOM操作辅助类

| Namespace | Description |
| ------ | ------ |
| [DomHelper](namespaces/DomHelper/README.md) | DOM操作辅助类 |

## HTTTP请求操作辅助类

| Class | Description |
| ------ | ------ |
| [Http](classes/Http.md) | HTTTP请求操作辅助类 |

## indexedDB操作辅助类

| Class | Description |
| ------ | ------ |
| [IDBHelper](classes/IDBHelper.md) | indexedDB操作辅助类 |

## 事件总线

| Class | Description |
| ------ | ------ |
| [EventBus](classes/EventBus.md) | 事件总线 |

## 响应式数据API

| Namespace | Description |
| ------ | ------ |
| [Reactive](namespaces/Reactive/README.md) | 响应式数据API |

## 文件操作辅助类

| Namespace | Description |
| ------ | ------ |
| [FileHelper](namespaces/FileHelper/README.md) | 文件操作辅助类 |

## 辅助函数

| Function | Description |
| ------ | ------ |
| [debounce](functions/debounce.md) | 函数防抖 |
| [deepClone](functions/deepClone.md) | 深拷贝 |
| [generateUUID](functions/generateUUID.md) | 生成UUID4 |
| [getType](functions/getType.md) | 获取数据类型 |
| [mergeObject](functions/mergeObject.md) | 深度合并n个对象值 |
| [parseUrl](functions/parseUrl.md) | 解析URL |
| [throttle](functions/throttle.md) | 函数节流 |
