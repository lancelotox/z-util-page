const path = require('path');
//生成html插件
const HtmlWebPackPlugin = require('html-webpack-plugin');

const config = {
  entry: './index.ts',
  output: {
    path: path.resolve(__dirname, '/dist'),
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", "..."],
    extensionAlias: {
      ".js": [".js", ".ts"],
      ".cjs": [".cjs", ".cts"],
      ".mjs": [".mjs", ".mts"]
    },
    // 配置路径别名
    alias: {
      "@": path.resolve(__dirname, './')
    }
  },
  module: {
    rules: [
      {
        test: /\.(ts)$/i,
        exclude: ['/node_modules/'],
        use: ['babel-loader', {
          loader: 'ts-loader'
        }]
      }
    ]
  },
  plugins: [
    //自动生成html并将资源引入
    new HtmlWebPackPlugin({
      template: path.resolve(__dirname, 'public/index.html')
    }),
  ],
  devServer: {
    // 使用的静态资源路径
    // static: {
    //   directory: path.join(__dirname, 'public'),
    // },
    // host: 'localhost',
    // server: "https",
    port: "8090",
    //自动打开页面
    open: true,
    //开启HMR模块热更新
    hot: true,
    // 是否在文件更新后刷新浏览器
    // liveReload: false,
    // 写入硬盘
    // writeToDisk: true
  },
  devtool: 'cheap-module-source-map',
  mode: "development"
}

module.exports = config;