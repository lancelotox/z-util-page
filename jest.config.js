module.exports = {
  // 是否显示覆盖率报告
  collectCoverage: false,  
  // 告诉 jest 哪些文件需要经过单元测试测试
  collectCoverageFrom: ['/tests/EventBus.test.ts'],
  //测试环境配置(node/jsdom)
  testEnvironment: "jsdom"  
}