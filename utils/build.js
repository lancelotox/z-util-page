const webpack = require('webpack');
const path = require('path');
const config = require('./webpack.config');

function bulidUmd(isMinimizer) {
  return new Promise(resolve => {
    config.output.path = path.resolve(__dirname, 'dist');
    config.output.filename = `zutilpage.umd${!!isMinimizer ? '.min' : ''}.js`;
    config.output.library.type = 'umd';
    config.optimization = {
      minimize: !!isMinimizer
    }
    const compiler = webpack(config);
    compiler.run(status => {
      console.log(status);
      resolve();
    });
  })
}

function bulidCmd() {
  return new Promise(resolve => {
    config.output.path = path.resolve(__dirname, 'dist');
    config.output.filename = 'zutilpage.cmd.js';
    config.output.library.type = 'commonjs';
    delete config.output.library.name;
    config.optimization = {
      minimize: false
    }
    const compiler = webpack(config);
    compiler.run(status => {
      console.log(status);
      resolve();
    });
  })
}

bulidUmd().then(() => {
  return bulidUmd(true);
}).then(() => {
  return bulidCmd();
});

