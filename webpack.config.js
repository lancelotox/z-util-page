const path = require('path');
const OutputTsFile = require('./plugins/outputTsFIle.js');
const ParseScriptParam = require('./hooks/parseScriptParam.js');

const isProduction = ParseScriptParam().mode === "production";

const config = {
    entry: './lib/index.ts',
    output: {
        path: path.resolve(path.resolve(), 'dist'),
        filename: 'zUtilPages.umd.js',
        libraryTarget: 'umd',
        library: 'Utils'
    },
    module: {
        rules: [
            {
                test: /\.(ts)$/i,
                exclude: ['/node_modules/'],
                use: ['babel-loader', 'ts-loader']
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '...']
    },
    plugins: [new OutputTsFile({outDir: './dist'})]
}

module.exports = () => {
    if (isProduction) {
        config.mode = 'production';
    } else {
        config.mode = 'development';
    }
    return config;
}