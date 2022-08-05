---
_id: SyVBMCRnX
title: webpack4入门学习
date: 2018-11-06 16:56
update: 2018-11-06 16:56
series: webpack学习笔记
categories:
    - 学习笔记
tags:
    - 网页前端
---

## webpack 是什么

一个打包的工具,简单容易记.

 - [webpack官网](https://webpackk.js.org)
 - [webpack并不难教程](https://segmentfault.com/a/1190000012383015)
 - [我的webpack4模板github地址](https://github.com/Rainboylvx/webpack_model)

## 安装与一个简单和配置

**安装**
```bash
cnpm i webpack webpack-dev-server webpack-cli --save-dev
```

```javascript
const path = require("path");

module.exports = {
    mode:'development',
    entry:'./src/index.js',
    output:{
        filename:'bundle.js',
        publicPath:'/dist/',    //公用路径,会影响css里的路径,同样production的时候转成cdn很好用
        path:path.join(__dirname,'dist')
    },
    devServer:{ //我们在这里对webpack-dev-server进行配置
        contentBase:'./', //在哪个路径里启动 server
        host:'0.0.0.0',
        //historyApiFallback:{ //这个对单页面的程序的history api 的404 起作用
            //rewrites:[{
                //from:/./,
                //to:'/'
            //}]
        //},
        overlay: true, //错误会显示在html页面上
        color:true,
        stats: "errors-only", //编译的输出
    }
}
```

## 使用webpack-dev-server

 - 遇到的问题1:启动后找不到`bundle.js`: [没有配置publicPath](https://github.com/webpack/webpack-dev-server/issues/645#issuecomment-252852591)
 - 问题2:`Hot Module Replacement is disabled." appearing when adding special entry point`,[在命令行里启动--line --hot](https://github.com/webpack/webpack/issues/1151#issuecomment-111972680)


## 使用loader
使用`stylus`
```bash
cnpm i stylus stylus-loader style-loader css-loader --save-dev
```
## 使用babel


todo
## 使用plugin

- hotmodulereplacementpugin
- cleanwebpackpu
- htmlplugin
- optimize.DepupePlugin

## module

todo
