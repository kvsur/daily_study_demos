const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const distPath = path.resolve(__dirname, 'dist/');

module.exports = {
    mode: 'production',
    entry: {
        app: path.resolve(__dirname, 'src/index.js')
    },
    output: {
        path: distPath,
        filename: 'js/[name].[chunkhash].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [
                    path.resolve(__dirname, 'src/')
                ]
            }
        ]
    },
    // external: {},
    // resolve: {},
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            // filename: path.resolve('public/index.html'),
            template: path.resolve(__dirname, 'public/index.html'),
            inject: true,
            minify: {
                collapseWhitespace: true,
                removeComments: true,
                removeAttributeQuotes: true,
                html5: true,
                preserveLineBreaks: true,
                minifyJS: true,
                minifyCSS: true
            }
        })
    ]
}