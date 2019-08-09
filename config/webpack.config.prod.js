const path = require('path')
const webpack = require('webpack')
const baseConfig = require('./webpack.config.base')
const merge = require('webpack-merge')
const PurifyCSS = require('purifycss-webpack')
const glob = require('glob-all')
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin')

module.exports = merge(baseConfig, {
    mode: "production",
    output: {
        path: path.resolve(__dirname, "../build"),
        filename: 'static/js/[name].[contenthash].js',
        chunkFilename: 'static/js/[name].[contenthash].js'
    },
    devtool: 'cheap-module-source-map',
    optimization: {
        splitChunks: {
            chunks: "all",
        },
        usedExports: true
    },
    plugins: [
        // 清除无用 css
        new PurifyCSS({
            paths: glob.sync([
                // 要做 CSS Tree Shaking 的路径文件
                path.resolve(__dirname, '../src/*.html'),
                path.resolve(__dirname, '../src/*.js')
            ])
        }),
        new AddAssetHtmlWebpackPlugin({
            filepath: path.resolve(__dirname, '../dll/lodash.dll.js') // 对应的 dll 文件路径
        }),
        new webpack.DllReferencePlugin({
            manifest: path.resolve(__dirname, '../dll/lodash-manifest.json')
        })
    ]
})