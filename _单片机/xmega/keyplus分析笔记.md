---
_id: "f42836b2e6"
title: keyplus分析笔记
date: 2020-04-09 22:12
update: 2020-04-09 22:12
author: Rainboy
tags:
    - 键盘
    - keyplus
    - 单片机
catalog:  键盘
---


@[toc]
## 分析

github: https://github.com/ahtn/keyplus

硬件包括

 - atxmega32au4 核心
 - nrf24L01+ 2.4g无线模块
 - 罗技uno 6通道无线接收器

了解keyplus的核心逻辑代码

```
core    核心逻辑
 - atxmega32au4 硬件实现
```

入口函数



