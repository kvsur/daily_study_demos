const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = {
    entry: {
        main: './src/main.js',
        other: './src/other.js',
    },
    output: {
        path: path.resolve(__dirname, 'dist/'),
        filename: '[hash:4].[name].js',
    },
    devtool: 'cheap-module-source-map',
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.js$/,
                include: [
                    path.join(__dirname, 'src'),
                    path.join(__dirname, 'node_modules/js-base64')
                ],
                loader: 'babel-loader',
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin()
    ]
}
