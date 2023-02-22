----
title: v-treeview
----

[hyounoo/v-treeview: A treeview component for Vue.js2](https://github.com/hyounoo/v-treeview)

## FAQ

### 1. 核心原理

当你给你一个组件取名字的时候,`name:'v-treeview-item'`,那么这个组件可以自己调用自己,也就
形成了一个递归,显然tree列表就是递归的


### 2. 点击时,如何实现折叠与展开呢?

技巧 使用`::before`伪类,创建一个可点击的全长区域


### 3 如何搜索

emit一个事件`openTree`
向上冒泡事件
