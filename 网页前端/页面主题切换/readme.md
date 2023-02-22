---
_id: "1cb96a73c8"
title: "页面主页切换"
date: 2023-02-13 14:49
update: 2023-02-13 14:49
author: Rainboy
---


## 问题

有些网页可以切换题目,比如可以有黑暗模式,这是如何做到的呢?


首页参考了这个 [前端主题切换方案 - 掘金](https://juejin.cn/post/7134594122391748615)

觉得比较好的是

- 方案3：CSS变量+类名切换
- 方案5：SCSS + mixin + 类名切换

都是一次加载所有的资源,然后根据类名就行切换.


## tailwindcss dark mode

因为我有时候会使用 tailwindcss ,通过这个文档[Dark Mode - Tailwind CSS](https://tailwindcss.com/docs/dark-mode)


如何手动的切换dark mode呢? [toggling-dark-mode-manually](https://tailwindcss.com/docs/dark-mode#toggling-dark-mode-manually)
