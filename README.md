# z-utils

### Describe

### 1. 文件下载保存

``` javascript
```



---
### 提醒

#### 1. XLSX-STYLE报错解决

````javascript
在\node_modules\xlsx-style\dist\cpexcel.js 807行 的

var cpt = require('./cpt' + 'able');

改为：

var cpt = cptable;
````