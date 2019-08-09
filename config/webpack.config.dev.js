/**
 * @author 高 (https://github.com/gaoxinxiao)
 * @email 18210833386@163.com
 * @create date 2019-8-9 
 * @desc 启动开发环境
*/

const path = require('path')
const webpack = require('webpack')
const baseConfig = require('./webpack.config.base')
const merge = require('webpack-merge')

module.exports = merge(baseConfig,{
    mode:'development',
    output: {
        // 输出目录
        path: path.resolve(__dirname, "../build"),
        // 文件名称
        filename: "static/js/bundle.js",
        chunkFilename: 'static/js/[name].js'
    },
    devtool:'cheap-module-eval-source-map',
    devServer: {
        hot: true,
        contentBase: path.join(__dirname, "./build"),
        host: "0.0.0.0", 
        port: 8080,
        historyApiFallback: true,
        // proxy: {}
    },
    plugins:[
        new webpack.HotModuleReplacementPlugin()
    ]
})