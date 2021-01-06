const path = require('path');
const { merge }  = require('webpack-merge');
const webpack = require('webpack');
const baseConfig = require('./webpack.config.js');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const devConfig = {
    mode: 'development',
    output: {
        filename: '[name].[hash].js',
        path: path.resolve(__dirname, 'dist/')
    },
    devServer: {
        contentBase: path.join(__dirname, './dist'),
        compress: true,
        hot: true,
        overlay: true,
        open: true,
        publicPath: '/',
        // proxy: {},
        port: 3000
    },
    devtool: 'inline-source-map',
    module: {},
    plugins: [
        new BundleAnalyzerPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ]
}

module.exports = merge(baseConfig, devConfig);