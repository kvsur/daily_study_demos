const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './dynamic_import/index.js',
    output: {
        path: path.resolve(__dirname, './build'),
        filename: '[name].[hash:4].js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader'
            }
        ]
    },
    devtool: false,
    plugins: [
        new CleanWebpackPlugin({}),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './index.html'),
            inject: true,
            publicPath: './'
        })
    ]
};