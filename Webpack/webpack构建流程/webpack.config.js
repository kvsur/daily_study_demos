const path = require('path');

module.exports = {
    mode: 'development',
    entry: './dynamic_import/index.js',
    output: {
        path: path.resolve(__dirname, './build'),
        filename: '[hash:4].[name].js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader'
            }
        ]
    },
    devtool: false
};