---
_id: 0c2b825f9b
title: ImageMagick使用
date: 2019-11-04 16:06
update: 2019-11-04 16:06
author: Rainboy
tags:
    - linux命令
catalog: 学习笔记
---

## 大小

**改变画布的大小,放置到中间位置,设置新增加的区域的颜色为白色**

```bash
convert sample.png -gravity center -background white  -extent 500x500 out.png
```
