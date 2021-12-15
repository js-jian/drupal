// postcss.config.js文件需要安装postcss-loader，autoprefixer
// 该配置完成后还需在package.json文件中添加browserslist配置，否则不会添加前缀
module.exports = {
    plugins: [
        require("autoprefixer") // 引用autoprefixer模块
    ]
}