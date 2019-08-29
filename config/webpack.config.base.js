/**
 * @author 高 (https://github.com/gaoxinxiao)
 * @email 18210833386@163.com
 * @create date 2019-8-9 
 * @desc 公共资源
*/

const path = require('path')
const paths = require('./paths')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
    entry: paths.appSrc,
    output: {
        path: path.resolve(__dirname, "../build")
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json', '.jsx'],
        plugins: [
            new TsconfigPathsPlugin({
                configFile: paths.appTsConfig //映射路径
            })
        ]
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                include: paths.appNodeModules,
                exclude: paths.jsExclude,
                use: [
                    'cache-loader',
                    {
                        loader: "babel-loader",
                        options: {
                            presets: ['@babel/preset-env']
                        }
                    }
                ],
            },
            {
                test: /\.(ts|tsx|js|jsx)$/,
                include:paths.appSrc,
                exclude: paths.appNodeModules,
                loader: 'awesome-typescript-loader',
                options: {
                    useCache: true
                }
            },
            {
                test: /\.(png|jpg|gif|jpeg|svg)$/,
                use: {
                    loader: "url-loader",
                    options: {
                        outputPath: 'static/images/', // 图片输出的路径
                        limit: 10 * 1024 //打包成base64
                    }
                }
            },
            {
                test: /\.(eot|woff2?|ttf|svg)$/,
                use: {
                    loader: "file-loader",
                    options: {
                        outputPath: 'static/font/'
                    }
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: paths.appHtml,
            minify: {
                collapseWhitespace: true // 去除空白
            }
        })
    ],
    performance: false // 关闭性能提示
}