
/**
 * @author 高 (https://github.com/gaoxinxiao)
 * @email 18210833386@163.com
 * @create date 2019-8-9 
 * @desc 静态公共资源打包配置
*/

const path = require('path')
const webpack = require('webpack')

module.exports = {
    mode: 'production',
    entry: {
        // 定义程序中打包公共文件的入口文件vendor.js
        lodash: ['lodash'],
        antd: ['antd']
    },
    output: {
        path: path.resolve(__dirname, '../dll'),
        filename: '[name].dll.js',
        library: '[name]_[hash]',
        libraryTarget: 'this'
    },

    plugins: [
        new webpack.DllPlugin({
            // 定义程序中打包公共文件的入口文件vendor.js
            context: process.cwd(),
            // manifest.json文件的输出位置
            path: path.resolve(__dirname, '../dll/[name]-manifest.json'),
            // 定义打包的公共vendor文件对外暴露的函数名
            name: '[name]_[hash]'
        })
    ]
}
