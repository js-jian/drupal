const path = require('path');
const merge = require("webpack-merge") // 引入webpack-merge功能模块
const common = require("./webpack.common.js") // 引入webpack.common.js
const { CleanWebpackPlugin } = require("clean-webpack-plugin") // 引入CleanWebpackPlugin插件
const PurifyCssWebpack = require('purifycss-webpack'); // 引入PurifyCssWebpack插件
const glob = require('glob');  // 引入glob模块,用于扫描全部html文件中所引用的css

module.exports = merge(common, { // 将webpack.common.js合并到当前文件
    mode: "production",
    plugins: [
        new CleanWebpackPlugin(), // 构建前删除dist文件夹下的所有文件(默认删除 “dist”文件夹)；参数：所要清理的文件夹名称
        new PurifyCssWebpack({ // 删除没有使用到的css样式，使用该插件需要安装purifycss-webpack，purify-css，glob
            paths: glob.sync(path.join(__dirname, 'src/*.html')) // 同步扫描所有html文件中所引用的css
        })
    ]
})