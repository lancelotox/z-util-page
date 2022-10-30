const path = require('path');

const config = {
    entry: './ts/index.ts',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'zutilpage.js',
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