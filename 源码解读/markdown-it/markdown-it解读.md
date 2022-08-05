---
_id: "8f7051ce40"
title: markdown-it解读
date: 2022-07-22 23:25
update: 2022-07-22 23:25
author: Rainboy
video: ""
titleEmojiTag: ":tv:"
cover: 
tags:
  - tag1
catalog: catalog1
---


## 相关资料
- [ markdown 语法规则 | Basic Syntax | Markdown Guide](https://www.markdownguide.org/basic-syntax)
- [markdown-it-analysis](https://github.com/theniceangel/markdown-it-analysis/)
- [markdown-it源码分析1-整体流程 - 掘金](https://juejin.cn/post/6844903921555603470)
- [深入浅出 VuePress（一）：如何做到在 Markdown 中使用 Vue 语法 - 掘金](https://juejin.cn/post/6844903638490415117)

## 解析过程

### 1 下载源码

```bash
git clone https://github.com/markdown-it/markdown-it
```

基本使用

```javascript
var md = require('markdown-it')();
var result = md.render('# markdown-it rulezz!');
```

理解

```plaintext
              +---------+
   md-string->|    md   | ---> html-string
              +---------+
```

那么`markdown-it`具体是如何解析`md string`的呢?

入口文件:`lib/index.js`


1.怎么理解`this instanceof MarkdownIt`,查看这里
[从Vue源码学习JavaScript 之 this instanceof Vue](https://blog.csdn.net/XH_jing/article/details/119726468)

MarkdownIt 传递的两个参数`presetName`,`options`




```js
//转成 html link
this.linkify = new LinkifyIt();
//验证 [](this) 是不是一个 link
this.validateLink = validateLink;
// encode link,such as url-encoding punycode
this.normalizeLink = normalizeLink;

// decode 成一个 human-readable format
this.normalizeLinkText = normalizeLinkText;

//工具与助手函数
  this.utils = utils;

  this.helpers = utils.assign({}, helpers);
```


 MarkdownIt 原型上的一些方法。

 parse 字符串->token

 render, renderer.render's wrapper

parseInline : only parser inline text -> token
|
v
renderInline
