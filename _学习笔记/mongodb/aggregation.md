---
_id: BJYJj8hTQ
title: aggregation聚合的使用
date: 2018-11-16 22:59
update: 2018-11-16 22:59
series: mongodb&mongoose学习笔记
categories:
    - 学习笔记
tags:
    - 数据库
    - mongodb
---

## 我的理解
aggregation聚合操作,就像`linux`中的管道操作`|`一样,通过不停的修改操作文档序列,最后达到想要的数据.

文档地址: https://docs.mongodb.com/manual/reference/operator/aggregation/

## 常用的操作有哪些

分为两个主要的部分`Aggregation Pipeline Stages`(阶段),`Aggregation Pipeline Operators`(具体操作)


stage操作中的`$count`可以为一下个阶段的操作文档添加一个新的属性名,这个属性名的值就是接收的文档的数量.
```
{ $count: <string> }
```


操作`$addToSet`,这个操作只能和stage`$group`一起用,作用是把数据加入一个集合中

例子:https://docs.mongodb.com/manual/reference/operator/aggregation/addToSet/

