# [z-util-page](https://lancelotox.github.io/z-util-page/html/)

## 说明

> 这是一个基于TS的WEB工具库，包含一些常用的工具函数。
> [工具库文档](utils/README.md)

### 构建工具库
```
pnpm build:utils
```

### 清理工具库
```
pnpm clean:utils
```

### 单元测试
```
pnpm tsc:watch
pnpm test:unit
```

### 端到端测试
```
pnpm tsc:watch
pnpm test:web
```

### 构建vitepress文档
```
pnpm docs:build
pnpm docs:preview
```

### 构建Markdown文档
```
pnpm md
```

### 发布工具库
```
pnpm publish:latest
pnpm publish:beta
```