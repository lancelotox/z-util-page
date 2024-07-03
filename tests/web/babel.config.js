module.exports = {
  presets: [
    ["@babel/preset-env", {
      targets: {
        node: "current"
      },
      // 制定corejs版本
      corejs: 3,
      // 使用corejs的方式“usage”：按需加载
      useBuiltIns: "usage"
    }],
    "@babel/preset-typescript"
  ]
}