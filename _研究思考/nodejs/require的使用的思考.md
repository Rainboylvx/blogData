---
_id: BytZDCF9X
title: require的使用的思考
date: 2018-10-09 15:22
update: 2018-10-09 15:22
series: 研究思考
categories:
    - nodejs
    - 研究思考
tags:
    - 研究思考
---


## require的研究

我们创建3个文件

 - `a.js`

```javascript
var   a = function(){
}
module.exports = a
```

 - `b.js`
```javascript
var a = require("./a.js")

a.extent = function(){
    console.log("a extent")
}

module.exports = a.extent
```

- `main.js`

```javascript
var aa = require("./a.js")
require("./b.js")
console.log(aa)
aa.extent()
```

然后执行:

```sh
node main.js
```

输出结果是:

```sh
{ [Function: a] extent: [Function] }
a extent
```

## 结论


 - 每个文件只加载一次
 - 如果再次使用`require`加载,只会引用这个已经加载过的内存
 - 修改也是修改这个加载过的内存的内容
