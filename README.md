# z-utils

### 描述:

### 1. 文件下载保存

``` javascript
import { fileSave } from 'z-util-page'
fileSave(new Blob([JSON.stringify({a: '身体和心灵，总有一个在路上。'}, null, 2)], {type : 'application/json'}), 'test.json');
```

### 2. MD5加密

``` javascript
import { MD5 } from 'z-util-page'
MD5('身体和心灵，总有一个在路上。');
```

### 3.  将XLSX生成的sheet转化为Blob对象

``` javascript
import { sheet2blob } from 'z-util-page'
sheet2blob(sheets, names, option);
```

### 4.  生成UUID  或  GUID

``` javascript
import { uuidFactory } from 'z-util-page'
uuidFactory.uuid();
uuidFactory.guid();
```

---
### 提醒:

#### 1. XLSX-STYLE报错解决

````javascript
在\node_modules\xlsx-style\dist\cpexcel.js 807行 的

var cpt = require('./cpt' + 'able');

改为：

var cpt = cptable;
````