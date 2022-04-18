# z-utils

## Describe
```
开发中......
```
---
##XLSX-STYLE报错解决
````
在\node_modules\xlsx-style\dist\cpexcel.js 807行 的

var cpt = require('./cpt' + 'able');

改为：

var cpt = cptable;
````