> https://www.cnblogs.com/BetterMan-/p/9867642.html  

- 开发时配置devtool方便追踪报错  
- loader和webpack之间版本不对应，可以在github查询两者对应关系(https://github.com/webpack-contrib)
- --mode production表示打包时是生产环境，会自己将js进行压缩
- loader从后往前加载  
    use: ["style-loader", "css-loader", "sass-loader", "postcss-loader"]  
    1. postcss-loader添加前缀  
    2. sass-loader处理sass语法  
    3. css-loader编译css  
    4. style-loader将css文件插入html  

# PLUGINS  
    - html-webpack-plugin 自动生成html文件，并引入webpack打包生成的js文件  
    - clean-webpack-plugin 删除上次打包生成的所有文件，默认为删除dist文件夹中所有文件  
    - HotModuleReplacementPlugin 热更新，该插件是webpack模块自带的，new webpack.HotModuleReplacementPlugin()  
    - extract-text-webpack-plugin 分离css文件，未使用该插件时css样式是直接插入html中，使用插件之后css样式是通过link标签引入html。使用该插件后改动css文件之后重新打包，但是不会重新应用在页面上，建议只在生产上使用  
    - webpack-bundle-analyzer 打包分析  

# CSS    
## 样式自动添加前缀，兼容其它浏览器  
    1. npm i postcss-loader autoprefixer -D  
    2. 添加postcss.config.js文件  
    3. webpack css文件处理配置添加postcss-loader  
    4. 在package.json文件中添加browserslist配置  

## 分离css  
    webpack默认会将css和js文件都打包到bundle.js文件中，使用extract-text-webpack-plugin插件可以将css文件与js文件分离开 

    1. npm i extract-text-webpack-plugin@next -D  
    2. 修改webpack css文件处理配置  

## 删除从未使用到的css样式  
    1. npm i purifycss-webpack purify-css glob -D  
    2. 修改webpack配置  

# 处理图片  
    url-loader是依赖于file-loader  
    npm i url-loader file-loader -D  

    webpack默认将图片转成base64，需要显示图片路径，必须配置publicPath  

```
{
    loader: "url-loader", // 依赖file-loader
    options: { // 如果esModule为true，则后面img后src为“[object Module]
        esModule: false, // 在新版本中esModule默认为true，因此手动设置为false
        limit: 1024, // 限制只有小于1kb的图片才转为base64
        outputPath: "images" // 设置打包后图片存放的文件夹名称
    }
}
```
