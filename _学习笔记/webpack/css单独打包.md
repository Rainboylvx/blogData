---
_id: Hk4qs-J6Q
title: web学习笔记-css,图片分离
date: 2018-11-06 20:40
update: 2018-11-06 20:40
series: webpack学习笔记
categories:
    - 学习笔记
tags:
    - 网页前端
---

## 希望

原来的所有的css,png,js都打包成了一个文件`bundle.js`

## 分离css

使用`extract-text-webpack-plugin`

**安装**
```bash
cnpm i extract-text-webpack-plugin --save-dev
```

**使用**

```javascript

const ExtractTextPlugin = require('extract-text-webpack-plugin');

```
i```javascript
    modules:{
        rules:[
            { 
                test: /\.styl$/, 
                use: ExtractTextPlugin.extract({
                    use: [ 'css-loader', 'stylus-loader' ],
                    publicPath:'../' //解决css图片中的路径问题
                })
                //loader: 'style-loader!css-loader!stylus-loader' 
            },
        ]
    },
    plugins:[
    //都提到dist目录下的css目录中,文件名是index.css里面
        new ExtractTextPlugin('css/index.css') 
    ]

```

## css的图片背景,分离图片

要使用`file-loader 和url-loader`

**下载**
```bash
cnmp i file-loader url-loader --save-dev
```

`webpack.config.js`

```javascript

    modules:{
    rules:[
            {
                test:/\.(png|jpg|gif)$/,
                use:[{
                    loader:'url-loader',
                    options:{ // 这里的options选项参数可以定义多大的图片转换为base64
                        limit:16*1024, // 表示小于16kb的图片转为base64,大于50kb的是路径
                        outputPath:'images', //定义输出的图片文件夹
                        name:'[name].[ext]'
                    }
                }]
            }
        ]
    }
```

## 参考

- https://blog.csdn.net/xyphf/article/details/79830002
- https://medium.com/@petrefax66/i-believe-you-need-to-use-the-next-version-in-your-package-json-9a6922adf295
