const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')

/** @type {import('webpack').Configuration} */
const webpackConfig = {
    mode: 'production',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].[chunkhash].js'
    },
    module: {
        rules: [
            {
                test: /worker\.js$/,
                use: {
                    loader: 'worker-loader',
                }
            }
        ]
    },
    plugins: [new HtmlWebpackPlugin({
        filename: 'index.html',
        template: 'src/index.html',
        inject: true,
    }),
    new CleanWebpackPlugin]
};

module.exports = webpackConfig;
