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
const PurifyCSS = require('purifycss-webpack')
const glob = require('glob-all')
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

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
        new AddAssetHtmlWebpackPlugin([
            {
                filepath: path.resolve(__dirname, '../dll/lodash.dll.js') // 对应的 dll 文件路径
            },
            {
                filepath: path.resolve(__dirname, '../dll/antd.dll.js') // 对应的 dll 文件路径
            }
        ]),
        new webpack.DllReferencePlugin({
            manifest: path.resolve(__dirname, '../dll/lodash-manifest.json'),
            manifest: path.resolve(__dirname, '../dll/antd-manifest.json')
        }),
        new MiniCssExtractPlugin({
            filename: "static/css/[name].css",
            chunkFilename: "static/css/[id].css"
        })
        // 清除无用 css
        // new PurifyCSS({
        //     paths: glob.sync([
        //         // 要做 CSS Tree Shaking 的路径文件
        //         path.resolve(__dirname, '../src/*.html'),
        //         path.resolve(__dirname, '../src/*.js')
        //     ])
        // }),
    ]
})