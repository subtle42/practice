var path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',
    entry: path.resolve(__dirname, 'src/index.tsx'),
    output: {
        path: path.resolve(__dirname, '.dist'),
        filename: 'app.js'
    },
    resolve: {
        // Add `.ts` and `.tsx` as a resolvable extension.
        extensions: ['.ts', '.tsx', '.js']
    },
    module: {
        rules: [
            // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
            { test: /\.tsx?$/, loader: 'ts-loader' },
            { test: /\.css$/, use: [
                { loader: 'style-loader' },
                { loader: 'css-loader' }
            ]}
        ]
    },
    devServer: {
        port: 9000
    },
    plugins: [
        new HtmlWebpackPlugin()
    ]
};