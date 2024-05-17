const path = require('path');
const { defin } = require('webpack');

const config = {
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'zutilpage.js',
    globalObject: 'this',
    library: {
      name: 'Utils',
      type: 'umd'
    }
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", "..."],
    extensionAlias: {
      ".js": [".js", ".ts"],
      ".cjs": [".cjs", ".cts"],
      ".mjs": [".mjs", ".mts"]
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
  mode: 'none'
}

module.exports = config;