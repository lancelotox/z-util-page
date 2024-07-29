// 该入口依赖的所有模块同时设置热更新
if((module as any).hot){
  (module as any).hot.accept();
}

import './src/FileHelper';
import './src/IDBHelper';
import './src/Reactive';