## vitepress 如何build

使用0.4.1 版本

1. 调用`bin/vitepress.js build`->调用`src/node`,`require('dist/node').build`
2. build函数来自`src/node/build/build.ts`
3. 调用`renderPage`函数

bundle 这个函数进行真正的编译,得到

- clientReust
- pageToHashMap


[vite 源码解读](https://github.com/a1029563229/blogs/blob/master/Source-Code/vite/1.md)

1. 如何使用自己的主题
- [来一个vitepress版的博客主题吧(简约版) - 掘金](https://juejin.cn/post/6984033527520051208)
- [airene/vitepress-blog-pure: a vitepress theme for blog, demo ↓](https://github.com/airene/vitepress-blog-pure)
2. 如何编写自己的vitpress vue 组件,嵌入到 markdown里

参考vitepress 的文档


3. 想要什么样式的主题呢?

https://celthi.github.io/effective-debugging-zh/

带一个可隐藏的silde目录
