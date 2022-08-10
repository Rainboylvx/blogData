---
title: 使用DOT语言
date: 2019-01-27 09:51
update: 2019-01-27 09:51
author: Rainboy
cover: https://ww1.sinaimg.cn/large/007i4MEmgy1fzkwl9lvp9g30hr0dckjl.gif
---


##  接上面

在**入门**里我们已经会了一些基础的使用方法与语言书写,现在来看一下具体的DOT语言使用方法.也是[dot语法教程-官方](https://www.graphviz.org/pdf/dotguide.pdf)的学习笔记

## 绘制的属性

### 1.node shapse 结点的形状

```
digraph G {
    size ="4,4";
    main [shape=box]; /* this is a comment */
    main -> parse [weight=8];
    parse -> execute;
    main -> init [style=dotted];
    main -> cleanup;
    execute -> { make_string; printf}
    init -> make_string;
    edge [color=red]; // so is this
    main -> printf [style=bold,label="100 times"];
    make_string [label="make a\nstring"];
    node [shape=box,style=filled,color=".7 .3 1.0"];
    execute -> compare;
}
```


```viz-dot
digraph G {
    size ="4,4";
    main [shape=box]; /* this is a comment */
    main -> parse [weight=8];
    parse -> execute;
    main -> init [style=dotted];
    main -> cleanup;
    execute -> { make_string; printf}
    init -> make_string;
    edge [color=red]; // so is this
    main -> printf [style=bold,label="100 times"];
    make_string [label="make a\nstring"];
    node [shape=box,style=filled,color=".7 .3 1.0"];
    execute -> compare;
}
```

默认的情况下node使用属性`shape=ellipse, width=.75, height=.5`,当然还有其它的属性

如果`fixedsize=true`, 会根据`height,width`的属性来强制设定大小

分为两个大类:`polygon-based`,`record-based`

 - `regular=true`强制为规则图形
 - `peripheries`外边的层数
 - `orientation`设定角度方向
 - `sides, skew ,distortion`边数,倾斜,扭曲

```
digraph G {
a -> b -> c;
b -> d;
a [shape=polygon,sides=5,peripheries=3,color=lightblue,style=filled];
c [shape=polygon,sides=4,skew=.4,label="hello world"]
d [shape=invtriangle];
e [shape=polygon,sides=4,distortion=.7];
}
```

```viz-dot
digraph G {
a -> b -> c;
b -> d;
a [shape=polygon,sides=5,peripheries=3,color=lightblue,style=filled];
c [shape=polygon,sides=4,skew=.4,label="hello world"]
d [shape=invtriangle];
e [shape=polygon,sides=4,distortion=.7];
}
```
### 2.标签 label

 - 使用`label`来命名`node`与`edge`的名字
 - 使用`\n,\r,\l`来换行
 - `labelloc=t`,`labeljust=r`设定`label`的位置
 - `fontname, fontsize and fontcolor` 设定字体属性
 - `headlabel and taillabel`
 - `labelfontname, labelfontsize,labelfontcolor`
 - `labelangle and labeldistance`

### 3.html-like label

设定`shape=none and margin=0`,使用html中的`<TABLE>,<td>,<tr>`

### 4.图形样式

  - `color`
  - `style`线的样式,`solid, dashed, dotted, bold,and invis`
  - 还有`filled, diagonals and rounded`,填充(`fillcolor`)
  -  `edge`有`dir`这个属性,`forward (the default), back, both, or none`
  -  `arrowhead,arrowtail`有这些`normal, inv, dot, invdot, odot, invodot,none`
  -  `arrowsize`

### 5.方向,大小,空格

### 6.结点,边的放置

## 常用属性

![1](https://ww1.sinaimg.cn/large/007i4MEmgy1fzkxxvkns5j30wm15c0z6.jpg)
