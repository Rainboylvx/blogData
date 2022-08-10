---
_id: ByjUAEthm
title: koa学习(一)-认识koa
date: 2018-11-02 11:03
update: 2018-11-02 11:03
series: koa学习
categories:
    - 学习笔记
tags:
    - koa
    - node
---

## 安装

```bash
cnpm i koa
```

## hello world
```javascript
var koa = require("koa")

var app = new koa()

app.use( async ctx => {
    ctx.body = "hello koa"
})

app.listen("3000",()=>{
    console.log("listen at port 3000")
})
```

## 学习列表


 - hello world
 -
 - routes
 - 常用中间件
 - cookie的使用
 - session的使用

## 资料

- [ Koa2开发详解（自官网）](https://segmentfault.com/a/1190000009283162)
