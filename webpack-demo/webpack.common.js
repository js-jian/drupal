// module.exports = {
//     entry: __dirname + "/src/index.js",
//     output: {
//         path: __dirname + "/dist",
//         filename: "bundle.js"
//     }
// }

const path = require("path")
const webpack = require('webpack') // 这个插件不需要安装，是基于webpack的，需要引入webpack模块
const HtmlWebpackPlugin = require("html-webpack-plugin") // 引入HtmlWebpackPlugin插件
const ExtractTextPlugin = require('extract-text-webpack-plugin') // 引入分离插件
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
    mode: "development",
    // entry: path.join(__dirname, "/src/index.js"), // 入口文件
    entry: {
        index: path.join(__dirname, "/src/index.js"), // 入口文件
        two: path.join(__dirname, "/src/two.js"), // 入口文件
    },
    output: {
        path: path.join(__dirname, "/dist"), // 打包后的文件存放的地方
        // filename: "bundle.js" // 打包后输出文件的文件名
        filename: "[name].[hash].js", // 打包后输出文件的文件名
    },
    module: {
        rules: [
            {
                test: /\.css$/, // 正则匹配以.css结尾的文件
                // use: ["style-loader", "css-loader", "postcss-loader"] // 需要用的loader，一定是这个顺序，因为调用loader是从右往左编译的
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader", // 相当于回滚，经postcss-loader和css-loader处理过的css最终再经过style-loader处理
                    use: ["css-loader", "postcss-loader"],
                    publicPath: "../", // 给背景图片设置一个公共路径，该配置影响图片引入
                })
            },
            {
                test: /\.(scss|sass)$/, // 正则匹配以.scss和.sass结尾的文件
                // use: ["style-loader", "css-loader", "sass-loader", "postcss-loader"], // 需要用的loader，一定是这个顺序，因为调用loader是从右往左编译的
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader", // 相当于回滚，经postcss-loader和css-loader处理过的css最终再经过style-loader处理
                    use: ["css-loader", "sass-loader", "postcss-loader"],
                    publicPath: "../", // 给背景图片设置一个公共路径，该配置影响图片引入
                })
            },
            {
                // jsx配置
                test: /(\.jsx|\.js)$/,
                use: { // 注意use选择如果有多项配置，可写成这种对象形式
                    loader: "babel-loader",
                    // options: {  // 该配置直接拆分提取到.babelrc文件
                    //     presets: [
                    //         "env", "react"
                    //     ]
                    // }
                },
                exclude: /node_modules/ // 排除node_modules目录，不处理该目录下的文件
            },
            {
                test: /\.(png|jpg|svg|gif)$/, // 匹配图片格式名
                use: [ // use可以是字符串传数组、对象数组、对象
                    {
                        loader: "url-loader", // 依赖file-loader
                        options: { // 如果esModule为true，则后面img后src为“[object Module]
                            esModule: false, // 在新版本中esModule默认为true，因此手动设置为false
                            limit: 1024, // 限制只有小于1kb的图片才转为base64
                            outputPath: "images" // 设置打包后图片存放的文件夹名称
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.BannerPlugin("版权所有，翻版必究"), // new一个插件的实例，打包之后会在bundle.js文件最前面添加这句话："版权所有，翻版必究"
        new HtmlWebpackPlugin({ // HtmlWebpackPlugin会生成一个index.html文件，并根据output配置中的path放置，并且会在该index.html中自动引用output配置的js文件
            template: path.join(__dirname, "/src/index.template.html") // new一个这个插件的实例，并传入相关的参数
        }),
        new ExtractTextPlugin('css/index.css'), // 将css分离到/dist文件夹下的css文件夹中的index.css
        new BundleAnalyzerPlugin({ // 打包分析
            analyzerPort: 8889, // 指定端口号
            openAnalyzer: false
        }),
    ]
}