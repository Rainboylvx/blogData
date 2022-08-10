---
_id: SyAjxQIi7
title: 初识redis
date: 2018-10-18 23:31
update: 2018-10-18 23:31
series: redis学习系列
categories:
    - 学习笔记
tags:
    - redis
    - 软件学习
---


## 什么是redis/有什么特点

REmote DIctionary Server(Redis) 是一个由Salvatore Sanfilippo写的key-value存储系统。

Redis是一个开源的使用ANSI C语言编写、遵守BSD协议、支持网络、可基于内存亦可持久化的日志型、Key-Value数据库，并提供多种语言的API。

它通常被称为数据结构服务器，因为值（value）可以是 字符串(String), 哈希(Map), 列表(list), 集合(sets) 和 有序集合(sorted sets)等类型。

**特点如下:**

 - 性能极高,官方说可以达到`10000/s`
 - 支持数据持久化
 - 支持数据备份
 - 丰富的数据类型
 - 原子性

## redis的相关学习资料

 - [Redis 官网](https://redis.io)
 - [Bilibili 【动力节点】Redis视频教程](https://www.bilibili.com/video/av16841549?from=search&seid=1487029765211937745)
 - [Redis 教程 | 菜鸟教程](http://www.runoob.com/redis/redis-tutorial.html)
 - [Redis node模块](https://github.com/NodeRedis/node_redis)


## 我为什么学习redis

 - 我在写程序的过程中需要使用Redis作为缓存
 - 我需要一个**消息队列**来完成我的程序

## 我设定的学习路线

```
   +--------- +   +-----------+
   | 菜鸟教程 | + |  视频教程 |
   +--------- +   +-----------+
                |
                |
                v
   +------------+----------------+
   |直接命令行使用/node模块的使用|
   +-----------------------------+

```
