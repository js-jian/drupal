const webpack = require('webpack') // 这个插件不需要安装，是基于webpack的，需要引入webpack模块
const merge = require("webpack-merge") // 引入webpack-merge功能模块
const common = require("./webpack.common.js") // 引入webpack.common.js

module.exports = merge(common, { // 将webpack.common.js合并到当前文件
    mode: "development",
    devServer: {
        contentBase: "./dist", // 设置服务器所读取文件的目录，当前我们设置为"./dist"
        port: "8088", // 设置端口号，如果省略，默认为8080
        inline: true, // 设置为true，当源文件改变时会自动刷新页面
        historyApiFallback: true, // 设置为true，所有的跳转将指向index.html
        hot: true, // 热更新
    },
    devtool: "source-map", // 会生成对于调试的完整的.map文件，但同时也会减慢打包速度
    plugins: [
        new webpack.HotModuleReplacementPlugin(), // 热更新插件 
    ]
})