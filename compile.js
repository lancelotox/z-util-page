const webpack = require("webpack");
const webpackConfig = require('./webpack.config')();
const compiler = webpack(webpackConfig);
console.log("监听服务已启动···········");
compiler.watch({
    "aggregateTimeout": 300
}, (err, stats) => {
    if (err || stats.hasErrors()) console.log(err);
    else console.log("编译成功:" + new Date());
});