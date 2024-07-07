# z-util-page 说明文档

## 简介

z-util-page 是一个基于JavaScript的工具包，包含了一些常用的工具函数，如防抖、节流、深拷贝等。

## 安装

### 1. 全局引入

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

### 2. 按需引入

运行以下命令将工具包安装到本地

``` javascript
npm i z-util-page --save
```

根据需要自行引入

``` javascript
import { debounce, throttle, deepClone } from 'z-util-page';
```

## 说明