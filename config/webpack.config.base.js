/**
 * @author 高 (https://github.com/gaoxinxiao)
 * @email 18210833386@163.com
 * @create date 2019-8-9 
 * @desc 公共资源
*/

const path = require('path')
const paths = require('./paths')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HappyPack = require('happypack');
const os = require('os');
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: paths.appSrc,
    output: {
        path: path.resolve(__dirname, "../build")
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json', '.jsx']
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                include:paths.appSrc,
                exclude: paths.appNodeModules,
                loader: 'happypack/loader?id=happyBabel'
            },
            {
                test: /\.(ts|tsx)$/,
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
            },
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
        new HtmlWebpackPlugin({
            template: paths.appHtml,
            minify: {
                collapseWhitespace: true // 去除空白
            }
        }),
        new HappyPack({
            //用id来标识 happypack处理那里类文件
            id: 'happyBabel',
            //如何处理  用法和loader 的配置一样
            loaders: [{
                loader: 'babel-loader?cacheDirectory=true'
            }],
            //共享进程池
            threadPool: happyThreadPool,
            //允许 HappyPack 输出日志
            verbose: true,
        }),
        new MiniCssExtractPlugin({
            filename: "static/css/[name].css",
            chunkFilename: "static/css/[id].css"
        })
    ],
    performance: false // 关闭性能提示
}