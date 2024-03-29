/**
 * @author 高 (https://github.com/gaoxinxiao)
 * @email 18210833386@163.com
 * @create date 2019-8-9 
 * @desc 生产环境打包
*/

const path = require('path')
const paths = require('./paths')
const webpack = require('webpack')
const baseConfig = require('./webpack.config.base')
const merge = require('webpack-merge')
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const dllFIle = require('../dll')


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
        usedExports: true //清楚代码中无用的js 只支持import方式引入
    },
    module: {
        rules: [
            {
                test: /\.(css|scss)$/,
                include: paths.appSrc,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            importLoaders: 1
                        }
                    },
                    'sass-loader',
                    {
                        loader: "postcss-loader",
                        options: {
                            plugins: [
                                require("autoprefixer")
                            ]
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new AddAssetHtmlWebpackPlugin([...Object.keys(dllFIle).map(item =>{
            return {filepath: path.resolve(__dirname, `../dll/${item}.dll.js`)} // 对应的 dll 文件路径
        })]),
        new webpack.DllReferencePlugin(
            ...Object.keys(dllFIle).map(item =>{
                return {manifest: path.resolve(__dirname, `../dll/${item}-manifest.json`)} // 对应的 dll 文件路径
            })
        ),
        new MiniCssExtractPlugin({
            filename: "static/css/[name].css",
            chunkFilename: "static/css/[id].css"
        })
    ]
})